"use client"

import { useState, Suspense } from "react"
import Image from "next/image"
import { LoginForm } from "@/components/login-form"
import { SignUpForm } from "@/components/sign-up-form"
import { ForgotPasswordForm } from "@/components/forgot-password-form"
import { Marquee } from "@/components/magicui/marquee"
import { Card } from "@/components/ui/card"

type AuthMode = "login" | "signup" | "forgot-password"

const testimonials = [
  {
    name: "Sarah Chen",
    username: "@sarachen",
    body: "Advanced analytics transformed our trading strategy. 300% increase in portfolio performance.",
    img: "/user-1.png",
  },
  {
    name: "Marcus Thompson",
    username: "@marcus_trades",
    body: "Real-time market data and AI insights give us the competitive edge we needed.",
    img: "/user-2.jpg",
  },
  {
    name: "Elena Rodriguez",
    username: "@elena_forex",
    body: "Automated trading strategies work flawlessly. Best ROI platform we&apos;ve used.",
    img: "/user-3.jpg",
  },
  {
    name: "David Kim",
    username: "@davidkim_crypto",
    body: "Professional-grade tools with institutional-level security. Highly recommended.",
    img: "/user-4.jpg",
  },
  {
    name: "Jessica Wang",
    username: "@jessica_quant",
    body: "Lightning-fast execution and comprehensive market coverage. Game changer.",
    img: "/user-5.png",
  },
  {
    name: "Robert Johnson",
    username: "@rob_stocks",
    body: "Risk management features saved us millions during market volatility.",
    img: "/user-6.jpg",
  }
]

const ReviewCard = ({ img, name, username, body }: { img: string; name: string; username: string; body: string }) => {
  return (
    <Card className="relative w-56 overflow-hidden p-4 border border-gray-700 shadow-lg" style={{ backgroundColor: "oklch(14.7% 0.004 49.25)" }}>
      <div className="flex flex-row items-center gap-2">
        <Image 
          className="rounded-full w-6 h-6 object-cover" 
          alt={`${name} profile picture`} 
          src={img}
          width={24}
          height={24}
        />
        <div className="flex flex-col">
          <figcaption className="text-xs font-medium text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-400">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-xs text-white line-clamp-3">{body}</blockquote>
    </Card>
  )
}

function AuthPageContent() {
  const [mode, setMode] = useState<AuthMode>("login")

  const handleSwitchToLogin = () => setMode("login")
  const handleSwitchToSignUp = () => setMode("signup")
  const handleSwitchToForgotPassword = () => setMode("forgot-password")

  const firstRow = testimonials.slice(0, testimonials.length / 2)
  const secondRow = testimonials.slice(testimonials.length / 2)

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Marquee Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden">
        <div className="flex flex-col justify-center items-center w-full px-6 py-8 relative z-10 h-full">
          {/* Header */}
          <div className="text-center mb-4 max-w-lg">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Professional Trading Platform
            </h1>
            <p className="text-sm lg:text-base text-gray-300">
              Join thousands of traders who trust our enterprise-grade platform.
            </p>
          </div>

          {/* Testimonials Marquee */}
          <div className="relative w-full mb-4">
            <h2 className="text-center text-lg font-semibold text-white mb-3">
              Trusted by Industry Leaders
            </h2>
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s] mt-2">
              {secondRow.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </Marquee>
          </div>
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