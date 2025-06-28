interface PerformanceEntry {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
  url: string
  userAgent: string
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceEntry> = new Map()
  private isInitialized = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.init()
    }
  }

  private init() {
    if (this.isInitialized) return
    
    this.isInitialized = true
    
    // Track navigation timing
    this.trackNavigationTiming()
    this.trackResourceTiming()
    
    // Track paint metrics
    this.trackPaintMetrics()
  }

  private trackNavigationTiming() {
    if (!('performance' in window) || !('getEntriesByType' in performance)) {
      return
    }

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          
          // Track page load time
          const pageLoadTime = navEntry.loadEventEnd - navEntry.loadEventStart
          this.trackCustomMetric('page-load-time', pageLoadTime)
          
          // Track DNS resolution time
          const dnsTime = navEntry.domainLookupEnd - navEntry.domainLookupStart
          this.trackCustomMetric('dns-resolution-time', dnsTime)
          
          // Track DOM content loaded
          const domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart
          this.trackCustomMetric('dom-content-loaded', domContentLoaded)
        }
      })
    })

    observer.observe({ entryTypes: ['navigation'] })
  }

  private trackResourceTiming() {
    if (!('performance' in window) || !('getEntriesByType' in window.performance)) {
      return
    }

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming
          
          // Track large resource loads
          if (resourceEntry.transferSize && resourceEntry.transferSize > 100000) { // 100KB+
            this.trackCustomMetric(`large-resource-load`, resourceEntry.duration)
          }
        }
      })
    })

    observer.observe({ entryTypes: ['resource'] })
  }

  private trackPaintMetrics() {
    if (!('performance' in window) || !('getEntriesByType' in performance)) {
      return
    }

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'paint') {
          const rating = entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor'
          this.trackCustomMetric(entry.name, entry.startTime, rating)
        }
      })
    })

    observer.observe({ entryTypes: ['paint'] })
  }

  public trackCustomMetric(name: string, value: number, rating: 'good' | 'needs-improvement' | 'poor' = 'good') {
    if (typeof window === 'undefined') return

    const entry: PerformanceEntry = {
      name,
      value,
      rating,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    }

    this.metrics.set(name, entry)
    this.sendMetric(entry)
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${name}: ${value.toFixed(2)}ms (${rating})`)
    }
  }

  public trackPageLoad(pageName: string) {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const loadTime = endTime - startTime
      this.trackCustomMetric(`page-load-${pageName}`, loadTime)
    }
  }

  public trackUserInteraction(action: string, element?: string) {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const interactionTime = endTime - startTime
      const metricName = element ? `interaction-${action}-${element}` : `interaction-${action}`
      this.trackCustomMetric(metricName, interactionTime)
    }
  }

  private sendMetric(metric: PerformanceEntry) {
    // Send to your analytics service
    if (typeof window !== 'undefined' && 'fetch' in window) {
      fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      }).catch((error) => {
        console.warn('Failed to send performance metric:', error)
      })
    }
  }

  public getMetrics(): PerformanceEntry[] {
    return Array.from(this.metrics.values())
  }

  public generateReport(): string {
    const metrics = this.getMetrics()
    const report = {
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
      metrics: metrics.reduce((acc, metric) => {
        acc[metric.name] = {
          value: metric.value,
          rating: metric.rating,
        }
        return acc
      }, {} as Record<string, { value: number; rating: string }>),
    }
    
    return JSON.stringify(report, null, 2)
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor()

// Hook for React components
export function usePerformanceTracking(componentName: string) {
  const trackRender = () => {
    if (typeof window !== 'undefined') {
      performanceMonitor.trackCustomMetric(`component-render-${componentName}`, performance.now())
    }
  }
  
  const trackInteraction = (action: string, element?: string) => 
    performanceMonitor.trackUserInteraction(action, element)
  
  return { trackRender, trackInteraction }
}

// Utility functions
export function withPerformanceTracking<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T {
  return ((...args: any[]) => {
    const endTracking = performanceMonitor.trackCustomMetric(`function-${name}`, 0)
    const startTime = performance.now()
    
    try {
      const result = fn(...args)
      
      if (result instanceof Promise) {
        return result.finally(() => {
          const endTime = performance.now()
          performanceMonitor.trackCustomMetric(`function-${name}`, endTime - startTime)
        })
      }
      
      const endTime = performance.now()
      performanceMonitor.trackCustomMetric(`function-${name}`, endTime - startTime)
      return result
    } catch (error) {
      const endTime = performance.now()
      performanceMonitor.trackCustomMetric(`function-${name}`, endTime - startTime, 'poor')
      throw error
    }
  }) as T
} 