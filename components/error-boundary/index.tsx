"use client"

import React, { Component, ReactNode, ErrorInfo } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  level?: 'page' | 'component'
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

// Error reporting service
class ErrorReportingService {
  static async reportError(error: Error, errorInfo: ErrorInfo, level: string = 'component') {
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      level,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught Error')
      console.error('Error:', error)
      console.error('Error Info:', errorInfo)
      console.error('Level:', level)
      console.groupEnd()
    }

    // Send to error reporting service
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport),
      })
    } catch (reportingError) {
      console.warn('Failed to report error:', reportingError)
    }
  }
}

// Component-level error fallback
function ComponentErrorFallback({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <Card className="p-4 border-red-200 bg-red-50">
      <div className="flex items-center space-x-2 mb-2">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        <h3 className="text-sm font-medium text-red-800">Component Error</h3>
      </div>
      <p className="text-sm text-red-600 mb-3">
        A component failed to load. This won&apos;t affect other parts of the application.
      </p>
      <Button 
        onClick={onRetry}
        size="sm"
        variant="outline"
        className="border-red-300 text-red-700 hover:bg-red-100"
      >
        <RefreshCw className="h-4 w-4 mr-1" />
        Retry
      </Button>
    </Card>
  )
}

// Page-level error fallback
function PageErrorFallback({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="max-w-md w-full p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-900 mb-2">Page Error</h1>
        <p className="text-gray-600 mb-6">
          Something went wrong loading this page. Our team has been notified.
        </p>
        <div className="space-y-2">
          <Button onClick={onRetry} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button variant="outline" className="w-full" onClick={() => window.location.href = '/'}>
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              <Bug className="inline h-4 w-4 mr-1" />
              Error Details (Development)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
              {error.message}
              {'\n\n'}
              {error.stack}
            </pre>
          </details>
        )}
      </Card>
    </div>
  )
}

// Main error boundary component
export class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Report the error
    ErrorReportingService.reportError(error, errorInfo, this.props.level || 'component')
    
    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const level = this.props.level || 'component'
      
      if (level === 'page') {
        return <PageErrorFallback error={this.state.error} onRetry={this.handleRetry} />
      }
      
      return <ComponentErrorFallback error={this.state.error} onRetry={this.handleRetry} />
    }

    return this.props.children
  }
}

// Convenience components
export const ComponentErrorBoundary = ({ children, ...props }: Omit<ErrorBoundaryProps, 'level'>) => (
  <AppErrorBoundary level="component" {...props}>
    {children}
  </AppErrorBoundary>
)

export const PageErrorBoundary = ({ children, ...props }: Omit<ErrorBoundaryProps, 'level'>) => (
  <AppErrorBoundary level="page" {...props}>
    {children}
  </AppErrorBoundary>
) 