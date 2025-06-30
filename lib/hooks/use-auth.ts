/**
 * Custom Authentication Hooks
 * Enterprise-grade hooks for authentication state management
 */

import { useAuth as useAuthContext } from '@/lib/auth-context'
import { useEffect, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { isAdminEmail } from '../auth-redirects'
import { UserProfile } from '../auth'
import { safeConsole } from '@/lib/utils'

/**
 * Main authentication hook - re-exports the context hook
 */
export const useAuth = useAuthContext

/**
 * Hook for handling authentication redirects
 */
export function useAuthRedirect(options?: {
  requireAuth?: boolean
  redirectTo?: string
  onlyForGuests?: boolean
}) {
  const { isAuthenticated, isLoading, isInitialized, user, profile } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isInitialized || isLoading) return

    const shouldRedirect = 
      (options?.requireAuth && !isAuthenticated) ||
      (options?.onlyForGuests && isAuthenticated)

    if (shouldRedirect) {
      const redirectPath = options?.redirectTo || 
        (isAuthenticated ? '/charts' : `/auth?redirectTo=${pathname}`)
      
      router.push(redirectPath)
    }

    if (!isLoading) {
      const userIsAuthenticated = !!user
      
      // Redirect unauthenticated users from protected routes
      if (options?.requireAuth && !userIsAuthenticated) {
        if (options?.redirectTo) {
          router.push(options.redirectTo)
        }
        return
      }
      
      // Redirect authenticated users from public routes
      if (options?.onlyForGuests && userIsAuthenticated) {
        if (options?.redirectTo) {
          router.push(options.redirectTo)
        }
        return
      }

      // Handle role-based redirects
      if (userIsAuthenticated && profile) {
        if (isAdminEmail(user?.email || '')) {
          if (pathname !== '/admin') {
            safeConsole.log('Admin user detected, should redirect to /admin')
          }
        } else {
          if (pathname === '/admin') {
            router.push('/charts')
          }
        }
      }
    }
  }, [isAuthenticated, isLoading, isInitialized, router, pathname, user, profile, options])

  const shouldRender = (options?.requireAuth && !!user) || !options?.requireAuth

  return {
    isAuthenticated,
    isLoading,
    shouldRender,
    canAccess: options?.requireAuth ? isAuthenticated : 
               options?.onlyForGuests ? !isAuthenticated : true
  }
}

/**
 * Hook for session monitoring and automatic refresh
 */
export function useSessionMonitor() {
  const { session, sessionExpiresAt, refreshAuth, isSessionExpiring } = useAuth()

  const refreshSession = useCallback(async () => {
    try {
      await refreshAuth()
    } catch (error) {
      safeConsole.error('Failed to refresh session:', error)
    }
  }, [refreshAuth])

  // Auto-refresh session when it's about to expire
  useEffect(() => {
    if (isSessionExpiring && session) {
      refreshSession()
    }
  }, [isSessionExpiring, session, refreshSession])

  return {
    session,
    sessionExpiresAt,
    isSessionExpiring,
    refreshSession
  }
}

/**
 * Hook for user role-based access control
 */
export function useRoleAccess(requiredRole?: string) {
  const { profile, isAuthenticated } = useAuth()

  const hasRole = (role: string) => {
    if (!isAuthenticated || !profile) return false
    
    // Role hierarchy: admin > manager > user > viewer
    const roleHierarchy = ['viewer', 'user', 'manager', 'admin']
    const userRoleIndex = roleHierarchy.indexOf(profile.role)
    const requiredRoleIndex = roleHierarchy.indexOf(role)
    
    return userRoleIndex >= requiredRoleIndex
  }

  const canAccess = requiredRole ? hasRole(requiredRole) : true

  return {
    userRole: profile?.role,
    hasRole,
    canAccess,
    isAdmin: hasRole('admin'),
    isManager: hasRole('manager'),
    isUser: hasRole('user')
  }
}

/**
 * Hook for authentication status with loading states
 */
export function useAuthStatus() {
  const { 
    isAuthenticated, 
    isLoading, 
    isInitialized, 
    error,
    user,
    profile 
  } = useAuth()

  return {
    // Status flags
    isAuthenticated,
    isLoading,
    isInitialized,
    isGuest: isInitialized && !isAuthenticated,
    
    // User data
    user,
    profile,
    
    // Error handling
    error,
    hasError: !!error,
    
    // Combined states for easier conditionals
    isReady: isInitialized && !isLoading,
    showContent: isInitialized && !isLoading,
    showSkeleton: !isInitialized || isLoading
  }
}

// Custom hook to check role access
export const useRoleAccessCustom = (requiredRole: UserProfile['role']) => {
  const { profile, user } = useAuth()
  
  const userRole = profile?.role
  const canAccess = userRole === requiredRole
  const isAdmin = userRole === 'admin'
  
  // Also check email for admin role as a fallback
  const isAdminByEmail = user?.email ? isAdminEmail(user.email) : false
  
  return {
    userRole,
    canAccess,
    isAdmin: isAdmin || isAdminByEmail
  }
}

// Hook to handle session refresh errors
export const useSessionRefresh = () => {
  const { refreshAuth } = useAuth()

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        await refreshAuth()
      } catch (error) {
        safeConsole.error('Failed to refresh session:', error)
        // Optionally, trigger a logout or show a notification
      }
    }

    // Set an interval to refresh the session periodically
    const intervalId = setInterval(handleRefresh, 15 * 60 * 1000) // Every 15 minutes

    return () => clearInterval(intervalId)
  }, [refreshAuth])
} 