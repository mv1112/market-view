"use client"

import React, { useState } from 'react'
import { X } from 'lucide-react'

interface SettingsPopupProps {
  isOpen: boolean
  onClose: () => void
}

// Navigation items for left sidebar (matching TradingView exactly)
const navigationItems = [
  { 
    id: 'symbol', 
    label: 'Symbol',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    )
  },
  { 
    id: 'status-line', 
    label: 'Status line',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    )
  },
  { 
    id: 'scales-lines', 
    label: 'Scales and lines',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
      </svg>
    )
  },
  { 
    id: 'canvas', 
    label: 'Canvas',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
      </svg>
    )
  },
  { 
    id: 'trading', 
    label: 'Trading',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    )
  },
  { 
    id: 'alerts', 
    label: 'Alerts',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
    )
  },
  { 
    id: 'events', 
    label: 'Events',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    )
  }
]

// Template options for bottom dropdown
const templateOptions = [
  'Template',
  'Dark Theme',
  'Light Theme',
  'Custom Template'
]

export default function SettingsPopup({ isOpen, onClose }: SettingsPopupProps) {
  const [selectedCategory, setSelectedCategory] = useState('symbol')
  const [selectedTemplate, setSelectedTemplate] = useState('Template')
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false)
  
  // Settings state
  const [colorBarsOnPreviousClose, setColorBarsOnPreviousClose] = useState(false)
  const [bodyEnabled, setBodyEnabled] = useState(true)
  const [bordersEnabled, setBordersEnabled] = useState(true)
  const [wickEnabled, setWickEnabled] = useState(true)
  const [selectedSession, setSelectedSession] = useState('Regular trading hours')
  const [selectedPrecision, setSelectedPrecision] = useState('Default')
  const [selectedTimezone, setSelectedTimezone] = useState('(UTC+5:30) Kolkata, Chennai, Mumbai, New Delhi')

  const renderSymbolSettings = () => (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-4 uppercase tracking-wide">CANDLES</h3>
        
        {/* Color bars based on previous close */}
        <div className="flex items-center justify-between mb-6">
          <label className="text-sm text-gray-700">Color bars based on previous close</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={colorBarsOnPreviousClose}
              onChange={(e) => setColorBarsOnPreviousClose(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-11 h-6 rounded-full transition-colors ${
              colorBarsOnPreviousClose ? 'bg-blue-600' : 'bg-gray-600'
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full transition-transform transform ${
                colorBarsOnPreviousClose ? 'translate-x-6' : 'translate-x-0.5'
              } mt-0.5`} />
            </div>
          </label>
        </div>

        {/* Body */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={bodyEnabled}
                onChange={(e) => setBodyEnabled(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 transition-colors ${
                bodyEnabled ? 'bg-blue-600 border-blue-600' : 'border-gray-500'
              }`}>
                {bodyEnabled && (
                  <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                )}
              </div>
            </label>
            <span className="text-sm text-gray-700">Body</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-8 h-6 bg-green-500 rounded cursor-pointer border border-gray-600"></div>
            <div className="w-8 h-6 bg-red-500 rounded cursor-pointer border border-gray-600"></div>
          </div>
        </div>

        {/* Borders */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={bordersEnabled}
                onChange={(e) => setBordersEnabled(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 transition-colors ${
                bordersEnabled ? 'bg-blue-600 border-blue-600' : 'border-gray-500'
              }`}>
                {bordersEnabled && (
                  <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                )}
              </div>
            </label>
            <span className="text-sm text-gray-700">Borders</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-8 h-6 bg-green-500 rounded cursor-pointer border border-gray-300"></div>
            <div className="w-8 h-6 bg-red-500 rounded cursor-pointer border border-gray-300"></div>
          </div>
        </div>

        {/* Wick */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={wickEnabled}
                onChange={(e) => setWickEnabled(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 transition-colors ${
                wickEnabled ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
              }`}>
                {wickEnabled && (
                  <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                )}
              </div>
            </label>
            <span className="text-sm text-gray-700">Wick</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-8 h-6 bg-green-500 rounded cursor-pointer border border-gray-300"></div>
            <div className="w-8 h-6 bg-red-500 rounded cursor-pointer border border-gray-300"></div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-4 uppercase tracking-wide">DATA MODIFICATION</h3>
        
        {/* Session */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-700">Session</span>
          <select 
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="bg-gray-100 border border-gray-300 rounded px-3 py-1 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
          >
            <option>Regular trading hours</option>
            <option>Extended trading hours</option>
            <option>24 hour trading</option>
          </select>
        </div>

        {/* Precision */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-700">Precision</span>
          <select 
            value={selectedPrecision}
            onChange={(e) => setSelectedPrecision(e.target.value)}
            className="bg-gray-100 border border-gray-300 rounded px-3 py-1 text-sm text-gray-900 focus:outline-none focus:border-gray-900"
          >
            <option>Default</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>

        {/* Timezone */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Timezone</span>
          <select 
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            className="bg-gray-100 border border-gray-300 rounded px-3 py-1 text-sm text-gray-900 focus:outline-none focus:border-gray-900 max-w-xs"
          >
            <option>(UTC+5:30) Kolkata, Chennai, Mumbai, New Delhi</option>
            <option>(UTC+0:00) London</option>
            <option>(UTC-5:00) New York</option>
            <option>(UTC+9:00) Tokyo</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderOtherSettings = () => (
    <div className="p-6 flex items-center justify-center h-full">
      <div className="text-center text-gray-600">
        <div className="text-4xl mb-4">⚙️</div>
        <p className="text-lg mb-2">{navigationItems.find(item => item.id === selectedCategory)?.label} Settings</p>
        <p className="text-sm">Configuration options coming soon...</p>
      </div>
    </div>
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white text-gray-900 border border-gray-300 max-w-4xl w-full max-h-[90vh] h-[90vh] rounded-lg overflow-hidden mx-4 flex">
        
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-300 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <h1 className="text-lg font-medium text-gray-900">Settings</h1>
            <button 
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 transition-colors p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedCategory(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${
                  selectedCategory === item.id
                    ? 'bg-gray-900 text-white border-r-2 border-blue-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                <span className={selectedCategory === item.id ? 'text-blue-500' : 'text-gray-600'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {selectedCategory === 'symbol' ? renderSymbolSettings() : renderOtherSettings()}
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-gray-300 p-4 flex items-center justify-between bg-white">
            {/* Template Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsTemplateDropdownOpen(!isTemplateDropdownOpen)}
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-4 py-2 text-sm text-gray-900 flex items-center space-x-2 transition-colors"
              >
                <span>{selectedTemplate}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isTemplateDropdownOpen && (
                <div className="absolute bottom-full left-0 mb-1 bg-white border border-gray-300 rounded shadow-lg min-w-full z-10">
                  {templateOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedTemplate(option)
                        setIsTemplateDropdownOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}