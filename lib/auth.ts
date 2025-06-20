import { createClient } from '@/lib/client'
import { createClient as createServerClient } from '@/lib/server'
import { User } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  company?: string
  job_title?: string
  phone?: string
  bio?: string
  timezone: string
  language: string
  theme: string
  email_verified: boolean
  phone_verified: boolean
  two_factor_enabled: boolean
  role: 'user' | 'admin' | 'manager' | 'viewer'
  status: 'active' | 'inactive' | 'suspended' | 'pending'
  last_login_at?: string
  last_login_ip?: string
  created_at: string
  updated_at: string
}

export interface SecurityEvent {
  event_type: string
  event_description?: string
  ip_address?: string
  user_agent?: string
  location?: any
  risk_score?: number
  metadata?: any
}

export interface DeviceInfo {
  fingerprint: string
  userAgent: string
  platform: string
  browser: string
  screen_resolution: string
  timezone: string
  language: string
}

export interface SessionInfo {
  id: string
  user_id: string
  device_info: DeviceInfo
  ip_address: string
  location?: any
  is_active: boolean
  expires_at: string
  created_at: string
  last_activity_at: string
}

export class AuthService {
  private supabase = createClient()

  // Enhanced login with security logging
  async login(email: string, password: string, deviceInfo?: DeviceInfo, ipAddress?: string) {
    try {
      // Check rate limiting first
      const isAllowed = await this.checkRateLimit(email, 'login_attempt')
      if (!isAllowed) {
        throw new Error('Too many login attempts. Please try again later.')
      }

      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Log failed login attempt
        await this.logSecurityEvent({
          event_type: 'login_failed',
          event_description: `Failed login attempt for ${email}: ${error.message}`,
          ip_address: ipAddress,
          user_agent: deviceInfo?.userAgent,
          risk_score: 30,
          metadata: { email, error: error.message }
        })
        throw error
      }

      if (data.user) {
        // Log successful login
        await this.logSecurityEvent({
          event_type: 'login_success',
          event_description: `Successful login for ${email}`,
          ip_address: ipAddress,
          user_agent: deviceInfo?.userAgent,
          risk_score: 0,
          metadata: { email }
        }, data.user.id)

        // Create session record
        if (deviceInfo && ipAddress) {
          await this.createSession(data.user.id, deviceInfo, ipAddress)
        }
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Enhanced signup with profile creation
  async signup(email: string, password: string, fullName?: string, additionalData?: any) {
    try {
      const isAllowed = await this.checkRateLimit(email, 'signup_attempt')
      if (!isAllowed) {
        throw new Error('Too many signup attempts. Please try again later.')
      }

      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            ...additionalData
          }
        }
      })

      if (error) {
        await this.logSecurityEvent({
          event_type: 'signup_failed',
          event_description: `Failed signup attempt for ${email}: ${error.message}`,
          risk_score: 20,
          metadata: { email, error: error.message }
        })
        throw error
      }

      if (data.user) {
        await this.logSecurityEvent({
          event_type: 'signup_success',
          event_description: `New user signup: ${email}`,
          risk_score: 0,
          metadata: { email }
        }, data.user.id)
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Get user profile
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await this.supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        // If table doesn't exist or query fails, return null gracefully
        console.warn('User profile fetch failed:', error.message)
        return null
      }
      
