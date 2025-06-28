"use client"

import { useState, useRef, useCallback, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import { performanceMonitor, usePerformanceTracking } from "@/lib/performance"
import { ComponentErrorBoundary, PageErrorBoundary } from "@/components/error-boundary"
import { authService } from "@/lib/auth"

// Dynamic imports for code splitting
const TradingViewChart = dynamic(() => import("@/components/trading-view-chart"), {
  loading: () => <div className="flex items-center justify-center h-full bg-gray-900 text-white">Loading Chart...</div>,
  ssr: false
})

const ChartToolbar = dynamic(() => import("@/components/charts/chart-toolbar"), {
  loading: () => <div className="h-12 bg-gray-800 animate-pulse" />
})

const ChartFooter = dynamic(() => import("@/components/charts/chart-footer"), {
  loading: () => <div className="h-10 bg-gray-800 animate-pulse" />
})

// DynamicPopups removed - individual popup components are imported as needed

// Types
type FooterPageType = 'broker' | 'algo-script' | 'screener' | 'strategy-tester' | 'strategy-builder'

interface ChartState {
  symbol: string
  timeFrame: string
  candlestickType: string
  appliedIndicators: string[]
  isFullscreen: boolean
}

export default function OptimizedChartsPage() {
  // Performance tracking for this component
  const { trackRender, trackInteraction } = usePerformanceTracking('charts-page')
  
  // Track page load performance
  useEffect(() => {
    const trackPageLoad = performanceMonitor.trackPageLoad('charts')
    return trackPageLoad
  }, [])

  // State management
  const [userEmail, setUserEmail] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [chartState, setChartState] = useState<ChartState>({
    symbol: "NIFTY",
    timeFrame: "1m", 
    candlestickType: "candles",
    appliedIndicators: [],
    isFullscreen: false
  })

  // Popup states
  const [activePopups, setActivePopups] = useState({
    symbolSearch: false,
    timeFrameDropdown: false,
    candlestickDropdown: false,
    indicators: false,
    settings: false,
    tools: false,
    alerts: false,
    research: false,
    chats: false,
    calendar: false,
    notification: false,
    help: false
  })

  // Footer state
  const [activeFooterPage, setActiveFooterPage] = useState<FooterPageType>('broker')
  const [footerHeight, setFooterHeight] = useState(40)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startHeight, setStartHeight] = useState(40)
  
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize page
  useEffect(() => {
    const initializePage = async () => {
      const startTime = performance.now()
      
      try {
        const { user } = await authService.getCurrentUser()
        if (user?.email) {
          setUserEmail(user.email)
        }
      } catch (error) {
        console.error('Error initializing charts page:', error)
        throw error
      } finally {
        setIsLoading(false)
        
        const loadTime = performance.now() - startTime
        performanceMonitor.trackCustomMetric('charts-initialization', loadTime)
      }
    }
    
    initializePage()
    trackRender()
  }, [trackRender])

  // Chart state handlers with performance tracking
  const handleSymbolSelect = useCallback((symbol: string) => {
    const trackSymbolChange = trackInteraction('symbol-change', 'symbol-search')
    setChartState(prev => ({ ...prev, symbol }))
    setActivePopups(prev => ({ ...prev, symbolSearch: false }))
    trackSymbolChange()
  }, [trackInteraction])

  const handleTimeFrameSelect = useCallback((timeFrame: string) => {
    const trackTimeFrameChange = trackInteraction('timeframe-change', 'timeframe-dropdown')
    setChartState(prev => ({ ...prev, timeFrame }))
    setActivePopups(prev => ({ ...prev, timeFrameDropdown: false }))
    trackTimeFrameChange()
  }, [trackInteraction])

  const handleCandlestickSelect = useCallback((candlestickType: string) => {
    const trackCandlestickChange = trackInteraction('candlestick-change', 'candlestick-dropdown')
    setChartState(prev => ({ ...prev, candlestickType }))
    setActivePopups(prev => ({ ...prev, candlestickDropdown: false }))
    trackCandlestickChange()
  }, [trackInteraction])

  const handleApplyIndicator = useCallback((indicatorName: string) => {
    const trackIndicatorAdd = trackInteraction('indicator-add', 'indicators-popup')
    setChartState(prev => ({
      ...prev,
      appliedIndicators: [...prev.appliedIndicators, indicatorName]
    }))
    trackIndicatorAdd()
  }, [trackInteraction])

  const handleRemoveIndicator = useCallback((indicatorName: string) => {
    const trackIndicatorRemove = trackInteraction('indicator-remove', 'chart-indicators')
    setChartState(prev => ({
      ...prev,
      appliedIndicators: prev.appliedIndicators.filter(ind => ind !== indicatorName)
    }))
    trackIndicatorRemove()
  }, [trackInteraction])

  // Popup management
  const togglePopup = useCallback((popupName: keyof typeof activePopups) => {
    const trackPopupToggle = trackInteraction('popup-toggle', popupName)
    setActivePopups(prev => ({
      ...prev,
      [popupName]: !prev[popupName]
    }))
    trackPopupToggle()
  }, [trackInteraction])

  // Footer drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const trackFooterDrag = trackInteraction('footer-drag-start', 'footer-resize')
    setIsDragging(true)
    setStartY(e.clientY)
    setStartHeight(footerHeight)
    e.preventDefault()
    trackFooterDrag()
  }, [footerHeight, trackInteraction])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const maxHeight = containerRect.height - 1
    const deltaY = startY - e.clientY
    const newHeight = Math.min(Math.max(40, startHeight + deltaY), maxHeight)
    
    setFooterHeight(newHeight)
  }, [isDragging, startY, startHeight])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleFooterPageChange = useCallback((page: FooterPageType) => {
    const trackFooterPageChange = trackInteraction('footer-page-change', page)
    
    if (footerHeight <= 40) {
      // Open to 50% if footer is minimized
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const availableHeight = containerRect.height - 40 - 1
        const targetHeight = Math.floor(availableHeight * 0.5) + 40
        setFooterHeight(Math.max(targetHeight, 40))
      }
    }
    
    setActiveFooterPage(page)
    trackFooterPageChange()
  }, [footerHeight, trackInteraction])

  // Fullscreen handling
  const toggleFullscreen = useCallback(() => {
    const trackFullscreen = trackInteraction('fullscreen-toggle', 'toolbar')
    
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setChartState(prev => ({ ...prev, isFullscreen: true }))
    } else {
      document.exitFullscreen()
      setChartState(prev => ({ ...prev, isFullscreen: false }))
    }
    
    trackFullscreen()
  }, [trackInteraction])

  // Screenshot capture
  const captureScreenshot = useCallback(async () => {
    const trackScreenshot = trackInteraction('screenshot-capture', 'toolbar')
    
    try {
      if (containerRef.current) {
        const canvas = await import('html2canvas').then(html2canvas => 
          html2canvas.default(containerRef.current!)
        )
        const link = document.createElement('a')
        link.download = `chart-${chartState.symbol}-${new Date().toISOString()}.png`
        link.href = canvas.toDataURL()
        link.click()
      }
    } catch (error) {
      console.error('Screenshot capture failed:', error)
    }
    
    trackScreenshot()
  }, [chartState.symbol, trackInteraction])

  // Mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'ns-resize'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-lg">Loading Charts...</div>
      </div>
    )
  }

  return (
    <PageErrorBoundary>
      <div 
        ref={containerRef}
        className="h-screen overflow-hidden bg-gray-900 flex flex-col"
      >
        {/* Toolbar */}
        <ComponentErrorBoundary>
          <Suspense fallback={<div className="h-12 bg-gray-800 animate-pulse" />}>
            <ChartToolbar
              userEmail={userEmail}
              chartState={chartState}
              activePopups={activePopups}
              onSymbolSearch={() => togglePopup('symbolSearch')}
              onTimeFrameToggle={() => togglePopup('timeFrameDropdown')}
              onCandlestickToggle={() => togglePopup('candlestickDropdown')}
              onIndicatorsToggle={() => togglePopup('indicators')}
              onSettingsToggle={() => togglePopup('settings')}
              onToolsToggle={() => togglePopup('tools')}
              onAlertsToggle={() => togglePopup('alerts')}
              onResearchToggle={() => togglePopup('research')}
              onChatsToggle={() => togglePopup('chats')}
              onCalendarToggle={() => togglePopup('calendar')}
              onNotificationToggle={() => togglePopup('notification')}
              onHelpToggle={() => togglePopup('help')}
              onFullscreenToggle={toggleFullscreen}
              onScreenshotCapture={captureScreenshot}
            />
          </Suspense>
        </ComponentErrorBoundary>

        {/* Main Chart Area */}
        <div className="flex-1 relative overflow-hidden">
          <ComponentErrorBoundary>
            <Suspense fallback={
              <div className="flex items-center justify-center h-full bg-gray-900 text-white">
                <div className="text-lg">Loading Trading Chart...</div>
              </div>
            }>
              <TradingViewChart
                symbol={chartState.symbol}
                timeFrame={chartState.timeFrame}
                chartType={chartState.candlestickType}
                indicators={chartState.appliedIndicators}
                onRemoveIndicator={handleRemoveIndicator}
              />
            </Suspense>
          </ComponentErrorBoundary>
        </div>

        {/* Dynamic Popups - Removed, individual popups loaded as needed */}

        {/* Footer */}
        <ComponentErrorBoundary>
          <Suspense fallback={<div className="h-10 bg-gray-800 animate-pulse" />}>
            <ChartFooter
              footerHeight={footerHeight}
              activeFooterPage={activeFooterPage}
              onFooterPageChange={handleFooterPageChange}
              onMouseDown={handleMouseDown}
              isDragging={isDragging}
            />
          </Suspense>
        </ComponentErrorBoundary>
      </div>
    </PageErrorBoundary>
  )
} 