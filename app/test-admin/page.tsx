"use client"

import { useAuth, useRoleAccess } from '@/lib/hooks/use-auth'
import { isAdminEmail } from '@/lib/auth-redirects'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Shield, User, Mail, Crown } from 'lucide-react'

export default function TestAdmin() {
  const { user, profile, isAuthenticated } = useAuth()
  const { isAdmin, userRole } = useRoleAccess()
  const router = useRouter()

  const isEmailAdmin = user?.email ? isAdminEmail(user.email) : false

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Role Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Authentication Status */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Authentication Status
            </h2>
            <div className="space-y-2">
              <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
              <p><strong>User Email:</strong> {user?.email || 'Not logged in'}</p>
              <p><strong>User ID:</strong> {user?.id || 'N/A'}</p>
            </div>
          </Card>

          {/* Role Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Crown className="h-5 w-5 mr-2" />
              Role Information
            </h2>
            <div className="space-y-2">
              <p><strong>Profile Role:</strong> {profile?.role || 'No profile'}</p>
              <p><strong>User Role (Hook):</strong> {userRole || 'N/A'}</p>
              <p><strong>Is Admin (Hook):</strong> {isAdmin ? '✅ Yes' : '❌ No'}</p>
              <p><strong>Email is Admin:</strong> {isEmailAdmin ? '✅ Yes' : '❌ No'}</p>
            </div>
          </Card>

          {/* Email Check */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Email Verification
            </h2>
            <div className="space-y-2">
              <p><strong>Current Email:</strong> {user?.email || 'None'}</p>
              <p><strong>Admin Email:</strong> singhuchtam@gmail.com</p>
              <p><strong>Matches:</strong> {user?.email === 'singhuchtam@gmail.com' ? '✅ Yes' : '❌ No'}</p>
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              {isAuthenticated ? (
                <>
                  <Button 
                    onClick={() => router.push('/admin')}
                    className="w-full"
                    disabled={!isAdmin}
                  >
                    Go to Admin Dashboard
                  </Button>
                  <Button 
                    onClick={() => router.push('/charts')}
                    variant="outline"
                    className="w-full"
                  >
                    Go to Charts
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => router.push('/auth')}
                  className="w-full"
                >
                  Login to Test
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Raw Data */}
        <Card className="mt-6 p-6">
          <h2 className="text-lg font-semibold mb-4">Raw Data (Debug)</h2>
          <div className="bg-gray-100 p-4 rounded-md overflow-auto">
            <pre className="text-sm">
              {JSON.stringify(
                {
                  user: user ? { id: user.id, email: user.email } : null,
                  profile,
                  isAuthenticated,
                  isAdmin,
                  userRole,
                  isEmailAdmin
                },
                null,
                2
              )}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  )
} 