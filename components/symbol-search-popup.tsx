"use client"

import React, { useState, useMemo } from 'react'
import { X, Search } from 'lucide-react'

// Types for financial instruments
interface FinancialInstrument {
  id: string
  symbol: string
  name: string
  type: 'stock' | 'fund' | 'future' | 'forex' | 'crypto' | 'index' | 'bond' | 'economy' | 'option'
  exchange?: string
  provider?: string
  category?: string
}

// Sample data - replace with real data from your API
const sampleInstruments: FinancialInstrument[] = [
  { id: '1', symbol: 'NIFTY', name: 'NIFTY 50 INDEX', type: 'index', exchange: 'NSE' },
  { id: '2', symbol: 'BTCUSD', name: 'BITCOIN / U.S. DOLLAR', type: 'crypto', provider: 'BITSTAMP' },
  { id: '3', symbol: 'XAUUSD', name: 'GOLD', type: 'forex', category: 'commodity cfd' },
  { id: '4', symbol: 'BTCUSDT', name: 'BITCOIN / TETHERUS', type: 'crypto', provider: 'Binance' },
  { id: '5', symbol: 'SPY', name: 'SPDR S&P 500 ETF TRUST', type: 'fund', exchange: 'NYSE Arca' },
  { id: '6', symbol: 'NQ', name: 'E-MINI NASDAQ-100 FUTURES', type: 'future', exchange: 'CME' },
  { id: '7', symbol: 'ES', name: 'E-MINI S&P 500 FUTURES', type: 'future', exchange: 'CME' },
  { id: '8', symbol: 'TSLA', name: 'TESLA, INC.', type: 'stock', exchange: 'NASDAQ' },
  { id: '9', symbol: 'SPX', name: 'S&P 500', type: 'index', category: 'index cfd' },
  { id: '10', symbol: 'EURUSD', name: 'EURO/US DOLLAR', type: 'forex', provider: 'FXCM' },
  { id: '11', symbol: 'BTCUSD', name: 'BITCOIN / US DOLLAR', type: 'crypto', provider: 'Coinbase' }
]

interface SymbolSearchPopupProps {
  isOpen: boolean
  onClose: () => void
  onSymbolSelect: (symbol: string) => void
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'stock', label: 'Stocks' },
  { id: 'fund', label: 'Funds' },
  { id: 'future', label: 'Futures' },
  { id: 'forex', label: 'Forex' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'index', label: 'Indices' },
  { id: 'bond', label: 'Bonds' },
  { id: 'economy', label: 'Economy' },
  { id: 'option', label: 'Options' }
]

const getExchangeBadgeStyle = (type: string, exchange?: string, provider?: string) => {
  const source = exchange || provider
  // Only using black and white theme
  switch (source) {
    case 'NSE': return 'bg-gray-800 text-white border border-gray-700'
    case 'BITSTAMP': return 'bg-white text-black border border-gray-300'
    case 'OANDA': return 'bg-black text-white border border-gray-600'
    case 'Binance': return 'bg-gray-700 text-white border border-gray-600'
    case 'NYSE Arca': return 'bg-white text-black border border-gray-300'
    case 'CME': return 'bg-gray-800 text-white border border-gray-700'
    case 'NASDAQ': return 'bg-black text-white border border-gray-600'
    case 'SP': return 'bg-white text-black border border-gray-300'
    case 'FXCM': return 'bg-gray-700 text-white border border-gray-600'
    case 'Coinbase': return 'bg-black text-white border border-gray-600'
    default: return 'bg-gray-800 text-white border border-gray-700'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'stock': 
      return (
        <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
          S
        </div>
      )
    case 'crypto': 
      return (
        <div className="w-6 h-6 bg-black border border-white rounded-full flex items-center justify-center text-white text-xs font-bold">
          ₿
        </div>
      )
    case 'forex': 
      return (
        <div className="w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-black text-xs font-bold">
          FX
        </div>
      )
    case 'index': 
      return (
        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
          I
        </div>
      )
    case 'fund': 
      return (
        <div className="w-6 h-6 bg-gray-800 border border-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
          F
        </div>
      )
    case 'future': 
      return (
        <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
          FU
        </div>
      )
    case 'bond': 
      return (
        <div className="w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-black text-xs font-bold">
          B
        </div>
      )
    case 'economy': 
      return (
        <div className="w-6 h-6 bg-gray-900 border border-gray-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
          E
        </div>
      )
    case 'option': 
      return (
        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
          O
        </div>
      )
    default: 
      return (
        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
          ?
        </div>
      )
  }
}

