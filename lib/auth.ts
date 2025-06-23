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
  last_activity_at?: string
  login_count?: number
  failed_login_attempts?: number
  last_failed_login_at?: string
  account_locked_until?: string
  created_at: string
  updated_at: string
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

export interface UserStats {
  login_count: number
  last_login_at?: string
  last_activity_at?: string
  account_status: string
  is_locked: boolean
}

export class AuthService {
  private supabase = createClient()

  // Simplified login with production-ready rate limiting
  async login(email: string, password: string, ipAddress?: string) {
    try {
      // Check rate limiting first (production-ready)
      const identifier = ipAddress || email
      const rateLimitResult = await this.checkRateLimit(identifier, 'login_attempt')
      
      if (!rateLimitResult.allowed) {
        throw new Error(`Too many login attempts. Try again after ${rateLimitResult.resetTime.toLocaleTimeString()}`)
      }

      // Check if account exists and is locked
      const { data: profileData } = await this.supabase
        .from('user_profiles')
        .select('id, account_locked_until, failed_login_attempts')
        .eq('email', email)
        .single()

      if (profileData?.account_locked_until) {
        const lockedUntil = new Date(profileData.account_locked_until)
        if (lockedUntil > new Date()) {
          throw new Error(`Account is locked until ${lockedUntil.toLocaleString()}`)
        }
      }

      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Record failed rate limit attempt
        await this.recordRateLimitAttempt(identifier, 'login_attempt')
        
        // Update failed login attempts
        if (profileData) {
          await this.supabase.rpc('update_user_login', {
            user_id_param: profileData.id,
            ip_address_param: ipAddress,
            success_param: false
          })
        }
        throw error
      }

      if (data.user) {
        // Update successful login (no need to record rate limit attempt for success)
        await this.supabase.rpc('update_user_login', {
          user_id_param: data.user.id,
          ip_address_param: ipAddress,
          success_param: true
        })
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Simplified signup
  async signup(email: string, password: string, fullName?: string) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Social login with OAuth providers
  async loginWithOAuth(provider: 'google' | 'github') {
    try {
      const currentPath = window.location.pathname
      const redirectTo = currentPath === '/auth/login' || currentPath === '/auth/sign-up' ? '/charts' : currentPath
      
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/confirm?redirectTo=${encodeURIComponent(redirectTo)}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Get user's OAuth connections from Supabase native table
  async getUserOAuthConnections(userId: string) {
    try {
      const { data, error } = await this.supabase
        .from('auth.identities')
        .select('*')
        .eq('user_id', userId)

      return { data: data || [], error }
    } catch (error) {
      return { data: [], error }
    }
  }

  // Disconnect OAuth provider
  async disconnectOAuthProvider(userId: string, provider: string) {
    try {
      // Note: Supabase doesn't provide a direct way to delete OAuth identities via the client library
      // This would typically require admin/server-side operations
      // For now, we'll simulate the operation but note that this is a limitation
      console.warn('OAuth disconnection requires server-side implementation')
      
      // You would need to implement this on the server side using the Supabase Admin API
      // or create a custom database function
      const { error } = await this.supabase.rpc('disconnect_oauth_provider', {
        user_id_param: userId,
        provider_param: provider
      })

      return { error }
    } catch (error) {
      return { error }
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
    try {
      const { data, error } = await this.supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Get user statistics
  async getUserStats(userId: string): Promise<UserStats | null> {
    try {
      const { data, error } = await this.supabase.rpc('get_user_stats', {
        user_id_param: userId
      })

      if (error || !data || data.length === 0) {
        return null
      }

      return data[0] as UserStats
    } catch (error) {
      console.warn('Error fetching user stats:', error)
      return null
    }
  }

  // Log user activity (simplified)
  async logActivity(userId: string, activityType: string = 'page_visit') {
    try {
      await this.supabase.rpc('log_user_activity', {
        user_id_param: userId,
        activity_type: activityType
      })
    } catch (error) {
      console.warn('Activity logging failed:', error)
    }
  }

  // Reset password with rate limiting
  async resetPassword(email: string) {
    try {
      // Check rate limiting for password reset
      const rateLimitResult = await this.checkRateLimit(email, 'password_reset', 3, 60 * 60 * 1000) // 3 attempts per hour
      
      if (!rateLimitResult.allowed) {
        throw new Error(`Too many password reset attempts. Try again after ${rateLimitResult.resetTime.toLocaleTimeString()}`)
      }

      const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`
      })

      if (error) {
        // Record failed attempt
        await this.recordRateLimitAttempt(email, 'password_reset')
        throw error
      }

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Update password
  async updatePassword(newPassword: string) {
    try {
      const { data, error } = await this.supabase.auth.updateUser({
        password: newPassword
      })

      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  // Logout
  async logout() {
    const { error } = await this.supabase.auth.signOut()
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

  // Admin function to unlock user account
  async unlockUserAccount(userId: string) {
    try {
      await this.supabase.rpc('unlock_user_account', {
        user_id_param: userId
      })
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  // Production-ready rate limiting
  private async checkRateLimit(
    identifier: string, 
    action: string,
    maxAttempts: number = 5,
    windowMs: number = 15 * 60 * 1000
  ): Promise<{ allowed: boolean; remaining: number; resetTime: Date }> {
    const windowStart = new Date(Date.now() - windowMs)
    
    try {
      // Use the rate_limit_attempts table for production
      const { data: attempts, error } = await this.supabase
        .from('rate_limit_attempts')
        .select('id')
        .eq('identifier', identifier)
        .eq('action', action)
        .gte('created_at', windowStart.toISOString())

      const currentAttempts = attempts?.length || 0
      const remaining = Math.max(0, maxAttempts - currentAttempts)
      const allowed = currentAttempts < maxAttempts

      return {
        allowed,
        remaining,
        resetTime: new Date(Date.now() + windowMs)
      }
    } catch (error) {
      console.warn('Rate limit check failed, allowing request:', error)
      // Fail open - allow request if rate limit check fails
      return {
        allowed: true,
        remaining: maxAttempts,
        resetTime: new Date(Date.now() + windowMs)
      }
    }
  }

  // Record rate limit attempt
  private async recordRateLimitAttempt(identifier: string, action: string) {
    try {
      await this.supabase
        .from('rate_limit_attempts')
        .insert({
          identifier,
          action,
          created_at: new Date().toISOString()
        })
    } catch (error) {
      console.warn('Failed to record rate limit attempt:', error)
    }
  }
}

// Create singleton instance
export const authService = new AuthService()

// Utility function to get device fingerprint
export function getDeviceFingerprint(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      fingerprint: 'server',
      userAgent: 'server',
      platform: 'server',
      browser: 'server',
      screen_resolution: '0x0',
      timezone: 'UTC',
      language: 'en'
    }
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx?.fillText('fingerprint', 10, 10)
  const canvasFingerprint = canvas.toDataURL()

  return {
    fingerprint: btoa(canvasFingerprint + navigator.userAgent + screen.width + screen.height),
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 
             navigator.userAgent.includes('Firefox') ? 'Firefox' : 
             navigator.userAgent.includes('Safari') ? 'Safari' : 'Other',
    screen_resolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language
  }
}

// Get client IP (simplified)
export async function getClientIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip || 'unknown'
  } catch {
    return 'unknown'
  }
} 