      return data as UserProfile
    } catch (error) {
      console.warn('Error fetching user profile:', error)
      return null
    }
  }

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (!error && data) {
      await this.logSecurityEvent({
        event_type: 'profile_updated',
        event_description: 'User profile updated',
        risk_score: 5,
        metadata: { updated_fields: Object.keys(updates) }
      }, userId)
    }

    return { data, error }
  }

  // Check rate limiting
  private async checkRateLimit(identifier: string, action: string): Promise<boolean> {
    const { data } = await this.supabase.rpc('check_rate_limit', {
      identifier_param: identifier,
      action_param: action,
      max_attempts: parseInt(process.env.RATE_LIMIT_MAX_ATTEMPTS || '5'),
      window_minutes: parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || '15')
    })

    return data === true
  }

  // Log security events
  private async logSecurityEvent(event: SecurityEvent, userId?: string) {
    await this.supabase.rpc('log_security_event', {
      user_id_param: userId || null,
      event_type_param: event.event_type,
      event_description_param: event.event_description,
      ip_address_param: event.ip_address,
      user_agent_param: event.user_agent,
      location_param: event.location,
      risk_score_param: event.risk_score || 0,
      metadata_param: event.metadata
    })
  }

  // Create session
  private async createSession(userId: string, deviceInfo: DeviceInfo, ipAddress: string) {
    const sessionToken = crypto.randomUUID()
    
    await this.supabase.rpc('create_user_session', {
      user_id_param: userId,
      session_token_param: sessionToken,
      device_info_param: deviceInfo,
      ip_address_param: ipAddress
    })

    return sessionToken
  }

  // Get user sessions
  async getUserSessions(userId: string): Promise<SessionInfo[]> {
    const { data, error } = await this.supabase
      .from('user_sessions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('last_activity_at', { ascending: false })

    if (error || !data) return []
    return data as SessionInfo[]
  }

  // Revoke session
  async revokeSession(sessionId: string, userId: string) {
    const { error } = await this.supabase
      .from('user_sessions')
      .update({ is_active: false })
      .eq('id', sessionId)
      .eq('user_id', userId)

    if (!error) {
      await this.logSecurityEvent({
        event_type: 'session_revoked',
        event_description: 'User revoked a session',
        risk_score: 5,
        metadata: { session_id: sessionId }
      }, userId)
    }

    return { error }
  }

  // Get security logs
  async getSecurityLogs(userId: string, limit: number = 50) {
    const { data, error } = await this.supabase
      .from('security_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    return { data, error }
  }

  // Password reset with rate limiting
  async resetPassword(email: string) {
    const isAllowed = await this.checkRateLimit(email, 'password_reset')
    if (!isAllowed) {
      throw new Error('Too many password reset attempts. Please try again later.')
    }

    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`
    })

    await this.logSecurityEvent({
      event_type: 'password_reset_requested',
      event_description: `Password reset requested for ${email}`,
      risk_score: 10,
      metadata: { email }
    })

    return { data, error }
  }

  // Update password
  async updatePassword(newPassword: string) {
    const { data, error } = await this.supabase.auth.updateUser({
      password: newPassword
    })

    if (!error && data.user) {
      await this.logSecurityEvent({
        event_type: 'password_changed',
        event_description: 'User changed password',
        risk_score: 10,
        metadata: {}
      }, data.user.id)
    }

    return { data, error }
  }

  // Logout with session cleanup
  async logout() {
    const { error } = await this.supabase.auth.signOut()
    
    // Note: Session cleanup is handled by database triggers and middleware
    
    return { error }
  }

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser()
    
    if (user) {
      const profile = await this.getUserProfile(user.id)
      return { user, profile, error: null }
    }
    
    return { user: null, profile: null, error }
  }
}

// Utility function to get device fingerprint
export function getDeviceFingerprint(): DeviceInfo {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx!.textBaseline = 'top'
  ctx!.font = '14px Arial'
  ctx!.fillText('Device fingerprint', 2, 2)
  
  const fingerprint = btoa(
    navigator.userAgent +
    navigator.language +
    screen.width + 'x' + screen.height +
    screen.colorDepth +
    new Date().getTimezoneOffset() +
    canvas.toDataURL()
  ).slice(0, 32)

  return {
    fingerprint,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    browser: navigator.userAgent.split(' ').pop() || 'unknown',
    screen_resolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language
  }
}

// Utility function to get client IP (for client-side usage)
export async function getClientIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch {
    return 'unknown'
  }
}

export const authService = new AuthService() 