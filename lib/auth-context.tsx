'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { createClient } from '@/lib/client'
import { UserProfile, authService } from '@/lib/auth'

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

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Auth initialization timeout')), 10000) // 10 second timeout
      })

      // Get current session with timeout
      const { data: { session }, error: sessionError } = await Promise.race([
        supabase.auth.getSession(),
        timeoutPromise
      ]) as any
      
      if (sessionError) {
        throw sessionError
      }

      if (session?.user) {
        // Fetch user profile with error handling - make it optional
        let profile = null
        try {
          profile = await authService.getUserProfile(session.user.id)
        } catch (error) {
          console.warn('Failed to fetch user profile, continuing without it:', error)
          // Continue without profile - this is not critical for basic auth
        }
        
        setAuthState(prev => ({
          ...prev,
          user: session.user,
          profile,
          session,
          isLoading: false,
          isInitialized: true,
          error: null
        }))
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
      console.error('Auth refresh failed:', error)
      
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
        console.error('Auth initialization failed:', error)
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

    // Fallback timeout - shorter in development for faster loading
    const timeoutDuration = process.env.NODE_ENV === 'development' ? 2000 : 5000
    const fallbackTimeout = setTimeout(() => {
      setAuthState(prev => {
        if (!prev.isInitialized) {
          console.warn('Auth initialization timeout, proceeding without auth')
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
              let profile = null
              try {
                profile = await authService.getUserProfile(session.user.id)
              } catch (error) {
                console.warn('Failed to fetch user profile, continuing without it:', error)
              }
              
              setAuthState(prev => ({
                ...prev,
                user: session.user,
                profile,
                session,
                isLoading: false,
                isInitialized: true,
                error: null
              }))
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
          console.error('Auth state change error:', error)
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
      console.warn('Session expiring soon. Consider implementing refresh UI.')
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
      return options?.fallback || <div>Loading...</div>
    }
    
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = options?.redirectTo || '/auth/login'
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
      window.location.href = options?.redirectTo || '/auth/login'
    }
  }, [canAccess, auth.isLoading, options?.redirectTo])
  
  return { ...auth, canAccess }
} 