"use client"

import React, { useState, useMemo } from 'react'
import { X, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog'

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

const getExchangeBadgeColor = (type: string, exchange?: string, provider?: string) => {
  const source = exchange || provider
  switch (source) {
    case 'NSE': return 'bg-orange-500 text-white'
    case 'BITSTAMP': return 'bg-green-500 text-white'
    case 'OANDA': return 'bg-blue-500 text-white'
    case 'Binance': return 'bg-yellow-500 text-black'
    case 'NYSE Arca': return 'bg-blue-600 text-white'
    case 'CME': return 'bg-cyan-500 text-white'
    case 'NASDAQ': return 'bg-purple-500 text-white'
    case 'SP': return 'bg-red-500 text-white'
    case 'FXCM': return 'bg-blue-400 text-white'
    case 'Coinbase': return 'bg-blue-500 text-white'
    default: return 'bg-gray-500 text-white'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'stock': return '📈'
    case 'crypto': return '₿'
    case 'forex': return '💱'
    case 'index': return '📊'
    case 'fund': return '💼'
    case 'future': return '📋'
    case 'bond': return '🏛️'
    case 'economy': return '🌍'
    case 'option': return '⚙️'
    default: return '💹'
  }
}

export default function SymbolSearchPopup({ isOpen, onClose, onSymbolSelect }: SymbolSearchPopupProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50 backdrop-blur-sm" />
      <DialogContent className="bg-white text-gray-900 border-gray-300 max-w-4xl w-full max-h-[80vh] p-0 gap-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold">Symbol Search</h2>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-gray-300">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded text-gray-900 placeholder-gray-600 focus:outline-none focus:border-gray-900"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-4 py-2 border-b border-gray-300">
          <div className="flex gap-1 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Instruments List */}
        <div className="overflow-y-auto pb-0" style={{ height: 'calc(80vh - 200px)' }}>
          {filteredInstruments.map((instrument) => (
            <div
              key={instrument.id}
              onClick={() => handleSymbolClick(instrument.symbol)}
              className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(instrument.type)}</span>
                  <div>
                    <div className="font-medium text-gray-900">{instrument.symbol}</div>
                    <div className="text-sm text-gray-600">{instrument.name}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {instrument.category && (
                  <span className="text-xs text-gray-600">{instrument.category}</span>
                )}
                <span className={`text-xs px-2 py-1 rounded font-medium ${getExchangeBadgeColor(instrument.type, instrument.exchange, instrument.provider)}`}>
                  {instrument.exchange || instrument.provider || instrument.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
          
          {filteredInstruments.length === 0 && (
            <div className="p-4 text-center text-gray-600">
              No instruments found
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 