export default function SymbolSearchPopup({ isOpen, onClose, onSymbolSelect }: SymbolSearchPopupProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Add custom scrollbar styles for white theme
  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .symbol-search-scroll::-webkit-scrollbar {
        width: 8px;
      }
      .symbol-search-scroll::-webkit-scrollbar-track {
        background: white;
      }
      .symbol-search-scroll::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 4px;
      }
      .symbol-search-scroll::-webkit-scrollbar-thumb:hover {
        background: #9ca3af;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const filteredInstruments = useMemo(() => {
    let filtered = sampleInstruments

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(instrument => instrument.type === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(instrument =>
        instrument.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instrument.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }, [searchQuery, selectedCategory])

  const handleSymbolClick = (symbol: string) => {
    onSymbolSelect(symbol)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] border-2 border-gray-300 shadow-2xl rounded-lg overflow-hidden"
        style={{ backgroundColor: 'white', color: '#111827' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-2 bg-white" style={{ backgroundColor: 'white' }}>
          <h2 className="text-lg font-semibold tracking-wide text-gray-900" style={{ color: '#111827' }}>Symbol Search</h2>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-white hover:bg-gray-900 p-2 rounded-full transition-all duration-200"
            style={{ color: '#6B7280' }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="px-6 py-2 bg-white border-b border-gray-300" style={{ backgroundColor: 'white' }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
            <input
              type="text"
              placeholder="Search symbols, names, or exchanges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded text-gray-900 placeholder-gray-600 focus:outline-none focus:border-gray-900 focus:ring-0 transition-all duration-200 text-sm"
              style={{ color: '#111827', backgroundColor: '#f3f4f6', borderColor: '#d1d5db' }}
            />
          </div>
                </div>

        {/* Category Buttons */}
        <div className="px-6 py-2 bg-white border-b border-gray-300" style={{ backgroundColor: 'white' }}>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`h-8 px-3 rounded flex items-center text-sm transition-colors whitespace-nowrap border-0 focus:outline-none focus:ring-0 ${
                  selectedCategory === category.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? '#111827' : 'white',
                  color: selectedCategory === category.id ? 'white' : '#111827',
                  border: 'none'
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Instruments List */}
        <div 
          className="overflow-y-auto h-[500px] bg-white symbol-search-scroll" 
          style={{ 
            backgroundColor: 'white',
            scrollbarWidth: 'thin',
            scrollbarColor: '#d1d5db white'
          }}
        >
          {filteredInstruments.map((instrument, index) => (
            <div
              key={instrument.id}
              onClick={() => handleSymbolClick(instrument.symbol)}
              className={`flex items-center justify-between px-6 py-2 mx-2 my-1 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-all duration-150 rounded-lg ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0">
                  {getTypeIcon(instrument.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-base tracking-wide text-gray-900">
                      {instrument.symbol}
                    </div>
                    <div className="text-sm opacity-70 truncate text-gray-600">
                      {instrument.name}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-xs px-3 py-1.5 rounded-md font-semibold tracking-wide ${getExchangeBadgeStyle(instrument.type, instrument.exchange, instrument.provider)}`}>
                  {instrument.exchange || instrument.provider || instrument.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
          
          {filteredInstruments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-600" />
              </div>
              <div className="text-gray-600 text-lg font-medium mb-2">No instruments found</div>
              <div className="text-gray-500 text-sm">Try adjusting your search or category filter</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 