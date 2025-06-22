"use client"

import { useEffect, useRef } from 'react'
import { createChart, CandlestickSeries } from 'lightweight-charts'

interface SimpleChartProps {
  className?: string
}

// Generate sample 1-minute candlestick data for one full day (1440 minutes)
const generateData = () => {
  const data = []
  let price = 100
  const now = Math.floor(Date.now() / 1000)
  const startTime = now - (24 * 60 * 60) // 24 hours ago
  
  for (let i = 0; i < 1440; i++) { // 1440 minutes in a day
    const time = startTime + (i * 60) // Add i minutes
    
    // Simulate realistic price movement with trends and volatility
    const volatility = 0.3
    const trendComponent = Math.sin(i / 200) * 0.2 // Longer trend cycles
    const randomWalk = (Math.random() - 0.5) * volatility
    const change = trendComponent + randomWalk
    
    const open = price
    const close = price + change
    
    // Ensure high is higher than both open and close
    const maxPrice = Math.max(open, close)
    const high = maxPrice + Math.random() * 0.5
    
    // Ensure low is lower than both open and close  
    const minPrice = Math.min(open, close)
    const low = minPrice - Math.random() * 0.5
    
    data.push({
      time,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2))
    })
    
    price = close
  }
  
  return data
}

export default function SimpleChart({ className = "" }: SimpleChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    let chart: any = null

    const loadChart = () => {
      chart = createChart(chartRef.current!, {
         width: chartRef.current!.clientWidth,
         height: chartRef.current!.clientHeight,
         layout: {
           background: { color: '#ffffff' },
           textColor: '#000000',
           attributionLogo: false,
         },
         grid: {
           vertLines: { color: '#e5e5e5' },
           horzLines: { color: '#e5e5e5' },
         },
         timeScale: {
           borderColor: '#000000',
         },
         rightPriceScale: {
           borderColor: '#000000',
         },
       })

      const candlestickSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#00ff00',
        downColor: '#ff0000',
        borderUpColor: '#00ff00',
        borderDownColor: '#ff0000',
        wickUpColor: '#00ff00',
        wickDownColor: '#ff0000',
      })

      candlestickSeries.setData(generateData())
      chart.timeScale().fitContent()

             const handleResize = () => {
         if (chartRef.current && chart) {
           chart.applyOptions({ 
             width: chartRef.current.clientWidth,
             height: chartRef.current.clientHeight
           })
         }
       }
      
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        if (chart) {
          chart.remove()
        }
      }
    }

    const cleanup = loadChart()
    
    return cleanup
  }, [])

  return (
    <div ref={chartRef} className={`w-full h-full ${className}`} />
  )
} 