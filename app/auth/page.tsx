"use client"

import { useState, Suspense } from "react"
import { LoginForm } from "@/components/login-form"
import { SignUpForm } from "@/components/sign-up-form"
import { ForgotPasswordForm } from "@/components/forgot-password-form"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

type AuthMode = "login" | "signup" | "forgot-password"

const testimonials = [
  {
    quote: "Advanced analytics transformed our trading strategy. 300% increase in portfolio performance.",
    name: "Sarah Chen",
    designation: "Portfolio Manager",
    src: "/user-1.png",
  },
  {
    quote: "Real-time market data and AI insights give us the competitive edge we needed.",
    name: "Marcus Thompson",
    designation: "Trading Director",
    src: "/user-2.jpg",
  },
  {
    quote: "Automated trading strategies work flawlessly. Best ROI platform we've used.",
    name: "Elena Rodriguez",
    designation: "Forex Trader",
    src: "/user-3.jpg",
  },
  {
    quote: "Professional-grade tools with institutional-level security. Highly recommended.",
    name: "David Kim",
    designation: "Crypto Analyst",
    src: "/user-4.jpg",
  },
  {
    quote: "Lightning-fast execution and comprehensive market coverage. Game changer.",
    name: "Jessica Wang",
    designation: "Quantitative Analyst",
    src: "/user-5.png",
  },
  {
    quote: "Risk management features saved us millions during market volatility.",
    name: "Robert Johnson",
    designation: "Investment Manager",
    src: "/user-6.jpg",
  }
]

function AuthPageContent() {
  const [mode, setMode] = useState<AuthMode>("login")

  const handleSwitchToLogin = () => setMode("login")
  const handleSwitchToSignUp = () => setMode("signup")
  const handleSwitchToForgotPassword = () => setMode("forgot-password")

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Animated Testimonials */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden">
        <div className="flex flex-col justify-center items-center w-full px-6 py-8 relative z-10 h-full">
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-gray-800/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gray-700/30 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Right Side - Authentication Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8 bg-black min-h-screen lg:min-h-full">
        <div className="w-full max-w-md">
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
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  )
} 