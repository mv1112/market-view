"use client"

import React, { useState } from 'react'
import { X, Search, User, TrendingUp, BarChart3, Triangle } from 'lucide-react'
import styles from './styles.module.css'

interface ChatsPopupProps {
  isOpen: boolean
  onClose: () => void
}

// Sidebar categories for chats
const sidebarCategories = [
  { id: 'direct', label: 'Direct Messages', icon: User },
  { id: 'groups', label: 'Groups', icon: TrendingUp },
  { id: 'channels', label: 'Channels', icon: BarChart3 },
  { id: 'notifications', label: 'Notifications', icon: Triangle },
]

// Main content tabs
const contentTabs = [
  { id: 'recent', label: 'Recent' },
  { id: 'unread', label: 'Unread' },
  { id: 'favorites', label: 'Favorites' },
]

const chatsList = [
  'Trading Team Chat', 'Market Analysis Group', 'Options Traders', 'Crypto Discussion',
  'Technical Analysis', 'News & Updates', 'Strategy Sharing', 'Risk Management',
  'Portfolio Discussion', 'Earnings Chat', 'Day Traders', 'Swing Traders',
  'Investment Club', 'Market Alerts', 'General Trading'
]

export default function ChatsPopup({ isOpen, onClose }: ChatsPopupProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSidebarCategory, setSelectedSidebarCategory] = useState('direct')
  const [selectedContentTab, setSelectedContentTab] = useState('recent')

  if (!isOpen) return null

  return (
    <div className={styles.popupBackdrop} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.popupHeader}>
          <h1 className={styles.popupTitle}>Chats</h1>
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
              placeholder="Search chats"
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
                {chatsList
                  .filter(chat =>
                    chat.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((chat, index) => (
                    <button key={index} className={styles.listItem}>
                      <span className={styles.text}>{chat}</span>
                      <div className={styles.action}>
                        <span className={styles.actionIcon} title="Click to open chat">
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