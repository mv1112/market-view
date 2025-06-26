"use client"

import React, { useState } from 'react'
import { X, Search, User, TrendingUp, BarChart3, Triangle } from 'lucide-react'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white text-gray-900 border border-gray-300 max-w-5xl w-full max-h-[90vh] h-[90vh] rounded-lg overflow-hidden mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-medium text-gray-900">Notification</h1>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 pb-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 h-5 w-5" />
            <input
              type="text"
              placeholder="Search notifications"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-gray-900"
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden h-[calc(100%-140px)]">
          {/* Left Sidebar */}
          <div className="w-56 bg-gray-50 border-r border-gray-300 flex-shrink-0">
            <div className="p-3">
              {sidebarCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedSidebarCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors mb-1 ${
                      selectedSidebarCategory === category.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="font-medium text-sm">{category.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Content Tabs */}
            <div className="px-6 py-1 border-b border-gray-300">
              <div className="flex gap-1">
                {contentTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedContentTab(tab.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      selectedContentTab === tab.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content List */}
            <div 
              className="flex-1 overflow-y-auto"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#d1d5db white'
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  width: 8px;
                }
                div::-webkit-scrollbar-track {
                  background: white;
                }
                div::-webkit-scrollbar-thumb {
                  background: #d1d5db;
                  border-radius: 4px;
                }
                div::-webkit-scrollbar-thumb:hover {
                  background: #9ca3af;
                }
              `}</style>
              <div className="px-6 pt-2 pb-0">
                <div className="space-y-0.5">
                  {notificationsList
                    .filter(notification => 
                      notification.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((notification, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center justify-between px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group cursor-pointer"
                      >
                        <span className="text-sm group-hover:text-gray-900 text-left">{notification}</span>
                        <div className="relative">
                          <span 
                            className="text-gray-600 group-hover:text-gray-700 text-xs font-mono"
                            title="Click to view notification"
                          >
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
    </div>
  )
} 