"use client"

import { useState, useEffect, useCallback } from "react"

interface ThemeToggleProps {
  className?: string
  onThemeChange?: (isDark: boolean) => void
}

export const ThemeToggle = ({ className = "", onThemeChange }: ThemeToggleProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false) // Default to light mode

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
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      const darkMode = savedTheme === 'dark'
      setIsDarkMode(darkMode)
      applyTheme(darkMode)
    } else {
      // Default to light mode
      applyTheme(false)
    }
  }, [applyTheme])

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
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      ) : (
        // Moon icon for light mode (clicking will switch to dark)
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
} 