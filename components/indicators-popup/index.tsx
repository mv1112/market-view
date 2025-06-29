"use client"

import React, { useState } from 'react'
import { X, Search, User, TrendingUp, BarChart3, Triangle } from 'lucide-react'
import { ALL_INDICATORS } from '@/lib/indicators'
import styles from './styles.module.css'

interface IndicatorsPopupProps {
  isOpen: boolean
  onClose: () => void
  onApplyIndicator: (indicatorName: string) => void
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

export default function IndicatorsPopup({ isOpen, onClose, onApplyIndicator }: IndicatorsPopupProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSidebarCategory, setSelectedSidebarCategory] = useState('technicals')
  const [selectedContentTab, setSelectedContentTab] = useState('indicators')

  const handleIndicatorClick = (indicatorName: string) => {
    onApplyIndicator(indicatorName)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.popupBackdrop} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <h1 className={styles.popupTitle}>Indicators, metrics, and strategies</h1>
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
              {/* Indicators Content */}
              <div className={`space-y-0.5 ${selectedContentTab !== 'indicators' ? 'hidden' : ''}`}>
                {ALL_INDICATORS
                  .filter(indicator =>
                    indicator.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((indicator, index) => (
                    <button
                      key={index}
                      onClick={() => handleIndicatorClick(indicator)}
                      className={styles.listItem}
                    >
                      <span className={styles.text}>{indicator}</span>
                      <div className={styles.action}>
                        <span className={styles.actionIcon} title="Click to apply indicator">
                          +
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
              
              {/* Strategies Content */}
              <div className={`space-y-0.5 ${selectedContentTab !== 'strategies' ? 'hidden' : ''}`}>
                <div className="text-center text-gray-500 py-8">
                  <p>Strategies coming soon...</p>
                </div>
              </div>
              
              {/* Profiles Content */}
              <div className={`space-y-0.5 ${selectedContentTab !== 'profiles' ? 'hidden' : ''}`}>
                <div className="text-center text-gray-500 py-8">
                  <p>Profiles coming soon...</p>
                </div>
              </div>
              
              {/* Patterns Content */}
              <div className={`space-y-0.5 ${selectedContentTab !== 'patterns' ? 'hidden' : ''}`}>
                <div className="text-center text-gray-500 py-8">
                  <p>Patterns coming soon...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 