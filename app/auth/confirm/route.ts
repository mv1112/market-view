import { createClient } from "@/lib/server"
import { type EmailOtpType } from "@supabase/supabase-js"
import { redirect } from "next/navigation"
import { type NextRequest } from "next/server"

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
        // The database trigger will automatically handle profile creation and OAuth connection
        // when the user is created/updated, so we just need to redirect
        
        // Redirect to intended page
        redirect(next)
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
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next)
    } else {
      // redirect the user to an error page with some instructions
      redirect(`/auth/error?error=${error?.message}`)
    }
  }

  // redirect the user to an error page with some instructions
  redirect(`/auth/error?error=No authentication token provided`)
}
