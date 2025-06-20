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
import { useRouter } from "next/navigation"
import { useState } from "react"

interface UpdatePasswordFormProps extends React.ComponentPropsWithoutRef<"div"> {
}

export function UpdatePasswordForm({ className, ...props }: UpdatePasswordFormProps) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validatePassword = () => {
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, and one number")
      return false
    }
    return true
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (!validatePassword()) {
      setIsLoading(false)
      return
    }

    try {
      const { error } = await authService.updatePassword(formData.password)

      if (error) {
        setError(error instanceof Error ? error.message : "An error occurred while updating password")
      } else {
        setSuccess("Password updated successfully! You will be redirected to the dashboard.")
        // Clear form
        setFormData({ password: "", confirmPassword: "" })
        // Redirect after a short delay
        setTimeout(() => {
          router.push('/charts')
          router.refresh()
        }, 2000)
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred while updating password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Update Password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters with uppercase, lowercase, and number
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
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
                {isLoading ? "Updating password..." : "Update password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
