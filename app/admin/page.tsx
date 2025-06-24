"use client"

import { useAuth, useRoleAccess } from '@/lib/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { isAdminEmail } from '@/lib/auth-redirects'
import { authService } from '@/lib/auth'
import { 
  Settings, 
  Users, 
  Key, 
  BarChart3, 
  Shield, 
  Database,
  Activity,
  TrendingUp,
  LogOut
} from 'lucide-react'

export default function AdminDashboard() {
  const { user, profile, isAuthenticated } = useAuth()
  const { isAdmin, canAccess } = useRoleAccess('admin')
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      
      const { error } = await authService.logout()
      
      if (error) {
        console.error('Logout error:', error instanceof Error ? error.message : 'Unknown error')
      }
      
      // Redirect to landing page
      router.push('/')
      router.refresh() // Refresh to clear auth state
      
    } catch (error) {
      console.error('Logout failed:', error)
      // Redirect anyway for security
      router.push('/')
      router.refresh()
    } finally {
      setIsLoggingOut(false)
    }
  }

  // No useEffect redirect logic here - handled by layout
  // This prevents double redirects and conflicts

  // Show loading while profile loads for admin users
  if (!isAuthenticated || (profile === null && user?.email && isAdminEmail(user.email))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  // Access denied for confirmed non-admins (fallback, should be handled by layout)
  if (!isAdmin && profile !== null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Administrator privileges required.</p>
          <Button onClick={() => router.push('/charts')}>
            Go to Trading Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Admin Mode</span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => router.push('/charts')}
                className="text-sm"
              >
                Switch to Trading View
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isLoggingOut ? "Signing out..." : "Logout"}
              </Button>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
} 