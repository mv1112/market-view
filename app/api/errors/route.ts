import { NextRequest, NextResponse } from 'next/server'
import { validateErrorReport, isRateLimited } from '@/lib/validations'
import { safeConsole, isDevelopment } from '@/lib/utils'

// WARNING: This in-memory store is for development only
// In production, use Redis or a similar distributed cache for rate limiting
// to handle multiple server instances correctly
const requestCounts = new Map<string, { count: number; resetTime: number }>()

// Maximum size for the in-memory cache to prevent memory leaks
const MAX_CACHE_SIZE = 10000

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'

    // Rate limiting: 10 errors per minute per IP
    const rateLimitKey = `error_${clientIP}`
    const now = Date.now()
    const windowMs = 60 * 1000 // 1 minute
    const maxRequests = 10

    const currentWindow = Math.floor(now / windowMs)
    const rateLimitData = requestCounts.get(rateLimitKey)

    if (rateLimitData && rateLimitData.resetTime === currentWindow) {
      if (rateLimitData.count >= maxRequests) {
        return NextResponse.json(
          { 
            error: 'Rate limit exceeded',
            retryAfter: windowMs - (now % windowMs)
          },
          { status: 429 }
        )
      }
      rateLimitData.count++
    } else {
      requestCounts.set(rateLimitKey, { count: 1, resetTime: currentWindow })
    }

    // Clean up old entries and prevent memory leak
    if (requestCounts.size > MAX_CACHE_SIZE) {
      const entriesToDelete: string[] = []
      requestCounts.forEach((data, key) => {
        if (data.resetTime < currentWindow - 5) { // Keep last 5 minutes
          entriesToDelete.push(key)
        }
      })
      entriesToDelete.forEach(key => requestCounts.delete(key))
      
      // If still too large, clear oldest entries
      if (requestCounts.size > MAX_CACHE_SIZE) {
        const sortedEntries = Array.from(requestCounts.entries())
          .sort((a, b) => a[1].resetTime - b[1].resetTime)
        const toRemove = sortedEntries.slice(0, requestCounts.size - MAX_CACHE_SIZE)
        toRemove.forEach(([key]) => requestCounts.delete(key))
      }
    }

    // Parse and validate request body
    const body = await request.json()
    const validation = validateErrorReport(body)

    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validation.errors
        },
        { status: 400 }
      )
    }

    const errorData = validation.data!

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      safeConsole.group('🚨 Error Report Received')
      safeConsole.error('Message:', errorData.message)
      safeConsole.error('Level:', errorData.level)
      safeConsole.error('Stack:', errorData.stack)
      safeConsole.error('Client IP:', clientIP)
      safeConsole.error('User Agent:', request.headers.get('user-agent'))
      safeConsole.groupEnd()
    }

    // Here you would normally:
    // 1. Store in database
    // 2. Send to error tracking service (Sentry, LogRocket, etc.)
    // 3. Alert on critical errors
    // 4. Aggregate metrics
    if (isDevelopment) {
      safeConsole.group('🚨 Error Report Received')
      safeConsole.error('Message:', errorData.message)
      safeConsole.error('Level:', errorData.level)
      safeConsole.error('Stack:', errorData.stack)
      safeConsole.error('Client IP:', clientIP)
      safeConsole.error('User Agent:', request.headers.get('user-agent'))
      safeConsole.groupEnd()
    }

    // For now, we'll just log and return success
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Simulate database storage
    const errorRecord = {
      id: errorId,
      ...errorData,
      clientIP,
      userAgent: request.headers.get('user-agent'),
      url: request.headers.get('referer'),
      receivedAt: new Date(),
    }

    // In production, you'd store this in your database
    // await db.errors.create({ data: errorRecord })

    // If it's a critical error, you might want to alert immediately
    if (errorData.level === 'critical') {
      // Send alert to monitoring service
      safeConsole.error('🚨 CRITICAL ERROR REPORTED:', errorRecord)
    }

    const processingTime = Date.now() - startTime

    return NextResponse.json(
      { 
        success: true,
        errorId,
        message: 'Error report received',
        processingTime: `${processingTime}ms`
      },
      { 
        status: 201,
        headers: {
          'X-Processing-Time': `${processingTime}ms`,
          'X-Rate-Limit-Remaining': String(maxRequests - (requestCounts.get(rateLimitKey)?.count || 0)),
        }
      }
    )

  } catch (error) {
    safeConsole.error('Error processing error report:', error)

    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process error report'
      },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'error-reporting',
    timestamp: new Date().toISOString(),
    activeConnections: requestCounts.size
  })
} 