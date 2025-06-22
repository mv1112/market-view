"use client"

import { cn } from "@/lib/utils"
import { authService } from "@/lib/auth"
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
import { useState } from "react"

interface ForgotPasswordFormProps extends React.ComponentPropsWithoutRef<"div"> {
  onSwitchToLogin?: () => void
}

export function ForgotPasswordForm({ className, onSwitchToLogin, ...props }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (!email.trim()) {
      setError("Email is required")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await authService.resetPassword(email)

      if (error) {
        setError(error instanceof Error ? error.message : "An error occurred while sending reset email")
      } else {
        setSuccess("Password reset email sent! Please check your inbox and follow the instructions to reset your password.")
        setEmail("") // Clear email field on success
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('Too many')) {
        setError("Too many password reset attempts. Please try again later.")
      } else {
        setError(error instanceof Error ? error.message : "An error occurred while sending reset email")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword}>
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
              {error && (
                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-200">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-sm text-green-500 bg-green-50 p-3 rounded-md border border-green-200">
                  {success}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending reset email..." : "Send reset email"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Remember your password?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="underline underline-offset-4 hover:text-primary"
                disabled={isLoading}
              >
                Back to login
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
