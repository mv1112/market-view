"use client"

import React, { useState } from 'react'
import { X, Search, User, TrendingUp, BarChart3, Triangle } from 'lucide-react'
import styles from './styles.module.css'

interface AlertsPopupProps {
  isOpen: boolean
  onClose: () => void
}

// Sidebar categories for alerts
const sidebarCategories = [
  { id: 'price', label: 'Price Alerts', icon: User },
  { id: 'technical', label: 'Technical', icon: TrendingUp },
  { id: 'volume', label: 'Volume', icon: BarChart3 },
  { id: 'news', label: 'News', icon: Triangle },
]

// Main content tabs
const contentTabs = [
  { id: 'active', label: 'Active' },
  { id: 'triggered', label: 'Triggered' },
  { id: 'templates', label: 'Templates' },
]

const alertsList = [
  'Price Above $100', 'Price Below $90', 'RSI Overbought', 'RSI Oversold', 'Volume Spike',
  'Moving Average Cross', 'Support Level Break', 'Resistance Level Break', 'MACD Signal',
  'Bollinger Band Touch', 'Fibonacci Level', 'Gap Up Alert', 'Gap Down Alert'
]

export default function AlertsPopup({ isOpen, onClose }: AlertsPopupProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSidebarCategory, setSelectedSidebarCategory] = useState('price')
  const [selectedContentTab, setSelectedContentTab] = useState('active')

  if (!isOpen) return null

  return (
    <div className={styles.popupBackdrop} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <h1 className={styles.popupTitle}>Alerts</h1>
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
              placeholder="Search alerts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className={styles.mainContentArea}>
          {/* Left Sidebar */}
          <div className={styles.sidebar}>
            {sidebarCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedSidebarCategory(category.id)}
                  className={`${styles.sidebarButton} ${
                    selectedSidebarCategory === category.id ? styles.active : ''
                  }`}
                >
                  <IconComponent className={styles.icon} />
                  <span className={styles.label}>{category.label}</span>
                </button>
              )
            })}
          </div>

          {/* Right Content Area */}
          <div className={styles.contentArea}>
            {/* Content Tabs */}
            <div className={styles.contentTabsContainer}>
              <div className={styles.contentTabs}>
                {contentTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedContentTab(tab.id)}
                    className={`${styles.tabButton} ${
                      selectedContentTab === tab.id ? styles.active : ''
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content List */}
            <div className={styles.contentList}>
              <div className="space-y-0.5">
                {alertsList
                  .filter(alert =>
                    alert.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((alert, index) => (
                    <button key={index} className={styles.listItem}>
                      <span className={styles.text}>{alert}</span>
                      <div className={styles.action}>
                        <span className={styles.actionIcon} title="Click to setup alert">
                          +
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 