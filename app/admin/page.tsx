"use client"

import { useAuth, useRoleAccess } from '@/lib/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { isAdminEmail } from '@/lib/auth-redirects'
import { 
  Settings, 
  Users, 
  Key, 
  BarChart3, 
  Shield, 
  Database,
  Activity,
  TrendingUp
} from 'lucide-react'

export default function AdminDashboard() {
  const { user, profile, isAuthenticated } = useAuth()
  const { isAdmin, canAccess } = useRoleAccess('admin')
  const router = useRouter()

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
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Admin Panel
          </h2>
          <p className="text-gray-600">
            Manage stock market APIs, user accounts, and system settings
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Key className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">API Keys</h3>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
                <p className="text-2xl font-bold text-gray-900">1,284</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">API Calls Today</h3>
                <p className="text-2xl font-bold text-gray-900">45.2K</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">System Health</h3>
                <p className="text-2xl font-bold text-green-600">99.9%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/api-keys">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    API Keys Management
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Configure stock market data provider API keys
                  </p>
                </div>
                <Key className="h-8 w-8 text-blue-600" />
              </div>
            </Card>
          </Link>

          <Link href="/admin/users">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    User Management
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Manage user accounts, roles, and permissions
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Analytics & Usage
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Monitor API usage and system performance
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </Card>
          </Link>

          <Link href="/admin/database">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Database Management
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Monitor database health and performance
                  </p>
                </div>
                <Database className="h-8 w-8 text-indigo-600" />
              </div>
            </Card>
          </Link>

          <Link href="/admin/settings">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    System Settings
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Configure global system settings and preferences
                  </p>
                </div>
                <Settings className="h-8 w-8 text-gray-600" />
              </div>
            </Card>
          </Link>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Security Center
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Monitor security events and manage access controls
              </p>
              <Button size="sm" className="w-full">
                View Security Logs
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent System Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-900">API key for Alpha Vantage updated</span>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-900">New user registered: john@example.com</span>
              </div>
              <span className="text-xs text-gray-500">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-900">Database backup completed successfully</span>
              </div>
              <span className="text-xs text-gray-500">6 hours ago</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 