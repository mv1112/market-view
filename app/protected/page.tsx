import { createClient } from "@/lib/server"
import { redirect } from "next/navigation"
import { LogoutButton } from "@/components/logout-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, User, Clock, Activity, MapPin, Monitor } from "lucide-react"

export default async function ProtectedPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get recent security logs
  const { data: securityLogs } = await supabase
    .from('security_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  // Get active sessions
  const { data: sessions } = await supabase
    .from('user_sessions')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .order('last_activity_at', { ascending: false })

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'manager': return 'bg-blue-100 text-blue-800'
      case 'user': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Authentication Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your account security and view authentication details
          </p>
        </div>
        <LogoutButton variant="outline" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User Profile Card */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Name</p>
              <p className="text-sm text-muted-foreground">{profile?.full_name || 'Not provided'}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Role</p>
              <Badge className={getRoleColor(profile?.role || 'user')}>
                {profile?.role || 'user'}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
              <Badge className={getStatusColor(profile?.status || 'active')}>
                {profile?.status || 'active'}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Member Since</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(user.created_at)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Email Verified</span>
              <Badge className={profile?.email_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {profile?.email_verified ? 'Verified' : 'Pending'}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">2FA Enabled</span>
              <Badge className={profile?.two_factor_enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {profile?.two_factor_enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Last Login</p>
              <p className="text-sm text-muted-foreground">
                {profile?.last_login_at ? formatDate(profile.last_login_at) : 'Never'}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Last IP</p>
              <p className="text-sm text-muted-foreground">
                {profile?.last_login_ip || 'Unknown'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Active Sessions
            </CardTitle>
            <CardDescription>
              {sessions?.length || 0} active session(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessions?.slice(0, 3).map((session) => (
                <div key={session.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium">
                      {session.device_info?.platform || 'Unknown Device'}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      Active
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {session.ip_address}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last active: {formatDate(session.last_activity_at)}
                  </p>
                </div>
              ))}
              {(sessions?.length || 0) > 3 && (
                <p className="text-sm text-muted-foreground text-center">
                  +{(sessions?.length || 0) - 3} more sessions
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Security Activity
            </CardTitle>
            <CardDescription>
              Your recent authentication and security events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityLogs?.map((log) => (
                <div key={log.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium capitalize">
                        {log.event_type.replace(/_/g, ' ')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {log.event_description}
                      </p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p>{formatDate(log.created_at)}</p>
                      {log.ip_address && (
                        <p className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {log.ip_address}
                        </p>
                      )}
                    </div>
                  </div>
                  {log.risk_score > 0 && (
                    <Badge 
                      className={
                        log.risk_score > 50 
                          ? 'bg-red-100 text-red-800' 
                          : log.risk_score > 20 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-blue-100 text-blue-800'
                      }
                    >
                      Risk Score: {log.risk_score}
                    </Badge>
                  )}
                </div>
              ))}
              {(!securityLogs || securityLogs.length === 0) && (
                <p className="text-center text-muted-foreground py-8">
                  No security events found
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common security and account management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Enable 2FA</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <User className="h-5 w-5" />
              <span className="text-sm">Edit Profile</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm">Change Password</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Monitor className="h-5 w-5" />
              <span className="text-sm">Manage Sessions</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
