import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  const { data: { user }, error } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // Define protected routes
  const protectedRoutes = ['/protected', '/charts', '/dashboard']
  const authRoutes = ['/auth/login', '/auth/sign-up', '/auth/forgot-password']
  
  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // If user is not authenticated and trying to access protected route
  if (!user && isProtectedRoute) {
    url.pathname = '/auth/login'
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  // If user is authenticated and trying to access auth routes, redirect to dashboard
  if (user && isAuthRoute) {
    url.pathname = '/charts'
    return NextResponse.redirect(url)
  }

  // For authenticated users on protected routes, check user status
  if (user && isProtectedRoute) {
    try {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('status, role, account_locked_until')
        .eq('id', user.id)
        .single()

      if (profile) {
        // Check if account is locked
        if (profile.account_locked_until) {
          const lockedUntil = new Date(profile.account_locked_until)
          if (lockedUntil > new Date()) {
            url.pathname = '/auth/error'
            url.searchParams.set('message', `Account is locked until ${lockedUntil.toLocaleString()}`)
            return NextResponse.redirect(url)
          }
        }

        // If user is suspended or inactive, redirect to error page
        if (profile.status === 'suspended' || profile.status === 'inactive') {
          url.pathname = '/auth/error'
          url.searchParams.set('message', 'Account suspended or inactive')
          return NextResponse.redirect(url)
        }
      }
    } catch (error) {
      console.warn('User profile check failed in middleware, proceeding:', error)
      // Continue without profile check if table doesn't exist
    }

    // Log simple activity (optional, lightweight)
    try {
      await supabase.rpc('log_user_activity', {
        user_id_param: user.id,
        activity_type: 'page_visit'
      })
    } catch (error) {
      // Silently fail if function doesn't exist or fails
      // This is optional functionality
    }
  }

  return response
}

// Production-ready rate limiting options
export interface RateLimitConfig {
  windowMs: number      // Time window in milliseconds
  maxAttempts: number   // Max attempts per window
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
}

// Option 1: Database-backed rate limiting (production-ready)
export async function checkDatabaseRateLimit(
  supabase: any,
  identifier: string,
  action: string,
  config: RateLimitConfig = { windowMs: 15 * 60 * 1000, maxAttempts: 5 }
): Promise<{ allowed: boolean; remaining: number; resetTime: Date }> {
  const windowStart = new Date(Date.now() - config.windowMs)
  
  try {
    // Create a simple rate_limits table if needed
    const { data: attempts, error } = await supabase
      .from('rate_limit_attempts')
      .select('count(*)')
      .eq('identifier', identifier)
      .eq('action', action)
      .gte('created_at', windowStart.toISOString())
      .single()

    const currentAttempts = attempts?.count || 0
    const remaining = Math.max(0, config.maxAttempts - currentAttempts)
    const allowed = currentAttempts < config.maxAttempts

    // If allowed, record this attempt
    if (allowed) {
      await supabase
        .from('rate_limit_attempts')
        .insert({
          identifier,
          action,
          created_at: new Date().toISOString()
        })
    }

    return {
      allowed,
      remaining,
      resetTime: new Date(Date.now() + config.windowMs)
    }
  } catch (error) {
    console.warn('Rate limit check failed, allowing request:', error)
    return {
      allowed: true,
      remaining: config.maxAttempts,
      resetTime: new Date(Date.now() + config.windowMs)
    }
  }
}

// Option 2: Edge KV storage (Vercel/Cloudflare)
export async function checkEdgeKVRateLimit(
  kv: any, // Your KV storage instance
  identifier: string,
  config: RateLimitConfig = { windowMs: 15 * 60 * 1000, maxAttempts: 5 }
): Promise<{ allowed: boolean; remaining: number; resetTime: Date }> {
  const key = `rate_limit:${identifier}`
  const now = Date.now()
  const windowStart = now - config.windowMs

  try {
    const data = await kv.get(key)
    let attempts = data ? JSON.parse(data).filter((timestamp: number) => timestamp > windowStart) : []
    
    const allowed = attempts.length < config.maxAttempts
    
    if (allowed) {
      attempts.push(now)
      await kv.set(key, JSON.stringify(attempts), { ex: Math.ceil(config.windowMs / 1000) })
    }

    return {
      allowed,
      remaining: Math.max(0, config.maxAttempts - attempts.length),
      resetTime: new Date(now + config.windowMs)
    }
  } catch (error) {
    console.warn('Edge KV rate limit check failed, allowing request:', error)
    return {
      allowed: true,
      remaining: config.maxAttempts,
      resetTime: new Date(now + config.windowMs)
    }
  }
}

// Option 3: Header-based rate limiting (for simpler cases)
export function addRateLimitHeaders(
  response: NextResponse,
  result: { allowed: boolean; remaining: number; resetTime: Date }
): NextResponse {
  response.headers.set('X-RateLimit-Limit', '5')
  response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
  response.headers.set('X-RateLimit-Reset', Math.ceil(result.resetTime.getTime() / 1000).toString())
  
  if (!result.allowed) {
    response.headers.set('Retry-After', Math.ceil((result.resetTime.getTime() - Date.now()) / 1000).toString())
  }
  
  return response
}

// Security headers middleware
export function addSecurityHeaders(response: NextResponse): NextResponse {
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // CSP header
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' https://*.supabase.co wss://*.supabase.co;
  `.replace(/\s{2,}/g, ' ').trim()
  
  response.headers.set('Content-Security-Policy', cspHeader)
  
  return response
}
