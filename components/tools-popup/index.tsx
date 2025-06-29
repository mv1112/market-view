"use client"

import React, { useState } from 'react'
import { X, Search, User, TrendingUp, BarChart3, Triangle } from 'lucide-react'
import styles from './styles.module.css'

interface ToolsPopupProps {
  isOpen: boolean
  onClose: () => void
}

// Sidebar categories for tools
const sidebarCategories = [
  { id: 'drawing', label: 'Drawing', icon: User },
  { id: 'analysis', label: 'Analysis', icon: TrendingUp },
  { id: 'alerts', label: 'Alerts', icon: BarChart3 },
  { id: 'templates', label: 'Templates', icon: Triangle },
]

// Main content tabs
const contentTabs = [
  { id: 'all', label: 'All Tools' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'recent', label: 'Recent' },
]

const toolsList = [
  'Trend Line', 'Support Line', 'Resistance Line', 'Horizontal Line', 'Vertical Line',
  'Rectangle', 'Ellipse', 'Fibonacci Retracement', 'Fibonacci Extension', 'Gann Fan',
  'Price Range', 'Measuring Tool', 'Text Box', 'Arrow', 'Callout'
]

export default function ToolsPopup({ isOpen, onClose }: ToolsPopupProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSidebarCategory, setSelectedSidebarCategory] = useState('drawing')
  const [selectedContentTab, setSelectedContentTab] = useState('all')

  if (!isOpen) return null

  return (
    <div className={styles.popupBackdrop} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <h1 className={styles.popupTitle}>Tools</h1>
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
              placeholder="Search tools"
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
                {toolsList
                  .filter(tool =>
                    tool.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((tool, index) => (
                    <button key={index} className={styles.listItem}>
                      <span className={styles.text}>{tool}</span>
                      <div className={styles.action}>
                        <span className={styles.actionIcon} title="Click to select tool">
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