"use client"

import React, { useState } from 'react'
import { X, Search, User, TrendingUp, BarChart3, Triangle } from 'lucide-react'
import styles from './styles.module.css'

interface ResearchPopupProps {
  isOpen: boolean
  onClose: () => void
}

// Sidebar categories for research
const sidebarCategories = [
  { id: 'reports', label: 'Reports', icon: User },
  { id: 'analysis', label: 'Analysis', icon: TrendingUp },
  { id: 'news', label: 'News', icon: BarChart3 },
  { id: 'earnings', label: 'Earnings', icon: Triangle },
]

// Main content tabs
const contentTabs = [
  { id: 'recent', label: 'Recent' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'trending', label: 'Trending' },
]

const researchList = [
  'Market Overview Report', 'Sector Analysis: Technology', 'Earnings Preview Q4', 'Technical Analysis: NIFTY',
  'Economic Calendar', 'Market Sentiment Report', 'Options Flow Analysis', 'Insider Trading Activity',
  'Institutional Holdings', 'Analyst Recommendations', 'Price Target Updates', 'Risk Assessment',
  'Volatility Analysis', 'Correlation Studies', 'Seasonal Patterns'
]

export default function ResearchPopup({ isOpen, onClose }: ResearchPopupProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSidebarCategory, setSelectedSidebarCategory] = useState('reports')
  const [selectedContentTab, setSelectedContentTab] = useState('recent')

  if (!isOpen) return null

  return (
    <div className={styles.popupBackdrop} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <h1 className={styles.popupTitle}>Research</h1>
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
              placeholder="Search research"
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
                {researchList
                  .filter(research =>
                    research.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((research, index) => (
                    <button key={index} className={styles.listItem}>
                      <span className={styles.text}>{research}</span>
                      <div className={styles.action}>
                        <span className={styles.actionIcon} title="Click to view research">
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