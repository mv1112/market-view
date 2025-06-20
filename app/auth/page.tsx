"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { SignUpForm } from "@/components/sign-up-form"
import { ForgotPasswordForm } from "@/components/forgot-password-form"

type AuthMode = "login" | "signup" | "forgot-password"

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login")

  const handleSwitchToLogin = () => setMode("login")
  const handleSwitchToSignUp = () => setMode("signup")
  const handleSwitchToForgotPassword = () => setMode("forgot-password")

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {mode === "login" && (
          <LoginForm
            onSwitchToSignUp={handleSwitchToSignUp}
            onSwitchToForgotPassword={handleSwitchToForgotPassword}
          />
        )}
        {mode === "signup" && (
          <SignUpForm onSwitchToLogin={handleSwitchToLogin} />
        )}
        {mode === "forgot-password" && (
          <ForgotPasswordForm onSwitchToLogin={handleSwitchToLogin} />
        )}
      </div>
    </div>
  )
} 