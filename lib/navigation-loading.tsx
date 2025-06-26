'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ChartsPageSkeleton, LandingPageSkeleton } from '@/components/ui/skeleton'

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
    setIsNavigating(false)
  }, [pathname])

  const setNavigating = (loading: boolean) => {
    setIsNavigating(loading)
  }

  const getSkeletonForPath = (path: string): React.ReactNode => {
    if (path.startsWith('/charts')) {
      return <ChartsPageSkeleton />
    } else if (path === '/' || path.startsWith('/auth')) {
      return <LandingPageSkeleton />
    } else {
      // Default landing page skeleton for other pages
      return <LandingPageSkeleton />
    }
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