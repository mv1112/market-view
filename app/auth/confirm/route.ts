import { createClient } from "@/lib/server"
import { type EmailOtpType } from "@supabase/supabase-js"
import { redirect } from "next/navigation"
import { type NextRequest } from "next/server"
import { getRoleBasedRedirect, isAdminEmail } from "@/lib/auth-redirects"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null
  const code = searchParams.get("code")
  const redirectTo = searchParams.get("redirectTo")
  const _next = searchParams.get("next") || redirectTo
  const next = _next?.startsWith("/") ? _next : "/charts"

  const supabase = await createClient()

  // Handle OAuth callback (code exchange)
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data?.user) {
      try {
        // Simplified - just check email and redirect immediately
        const finalRedirect = isAdminEmail(data.user.email || '') ? '/admin' : '/charts'
        
        // Do role assignment in background (non-blocking)
        if (isAdminEmail(data.user.email || '')) {
          // Background role assignment - don't block redirect
          setTimeout(async () => {
            try {
              await supabase
                .from('user_profiles')
                .upsert({ 
                  id: data.user.id, 
                  email: data.user.email,
                  role: 'admin' 
                })
            } catch (err) {
              console.warn('Background role assignment failed:', err)
            }
          }, 0)
        }
        
        redirect(finalRedirect)
      } catch (callbackError) {
        console.error('OAuth callback error:', callbackError)
        redirect(`/auth/error?error=OAuth callback failed`)
      }
    } else {
      redirect(`/auth/error?error=${error?.message || 'OAuth authentication failed'}`)
    }
  }

  // Handle email OTP verification (existing functionality)
  if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    
    if (!error && data?.user) {
      // Simplified - immediate redirect based on email check
      const finalRedirect = isAdminEmail(data.user.email || '') ? '/admin' : '/charts'
      
      // Do role assignment in background (non-blocking)
      if (data.user && isAdminEmail(data.user.email || '')) {
        const userId = data.user.id
        const userEmail = data.user.email
        setTimeout(async () => {
          try {
            await supabase
              .from('user_profiles')
              .upsert({ 
                id: userId, 
                email: userEmail,
                role: 'admin' 
              })
          } catch (err) {
            console.warn('Background role assignment failed:', err)
          }
        }, 0)
      }
      
      redirect(finalRedirect)
    } else {
      redirect(`/auth/error?error=${error?.message}`)
    }
  }

  // redirect the user to an error page with some instructions
  redirect(`/auth/error?error=No authentication token provided`)
}
