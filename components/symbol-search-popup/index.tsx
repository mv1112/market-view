"use client"

import React, { useState } from 'react'
import { X, Search } from 'lucide-react'
import styles from './styles.module.css'

interface SymbolSearchPopupProps {
  isOpen: boolean
  onClose: () => void
  onSelectSymbol?: (symbol: string) => void
}

// Content tabs - now using categories instead
const contentTabs = [
  { id: 'all', label: 'All' },
  { id: 'stocks', label: 'Stocks' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'forex', label: 'Forex' },
  { id: 'indices', label: 'Indices' },
  { id: 'futures', label: 'Futures' },
  { id: 'bonds', label: 'Bonds' },
  { id: 'options', label: 'Options' },
]

// Sample symbols data
const SYMBOLS = [
  { symbol: 'NIFTY', desc: 'NIFTY 50 INDEX', type: 'index', exchange: 'NSE', category: 'indices' },
  { symbol: 'BTCUSD', desc: 'BITCOIN / U.S. DOLLAR', type: 'spot crypto', exchange: 'BITSTAMP', category: 'crypto' },
  { symbol: 'XAUUSD', desc: 'GOLD', type: 'commodity cfd', exchange: 'OANDA', category: 'futures' },
  { symbol: 'BANKNIFTY', desc: 'NIFTY BANK INDEX', type: 'index', exchange: 'NSE', category: 'indices' },
  { symbol: 'BTCUSDT', desc: 'BITCOIN / TETHERUS', type: 'spot crypto', exchange: 'Binance', category: 'crypto' },
  { symbol: 'RELIANCE', desc: 'RELIANCE INDUSTRIES LTD', type: 'stock', exchange: 'NSE', category: 'stocks' },
  { symbol: 'BTCUSDT.P', desc: 'BITCOIN / TETHERUS PERPETUAL CONTRACT', type: 'swap crypto', exchange: 'Binance', category: 'crypto' },
  { symbol: 'XAUUSD', desc: 'GOLD / U.S. DOLLAR', type: 'commodity cfd', exchange: 'FOREX.com', category: 'futures' },
  { symbol: 'HDFCBANK', desc: 'HDFC BANK LTD', type: 'stock', exchange: 'NSE', category: 'stocks' },
  { symbol: 'ETHUSD', desc: 'ETHEREUM', type: 'spot crypto', exchange: 'CRYPTO', category: 'crypto' },
  { symbol: 'EURUSD', desc: 'EURO / U.S. DOLLAR', type: 'forex', exchange: 'FOREX', category: 'forex' },
  { symbol: 'GBPUSD', desc: 'BRITISH POUND / U.S. DOLLAR', type: 'forex', exchange: 'FOREX', category: 'forex' },
]

export default function SymbolSearchPopup({ isOpen, onClose, onSelectSymbol }: SymbolSearchPopupProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState('all')

  const handleSymbolClick = (symbol: string) => {
    if (onSelectSymbol) {
      onSelectSymbol(symbol)
    }
    onClose()
  }

  if (!isOpen) return null

  const filteredSymbols = SYMBOLS.filter(s =>
    (selectedTab === 'all' || s.category === selectedTab) &&
    (s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
     s.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className={styles.popupBackdrop} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <h1 className={styles.popupTitle}>Symbol Search</h1>
          <button onClick={onClose} className={styles.closeButton}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              autoFocus
            />
          </div>
        </div>

        {/* Content Area without sidebar */}
        <div className={styles.contentAreaFull}>
          {/* Content Tabs */}
          <div className={styles.contentTabsContainer}>
            <div className={styles.contentTabs}>
              {contentTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`${styles.tabButton} ${
                    selectedTab === tab.id ? styles.active : ''
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content List */}
          <div className={styles.contentList}>
            {filteredSymbols.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>No symbols found.</p>
              </div>
            ) : (
              filteredSymbols.map((symbol, index) => (
                <button
                  key={index}
                  onClick={() => handleSymbolClick(symbol.symbol)}
                  className={styles.listItem}
                >
                  <span className={styles.text}>
                    {symbol.symbol} - {symbol.desc}
                  </span>
                  <div className={styles.action}>
                    <span className={styles.actionIcon} title="Select symbol">
                      +
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 