'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface NavigationLoadingContextType {
  isNavigating: boolean
  setNavigating: (loading: boolean) => void
  getSkeletonForPath: (path: string) => React.ReactNode
}

const NavigationLoadingContext = createContext<NavigationLoadingContextType | null>(null)

export function useNavigationLoading() {
  const context = useContext(NavigationLoadingContext)
  if (!context) {
    throw new Error('useNavigationLoading must be used within NavigationLoadingProvider')
  }
  return context
}

interface NavigationLoadingProviderProps {
  children: React.ReactNode
}

export function NavigationLoadingProvider({ children }: NavigationLoadingProviderProps) {
  const [isNavigating, setIsNavigating] = useState(false)
  const pathname = usePathname()

  // Reset navigation loading when pathname changes
  useEffect(() => {
    if (isNavigating) {
      // Immediate reset to prevent interference with page loading
      setIsNavigating(false)
    }
  }, [pathname, isNavigating])

  const setNavigating = (loading: boolean) => {
    setIsNavigating(loading)
  }

  const getSkeletonForPath = (path: string): React.ReactNode => {
    return null
  }

  const contextValue: NavigationLoadingContextType = {
    isNavigating,
    setNavigating,
    getSkeletonForPath
  }

  return (
    <NavigationLoadingContext.Provider value={contextValue}>
      {children}
    </NavigationLoadingContext.Provider>
  )
} 