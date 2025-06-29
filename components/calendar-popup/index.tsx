"use client"

import React, { useState } from 'react'
import { X, Search, User, TrendingUp, BarChart3, Triangle } from 'lucide-react'
import styles from './styles.module.css'

interface CalendarPopupProps {
  isOpen: boolean
  onClose: () => void
}

// Sidebar categories for calendar
const sidebarCategories = [
  { id: 'earnings', label: 'Earnings', icon: User },
  { id: 'economic', label: 'Economic Data', icon: TrendingUp },
  { id: 'dividends', label: 'Dividends', icon: BarChart3 },
  { id: 'events', label: 'Market Events', icon: Triangle },
]

// Main content tabs
const contentTabs = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
]

const calendarList = [
  'Apple Q4 Earnings - After Market', 'Tesla Q4 Earnings - Pre Market', 'GDP Release - 8:30 AM',
  'FOMC Meeting Minutes - 2:00 PM', 'Non-Farm Payrolls - 8:30 AM', 'CPI Data Release - 8:30 AM',
  'Microsoft Dividend Ex-Date', 'Amazon Earnings Call - 5:00 PM', 'Oil Inventory Report - 10:30 AM',
  'Retail Sales Data - 8:30 AM', 'NVIDIA Conference Call - 5:30 PM', 'Bank of Japan Meeting',
  'European Central Bank Decision', 'Weekly Jobless Claims - 8:30 AM', 'Consumer Confidence - 10:00 AM'
]

export default function CalendarPopup({ isOpen, onClose }: CalendarPopupProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSidebarCategory, setSelectedSidebarCategory] = useState('earnings')
  const [selectedContentTab, setSelectedContentTab] = useState('today')

  if (!isOpen) return null

  return (
    <div className={styles.popupBackdrop} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <h1 className={styles.popupTitle}>Calendar</h1>
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
              placeholder="Search calendar events"
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
                {calendarList
                  .filter(event =>
                    event.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((event, index) => (
                    <button key={index} className={styles.listItem}>
                      <span className={styles.text}>{event}</span>
                      <div className={styles.action}>
                        <span className={styles.actionIcon} title="Click to view event details">
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