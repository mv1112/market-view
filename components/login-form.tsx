"use client"

import { cn } from "@/lib/utils"
import { authService, getDeviceFingerprint, getClientIP } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SocialLoginButton } from "@/components/ui/social-login-button"
import { isAdminEmail } from "@/lib/auth-redirects"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  onSwitchToSignUp?: () => void
  onSwitchToForgotPassword?: () => void
}

export function LoginForm({ className, onSwitchToSignUp, onSwitchToForgotPassword, ...props }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<any>(null)
  const [ipAddress, setIpAddress] = useState<string>("")
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/charts'

  useEffect(() => {
    // Get device fingerprint immediately (lightweight)
    const deviceFingerprint = getDeviceFingerprint()
    setDeviceInfo(deviceFingerprint)
    
    // Get IP in background (don't block UI)
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIpAddress(data.ip))
      .catch(error => {
        console.warn('Failed to get IP address:', error)
        setIpAddress('unknown') // Fallback
      })
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const ip = await getClientIP()
      const { data, error } = await authService.login(email, password, ip)

      if (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string') {
          setError((error as { message: string }).message);
        } else {
          setError('An unexpected error occurred.')
        }
      } else if (data?.user) {
        // Use role-based redirect for admin users
        const userEmail = data.user.email || ''
        const finalRedirect = isAdminEmail(userEmail) ? '/admin' : (redirectTo === '/charts' ? '/charts' : redirectTo)
        
        router.push(finalRedirect)
        router.refresh()
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 max-w-sm mx-auto w-full", className)} {...props}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Welcome back
        </h1>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm text-gray-300 mb-2 block">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="h-12 rounded-full"
          />
        </div>
        
        <div>
          <Label htmlFor="password" className="text-sm text-gray-300 mb-2 block">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="h-12 rounded-full"
          />
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <button
            type="button"
            onClick={onSwitchToForgotPassword}
            className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
            disabled={isLoading}
          >
            Forgot your password?
          </button>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-900/20 p-3 rounded-md border border-red-800">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full h-12 bg-white text-black hover:bg-gray-100 rounded-full font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Continue"}
        </Button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center text-sm text-gray-400">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-blue-400 hover:text-blue-300 hover:underline"
          disabled={isLoading}
        >
          Sign up
        </button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-600" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-gray-400">OR</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <SocialLoginButton provider="google" disabled={isLoading} />
        <SocialLoginButton provider="github" disabled={isLoading} />
      </div>
    </div>
  )
}
