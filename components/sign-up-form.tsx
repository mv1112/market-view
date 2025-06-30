"use client"

import { cn } from "@/lib/utils"
import { authService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SocialLoginButton } from "@/components/ui/social-login-button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { validateEmail, validatePassword } from "@/lib/validations"

interface SignUpFormProps extends React.ComponentPropsWithoutRef<"div"> {
  onSwitchToLogin?: () => void
}

export function SignUpForm({ className, onSwitchToLogin, ...props }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }
    
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.success) {
      newErrors.email = emailValidation.errors.join(', ')
    }
    
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.success) {
      newErrors.password = passwordValidation.errors.join(', ')
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setError(newErrors.fullName || newErrors.email || newErrors.password || newErrors.confirmPassword)
    return Object.keys(newErrors).length === 0
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await authService.signup(
        formData.email, 
        formData.password, 
        formData.fullName
      )

      if (error) {
        setError(error instanceof Error ? error.message : "An error occurred during signup")
      } else if (data && data.user) {
        // Check if email confirmation is required
        if (!data.session) {
          setSuccess("Account created successfully! Please check your email to verify your account before signing in.")
          // Reset form
          setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: ""
          })
        } else {
          // User is automatically signed in
          router.push('/charts')
          router.refresh()
        }
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred during signup")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6 max-w-sm mx-auto w-full", className)} {...props}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Create your account
        </h1>
      </div>

      {/* Sign Up Form */}
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-sm text-gray-300 mb-2 block">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            disabled={isLoading}
            className="h-12 rounded-full"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-sm text-gray-300 mb-2 block">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
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
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            disabled={isLoading}
            className="h-12 rounded-full"
          />
          <p className="text-xs text-gray-400 mt-1">
            Password must be at least 8 characters with uppercase, lowercase, and number
          </p>
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-sm text-gray-300 mb-2 block">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
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
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      {/* Login Link */}
      <div className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-400 hover:text-blue-300 hover:underline"
        >
          Login
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
