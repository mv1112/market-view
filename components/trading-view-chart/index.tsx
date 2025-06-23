'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { 
  createChart, 
  ColorType, 
  IChartApi, 
  ISeriesApi, 
  CandlestickData, 
  LineData,
  CandlestickSeries,
  LineSeries
} from 'lightweight-charts'
import { calculateIndicator, CandleData } from '@/lib/indicators'

interface TradingViewChartProps {
  symbol: string
  timeFrame: string
  chartType: string
  indicators: string[]
  onRemoveIndicator?: (indicatorName: string) => void
  className?: string
}

interface AppliedIndicator {
  name: string
  series: ISeriesApi<'Line'>
  color: string
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

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol,
  timeFrame,
  chartType,
  indicators,
  onRemoveIndicator,
  className = ''
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [appliedIndicators, setAppliedIndicators] = useState<AppliedIndicator[]>([])
  const [chartData, setChartData] = useState<CandleData[]>([])

  // Sample data generator for demonstration
  const generateSampleData = (): CandleData[] => {
    const data: CandleData[] = []
    const basePrice = 24750
    let currentPrice = basePrice
    const startTime = Math.floor(Date.now() / 1000) - (100 * 60) // 100 minutes ago

    for (let i = 0; i < 100; i++) {
      const time = (startTime + i * 60) as any // 1-minute intervals
      const change = (Math.random() - 0.5) * 50
      currentPrice += change
      
      const open = currentPrice
      const volatility = Math.random() * 30 + 10
      const high = open + Math.random() * volatility
      const low = open - Math.random() * volatility
      const close = low + Math.random() * (high - low)
      
      data.push({
        time,
        open: Math.round(open * 100) / 100,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        close: Math.round(close * 100) / 100,
      })
      
      currentPrice = close
    }
    
    return data
  }

  // Convert CandleData to CandlestickData format for lightweight-charts
  const convertToLightweightChartsFormat = (data: CandleData[]): CandlestickData[] => {
    return data.map(candle => ({
      time: candle.time as any,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }))
  }

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Generate and store chart data
    const data = generateSampleData()
    setChartData(data)

