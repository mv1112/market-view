'use client'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { BiCandles } from "react-icons/bi"

const candlestickTypes = [
  { id: 'candles', name: 'Candles', isDefault: true },
  { id: 'hollow-candles', name: 'Hollow candles' },
  { id: 'heikin-ashi', name: 'Heikin Ashi' },
  { id: 'bars', name: 'Bars' },
  { id: 'line', name: 'Line' },
  { id: 'area', name: 'Area' },
  { id: 'baseline', name: 'Baseline' },
  { id: 'hi-lo', name: 'Hi-Lo' },
]

// Main Candlestick Icon Component - using BiCandles from react-icons
const CandlestickIcon = () => (
  <BiCandles className="w-[18px] h-[18px] flex-shrink-0" />
)

// Individual Icons for each candlestick type
const CandleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <g>
      <line x1="8" y1="2" x2="8" y2="4" stroke="currentColor" strokeWidth="1"/>
      <rect x="6" y="4" width="4" height="6" fill="currentColor" rx="0.5"/>
      <line x1="8" y1="10" x2="8" y2="14" stroke="currentColor" strokeWidth="1"/>
    </g>
  </svg>
)

const HollowCandleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <g>
      {/* Upper wick */}
      <line x1="8" y1="1" x2="8" y2="4" stroke="currentColor" strokeWidth="1.2"/>
      {/* Hollow candle body */}
      <rect 
        x="5.5" y="4" 
        width="5" height="7" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        rx="0.8"
      />
      {/* Lower wick */}
      <line x1="8" y1="11" x2="8" y2="15" stroke="currentColor" strokeWidth="1.2"/>
      {/* Inner highlight to emphasize hollow */}
      <rect 
        x="6.5" y="5" 
        width="3" height="5" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="0.5" 
        opacity="0.6"
      />
    </g>
  </svg>
)

const HeikinAshiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <g>
      {/* Upper wick */}
      <line x1="8" y1="1.5" x2="8" y2="3.5" stroke="currentColor" strokeWidth="1.2"/>
      {/* Heikin Ashi body - smoother, more rounded */}
      <ellipse 
        cx="8" cy="7.5" 
        rx="2.5" ry="4" 
        fill="currentColor" 
        opacity="0.8"
      />
      {/* Gradient effect overlay */}
      <ellipse 
        cx="8" cy="6.5" 
        rx="1.8" ry="2.5" 
        fill="currentColor" 
        opacity="0.4"
      />
      {/* Lower wick */}
      <line x1="8" y1="11.5" x2="8" y2="14.5" stroke="currentColor" strokeWidth="1.2"/>
      {/* Distinctive dots for Heikin Ashi */}
      <circle cx="6.5" cy="7" r="0.5" fill="currentColor" opacity="0.6"/>
      <circle cx="9.5" cy="8" r="0.5" fill="currentColor" opacity="0.6"/>
    </g>
  </svg>
)

const BarsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <g>
      {/* Main vertical bar (High-Low) */}
      <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" strokeWidth="2.2"/>
      {/* Open tick (left side) */}
      <line x1="5.5" y1="5" x2="8" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* Close tick (right side) */}
      <line x1="8" y1="11" x2="10.5" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* High marker */}
      <circle cx="8" cy="2" r="1" fill="currentColor" opacity="0.7"/>
      {/* Low marker */}
      <circle cx="8" cy="14" r="1" fill="currentColor" opacity="0.7"/>
      {/* Additional visual elements for OHLC clarity */}
      <line x1="5" y1="4.5" x2="5" y2="5.5" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <line x1="11" y1="10.5" x2="11" y2="11.5" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    </g>
  </svg>
)

const LineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <g>
      {/* Main line chart */}
      <path d="M2 12L5 7L8 9L11 5L14 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Data points */}
      <circle cx="2" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="5" cy="7" r="1.5" fill="currentColor"/>
      <circle cx="8" cy="9" r="1.5" fill="currentColor"/>
      <circle cx="11" cy="5" r="1.5" fill="currentColor"/>
      <circle cx="14" cy="3" r="1.5" fill="currentColor"/>
      {/* Subtle grid lines */}
      <line x1="2" y1="15" x2="14" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      <line x1="2" y1="1" x2="2" y2="15" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
    </g>
  </svg>
)

const AreaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <defs>
      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.6"/>
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    <g>
      {/* Area fill with gradient */}
      <path d="M2 12L5 7L8 9L11 5L14 3L14 15L2 15Z" fill="url(#areaGradient)"/>
      {/* Top line */}
      <path d="M2 12L5 7L8 9L11 5L14 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Data points */}
      <circle cx="2" cy="12" r="1.2" fill="currentColor"/>
      <circle cx="5" cy="7" r="1.2" fill="currentColor"/>
      <circle cx="8" cy="9" r="1.2" fill="currentColor"/>
      <circle cx="11" cy="5" r="1.2" fill="currentColor"/>
      <circle cx="14" cy="3" r="1.2" fill="currentColor"/>
    </g>
  </svg>
)

const BaselineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <g>
      {/* Baseline reference */}
      <line x1="1" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.8"/>
      {/* Above baseline area */}
      <path d="M2 10L5 6L8 8L11 5L14 3L14 10L2 10Z" fill="currentColor" opacity="0.4"/>
      {/* Below baseline area */}
      <path d="M5 10L8 12L11 11L14 13L14 10L5 10Z" fill="currentColor" opacity="0.2"/>
      {/* Main chart line */}
      <path d="M2 10L5 6L8 8L11 5L14 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 10L8 12L11 11L14 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Baseline marker */}
      <circle cx="1" cy="10" r="1" fill="currentColor"/>
      <circle cx="15" cy="10" r="1" fill="currentColor"/>
    </g>
  </svg>
)

const HiLoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <g>
      {/* High-Low bars with different heights */}
      <line x1="3" y1="2" x2="3" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="8" y1="4" x2="8" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="13" y1="3" x2="13" y2="13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      
      {/* High markers */}
      <circle cx="3" cy="2" r="1.2" fill="currentColor"/>
      <circle cx="8" cy="4" r="1.2" fill="currentColor"/>
      <circle cx="13" cy="3" r="1.2" fill="currentColor"/>
      
      {/* Low markers */}
      <circle cx="3" cy="14" r="1.2" fill="currentColor"/>
      <circle cx="8" cy="12" r="1.2" fill="currentColor"/>
      <circle cx="13" cy="13" r="1.2" fill="currentColor"/>
      
      {/* Close price indicators */}
      <rect x="2" y="8" width="2" height="1.5" fill="currentColor" rx="0.3"/>
      <rect x="7" y="7" width="2" height="1.5" fill="currentColor" rx="0.3"/>
      <rect x="12" y="9" width="2" height="1.5" fill="currentColor" rx="0.3"/>
    </g>
  </svg>
)

// Function to get icon for each type
const getIconForType = (typeId: string) => {
  switch (typeId) {
    case 'candles':
      return <BiCandles className="w-6 h-6" />
    case 'hollow-candles':
      return <HollowCandleIcon />
    case 'heikin-ashi':
      return <HeikinAshiIcon />
    case 'bars':
      return <BarsIcon />
    case 'line':
      return <LineIcon />
    case 'area':
      return <AreaIcon />
    case 'baseline':
      return <BaselineIcon />
    case 'hi-lo':
      return <HiLoIcon />
    default:
      return <BiCandles className="w-6 h-6" />
  }
}

interface CandlestickDropdownProps {
  isOpen: boolean
  onToggle: () => void
  selectedType: string
  onCandlestickSelect: (type: string) => void
}

const CandlestickDropdown = ({ isOpen, onToggle, selectedType, onCandlestickSelect }: CandlestickDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Click outside is handled by the parent component

  const handleTypeSelect = (event: React.MouseEvent, type: typeof candlestickTypes[0]) => {
    event.preventDefault()
    event.stopPropagation()
    console.log('Candlestick type selected:', type.id)
    onCandlestickSelect(type.id)
    // The parent component will handle closing the dropdown
  }

  const currentType = candlestickTypes.find(type => type.id === selectedType) || candlestickTypes[0]

  return (
    <div className="relative" ref={dropdownRef} data-candlestick-dropdown>
      <button
        onClick={onToggle}
        className="h-6 px-1.5 rounded flex items-center justify-center gap-1 text-sm font-medium transition-colors min-w-[45px] text-white"
        style={{
          backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          color: '#FFFFFF'
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = 'transparent'
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={currentType.name}
      >
        <div className="w-[18px] h-[18px] flex items-center justify-center">
          {getIconForType(selectedType)}
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-52 bg-black rounded shadow-xl z-[9999] pointer-events-auto"
          style={{ 
            backgroundColor: '#000000',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF'
          }}>
          <div className="py-1">
            {candlestickTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-left text-sm transition-colors cursor-pointer",
                  selectedType === type.id 
                    ? "bg-gray-900 text-white" 
                    : "text-white hover:bg-gray-900"
                )}
                style={{
                  backgroundColor: selectedType === type.id ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  color: '#FFFFFF'
                }}
                onClick={(event) => handleTypeSelect(event, type)}
                onMouseEnter={(e) => {
                  if (selectedType !== type.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedType !== type.id) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                {getIconForType(type.id)}
                <span className="flex-1">{type.name}</span>
                {selectedType === type.id && (
                  <svg width="16" height="16" viewBox="0 0 16 16" className="flex-shrink-0">
                    <path
                      d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CandlestickDropdown 