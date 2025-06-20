"use client"

import React, { useState } from 'react'
import { X, Search, User, TrendingUp, BarChart3, Triangle } from 'lucide-react'

interface IndicatorsPopupProps {
  isOpen: boolean
  onClose: () => void
}

// Sidebar categories matching TradingView
const sidebarCategories = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'technicals', label: 'Technicals', icon: TrendingUp },
  { id: 'financials', label: 'Financials', icon: BarChart3 },
  { id: 'community', label: 'Community', icon: Triangle },
]

// Main content tabs
const contentTabs = [
  { id: 'indicators', label: 'Indicators' },
  { id: 'strategies', label: 'Strategies' },
  { id: 'profiles', label: 'Profiles' },
  { id: 'patterns', label: 'Patterns' },
]

// Sample indicators data matching the screenshot
const indicators = [
  '24-hour Volume',
  'Accumulation/Distribution',
  'Advance Decline Line',
  'Advance Decline Ratio',
  'Advance/Decline Ratio (Bars)',
  'Arnaud Legoux Moving Average',
  'Aroon',
  'Auto Fib Extension',
  'Auto Fib Retracement',
  'Auto Pitchfork',
  'Auto Trendlines BETA',
  'Average Day Range',
  'Average Directional Index'
]

export default function IndicatorsPopup({ isOpen, onClose }: IndicatorsPopupProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSidebarCategory, setSelectedSidebarCategory] = useState('technicals')
  const [selectedContentTab, setSelectedContentTab] = useState('indicators')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-[#1e1e1e] text-white border-none max-w-4xl w-full max-h-[85vh] h-[85vh] rounded-lg overflow-hidden mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-medium text-white">Indicators, metrics, and strategies</h1>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden h-[calc(100%-140px)]">
          {/* Left Sidebar */}
          <div className="w-56 bg-[#1a1a1a] border-r border-gray-700/50 flex-shrink-0">
            <div className="p-3">
              {sidebarCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedSidebarCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors mb-1 ${
                      selectedSidebarCategory === category.id
                        ? 'bg-white text-black'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="font-medium text-sm">{category.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Content Tabs */}
            <div className="px-6 py-3 border-b border-gray-700/50">
              <div className="flex gap-1">
                {contentTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedContentTab(tab.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      selectedContentTab === tab.id
                        ? 'bg-white text-black'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content List */}
            <div 
              className="flex-1 overflow-y-auto"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#000000 #1a1a1a'
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  width: 8px;
                }
                div::-webkit-scrollbar-track {
                  background: #1a1a1a;
                }
                div::-webkit-scrollbar-thumb {
                  background: #000000;
                  border-radius: 4px;
                }
                div::-webkit-scrollbar-thumb:hover {
                  background: #333333;
                }
              `}</style>
              <div className="p-6">
                {/* Indicators Content */}
                <div className={`space-y-0.5 ${selectedContentTab !== 'indicators' ? 'hidden' : ''}`}>
                  {indicators
                    .filter(indicator => 
                      indicator.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((indicator, index) => (
                      <div
                        key={index}
                        className="w-full flex items-center justify-between px-3 py-1.5 text-gray-300 hover:bg-gray-700/30 rounded-lg transition-colors group"
                      >
                        <span className="text-sm group-hover:text-white">{indicator}</span>
                        <div className="relative">
                          <button 
                            className="text-gray-400 group-hover:text-gray-300 hover:bg-gray-600 p-1 rounded transition-colors"
                            title="Source code"
                          >
                            <span className="text-xs font-mono">{ }</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                
                {/* Strategies Content */}
                <div className={`space-y-0.5 ${selectedContentTab !== 'strategies' ? 'hidden' : ''}`}>
                  {['Bollinger Bands Strategy', 'Moving Average Crossover', 'RSI Divergence Strategy'].map((strategy, index) => (
                    <div
                      key={index}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-gray-300 hover:bg-gray-700/30 rounded-lg transition-colors group"
                    >
                      <span className="text-sm group-hover:text-white">{strategy}</span>
                      <div className="relative">
                        <button 
                          className="text-gray-400 group-hover:text-gray-300 hover:bg-gray-600 p-1 rounded transition-colors"
                          title="Source code"
                        >
                          <span className="text-xs font-mono">{ }</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Profiles Content */}
                <div className={`space-y-0.5 ${selectedContentTab !== 'profiles' ? 'hidden' : ''}`}>
                  {['Day Trading Profile', 'Swing Trading Profile', 'Long Term Investment Profile'].map((profile, index) => (
                    <div
                      key={index}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-gray-300 hover:bg-gray-700/30 rounded-lg transition-colors group"
                    >
                      <span className="text-sm group-hover:text-white">{profile}</span>
                      <div className="relative">
                        <button 
                          className="text-gray-400 group-hover:text-gray-300 hover:bg-gray-600 p-1 rounded transition-colors"
                          title="Source code"
                        >
                          <span className="text-xs font-mono">{ }</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Patterns Content */}
                <div className={`space-y-0.5 ${selectedContentTab !== 'patterns' ? 'hidden' : ''}`}>
                  {['Head and Shoulders', 'Double Top/Bottom', 'Triangle Patterns'].map((pattern, index) => (
                    <div
                      key={index}
                      className="w-full flex items-center justify-between px-3 py-1.5 text-gray-300 hover:bg-gray-700/30 rounded-lg transition-colors group"
                    >
                      <span className="text-sm group-hover:text-white">{pattern}</span>
                      <div className="relative">
                        <button 
                          className="text-gray-400 group-hover:text-gray-300 hover:bg-gray-600 p-1 rounded transition-colors"
                          title="Source code"
                        >
                          <span className="text-xs font-mono">{ }</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 