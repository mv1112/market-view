import { createClient } from "@/lib/server"
import { redirect } from "next/navigation"
import { LogoutButton } from "@/components/logout-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, User, Clock, Activity, MapPin, Monitor, TrendingUp } from "lucide-react"

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

  // Get user statistics
  let userStats = null
  try {
    const { data: statsData } = await supabase.rpc('get_user_stats', {
      user_id_param: user.id
    })
    userStats = statsData?.[0] || null
  } catch (error) {
    console.warn('Failed to fetch user stats:', error)
  }

  // Get OAuth connections (from Supabase native table)
  const { data: oauthConnections } = await supabase
    .from('auth.identities')
    .select('provider, created_at')
    .eq('user_id', user.id)

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

  const timeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your account and view your activity
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
            {profile?.company && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Company</p>
                <p className="text-sm text-muted-foreground">{profile.company}</p>
              </div>
            )}
            {profile?.job_title && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Job Title</p>
                <p className="text-sm text-muted-foreground">{profile.job_title}</p>
              </div>
            )}
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

        {/* Account Security Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Account Security
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
                {profile?.last_login_at ? (
                  <>
                    {formatDate(profile.last_login_at)}
                    <br />
                    <span className="text-xs">({timeAgo(profile.last_login_at)})</span>
                  </>
                ) : 'Never'}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Last Activity</p>
              <p className="text-sm text-muted-foreground">
                {profile?.last_activity_at ? timeAgo(profile.last_activity_at) : 'Unknown'}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Last IP</p>
              <p className="text-sm text-muted-foreground">
                {profile?.last_login_ip || 'Unknown'}
              </p>
            </div>
            {profile?.account_locked_until && new Date(profile.account_locked_until) > new Date() && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-red-600">Account Locked Until</p>
                <p className="text-sm text-red-600">
                  {formatDate(profile.account_locked_until)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Activity Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Total Logins</p>
              <p className="text-2xl font-bold">
                {userStats?.login_count || profile?.login_count || 0}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Failed Login Attempts</p>
              <p className="text-lg font-semibold text-yellow-600">
                {profile?.failed_login_attempts || 0}
              </p>
            </div>
            {profile?.last_failed_login_at && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Last Failed Login</p>
                <p className="text-sm text-muted-foreground">
                  {timeAgo(profile.last_failed_login_at)}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <p className="text-sm font-medium">Account Status</p>
              <Badge className={userStats?.is_locked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                {userStats?.is_locked ? 'Locked' : 'Active'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Connected Accounts Card */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Connected Accounts
            </CardTitle>
            <CardDescription>
              OAuth providers connected to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {oauthConnections && oauthConnections.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {oauthConnections.map((connection, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        {connection.provider === 'google' ? '🔍' : 
                         connection.provider === 'github' ? '🐙' : '🔗'}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{connection.provider}</p>
                        <p className="text-sm text-muted-foreground">
                          Connected {formatDate(connection.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No connected accounts</p>
                <p className="text-sm text-muted-foreground mt-1">
                  You can connect OAuth providers for easier sign-in
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Settings & Preferences */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Settings & Preferences</CardTitle>
            <CardDescription>
              Current account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Timezone</p>
                <p className="text-sm text-muted-foreground">{profile?.timezone || 'UTC'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Language</p>
                <p className="text-sm text-muted-foreground">{profile?.language || 'en'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Theme</p>
                <p className="text-sm text-muted-foreground capitalize">{profile?.theme || 'light'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
