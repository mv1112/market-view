"use client"

import React, { useState } from 'react'
import { X, Search, User, TrendingUp, BarChart3, Triangle } from 'lucide-react'
import styles from './styles.module.css'

interface HelpPopupProps {
  isOpen: boolean
  onClose: () => void
}

// Sidebar categories for help
const sidebarCategories = [
  { id: 'getting-started', label: 'Getting Started', icon: User },
  { id: 'trading', label: 'Trading Help', icon: TrendingUp },
  { id: 'technical', label: 'Technical Analysis', icon: BarChart3 },
  { id: 'account', label: 'Account & Billing', icon: Triangle },
]

// Main content tabs
const contentTabs = [
  { id: 'guides', label: 'Guides' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'videos', label: 'Videos' },
]

const helpList = [
  'How to place your first order', 'Understanding chart types', 'Setting up price alerts',
  'How to use indicators', 'Risk management basics', 'Account verification process',
  'Reading candlestick patterns', 'Using drawing tools', 'Portfolio management tips',
  'Technical analysis fundamentals', 'Options trading guide', 'Futures trading basics',
  'Market hours and sessions', 'Understanding spreads', 'Platform navigation tutorial'
]

export default function HelpPopup({ isOpen, onClose }: HelpPopupProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSidebarCategory, setSelectedSidebarCategory] = useState('getting-started')
  const [selectedContentTab, setSelectedContentTab] = useState('guides')

  if (!isOpen) return null

  return (
    <div className={styles.popupBackdrop} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <h1 className={styles.popupTitle}>Help</h1>
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
              placeholder="Search help topics"
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
                {helpList
                  .filter(help =>
                    help.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((help, index) => (
                    <button key={index} className={styles.listItem}>
                      <span className={styles.text}>{help}</span>
                      <div className={styles.action}>
                        <span className={styles.actionIcon} title="Click to open help article">
                          →
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