"use client"

import { useState, useEffect } from "react"

interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const [isLightMode, setIsLightMode] = useState(false) // Default to dark mode, so show sun icon

  useEffect(() => {
    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsLightMode(savedTheme === 'light')
    }
  }, [])

  const toggleTheme = () => {
    const newLightMode = !isLightMode
    setIsLightMode(newLightMode)
    localStorage.setItem('theme', newLightMode ? 'light' : 'dark')
    
    // You can add theme switching logic here
    // For now, we'll just toggle the state
  }

  return (
    <button 
      onClick={toggleTheme}
      className={`hover:bg-gray-100 hover:text-gray-900 rounded flex items-center justify-center transition-all duration-200 text-gray-900 ${className || 'h-8 w-8'}`}
      title={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
    >
      {!isLightMode ? (
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