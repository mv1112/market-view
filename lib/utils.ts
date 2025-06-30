import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Environment checks
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'
export const isTest = process.env.NODE_ENV === 'test'
export const isServer = typeof window === 'undefined'
export const isClient = !isServer

// Production-safe console wrapper
export const safeConsole = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },
  error: (...args: any[]) => {
    console.error(...args)
  },
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args)
    }
  },
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(...args)
    }
  },
  group: (...args: any[]) => {
    if (isDevelopment) {
      console.group(...args)
    }
  },
  groupEnd: () => {
    if (isDevelopment) {
      console.groupEnd()
    }
  },
  table: (data: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.table(data)
    }
  },
  time: (label: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.time(label)
    }
  },
  timeEnd: (label: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.timeEnd(label)
    }
  }
}

// Safe localStorage wrapper
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (isServer) return null
    try {
      return localStorage.getItem(key)
    } catch (error) {
      safeConsole.warn('localStorage.getItem failed:', error)
      return null
    }
  },
  setItem: (key: string, value: string): void => {
    if (isServer) return
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      safeConsole.warn('localStorage.setItem failed:', error)
    }
  },
  removeItem: (key: string): void => {
    if (isServer) return
    try {
      localStorage.removeItem(key)
    } catch (error) {
      safeConsole.warn('localStorage.removeItem failed:', error)
    }
  },
  clear: (): void => {
    if (isServer) return
    try {
      localStorage.clear()
    } catch (error) {
      safeConsole.warn('localStorage.clear failed:', error)
    }
  }
}

// Safe sessionStorage wrapper
export const safeSessionStorage = {
  getItem: (key: string): string | null => {
    if (isServer) return null
    try {
      return sessionStorage.getItem(key)
    } catch (error) {
      safeConsole.warn('sessionStorage.getItem failed:', error)
      return null
    }
  },
  setItem: (key: string, value: string): void => {
    if (isServer) return
    try {
      sessionStorage.setItem(key, value)
    } catch (error) {
      safeConsole.warn('sessionStorage.setItem failed:', error)
    }
  },
  removeItem: (key: string): void => {
    if (isServer) return
    try {
      sessionStorage.removeItem(key)
    } catch (error) {
      safeConsole.warn('sessionStorage.removeItem failed:', error)
    }
  },
  clear: (): void => {
    if (isServer) return
    try {
      sessionStorage.clear()
    } catch (error) {
      safeConsole.warn('sessionStorage.clear failed:', error)
    }
  }
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Retry function with exponential backoff
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number
    initialDelay?: number
    maxDelay?: number
    factor?: number
    onRetry?: (error: Error, attempt: number) => void
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    factor = 2,
    onRetry
  } = options
  
  let lastError: Error
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      if (attempt < maxRetries - 1) {
        const delay = Math.min(initialDelay * Math.pow(factor, attempt), maxDelay)
        
        if (onRetry) {
          onRetry(lastError, attempt + 1)
        }
        
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError!
}
