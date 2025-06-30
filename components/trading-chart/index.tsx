"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { createChart, ColorType, CandlestickSeries, LineSeries } from 'lightweight-charts'
import { calculateIndicator, CandleData, IndicatorResult } from '@/lib/indicators'

interface TradingChartProps {
  className?: string
  appliedIndicators?: string[]
  onIndicatorAdded?: (indicatorName: string) => void
}

interface AppliedIndicator {
  name: string
  series: any
  color: string
}

// Generate sample 1-minute candlestick data for one day (1440 minutes)
const generateSampleData = (): CandleData[] => {
  const data: CandleData[] = []
  const startTime = Math.floor(Date.now() / 1000) - (24 * 60 * 60) // 24 hours ago
  
  let basePrice = 100
  let currentPrice = basePrice
  
  for (let i = 0; i < 1440; i++) { // 1440 minutes in a day
    const time = startTime + (i * 60) // Add i minutes
    
    // Simulate price movement
    const volatility = 0.5
    const trend = Math.sin(i / 100) * 0.1 // Slight trend component
    const randomMove = (Math.random() - 0.5) * volatility + trend
    
    const close = Math.sin(i * 0.1) * 10 + 100 + (Math.random() - 0.5) * 2
    const high = close + Math.random() * 5
    const low = close - Math.random() * 5
    const open = close + (Math.random() - 0.5) * 3
    
    const safeOpen = parseFloat(open.toFixed(2))
    const safeHigh = parseFloat(high.toFixed(2))
    const safeLow = parseFloat(low.toFixed(2))
    const safeClose = parseFloat(close.toFixed(2))
    
    data.push({
      time: time as any,
      open: isNaN(safeOpen) ? 100 : safeOpen,
      high: isNaN(safeHigh) ? 100 : safeHigh,
      low: isNaN(safeLow) ? 100 : safeLow,
      close: isNaN(safeClose) ? 100 : safeClose
    })
    
    currentPrice = close
  }
  
  return data
}

// Generate colors for indicators
const getIndicatorColor = (index: number): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D5A6BD'
  ]
  return colors[index % colors.length]
}

export default function TradingChart({ className = "", appliedIndicators = [], onIndicatorAdded }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<any>(null)
  const candlestickSeriesRef = useRef<any>(null)
  const [sampleData, setSampleData] = useState<CandleData[]>([])
  const [indicators, setIndicators] = useState<AppliedIndicator[]>([])

  // Initialize chart and sample data
  useEffect(() => {
    const data = generateSampleData()
    setSampleData(data)
  }, [])

  // Create chart
  useEffect(() => {
    if (!chartContainerRef.current || !sampleData.length) return

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#000000' },
        textColor: '#ffffff',
      },
      grid: {
        vertLines: { color: '#333333' },
        horzLines: { color: '#333333' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#ffffff',
      },
      timeScale: {
        borderColor: '#ffffff',
        timeVisible: true,
        secondsVisible: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    })

    chartRef.current = chart

    // Create candlestick series
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#00ff00',
      downColor: '#ff0000',
      borderDownColor: '#ff0000',
      borderUpColor: '#00ff00',
      wickDownColor: '#ff0000',
      wickUpColor: '#00ff00',
    })

    candlestickSeriesRef.current = candlestickSeries

    // Add sample data
    candlestickSeries.setData(sampleData)

    // Fit content to chart
    chart.timeScale().fitContent()

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
    }

    // Cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
      chart.remove()
      chartRef.current = null
      candlestickSeriesRef.current = null
    }
  }, [sampleData])

  // Add indicator to chart
  const addIndicator = useCallback((indicatorName: string) => {
    if (!chartRef.current || !sampleData.length) return

    try {
      // Calculate indicator values
      const indicatorData = calculateIndicator(indicatorName, sampleData)
      
      // Create line series for indicator
      const lineSeries = chartRef.current.addSeries(LineSeries, {
        color: getIndicatorColor(indicators.length),
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: true,
        title: indicatorName,
      })

      // Convert indicator data to lightweight-charts format
      const lineData = indicatorData
        .filter(point => point.value !== null)
        .map(point => ({
          time: point.time as any,
          value: point.value
        }))

      lineSeries.setData(lineData)

      // Add to indicators list
      const newIndicator: AppliedIndicator = {
        name: indicatorName,
        series: lineSeries,
        color: getIndicatorColor(indicators.length)
      }

      setIndicators(prev => [...prev, newIndicator])

      // Notify parent component
      if (onIndicatorAdded) {
        onIndicatorAdded(indicatorName)
      }

      console.log(`Added indicator: ${indicatorName}`)
    } catch (error) {
      console.error(`Error adding indicator ${indicatorName}:`, error)
    }
  }, [sampleData, indicators.length, onIndicatorAdded])

  // Remove indicator from chart
  const removeIndicator = (indicatorName: string) => {
    const indicatorIndex = indicators.findIndex(ind => ind.name === indicatorName)
    if (indicatorIndex === -1 || !chartRef.current) return

    const indicator = indicators[indicatorIndex]
    chartRef.current.removeSeries(indicator.series)
    
    setIndicators(prev => prev.filter(ind => ind.name !== indicatorName))
    console.log(`Removed indicator: ${indicatorName}`)
  }

  // Effect to handle applied indicators prop changes
  useEffect(() => {
    if (!appliedIndicators.length) return

    const latestIndicator = appliedIndicators[appliedIndicators.length - 1]
    const isAlreadyApplied = indicators.some(ind => ind.name === latestIndicator)
    
    if (!isAlreadyApplied) {
      addIndicator(latestIndicator)
    }
  }, [appliedIndicators, indicators, sampleData, addIndicator])

  return (
    <div className={`w-full h-full ${className}`}>
      <div className="w-full h-full bg-black border border-gray-600 rounded-lg relative">
        {/* Chart Container */}
        <div 
          ref={chartContainerRef} 
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        />
        
        {/* Indicators Legend */}
        {indicators.length > 0 && (
          <div className="absolute top-2 left-2 bg-black/70 rounded p-2 max-w-xs">
            <div className="text-white text-xs font-semibold mb-1">Active Indicators:</div>
            <div className="space-y-1">
              {indicators.map((indicator, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-0.5 mr-2"
                      style={{ backgroundColor: indicator.color }}
                    />
                    <span className="text-white truncate" title={indicator.name}>
                      {indicator.name.length > 20 ? `${indicator.name.substring(0, 20)}...` : indicator.name}
                    </span>
                  </div>
                  <button
                    onClick={() => removeIndicator(indicator.name)}
                    className="text-red-400 hover:text-red-300 ml-2 font-bold"
                    title="Remove indicator"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 