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
    // Get user profile to check status (gracefully handle missing table)
    try {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('status, role')
        .eq('id', user.id)
        .single()

      // If user is suspended or inactive, redirect to error page
      if (profile && (profile.status === 'suspended' || profile.status === 'inactive')) {
        url.pathname = '/auth/error'
        url.searchParams.set('message', 'Account suspended or inactive')
        return NextResponse.redirect(url)
      }
    } catch (error) {
      console.warn('User profile check failed in middleware, proceeding:', error)
      // Continue without profile check if table doesn't exist
    }

    // Log session activity for security monitoring (skip if function doesn't exist)
    try {
      await supabase.rpc('log_security_event', {
        user_id_param: user.id,
        event_type_param: 'page_access',
        event_description_param: `User accessed ${pathname}`,
        ip_address_param: request.ip || request.headers.get('x-forwarded-for'),
        user_agent_param: request.headers.get('user-agent'),
        risk_score_param: 0,
        metadata_param: { 
          path: pathname,
          method: request.method,
          timestamp: new Date().toISOString()
        }
      })
          } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        console.warn('Security logging unavailable (expected during initial setup):', errorMessage)
        // Don't block the request if security logging fails
      }
  }

  return response
}

// Rate limiting middleware
export async function checkRateLimit(
  request: NextRequest,
  identifier: string,
  action: string,
  maxAttempts: number = 5,
  windowMinutes: number = 15
): Promise<boolean> {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll() {
          // No-op for rate limiting check
        },
      },
    }
  )

  try {
    const { data } = await supabase.rpc('check_rate_limit', {
      identifier_param: identifier,
      action_param: action,
      max_attempts: maxAttempts,
      window_minutes: windowMinutes
    })

    return data === true
  } catch (error) {
    console.error('Rate limit check failed:', error)
    // Allow request if rate limit check fails
    return true
  }
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