    // Create the chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#333',
        attributionLogo: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      grid: {
        vertLines: {
          color: '#f0f0f0',
        },
        horzLines: {
          color: '#f0f0f0',
        },
      },
      crosshair: {
        mode: 1, // Normal crosshair
      },
      rightPriceScale: {
        borderColor: '#cccccc',
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        borderColor: '#cccccc',
        timeVisible: true,
        secondsVisible: false,
      },
    })

    chartRef.current = chart

    // Add candlestick series using the correct API
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    })

    candlestickSeriesRef.current = candlestickSeries

    // Set sample data (convert to lightweight-charts format)
    const lightweightChartsData = convertToLightweightChartsFormat(data)
    candlestickSeries.setData(lightweightChartsData)

    // Fit content to show all data
    chart.timeScale().fitContent()

    setIsLoading(false)

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (chart) {
        chart.remove()
      }
    }
  }, [])

  // Update chart when symbol or timeframe changes
  useEffect(() => {
    if (candlestickSeriesRef.current) {
      setIsLoading(true)
      // Simulate data loading
      setTimeout(() => {
        const newData = generateSampleData()
        setChartData(newData)
        const lightweightChartsData = convertToLightweightChartsFormat(newData)
        candlestickSeriesRef.current?.setData(lightweightChartsData)
        chartRef.current?.timeScale().fitContent()
        setIsLoading(false)
      }, 500)
    }
  }, [symbol, timeFrame])

  // Add indicator to chart
  const addIndicator = useCallback((indicatorName: string) => {
    if (!chartRef.current || !chartData.length) return

    try {
      // Check if indicator is already applied
      const isAlreadyApplied = appliedIndicators.some(ind => ind.name === indicatorName)
      if (isAlreadyApplied) {
        console.log(`Indicator ${indicatorName} is already applied`)
        return
      }

      // Calculate indicator values using the indicators library
      const indicatorData = calculateIndicator(indicatorName, chartData)
      
      // Create line series for indicator
      const lineSeries = chartRef.current.addSeries(LineSeries, {
        color: getIndicatorColor(appliedIndicators.length),
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: true,
        title: indicatorName,
      })

      // Convert indicator data to lightweight-charts format
      const lineData: LineData[] = indicatorData
        .filter(point => point.value !== null && point.value !== undefined)
        .map(point => ({
          time: point.time as any,
          value: point.value as number
        }))

      lineSeries.setData(lineData)

      // Add to indicators list
      const newIndicator: AppliedIndicator = {
        name: indicatorName,
        series: lineSeries,
        color: getIndicatorColor(appliedIndicators.length)
      }

      setAppliedIndicators(prev => [...prev, newIndicator])

      console.log(`Added indicator: ${indicatorName}`)
    } catch (error) {
      console.error(`Error adding indicator ${indicatorName}:`, error)
    }
  }, [chartData, appliedIndicators])

  // Remove indicator from chart
  const removeIndicator = useCallback((indicatorName: string) => {
    const indicatorIndex = appliedIndicators.findIndex(ind => ind.name === indicatorName)
    if (indicatorIndex === -1 || !chartRef.current) return

    const indicator = appliedIndicators[indicatorIndex]
    chartRef.current.removeSeries(indicator.series)
    
    setAppliedIndicators(prev => prev.filter(ind => ind.name !== indicatorName))
    
    // Notify parent component about the removal
    if (onRemoveIndicator) {
      onRemoveIndicator(indicatorName)
    }
    
    console.log(`Removed indicator: ${indicatorName}`)
  }, [appliedIndicators, onRemoveIndicator])

  // Effect to handle indicators prop changes
  useEffect(() => {
    if (!indicators.length || !chartData.length) return

    // Add any new indicators
    indicators.forEach(indicatorName => {
      const isAlreadyApplied = appliedIndicators.some(ind => ind.name === indicatorName)
      if (!isAlreadyApplied) {
        addIndicator(indicatorName)
      }
    })

    // Remove any indicators that are no longer in the list
    appliedIndicators.forEach(appliedIndicator => {
      if (!indicators.includes(appliedIndicator.name)) {
        removeIndicator(appliedIndicator.name)
      }
    })
  }, [indicators, chartData, appliedIndicators, addIndicator, removeIndicator])

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-lg font-semibold text-gray-700">Loading {symbol}</div>
            <div className="text-sm text-gray-500">{timeFrame} • {chartType}</div>
          </div>
        </div>
      )}
      
      <div
        ref={chartContainerRef}
        className="w-full h-full"
      />
      
      {/* Chart overlay info */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
        <div className="text-sm font-semibold text-gray-800">{symbol}</div>
        <div className="text-xs text-gray-600">{timeFrame} • {chartType}</div>
        {indicators.length > 0 && (
          <div className="text-xs text-blue-600 mt-1">
            {indicators.length} indicator{indicators.length > 1 ? 's' : ''} applied
          </div>
        )}
      </div>

      {/* TradingView-style Indicators Panel */}
      {appliedIndicators.length > 0 && (
        <div className="absolute top-4 left-4 z-20">
          <div className="flex flex-col gap-1">
            {appliedIndicators.map((indicator, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-800/90 backdrop-blur-sm rounded px-2 py-1 text-white text-xs font-medium border border-gray-600 shadow-sm"
                style={{ minHeight: '24px', minWidth: '180px' }}
              >
                {/* Indicator color dot */}
                <div
                  className="w-2 h-2 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: indicator.color }}
                />
                
                {/* Indicator name */}
                <span className="text-white text-xs font-medium mr-2 flex-1">
                  {indicator.name.length > 20 ? `${indicator.name.substring(0, 20)}...` : indicator.name}
                </span>
                
                {/* Settings button */}
                <button
                  onClick={() => {
                    // TODO: Implement settings functionality
                    console.log(`Settings for ${indicator.name}`)
                  }}
                  className="flex items-center justify-center w-4 h-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors mr-1"
                  title="Indicator Settings"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.955 1.45A.5.5 0 0 1 7.452 1h1.096a.5.5 0 0 1 .497.45l.17 1.699a.518.518 0 0 0 .307.392c.169.078.327.174.466.286a.518.518 0 0 0 .458.054l1.67-.405a.5.5 0 0 1 .555.206l.548.948a.5.5 0 0 1-.122.65l-1.339 1.077a.518.518 0 0 0-.185.45c.005.1.005.199 0 .299a.518.518 0 0 0 .185.45l1.339 1.077a.5.5 0 0 1 .122.65l-.548.948a.5.5 0 0 1-.555.206l-1.67-.405a.518.518 0 0 0-.458.054 5.967 5.967 0 0 1-.466.286.518.518 0 0 0-.307.392L8.545 14.55a.5.5 0 0 1-.497.45H7.452a.5.5 0 0 1-.497-.45l-.17-1.699a.518.518 0 0 0-.307-.392 5.973 5.973 0 0 1-.466-.286.518.518 0 0 0-.458-.054l-1.67.405a.5.5 0 0 1-.555-.206l-.548-.948a.5.5 0 0 1 .122-.65l1.339-1.077a.518.518 0 0 0 .185-.45 6.01 6.01 0 0 1 0-.299.518.518 0 0 0-.185-.45L2.902 6.916a.5.5 0 0 1-.122-.65l.548-.948a.5.5 0 0 1 .555-.206l1.67.405a.518.518 0 0 0 .458-.054c.139-.112.297-.208.466-.286a.518.518 0 0 0 .307-.392L6.955 1.45ZM8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                
                {/* Delete button */}
                <button
                  onClick={() => removeIndicator(indicator.name)}
                  className="flex items-center justify-center w-4 h-4 text-gray-300 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                  title="Remove Indicator"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35L12.95 5.5h.3a.75.75 0 0 0 0-1.5H11V3.25C11 2.56 10.44 2 9.75 2h-3.5C5.56 2 5 2.56 5 3.25ZM6.5 3.25a.25.25 0 0 1 .25-.25h2.5a.25.25 0 0 1 .25.25V4h-3v-.75Z"
                      clipRule="evenodd"
                    />
                    <path d="M6.5 7.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5ZM8.75 7.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5Z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TradingViewChart 