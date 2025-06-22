'use client'

import React, { useEffect, useRef, useState } from 'react'
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

interface TradingViewChartProps {
  symbol: string
  timeFrame: string
  chartType: string
  indicators: string[]
  className?: string
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol,
  timeFrame,
  chartType,
  indicators,
  className = ''
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Sample data generator for demonstration
  const generateSampleData = (): CandlestickData[] => {
    const data: CandlestickData[] = []
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

  useEffect(() => {
    if (!chartContainerRef.current) return

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

    // Set sample data
    const sampleData = generateSampleData()
    candlestickSeries.setData(sampleData)

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
        candlestickSeriesRef.current?.setData(newData)
        chartRef.current?.timeScale().fitContent()
        setIsLoading(false)
      }, 500)
    }
  }, [symbol, timeFrame])

  // Add indicators
  useEffect(() => {
    if (!chartRef.current || !candlestickSeriesRef.current) return

    indicators.forEach((indicator) => {
      if (indicator === 'Moving Average') {
        // Add a simple moving average line using the correct API
        const lineSeries = chartRef.current!.addSeries(LineSeries, {
          color: '#2196F3',
          lineWidth: 2,
        })

        // Generate MA data (simplified calculation)
        const candleData = generateSampleData()
        const maData: LineData[] = candleData.map((candle, index) => {
          if (index < 20) return { time: candle.time, value: candle.close }
          
          const sum = candleData.slice(index - 19, index + 1).reduce((acc, c) => acc + c.close, 0)
          return {
            time: candle.time,
            value: sum / 20
          }
        })

        lineSeries.setData(maData)
      }
    })
  }, [indicators])

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
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
        <div className="text-sm font-semibold text-gray-800">{symbol}</div>
        <div className="text-xs text-gray-600">{timeFrame} • {chartType}</div>
        {indicators.length > 0 && (
          <div className="text-xs text-blue-600 mt-1">
            {indicators.length} indicator{indicators.length > 1 ? 's' : ''} applied
          </div>
        )}
      </div>
    </div>
  )
}

export default TradingViewChart 