"use client"

import { useEffect, useRef } from 'react'
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts'

interface TradingChartProps {
  className?: string
}

// Generate sample 1-minute candlestick data for one day (1440 minutes)
const generateSampleData = () => {
  const data = []
  const startTime = Math.floor(Date.now() / 1000) - (24 * 60 * 60) // 24 hours ago
  
  let basePrice = 100
  let currentPrice = basePrice
  
  for (let i = 0; i < 1440; i++) { // 1440 minutes in a day
    const time = startTime + (i * 60) // Add i minutes
    
    // Simulate price movement
    const volatility = 0.5
    const trend = Math.sin(i / 100) * 0.1 // Slight trend component
    const randomMove = (Math.random() - 0.5) * volatility + trend
    
    const open = currentPrice
    const close = open + randomMove
    const high = Math.max(open, close) + Math.random() * 0.2
    const low = Math.min(open, close) - Math.random() * 0.2
    
    data.push({
      time: time as any,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2))
    })
    
    currentPrice = close
  }
  
  return data
}

export default function TradingChart({ className = "" }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

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

    // Create candlestick series using the correct API
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#00ff00',
      downColor: '#ff0000',
      borderDownColor: '#ff0000',
      borderUpColor: '#00ff00',
      wickDownColor: '#ff0000',
      wickUpColor: '#00ff00',
    })

    // Add sample data
    const sampleData = generateSampleData()
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

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [])

  return (
    <div className={`w-full h-full ${className}`}>
      <div className="w-full h-full bg-black border border-gray-600 rounded-lg">
        <div 
          ref={chartContainerRef} 
          className="w-full h-full"
          style={{ minHeight: '400px' }}
        />
      </div>
    </div>
  )
} 