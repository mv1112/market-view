"use client"

import { useAuth, useRoleAccess } from '@/lib/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Shield } from 'lucide-react'
import { isAdminEmail } from '@/lib/auth-redirects'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, profile, isAuthenticated } = useAuth()
  const { isAdmin, canAccess } = useRoleAccess('admin')
  const router = useRouter()

  useEffect(() => {
    document.body.setAttribute('data-admin', 'true');
    return () => {
      document.body.removeAttribute('data-admin');
    };
  }, []);

  useEffect(() => {
    // Only redirect if we have enough info to make a decision
    if (!isAuthenticated) {
      router.push('/auth')
      return
    }

    // If user is authenticated but we have profile info, check role
    if (profile !== null && !canAccess) {
      router.push('/charts') // Redirect non-admins
      return
    }

    // If no profile yet but we can check email directly
    if (profile === null && user?.email && !isAdminEmail(user.email)) {
      router.push('/charts') // Non-admin email
      return
    }
  }, [isAuthenticated, profile, canAccess, router, user])

  // Show loading while we determine access
  if (!isAuthenticated || (profile === null && user?.email && isAdminEmail(user.email))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  // Show access denied for confirmed non-admins
  if (!isAdmin && profile !== null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">Administrator privileges required.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
} 