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
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <g>
      <line x1="8" y1="2" x2="8" y2="4" stroke="currentColor" strokeWidth="1"/>
      <rect x="6" y="4" width="4" height="6" fill="none" stroke="currentColor" strokeWidth="1.5" rx="0.5"/>
      <line x1="8" y1="10" x2="8" y2="14" stroke="currentColor" strokeWidth="1"/>
    </g>
  </svg>
)

const HeikinAshiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <g>
      <line x1="8" y1="2" x2="8" y2="4" stroke="currentColor" strokeWidth="1"/>
      <rect x="6.5" y="4" width="3" height="6" fill="currentColor" rx="1"/>
      <line x1="8" y1="10" x2="8" y2="14" stroke="currentColor" strokeWidth="1"/>
    </g>
  </svg>
)

const BarsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <g>
      <line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
      <line x1="6" y1="5" x2="8" y2="5" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="11" x2="10" y2="11" stroke="currentColor" strokeWidth="1.5"/>
    </g>
  </svg>
)

const LineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <path d="M2 12L6 6L10 8L14 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
)

const AreaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <path d="M2 12L6 6L10 8L14 4L14 14L2 14Z" fill="currentColor" opacity="0.3"/>
    <path d="M2 12L6 6L10 8L14 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
)

const BaselineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <line x1="2" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
    <path d="M2 10L6 6L10 8L14 4L14 10L2 10Z" fill="currentColor" opacity="0.3"/>
    <path d="M2 10L6 6L10 8L14 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
)

const HiLoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <g>
      <line x1="4" y1="3" x2="4" y2="13" stroke="currentColor" strokeWidth="1"/>
      <line x1="8" y1="5" x2="8" y2="11" stroke="currentColor" strokeWidth="1"/>
      <line x1="12" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="1"/>
      <circle cx="4" cy="8" r="1" fill="currentColor"/>
      <circle cx="8" cy="8" r="1" fill="currentColor"/>
      <circle cx="12" cy="8" r="1" fill="currentColor"/>
    </g>
  </svg>
)

// Function to get icon for each type
const getIconForType = (typeId: string) => {
  switch (typeId) {
    case 'candles':
      return <CandleIcon />
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
      return <CandleIcon />
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Don't close here, let the parent handle it
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleTypeSelect = (type: typeof candlestickTypes[0]) => {
    onCandlestickSelect(type.id)
  }

  const currentType = candlestickTypes.find(type => type.id === selectedType) || candlestickTypes[0]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="h-8 px-3 hover:bg-white hover:text-black rounded flex items-center gap-2 text-sm transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <CandlestickIcon />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-6 w-52 bg-white border-2 border-gray-300 rounded shadow-xl z-50">
          <div className="py-1">
            {candlestickTypes.map((type) => (
              <button
                key={type.id}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-left text-sm transition-colors",
                  selectedType === type.id 
                    ? "bg-gray-900 text-white" 
                    : "text-gray-900 hover:bg-gray-100"
                )}
                onClick={() => handleTypeSelect(type)}
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