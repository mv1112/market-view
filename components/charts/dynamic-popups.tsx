"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

// Loading components
const PopupSkeleton = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
      <Skeleton className="h-6 w-32 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  </div>
)

// Dynamic imports with loading states
export const TimeFrameDropdown = dynamic(
  () => import('@/components/timeframe-dropdown'),
  {
    loading: () => (
      <div className="absolute top-full left-0 bg-white border rounded-md shadow-lg p-2 z-50">
        <Skeleton className="h-8 w-24 mb-1" />
        <Skeleton className="h-8 w-24 mb-1" />
        <Skeleton className="h-8 w-24" />
      </div>
    ),
    ssr: false
  }
)

export const CandlestickDropdown = dynamic(
  () => import('@/components/candlestick-dropdown'),
  {
    loading: () => (
      <div className="absolute top-full left-0 bg-white border rounded-md shadow-lg p-2 z-50">
        <Skeleton className="h-8 w-32 mb-1" />
        <Skeleton className="h-8 w-32 mb-1" />
        <Skeleton className="h-8 w-32" />
      </div>
    ),
    ssr: false
  }
)

export const IndicatorsPopup = dynamic(
  () => import('@/components/indicators-popup'),
  {
    loading: () => <PopupSkeleton />,
    ssr: false
  }
)

export const SettingsPopup = dynamic(
  () => import('@/components/settings-popup'),
  {
    loading: () => <PopupSkeleton />,
    ssr: false
  }
)

export const ToolsPopup = dynamic(
  () => import('@/components/tools-popup'),
  {
    loading: () => <PopupSkeleton />,
    ssr: false
  }
)

export const AlertsPopup = dynamic(
  () => import('@/components/alerts-popup'),
  {
    loading: () => <PopupSkeleton />,
    ssr: false
  }
)

export const ResearchPopup = dynamic(
  () => import('@/components/research-popup'),
  {
    loading: () => <PopupSkeleton />,
    ssr: false
  }
)

export const ChatsPopup = dynamic(
  () => import('@/components/chats-popup'),
  {
    loading: () => <PopupSkeleton />,
    ssr: false
  }
)

export const CalendarPopup = dynamic(
  () => import('@/components/calendar-popup'),
  {
    loading: () => <PopupSkeleton />,
    ssr: false
  }
)

export const NotificationPopup = dynamic(
  () => import('@/components/notification-popup'),
  {
    loading: () => <PopupSkeleton />,
    ssr: false
  }
)

export const HelpPopup = dynamic(
  () => import('@/components/help-popup'),
  {
    loading: () => <PopupSkeleton />,
    ssr: false
  }
)

export const TradingViewChart = dynamic(
  () => import('@/components/trading-view-chart'),
  {
    loading: () => (
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    ),
    ssr: false
  }
)

// Wrapper component for better error handling and performance tracking
interface DynamicPopupWrapperProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  name: string
}

export function DynamicPopupWrapper({ 
  children, 
  isOpen, 
  onClose, 
  name 
}: DynamicPopupWrapperProps) {
  if (!isOpen) return null

  return (
    <Suspense fallback={<PopupSkeleton />}>
      <div 
        className="popup-wrapper"
        data-popup-name={name}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose()
          }
        }}
      >
        {children}
      </div>
    </Suspense>
  )
}

// Default export component wrapper
interface DynamicPopupsProps {
  // You can add props here if needed for the wrapper component
}

const DynamicPopups: React.FC<DynamicPopupsProps> = () => {
  // This is a placeholder component - in practice, you'd render specific popups based on props
  return null
}

export default DynamicPopups 