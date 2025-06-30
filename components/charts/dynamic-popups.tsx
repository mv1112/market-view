"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamic imports with loading states
export const TimeFrameDropdown = dynamic(
  () => import('@/components/timeframe-dropdown'),
  {
    loading: () => (
      <div className="absolute top-full left-0 bg-white border rounded-md shadow-lg p-2 z-50 min-w-[150px]">
        <div className="h-8 mb-1 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-8 mb-1 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
      </div>
    ),
    ssr: false
  }
)

export const CandlestickDropdown = dynamic(
  () => import('@/components/candlestick-dropdown'),
  {
    loading: () => (
      <div className="absolute top-full left-0 bg-white border rounded-md shadow-lg p-2 z-50 min-w-[150px]">
        <div className="h-8 mb-1 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-8 mb-1 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-8 bg-gray-100 rounded animate-pulse"></div>
      </div>
    ),
    ssr: false
  }
)

export const IndicatorsPopup = dynamic(
  () => import('@/components/indicators-popup'),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw] animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
)

export const SettingsPopup = dynamic(
  () => import('@/components/settings-popup'),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw] animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
)

export const ToolsPopup = dynamic(
  () => import('@/components/tools-popup'),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw] animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
)

export const AlertsPopup = dynamic(
  () => import('@/components/alerts-popup'),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw] animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
)

export const ResearchPopup = dynamic(
  () => import('@/components/research-popup'),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw] animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
)

export const ChatsPopup = dynamic(
  () => import('@/components/chats-popup'),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw] animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
)

export const CalendarPopup = dynamic(
  () => import('@/components/calendar-popup'),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw] animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
)

export const NotificationPopup = dynamic(
  () => import('@/components/notification-popup'),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw] animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
)

export const HelpPopup = dynamic(
  () => import('@/components/help-popup'),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw] animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
)

export const TradingViewChart = dynamic(
  () => import('@/components/trading-view-chart'),
  {
    loading: () => (
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="h-64 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
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
    <Suspense fallback={
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw] animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    }>
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