"use client"

import React, { useState } from 'react'
import { Plus, ChevronDown, ChevronRight } from 'lucide-react'

interface TimeFrame {
  value: string
  label: string
}

interface TimeFrameSection {
  id: string
  title: string
  frames: TimeFrame[]
  defaultExpanded?: boolean
}

interface TimeFrameDropdownProps {
  isOpen: boolean
  onClose: () => void
  selectedTimeFrame: string
  onTimeFrameSelect: (timeFrame: string) => void
}

const timeFrameSections: TimeFrameSection[] = [
  {
    id: 'ticks',
    title: 'TICKS',
    frames: [
      { value: '1T', label: '1 tick' },
      { value: '5T', label: '5 ticks' },
      { value: '10T', label: '10 ticks' },
      { value: '100T', label: '100 ticks' }
    ]
  },
  {
    id: 'seconds',
    title: 'SECONDS',
    frames: [
      { value: '1s', label: '1 second' },
      { value: '5s', label: '5 seconds' },
      { value: '10s', label: '10 seconds' },
      { value: '15s', label: '15 seconds' },
      { value: '30s', label: '30 seconds' }
    ]
  },
  {
    id: 'minutes',
    title: 'MINUTES',
    defaultExpanded: true,
    frames: [
      { value: '1m', label: '1 minute' },
      { value: '2m', label: '2 minutes' },
      { value: '3m', label: '3 minutes' },
      { value: '5m', label: '5 minutes' },
      { value: '10m', label: '10 minutes' },
      { value: '15m', label: '15 minutes' },
      { value: '30m', label: '30 minutes' },
      { value: '45m', label: '45 minutes' }
    ]
  },
  {
    id: 'hours',
    title: 'HOURS',
    frames: [
      { value: '1h', label: '1 hour' },
      { value: '2h', label: '2 hours' },
      { value: '3h', label: '3 hours' },
      { value: '4h', label: '4 hours' },
      { value: '6h', label: '6 hours' },
      { value: '8h', label: '8 hours' },
      { value: '12h', label: '12 hours' }
    ]
  },
  {
    id: 'days',
    title: 'DAYS',
    frames: [
      { value: '1D', label: '1 day' },
      { value: '2D', label: '2 days' },
      { value: '3D', label: '3 days' },
      { value: '1W', label: '1 week' },
      { value: '2W', label: '2 weeks' }
    ]
  },
  {
    id: 'ranges',
    title: 'RANGES',
    frames: [
      { value: '1M', label: '1 month' },
      { value: '3M', label: '3 months' },
      { value: '6M', label: '6 months' },
      { value: '12M', label: '12 months' }
    ]
  }
]

export default function TimeFrameDropdown({ isOpen, onClose, selectedTimeFrame, onTimeFrameSelect }: TimeFrameDropdownProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(timeFrameSections.filter(section => section.defaultExpanded).map(section => section.id))
  )

  // Apply custom scrollbar styles and override any blue hover effects
  React.useEffect(() => {
    if (isOpen) {
      const style = document.createElement('style')
      style.textContent = `
        .timeframe-dropdown::-webkit-scrollbar {
          width: 8px;
        }
        .timeframe-dropdown::-webkit-scrollbar-track {
          background: black;
        }
        .timeframe-dropdown::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .timeframe-dropdown::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        
        /* Force white hover effects and remove any blue colors */
        .timeframe-dropdown .timeframe-item:hover {
          background-color: white !important;
          color: black !important;
        }
        
        .timeframe-dropdown .timeframe-section-header:hover {
          background-color: #1a1a1a !important;
          color: white !important;
        }
        
        .timeframe-dropdown .timeframe-add-custom:hover {
          background-color: white !important;
          color: black !important;
        }
        
        .timeframe-dropdown .timeframe-item.selected {
          background-color: white !important;
          color: black !important;
        }
        
        /* Remove any focus outlines that might be blue */
        .timeframe-dropdown * {
          outline: none !important;
          box-shadow: none !important;
        }
        
        /* Override any inherited blue colors */
        .timeframe-dropdown * {
          border-color: white !important;
        }
      `
      document.head.appendChild(style)
      return () => {
        document.head.removeChild(style)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const handleTimeFrameSelect = (timeFrame: string) => {
    onTimeFrameSelect(timeFrame)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div 
        className="absolute bg-black border border-white rounded-lg shadow-2xl w-52 max-h-96 overflow-y-auto timeframe-dropdown"
        style={{ 
          backgroundColor: 'black',
          top: '60px', // Position below the header
          left: '200px', // Position under the timeframe button
          scrollbarWidth: 'thin',
          scrollbarColor: '#333 black'
        }}
      >
        {/* Add Custom Interval */}
        <div className="timeframe-add-custom px-4 py-3 border-b border-gray-800 hover:bg-white hover:text-black cursor-pointer transition-all duration-150">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">Add custom interval...</span>
          </div>
        </div>

        {/* Time Frame Sections */}
        {timeFrameSections.map((section) => (
          <div key={section.id}>
            {/* Section Header */}
            <div 
              className="timeframe-section-header px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-900 flex items-center justify-between"
              onClick={() => toggleSection(section.id)}
            >
              <span>{section.title}</span>
              {expandedSections.has(section.id) ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>

            {/* Section Content */}
            {expandedSections.has(section.id) && (
              <div>
                {section.frames.map((frame) => (
                  <div
                    key={frame.value}
                    onClick={() => handleTimeFrameSelect(frame.value)}
                    className={`timeframe-item px-4 py-2 text-sm cursor-pointer transition-all duration-150 ${
                      selectedTimeFrame === frame.value
                        ? 'selected bg-white text-black'
                        : 'text-white hover:bg-white hover:text-black'
                    }`}
                  >
                    {frame.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 