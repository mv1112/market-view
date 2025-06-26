"use client"

import { authService } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LogOut } from "lucide-react"

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

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      
      const { error } = await authService.logout()
      
      if (error) {
        console.error('Logout error:', error instanceof Error ? error.message : 'Unknown error')
        // Even if there's an error, redirect to home page to be safe
      }
      
      // Redirect to landing page instead of auth page
      router.push('/')
      router.refresh() // Refresh to clear auth state
      
    } catch (error) {
      console.error('Logout failed:', error)
      // Redirect anyway for security
      router.push('/')
      router.refresh()
    } finally {
      setIsLoading(false)
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
