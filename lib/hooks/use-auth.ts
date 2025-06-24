/**
 * Custom Authentication Hooks
 * Enterprise-grade hooks for authentication state management
 */

import { useAuth as useAuthContext } from '@/lib/auth-context'
import { useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'

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
  const { isAuthenticated, isLoading, isInitialized } = useAuth()
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
  }, [isAuthenticated, isLoading, isInitialized, router, pathname, options])

  return {
    isAuthenticated,
    isLoading,
    shouldRender: isInitialized && !isLoading,
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
      console.error('Failed to refresh session:', error)
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