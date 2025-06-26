'use client'

import { useNavigationLoading } from '@/lib/navigation-loading'
import { usePathname } from 'next/navigation'

interface NavigationWrapperProps {
  children: React.ReactNode
}

export function NavigationWrapper({ children }: NavigationWrapperProps) {
  const { isNavigating, getSkeletonForPath } = useNavigationLoading()
  const pathname = usePathname()

  if (isNavigating) {
    return <>{getSkeletonForPath(pathname)}</>
  }

  return <>{children}</>
} 