"use client"

import { cn } from "@/lib/utils"
import { authService, getDeviceFingerprint } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    // Get device fingerprint and IP address on component mount
    const getClientInfo = async () => {
      try {
        const deviceFingerprint = getDeviceFingerprint()
        setDeviceInfo(deviceFingerprint)
        
        // Get client IP
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        setIpAddress(data.ip)
      } catch (error) {
        console.warn('Failed to get client info:', error)
      }
    }

    getClientInfo()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await authService.login(email, password, deviceInfo, ipAddress)

      if (error) {
        setError(error instanceof Error ? error.message : "An error occurred during login")
      } else if (data && data.user) {
        // Successful login - redirect to intended page
        router.push(redirectTo)
        router.refresh() // Refresh to update auth state
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    onClick={onSwitchToForgotPassword}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    disabled={isLoading}
                  >
                    Forgot your password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {error && (
                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-200">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="underline underline-offset-4 hover:text-primary"
                disabled={isLoading}
              >
                Sign up
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
