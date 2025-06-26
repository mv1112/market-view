'use client'

import { useNavigationLoading } from '@/lib/navigation-loading'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface NavigationWrapperProps {
  children: React.ReactNode
}

export function NavigationWrapper({ children }: NavigationWrapperProps) {
  const { isNavigating, getSkeletonForPath } = useNavigationLoading()
  const pathname = usePathname()
  const [showNavigationSkeleton, setShowNavigationSkeleton] = useState(false)

  useEffect(() => {
    // Only show navigation skeleton if explicitly navigating AND not on charts page
    if (isNavigating && !pathname.startsWith('/charts')) {
      setShowNavigationSkeleton(true)
    } else {
      // Small delay to prevent flash
      const timer = setTimeout(() => {
        setShowNavigationSkeleton(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isNavigating, pathname])

  // Only show skeleton during explicit navigation to non-charts pages
  if (showNavigationSkeleton && isNavigating && !pathname.startsWith('/charts')) {
    return <>{getSkeletonForPath(pathname)}</>
  }

  return <>{children}</>
} 