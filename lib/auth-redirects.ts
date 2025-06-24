import { UserProfile } from '@/lib/auth'

export function getRoleBasedRedirect(role: UserProfile['role'], fallback: string = '/charts'): string {
  switch (role) {
    case 'admin':
      return '/admin'
    case 'manager':
      return '/admin' // Managers can also access admin
    case 'user':
    case 'viewer':
    default:
      return '/charts'
  }
}

export function getLoginRedirect(profile: UserProfile | null, requestedPath?: string): string {
  // If user requested a specific path and has access, honor it
  if (requestedPath && requestedPath !== '/auth') {
    return requestedPath
  }
  
  // Otherwise, use role-based redirect
  return getRoleBasedRedirect(profile?.role || 'user')
}

// Check if email should be admin
export function isAdminEmail(email: string): boolean {
  const adminEmails = ['singhuchtam@gmail.com']
  return adminEmails.includes(email.toLowerCase())
} 