"use client"

import { useState, useEffect, useCallback } from "react"
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  className?: string
  onThemeChange?: (isDark: boolean) => void
}

export const ThemeToggle = ({ className = "", onThemeChange }: ThemeToggleProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false) // Default to light mode
  const [mounted, setMounted] = useState(false)

  const applyTheme = useCallback((isDark: boolean) => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      root.style.setProperty('--chart-bg-color', '#1e1e1e')
      root.style.setProperty('--chart-text-color', '#ffffff')
      root.style.setProperty('--chart-grid-color', '#333333')
      root.style.setProperty('--chart-border-color', '#555555')
    } else {
      root.classList.remove('dark')
      root.style.setProperty('--chart-bg-color', '#ffffff')
      root.style.setProperty('--chart-text-color', '#333333')
      root.style.setProperty('--chart-grid-color', '#f0f0f0')
      root.style.setProperty('--chart-border-color', '#cccccc')
    }
    
    // Notify parent component about theme change
    if (onThemeChange) {
      onThemeChange(isDark)
    }
  }, [onThemeChange])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Load saved theme preference
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark)
      
      setIsDarkMode(shouldBeDark)
      
      if (typeof document !== 'undefined') {
        const root = document.documentElement
        if (shouldBeDark) {
          root.classList.add('dark')
          root.style.colorScheme = 'dark'
        } else {
          root.classList.remove('dark')
          root.style.colorScheme = 'light'
        }
      }
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    
    // Save theme preference
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    }
  }, [isDarkMode, mounted])

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="w-9 h-9" /> // Placeholder with same size
  }

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
    applyTheme(newDarkMode)
  }

  return (
    <button 
      onClick={toggleTheme}
      className={`hover:bg-gray-100 hover:text-gray-900 rounded flex items-center justify-center transition-all duration-200 text-gray-900 ${className || 'h-8 w-8'}`}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        // Sun icon for dark mode (clicking will switch to light)
        <Sun className="h-6 w-6" />
      ) : (
        // Moon icon for light mode (clicking will switch to dark)
        <Moon className="h-6 w-6" />
      )}
    </button>
  )
} 