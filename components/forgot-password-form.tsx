"use client"

import { cn } from "@/lib/utils"
import { authService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
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

    try {
      const { error } = await authService.resetPassword(email)

      if (error) {
        setError(error instanceof Error ? error.message : "An error occurred while sending reset email")
      } else {
        setSuccess("Password reset email sent! Please check your inbox and follow the instructions to reset your password.")
        setEmail("")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred while sending reset email")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 max-w-sm mx-auto w-full", className)} {...props}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Reset your password
        </h1>
        <p className="text-sm text-gray-400">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {/* Reset Password Form */}
      <form onSubmit={handleResetPassword} className="space-y-4">
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

        {error && (
          <div className="text-sm text-red-400 bg-red-900/20 p-3 rounded-md border border-red-800">
            {error}
          </div>
        )}
        
        {success && (
          <div className="text-sm text-green-400 bg-green-900/20 p-3 rounded-md border border-green-800">
            {success}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full h-12 bg-white text-black hover:bg-gray-100 rounded-full font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send reset email"}
        </Button>
      </form>

      {/* Back to Login Link */}
      <div className="text-center text-sm text-gray-400">
        Remember your password?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-400 hover:text-blue-300 hover:underline"
          disabled={isLoading}
        >
          Back to login
        </button>
      </div>
    </div>
  )
}
