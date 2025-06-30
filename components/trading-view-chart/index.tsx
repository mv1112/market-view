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
  LineSeries,
  AreaSeries,
  BarSeries,
  BaselineSeries,
  HistogramSeries
} from 'lightweight-charts'
import { calculateIndicator, CandleData } from '@/lib/indicators'
import { Settings } from 'lucide-react'
import { safeConsole } from '@/lib/utils'

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

type ChartSeriesType = ISeriesApi<'Candlestick'> | ISeriesApi<'Line'> | ISeriesApi<'Area'> | ISeriesApi<'Bar'> | ISeriesApi<'Baseline'> | ISeriesApi<'Histogram'>

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
  const mainSeriesRef = useRef<ChartSeriesType | null>(null)
  const [appliedIndicators, setAppliedIndicators] = useState<AppliedIndicator[]>([])
  const [chartData, setChartData] = useState<CandleData[]>([])

  // Removed theme switching logic - website only supports light theme

  // Sample data generator for demonstration
  const generateSampleData = useCallback((): CandleData[] => {
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
  }, [])

  // Convert CandleData to CandlestickData format for lightweight-charts
  const convertToLightweightChartsFormat = useCallback((data: CandleData[]): CandlestickData[] => {
    return data.map(candle => ({
      time: candle.time as any,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }))
  }, [])

  // Create appropriate series based on chart type
  const createSeriesForChartType = useCallback((chart: IChartApi, type: string): ChartSeriesType => {
    switch (type) {
      case 'candles':
      case 'hollow-candles':
      case 'heikin-ashi':
        return chart.addSeries(CandlestickSeries, {
          upColor: type === 'hollow-candles' ? 'transparent' : '#26a69a',
          downColor: type === 'hollow-candles' ? 'transparent' : '#ef5350',
          borderVisible: type === 'hollow-candles',
          borderUpColor: '#26a69a',
          borderDownColor: '#ef5350',
          wickUpColor: '#26a69a',
          wickDownColor: '#ef5350',
        })
      case 'bars':
        return chart.addSeries(BarSeries, {
          upColor: '#26a69a',
          downColor: '#ef5350',
        })
      case 'line':
        return chart.addSeries(LineSeries, {
          color: '#2962FF',
          lineWidth: 2,
        })
      case 'area':
        return chart.addSeries(AreaSeries, {
          topColor: 'rgba(41, 98, 255, 0.4)',
          bottomColor: 'rgba(41, 98, 255, 0.0)',
          lineColor: '#2962FF',
          lineWidth: 2,
        })
      case 'baseline':
        return chart.addSeries(BaselineSeries, {
          baseValue: { type: 'price', price: 25000 },
          topLineColor: '#26a69a',
          topFillColor1: 'rgba(38, 166, 154, 0.28)',
          topFillColor2: 'rgba(38, 166, 154, 0.05)',
          bottomLineColor: '#ef5350',
          bottomFillColor1: 'rgba(239, 83, 80, 0.28)',
          bottomFillColor2: 'rgba(239, 83, 80, 0.05)',
        })
      case 'hi-lo':
        return chart.addSeries(LineSeries, {
          color: '#9C27B0',
          lineWidth: 1,
        })
      default:
        return chart.addSeries(CandlestickSeries, {
          upColor: '#26a69a',
          downColor: '#ef5350',
          borderVisible: false,
          wickUpColor: '#26a69a',
          wickDownColor: '#ef5350',
        })
    }
  }, [])

  // Convert data based on chart type
  const convertDataForSeries = useCallback((data: CandleData[], type: string) => {
    switch (type) {
      case 'line':
      case 'hi-lo':
        return data.map(candle => ({
          time: candle.time as any,
          value: candle.close
        }))
      case 'area':
      case 'baseline':
        return data.map(candle => ({
          time: candle.time as any,
          value: candle.close
        }))
      case 'bars':
      case 'candles':
      case 'hollow-candles':
      case 'heikin-ashi':
      default:
        return convertToLightweightChartsFormat(data)
    }
  }, [convertToLightweightChartsFormat])

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Generate and store chart data
    const data = generateSampleData()
    setChartData(data)

    // Create the chart with dark theme colors
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#000000' },
        textColor: '#ffffff',
        attributionLogo: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      grid: {
        vertLines: {
          color: '#2a2a2a',
        },
        horzLines: {
          color: '#2a2a2a',
        },
      },
      crosshair: {
        mode: 1, // Normal crosshair
      },
      rightPriceScale: {
        borderColor: '#484848',
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        borderColor: '#484848',
        timeVisible: true,
        secondsVisible: false,
      },
    })

    chartRef.current = chart

    // Add main series based on chart type
    const mainSeries = createSeriesForChartType(chart, chartType)
    mainSeriesRef.current = mainSeries

    // Set sample data (convert to appropriate format for series type)
    const seriesData = convertDataForSeries(data, chartType)
    mainSeries.setData(seriesData)

    // Fit content to show all data
    chart.timeScale().fitContent()

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight
        })
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
      if (chartRef.current) {
        chartRef.current.remove()
      }
    }
  }, [chartType, generateSampleData, createSeriesForChartType, convertDataForSeries])

  // Update chart when symbol or timeframe changes
  useEffect(() => {
    if (mainSeriesRef.current) {
      // Simulate data loading
      setTimeout(() => {
        const newData = generateSampleData()
        setChartData(newData)
        const seriesData = convertDataForSeries(newData, chartType)
        mainSeriesRef.current?.setData(seriesData)
        chartRef.current?.timeScale().fitContent()
      }, 500)
    }
  }, [symbol, timeFrame, chartType, generateSampleData, convertDataForSeries])

  // Update chart type when chartType changes
  useEffect(() => {
    if (!chartRef.current || !chartData.length) return

    // Remove existing main series
    if (mainSeriesRef.current) {
      chartRef.current.removeSeries(mainSeriesRef.current)
    }

    // Create new series with the selected chart type
    const newSeries = createSeriesForChartType(chartRef.current, chartType)
    mainSeriesRef.current = newSeries

    // Set data to the new series
    const seriesData = convertDataForSeries(chartData, chartType)
    newSeries.setData(seriesData)

    // Fit content
    chartRef.current.timeScale().fitContent()
  }, [chartType, chartData, createSeriesForChartType, convertDataForSeries])

  // Add indicator to chart
  const addIndicator = useCallback((indicatorName: string) => {
    if (!chartRef.current || !chartData.length) return

    try {
      // Check if indicator is already applied
      const isAlreadyApplied = appliedIndicators.some(ind => ind.name === indicatorName)
      if (isAlreadyApplied) {
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

    } catch (error) {
      safeConsole.error(`Error adding indicator ${indicatorName}:`, error)
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
      <div
        ref={chartContainerRef}
        className="w-full h-full"
      />
      {/* ViewMarket Logo Overlay - positioned like TradingView logo */}
      <a 
        href="https://www.viewmarket.in/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute bottom-12 left-2 z-20 flex items-center gap-2 bg-black/95 backdrop-blur-sm px-3 py-1.5 rounded border border-gray-800 shadow-sm hover:bg-gray-900 hover:shadow-md transition-all duration-200 cursor-pointer"
        title="Visit ViewMarket.in"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-white">
          <path d="M2 2h16v16H2V2zm2 2v12h12V4H4zm2 2h8v8H6V6z"/>
        </svg>
        <span className="text-sm font-semibold text-white">ViewMarket</span>
      </a>
      {/* Chart overlay info */}
      <div className="absolute top-4 right-4 bg-gray-800/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-600 shadow-sm">
        <div className="text-sm font-semibold text-white">{symbol}</div>
        <div className="text-xs text-gray-400">{timeFrame} • {chartType}</div>
        {indicators.length > 0 && (
          <div className="text-xs text-gray-300 mt-1">
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
                    if (process.env.NODE_ENV === 'development') {
                      console.log('Settings clicked for indicator:', indicator.name)
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded opacity-50 cursor-not-allowed"
                  title="Settings (Coming Soon)"
                  disabled
                >
                  <Settings className="w-4 h-4" />
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