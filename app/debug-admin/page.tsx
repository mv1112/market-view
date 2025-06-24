"use client"

import { useAuth, useRoleAccess } from '@/lib/hooks/use-auth'
import { isAdminEmail } from '@/lib/auth-redirects'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DebugAdmin() {
  const { user, profile, isAuthenticated, isLoading } = useAuth()
  const { isAdmin, canAccess, userRole } = useRoleAccess('admin')
  const router = useRouter()
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 19)]) // Keep last 20 logs
  }

  useEffect(() => {
    addLog(`Auth state change - authenticated: ${isAuthenticated}, loading: ${isLoading}`)
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    addLog(`Profile state change - role: ${profile?.role || 'null'}, isAdmin: ${isAdmin}`)
  }, [profile, isAdmin])

  useEffect(() => {
    addLog(`User change - email: ${user?.email || 'null'}, isAdminEmail: ${user?.email ? isAdminEmail(user.email) : 'false'}`)
  }, [user])

  useEffect(() => {
    addLog(`Role access change - canAccess: ${canAccess}, userRole: ${userRole}`)
  }, [canAccess, userRole])

  const testAdminRedirect = () => {
    addLog('Testing admin redirect...')
    router.push('/admin')
  }

  const testChartsRedirect = () => {
    addLog('Testing charts redirect...')
    router.push('/charts')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Admin Authentication Debug</h1>
        
        {/* Current State */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Current Authentication State</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Basic Auth</h3>
              <p><strong>Authenticated:</strong> {isAuthenticated ? '✅' : '❌'}</p>
              <p><strong>Loading:</strong> {isLoading ? '⏳' : '✅'}</p>
              <p><strong>User Email:</strong> {user?.email || 'None'}</p>
              <p><strong>Is Admin Email:</strong> {user?.email ? (isAdminEmail(user.email) ? '✅' : '❌') : '❓'}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Role & Access</h3>
              <p><strong>Profile Role:</strong> {profile?.role || 'null'}</p>
              <p><strong>User Role (Hook):</strong> {userRole || 'null'}</p>
              <p><strong>Is Admin:</strong> {isAdmin ? '✅' : '❌'}</p>
              <p><strong>Can Access Admin:</strong> {canAccess ? '✅' : '❌'}</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Test Navigation</h2>
          <div className="flex space-x-4">
            <Button onClick={testAdminRedirect}>
              Go to Admin
            </Button>
            <Button onClick={testChartsRedirect} variant="outline">
              Go to Charts
            </Button>
            <Button onClick={() => setLogs([])} variant="outline">
              Clear Logs
            </Button>
          </div>
        </Card>

        {/* Live Logs */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Live Authentication Logs</h2>
          <div className="bg-black text-green-400 p-4 rounded-md h-96 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-gray-400">No logs yet...</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Expected Behavior */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Expected Behavior</h2>
          <div className="space-y-2 text-sm">
            <p>✅ <strong>Admin Email Login:</strong> Should redirect to /admin and stay there</p>
            <p>✅ <strong>Regular User Login:</strong> Should redirect to /charts</p>
            <p>✅ <strong>Profile Loading:</strong> Should show loading state, not redirect</p>
            <p>✅ <strong>Background Operations:</strong> Should not cause navigation changes</p>
            <p>❌ <strong>Charts Compilation:</strong> Should NOT trigger redirect from admin page</p>
          </div>
        </Card>
      </div>
    </div>
  )
} 