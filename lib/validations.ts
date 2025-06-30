// Simple validation helpers without external dependencies

// Common validation patterns
export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length >= 5 && email.length <= 254
}

export const isStrongPassword = (password: string): boolean => {
  const minLength = 8
  const maxLength = 128
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[@$!%*?&]/.test(password)
  
  return password.length >= minLength && 
         password.length <= maxLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar
}

export const isValidSymbol = (symbol: string): boolean => {
  const symbolRegex = /^[A-Z0-9._-]+$/
  return symbol.length >= 1 && symbol.length <= 20 && symbolRegex.test(symbol)
}

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>\"']/g, '')
    .trim()
    .substring(0, 1000)
}

export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
}

export const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 255)
}

// Validation result type
export interface ValidationResult<T> {
  success: boolean
  data: T | null
  errors: string[]
}

// Login validation
export interface LoginInput {
  email: string
  password: string
  rememberMe?: boolean
}

export const validateLogin = (data: unknown): ValidationResult<LoginInput> => {
  const errors: string[] = []
  
  if (!data || typeof data !== 'object') {
    return { success: false, data: null, errors: ['Invalid data format'] }
  }
  
  const input = data as Record<string, unknown>
  
  if (!input.email || typeof input.email !== 'string') {
    errors.push('Email is required')
  } else if (!isEmail(input.email)) {
    errors.push('Invalid email format')
  }
  
  if (!input.password || typeof input.password !== 'string') {
    errors.push('Password is required')
  } else if (input.password.length > 128) {
    errors.push('Password is too long')
  }
  
  if (errors.length > 0) {
    return { success: false, data: null, errors }
  }
  
  return {
    success: true,
    data: {
      email: sanitizeInput(input.email as string),
      password: input.password as string,
      rememberMe: Boolean(input.rememberMe)
    },
    errors: []
  }
}

// Chart config validation
export interface ChartConfig {
  symbol: string
  timeFrame: string
  chartType: string
  indicators: string[]
  volume: boolean
  crosshair: boolean
}

const validTimeFrames = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w', '1M']
const validChartTypes = ['candles', 'bars', 'line', 'area', 'heikin-ashi']

export const validateChartConfig = (data: unknown): ValidationResult<ChartConfig> => {
  const errors: string[] = []
  
  if (!data || typeof data !== 'object') {
    return { success: false, data: null, errors: ['Invalid data format'] }
  }
  
  const input = data as Record<string, unknown>
  
  if (!input.symbol || typeof input.symbol !== 'string') {
    errors.push('Symbol is required')
  } else if (!isValidSymbol(input.symbol)) {
    errors.push('Invalid symbol format')
  }
  
  if (!input.timeFrame || typeof input.timeFrame !== 'string') {
    errors.push('Time frame is required')
  } else if (!validTimeFrames.includes(input.timeFrame)) {
    errors.push('Invalid time frame')
  }
  
  if (!input.chartType || typeof input.chartType !== 'string') {
    errors.push('Chart type is required')
  } else if (!validChartTypes.includes(input.chartType)) {
    errors.push('Invalid chart type')
  }
  
  if (input.indicators && !Array.isArray(input.indicators)) {
    errors.push('Indicators must be an array')
  } else if (input.indicators && Array.isArray(input.indicators) && input.indicators.length > 10) {
    errors.push('Too many indicators')
  }
  
  if (errors.length > 0) {
    return { success: false, data: null, errors }
  }
  
  return {
    success: true,
    data: {
      symbol: sanitizeInput(input.symbol as string),
      timeFrame: input.timeFrame as string,
      chartType: input.chartType as string,
      indicators: Array.isArray(input.indicators) ? 
        (input.indicators as string[]).map(sanitizeInput).slice(0, 10) : [],
      volume: Boolean(input.volume),
      crosshair: Boolean(input.crosshair)
    },
    errors: []
  }
}

// Error report validation
export interface ErrorReport {
  message: string
  stack?: string
  level: 'info' | 'warning' | 'error' | 'critical'
  timestamp: Date
}

export const validateErrorReport = (data: unknown): ValidationResult<ErrorReport> => {
  const errors: string[] = []
  
  if (!data || typeof data !== 'object') {
    return { success: false, data: null, errors: ['Invalid data format'] }
  }
  
  const input = data as Record<string, unknown>
  
  if (!input.message || typeof input.message !== 'string') {
    errors.push('Message is required')
  } else if (input.message.length > 1000) {
    errors.push('Message is too long')
  }
  
  const validLevels = ['info', 'warning', 'error', 'critical']
  if (!input.level || !validLevels.includes(input.level as string)) {
    errors.push('Valid level is required')
  }
  
  if (errors.length > 0) {
    return { success: false, data: null, errors }
  }
  
  return {
    success: true,
    data: {
      message: sanitizeInput(input.message as string),
      stack: typeof input.stack === 'string' ? sanitizeInput(input.stack) : undefined,
      level: input.level as ErrorReport['level'],
      timestamp: new Date()
    },
    errors: []
  }
}

// Rate limiting helpers
export const isRateLimited = (
  identifier: string, 
  requests: number, 
  maxRequests: number, 
  windowMs: number
): boolean => {
  // Simple in-memory rate limiting (in production, use Redis)
  const now = Date.now()
  const key = `${identifier}_${Math.floor(now / windowMs)}`
  
  // This is a simplified implementation
  // In production, you'd use a proper rate limiting solution
  return requests >= maxRequests
}

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Email validation
export const validateEmail = (email: string): ValidationResult<{ email: string }> => {
  const errors: string[] = []
  if (!email || typeof email !== 'string') {
    errors.push('Email is required')
  } else if (!isEmail(email)) {
    errors.push('Invalid email format')
  }

  if (errors.length > 0) {
    return { success: false, data: null, errors }
  }

  return {
    success: true,
    data: { email: sanitizeInput(email) },
    errors: []
  }
}

// Password validation
export const validatePassword = (password: string): ValidationResult<{ password: string }> => {
  const errors: string[] = []
  if (!password || typeof password !== 'string') {
    errors.push('Password is required')
  } else if (!isStrongPassword(password)) {
    errors.push('Password is not strong enough. Use at least 8 characters, with uppercase, lowercase, numbers, and special characters.')
  }

  if (errors.length > 0) {
    return { success: false, data: null, errors }
  }

  return {
    success: true,
    data: { password },
    errors: []
  }
}

// API Key validation
export const validateApiKey = (data: unknown): ValidationResult<{ name: string; expires_at: Date | null }> => {
  const errors: string[] = []
  
  if (!data || typeof data !== 'object') {
    return { success: false, data: null, errors: ['Invalid data format'] }
  }
  
  const input = data as Record<string, unknown>
  
  if (!input.name || typeof input.name !== 'string') {
    errors.push('Name is required')
  } else if (input.name.length > 255) {
    errors.push('Name is too long')
  }
  
  if (input.expires_at && !(input.expires_at instanceof Date)) {
    errors.push('Expires_at must be a Date')
  }
  
  if (errors.length > 0) {
    return { success: false, data: null, errors }
  }
  
  return {
    success: true,
    data: {
      name: sanitizeInput(input.name as string),
      expires_at: input.expires_at instanceof Date ? input.expires_at : null
    },
    errors: []
  }
} 