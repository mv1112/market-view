'use client'

interface NavigationWrapperProps {
  children: React.ReactNode
}

export function NavigationWrapper({ children }: NavigationWrapperProps) {
  // Render children directly without any skeleton loading
  return <>{children}</>
}