import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Sample performance metrics data
    const performanceMetrics = {
      timestamp: new Date().toISOString(),
      metrics: {
        pageLoadTime: Math.random() * 1000 + 500, // 500-1500ms
        timeToFirstByte: Math.random() * 200 + 100, // 100-300ms
        firstContentfulPaint: Math.random() * 800 + 400, // 400-1200ms
        largestContentfulPaint: Math.random() * 1500 + 1000, // 1000-2500ms
        cumulativeLayoutShift: Math.random() * 0.1, // 0-0.1
        firstInputDelay: Math.random() * 50 + 10, // 10-60ms
      },
      status: 'success'
    }

    return NextResponse.json(performanceMetrics)
  } catch (error) {
    console.error('Analytics performance API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch performance metrics' },
      { status: 500 }
    )
  }
} 