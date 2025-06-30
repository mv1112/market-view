'use client'

import React, { Component, ReactNode } from 'react'
import { safeConsole } from '@/lib/utils'

interface AuthErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface AuthErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

class AuthErrorBoundary extends Component<AuthErrorBoundaryProps, AuthErrorBoundaryState> {
  constructor(props: AuthErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    safeConsole.error('Authentication Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center text-white p-8 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Authentication Error</h2>
            <p className="text-white/60 mb-6">
              There was an issue with the authentication system. Please refresh the page or try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default AuthErrorBoundary 