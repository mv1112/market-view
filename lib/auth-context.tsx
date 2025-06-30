'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { createClient } from '@/lib/client'
import { UserProfile, authService } from '@/lib/auth'
import { Skeleton, ChartsPageSkeleton } from '@/components/ui/skeleton'
import { safeConsole } from '@/lib/utils'

// Enterprise-grade type definitions
export interface AuthState {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  isLoading: boolean
  isInitialized: boolean
  error: AuthError | Error | null
}

export interface AuthContextType extends AuthState {
  // Core methods
  refreshAuth: () => Promise<void>
  clearError: () => void
  
  // Computed values
  isAuthenticated: boolean
  userDisplayName: string
  userInitials: string
  avatarUrl: string | null
  
  // Session management
  sessionExpiresAt: Date | null
  isSessionExpiring: boolean
}

// Context with proper error boundaries
const AuthContext = createContext<AuthContextType | null>(null)

// Hook for consuming auth context with error handling
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider. Ensure your component is wrapped with AuthProvider.')
  }
  
  return context
}

// Enterprise-grade provider component
interface AuthProviderProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthProvider({ children, fallback }: AuthProviderProps) {
  // Core state management
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    isLoading: true,
    isInitialized: false,
    error: null
  })

  const supabase = useMemo(() => createClient(), [])

  // Computed values with memoization for performance
  const computedValues = useMemo(() => {
    const { user, profile, session } = authState
    
    const isAuthenticated = !!(user && session)
    
    const userDisplayName = profile?.full_name || 
                           user?.user_metadata?.full_name || 
                           user?.email?.split('@')[0] || 
                           'User'
    
    const userInitials = profile?.full_name
      ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : user?.email?.[0].toUpperCase() || 'U'
    
    const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || null
    
    const sessionExpiresAt = session?.expires_at ? new Date(session.expires_at * 1000) : null
    const isSessionExpiring = sessionExpiresAt ? 
      (sessionExpiresAt.getTime() - Date.now() < 5 * 60 * 1000) : false // 5 minutes warning
    
    return {
      isAuthenticated,
      userDisplayName,
      userInitials,
      avatarUrl,
      sessionExpiresAt,
      isSessionExpiring
    }
  }, [authState])

  // Secure authentication refresh with comprehensive error handling
  const refreshAuth = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

      // Add timeout to prevent hanging - much shorter
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Auth initialization timeout')), 3000) // 3 second timeout
      })

      // Get current session with timeout
      const sessionResult = await Promise.race([
        supabase.auth.getSession(),
        timeoutPromise
      ])
      
      // Type guard to check if it's an error
      if (sessionResult instanceof Error) {
        throw sessionResult
      }
      
      const { data: { session }, error: sessionError } = sessionResult as Awaited<ReturnType<typeof supabase.auth.getSession>>
      
      if (sessionError) {
        throw sessionError
      }

      if (session?.user) {
        // Set auth state immediately, fetch profile in background
        setAuthState(prev => ({
          ...prev,
          user: session.user,
          profile: null, // Will be updated when loaded
          session,
          isLoading: false,
          isInitialized: true,
          error: null
        }))
        
        // Fetch profile in background (non-blocking)
        authService.getUserProfile(session.user.id)
          .then(profile => {
            setAuthState(prev => ({
              ...prev,
              profile
            }))
          })
          .catch(error => {
            safeConsole.warn('Failed to fetch user profile:', error)
            // Don't update auth state for profile errors
          })
      } else {
        // No valid session
        setAuthState(prev => ({
          ...prev,
          user: null,
          profile: null,
          session: null,
          isLoading: false,
          isInitialized: true,
          error: null
        }))
      }
    } catch (error) {
      safeConsole.error('Auth refresh failed:', error)
      
      setAuthState(prev => ({
        ...prev,
        user: null,
        profile: null,
        session: null,
        isLoading: false,
        isInitialized: true,
        error: error as AuthError | Error
      }))
    }
  }, [supabase])

  // Clear error state
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }))
  }, [])

  // Initialize authentication on mount with timeout fallback
  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshAuth()
      } catch (error) {
        safeConsole.error('Auth initialization failed:', error)
        // Force initialization complete even if auth fails
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          isInitialized: true,
          error: error as Error
        }))
      }
    }

    initAuth()

    // Much shorter timeout for faster UX
    const timeoutDuration = 1000 // 1 second timeout
    const fallbackTimeout = setTimeout(() => {
      setAuthState(prev => {
        if (!prev.isInitialized) {
          safeConsole.warn('Auth initialization timeout, proceeding without auth')
          return {
            ...prev,
            isLoading: false,
            isInitialized: true,
            user: null,
            session: null,
            profile: null
          }
        }
        return prev
      })
    }, timeoutDuration)

    return () => clearTimeout(fallbackTimeout)
  }, [refreshAuth])

  // Listen for auth state changes with cleanup
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            if (session?.user) {
              // Set auth state immediately
              setAuthState(prev => ({
                ...prev,
                user: session.user,
                profile: null, // Will be loaded in background
                session,
                isLoading: false,
                isInitialized: true,
                error: null
              }))
              
              // Load profile in background
              authService.getUserProfile(session.user.id)
                .then(profile => {
                  setAuthState(prev => ({ ...prev, profile }))
                })
                .catch(error => {
                  safeConsole.warn('Failed to fetch user profile:', error)
                })
            }
          } else if (event === 'SIGNED_OUT') {
            setAuthState(prev => ({
              ...prev,
              user: null,
              profile: null,
              session: null,
              isLoading: false,
              isInitialized: true,
              error: null
            }))
          }
        } catch (error) {
          safeConsole.error('Auth state change error:', error)
          setAuthState(prev => ({
            ...prev,
            error: error as AuthError | Error
          }))
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  // Session expiry warning effect
  useEffect(() => {
    if (computedValues.isSessionExpiring && authState.user) {
      safeConsole.warn('Session expiring soon. Consider implementing refresh UI.')
      // Here you could trigger a notification or refresh the session automatically
    }
  }, [computedValues.isSessionExpiring, authState.user])

  // Context value with proper memoization
  const contextValue = useMemo<AuthContextType>(() => ({
    ...authState,
    ...computedValues,
    refreshAuth,
    clearError
  }), [authState, computedValues, refreshAuth, clearError])

  // Show fallback during initialization if provided
  if (!authState.isInitialized && fallback) {
    return <>{fallback}</>
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// High-order component for protected routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    redirectTo?: string
    requiredRole?: UserProfile['role']
    fallback?: React.ReactNode
  }
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, profile, isLoading } = useAuth()
    
    if (isLoading) {
      return options?.fallback || (
        <div className="min-h-screen bg-gray-50">
          {/* Protected Page Header Skeleton */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
          
          {/* Protected Page Content Skeleton */}
          <div className="max-w-6xl mx-auto p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {/* Card Skeletons */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-28" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-36" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
            
            {/* Additional Content Skeleton */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-32 w-full" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <Skeleton className="h-6 w-36 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = options?.redirectTo || '/auth'
      }
      return null
    }
    
    if (options?.requiredRole && profile?.role !== options.requiredRole) {
      return <div>Access denied. Required role: {options.requiredRole}</div>
    }
    
    return <Component {...props} />
  }
}

// Custom hook for authentication guards
export function useAuthGuard(options?: {
  requireAuth?: boolean
  requiredRole?: UserProfile['role']
  redirectTo?: string
}) {
  const auth = useAuth()
  
  const canAccess = useMemo(() => {
    if (options?.requireAuth && !auth.isAuthenticated) {
      return false
    }
    
    if (options?.requiredRole && auth.profile?.role !== options.requiredRole) {
      return false
    }
    
    return true
  }, [auth.isAuthenticated, auth.profile?.role, options])
  
  useEffect(() => {
    if (!canAccess && !auth.isLoading && typeof window !== 'undefined') {
      window.location.href = options?.redirectTo || '/auth'
    }
  }, [canAccess, auth.isLoading, options?.redirectTo])
  
  return { ...auth, canAccess }
} 