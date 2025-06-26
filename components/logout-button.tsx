"use client"

import { authService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LogOut } from "lucide-react"
import { useNavigationLoading } from "@/lib/navigation-loading"

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  children?: React.ReactNode
}

export function LogoutButton({ 
  variant = "ghost", 
  size = "default", 
  className,
  children 
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setNavigating } = useNavigationLoading()

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      setNavigating(true) // Show landing page skeleton immediately
      
      // Add slight delay to ensure skeleton shows
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const { error } = await authService.logout()
      
      if (error) {
        console.error('Logout error:', error instanceof Error ? error.message : 'Unknown error')
        // Even if there's an error, redirect to home page to be safe
      }
      
      // Redirect to landing page with replace to prevent back navigation
      router.replace('/')
      
    } catch (error) {
      console.error('Logout failed:', error)
      // Redirect anyway for security
      router.replace('/')
    } finally {
      setIsLoading(false)
      // setNavigating will be set to false by the navigation loading provider
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
      disabled={isLoading}
    >
      {children || (
        <>
          <LogOut className="h-4 w-4 mr-2" />
          {isLoading ? "Signing out..." : "Sign out"}
        </>
      )}
    </Button>
  )
}
