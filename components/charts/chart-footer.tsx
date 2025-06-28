"use client"

import { memo, useCallback } from 'react'
import { ComponentErrorBoundary } from '@/components/error-boundary'
import dynamic from 'next/dynamic'
import { performanceMonitor } from '@/lib/performance'

// Dynamic imports for footer pages
const BrokerPage = dynamic(() => import('@/components/footer-pages/broker-page'), {
  loading: () => <div className="p-4 animate-pulse bg-gray-100">Loading Broker...</div>
})

const AlgoScriptPage = dynamic(() => import('@/components/footer-pages/algo-script-page'), {
  loading: () => <div className="p-4 animate-pulse bg-gray-100">Loading Algo Script...</div>
})

const ScreenerPage = dynamic(() => import('@/components/footer-pages/screener-page'), {
  loading: () => <div className="p-4 animate-pulse bg-gray-100">Loading Screener...</div>
})

const StrategyTesterPage = dynamic(() => import('@/components/footer-pages/strategy-tester-page'), {
  loading: () => <div className="p-4 animate-pulse bg-gray-100">Loading Strategy Tester...</div>
})

type FooterPageType = 'broker' | 'algo-script' | 'screener' | 'strategy-tester' | 'strategy-builder'

interface ChartFooterProps {
  activeFooterPage: FooterPageType
  footerHeight: number
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent) => void
  onFooterPageChange: (page: FooterPageType) => void
}

const ChartFooter = memo(function ChartFooter({
  activeFooterPage,
  footerHeight,
  isDragging,
  onMouseDown,
  onFooterPageChange,
}: ChartFooterProps) {
  const renderActiveFooterPage = useCallback(() => {
    const endTracking = performanceMonitor.trackCustomMetric(`footer-page-${activeFooterPage}`, performance.now())
    
    const content = (() => {
      switch (activeFooterPage) {
        case 'broker':
          return <BrokerPage />
        case 'algo-script':
          return <AlgoScriptPage />
        case 'screener':
          return <ScreenerPage />
        case 'strategy-tester':
          return <StrategyTesterPage />
        case 'strategy-builder':
          return <div className="p-4 text-white bg-black">Strategy Builder Page - Coming Soon</div>
        default:
          return <BrokerPage />
      }
    })()

    // End performance tracking
    setTimeout(() => {
      const endTime = performance.now()
      performanceMonitor.trackCustomMetric(`footer-page-${activeFooterPage}`, endTime)
    }, 0)

    return content
  }, [activeFooterPage])

  const getButtonClass = useCallback((page: FooterPageType) => {
    const baseClass = "px-3 py-1 text-xs font-medium rounded transition-colors"
    return activeFooterPage === page
      ? `${baseClass} bg-blue-500 text-white`
      : `${baseClass} bg-gray-200 text-gray-700 hover:bg-gray-300`
  }, [activeFooterPage])

  return (
    <ComponentErrorBoundary>
      <footer 
        className="bg-white border-t border-gray-300 flex flex-col relative z-10"
        style={{ height: footerHeight }}
      >
        {/* Drag Handle */}
        <div
          className={`w-full h-1 cursor-ns-resize hover:bg-blue-300 transition-colors ${
            isDragging ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          onMouseDown={onMouseDown}
        />

        {/* Footer Tabs */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={() => onFooterPageChange('broker')}
              className={getButtonClass('broker')}
            >
              Broker
            </button>
            <button
              onClick={() => onFooterPageChange('algo-script')}
              className={getButtonClass('algo-script')}
            >
              Algo Script
            </button>
            <button
              onClick={() => onFooterPageChange('screener')}
              className={getButtonClass('screener')}
            >
              Screener
            </button>
            <button
              onClick={() => onFooterPageChange('strategy-tester')}
              className={getButtonClass('strategy-tester')}
            >
              Strategy Tester
            </button>
            <button
              onClick={() => onFooterPageChange('strategy-builder')}
              className={getButtonClass('strategy-builder')}
            >
              Strategy Builder
            </button>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onFooterPageChange(activeFooterPage)}
              className="text-xs text-gray-500 hover:text-gray-700"
              title="Refresh"
            >
              ↻
            </button>
            <span className="text-xs text-gray-500">
              Height: {footerHeight}px
            </span>
          </div>
        </div>

        {/* Footer Content */}
        <div className="flex-1 overflow-auto">
          <ComponentErrorBoundary>
            {renderActiveFooterPage()}
          </ComponentErrorBoundary>
        </div>
      </footer>
    </ComponentErrorBoundary>
  )
})

export default ChartFooter 