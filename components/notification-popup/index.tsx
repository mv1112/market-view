"use client"

import React, { useState } from 'react'
import { X, Search, User, TrendingUp, BarChart3, Triangle } from 'lucide-react'
import styles from './styles.module.css'

interface NotificationPopupProps {
  isOpen: boolean
  onClose: () => void
}

// Sidebar categories for notifications
const sidebarCategories = [
  { id: 'trading', label: 'Trading', icon: User },
  { id: 'alerts', label: 'Alerts', icon: TrendingUp },
  { id: 'news', label: 'News', icon: BarChart3 },
  { id: 'system', label: 'System', icon: Triangle },
]

// Main content tabs
const contentTabs = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'important', label: 'Important' },
]

const notificationsList = [
  'Your NIFTY position is up 5%', 'Price alert: RELIANCE above ₹2500', 'Market opened - Good morning!',
  'Your order has been executed', 'New earnings report available', 'System maintenance scheduled',
  'Portfolio performance weekly summary', 'Margin call warning', 'New message in Trading Team chat',
  'BANKNIFTY volatility spike detected', 'Dividend announcement: TCS', 'Option expiry reminder',
  'Risk limit threshold reached', 'New research report published', 'Account verification completed'
]

export default function NotificationPopup({ isOpen, onClose }: NotificationPopupProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSidebarCategory, setSelectedSidebarCategory] = useState('trading')
  const [selectedContentTab, setSelectedContentTab] = useState('all')

  if (!isOpen) return null

  return (
    <div className={styles.popupBackdrop} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <h1 className={styles.popupTitle}>Notification</h1>
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
              placeholder="Search notifications"
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
                {notificationsList
                  .filter(notification =>
                    notification.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((notification, index) => (
                    <button key={index} className={styles.listItem}>
                      <span className={styles.text}>{notification}</span>
                      <div className={styles.action}>
                        <span className={styles.actionIcon} title="Click to view notification">
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