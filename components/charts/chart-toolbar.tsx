"use client"

import { MdFullscreen, MdFullscreenExit } from "react-icons/md"
import { FaCamera } from "react-icons/fa"
import { LuScreenShare, LuLogOut, LuAlarmClock, LuMaximize } from "react-icons/lu"
import { SquarePlay } from "lucide-react"
import { GiArchiveResearch } from "react-icons/gi"
import { BiChat } from "react-icons/bi"
import { IoCalendarNumberOutline } from "react-icons/io5"
import { BsQuestionCircle } from "react-icons/bs"
import { IoMdNotificationsOutline } from "react-icons/io"
import { MdModeEditOutline } from "react-icons/md"
import Link from "next/link"
import { LogoutButton } from "@/components/logout-button"

interface ChartState {
  symbol: string
  timeFrame: string
  candlestickType: string
  appliedIndicators: string[]
  isFullscreen: boolean
}

interface ActivePopups {
  timeFrameDropdown: boolean
  candlestickDropdown: boolean
  indicators: boolean
  settings: boolean
  tools: boolean
  alerts: boolean
  research: boolean
  chats: boolean
  calendar: boolean
  notification: boolean
  help: boolean
}

interface ChartToolbarProps {
  userEmail: string
  chartState: ChartState
  activePopups: ActivePopups
  onTimeFrameToggle: () => void
  onCandlestickToggle: () => void
  onIndicatorsToggle: () => void
  onSettingsToggle: () => void
  onToolsToggle: () => void
  onAlertsToggle: () => void
  onResearchToggle: () => void
  onChatsToggle: () => void
  onCalendarToggle: () => void
  onNotificationToggle: () => void
  onHelpToggle: () => void
  onFullscreenToggle: () => void
  onScreenshotCapture: () => void
}

export default function ChartToolbar({
  userEmail,
  chartState,
  activePopups,
  onTimeFrameToggle,
  onCandlestickToggle,
  onIndicatorsToggle,
  onSettingsToggle,
  onToolsToggle,
  onAlertsToggle,
  onResearchToggle,
  onChatsToggle,
  onCalendarToggle,
  onNotificationToggle,
  onHelpToggle,
  onFullscreenToggle,
  onScreenshotCapture
}: ChartToolbarProps) {
  
  const getEmailInitial = (email: string) => {
    return email.charAt(0).toUpperCase()
  }

  return (
    <header className="bg-gray-900 text-white border-b border-gray-700 px-4 py-2 flex items-center justify-between relative z-50">
      {/* Left section - Trading controls */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">MV</span>
          </div>
          <span className="font-semibold text-lg">MarketView</span>
        </Link>

        {/* Time Frame */}
        <button
          onClick={onTimeFrameToggle}
          className={`px-3 py-1.5 rounded border transition-colors ${
            activePopups.timeFrameDropdown
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800'
          }`}
        >
          {chartState.timeFrame}
        </button>

        {/* Candlestick Type */}
        <button
          onClick={onCandlestickToggle}
          className={`px-3 py-1.5 rounded border transition-colors ${
            activePopups.candlestickDropdown
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800'
          }`}
        >
          {chartState.candlestickType}
        </button>

        {/* Indicators */}
        <button
          onClick={onIndicatorsToggle}
          className={`px-3 py-1.5 rounded border transition-colors ${
            activePopups.indicators
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800'
          }`}
        >
          Indicators ({chartState.appliedIndicators.length})
        </button>
      </div>

      {/* Center section - Tool icons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onAlertsToggle}
          className={`p-2 rounded transition-colors ${
            activePopups.alerts
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-800'
          }`}
          title="Alerts"
        >
          <LuAlarmClock className="w-5 h-5" />
        </button>

        <button
          onClick={onToolsToggle}
          className={`p-2 rounded transition-colors ${
            activePopups.tools
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-800'
          }`}
          title="Tools"
        >
          <MdModeEditOutline className="w-5 h-5" />
        </button>

        <button
          onClick={onResearchToggle}
          className={`p-2 rounded transition-colors ${
            activePopups.research
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-800'
          }`}
          title="Research"
        >
          <GiArchiveResearch className="w-5 h-5" />
        </button>

        <button
          onClick={onChatsToggle}
          className={`p-2 rounded transition-colors ${
            activePopups.chats
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-800'
          }`}
          title="Chats"
        >
          <BiChat className="w-5 h-5" />
        </button>

        <button
          onClick={onCalendarToggle}
          className={`p-2 rounded transition-colors ${
            activePopups.calendar
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-800'
          }`}
          title="Calendar"
        >
          <IoCalendarNumberOutline className="w-5 h-5" />
        </button>

        <button
          onClick={onNotificationToggle}
          className={`p-2 rounded transition-colors ${
            activePopups.notification
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-800'
          }`}
          title="Notifications"
        >
          <IoMdNotificationsOutline className="w-5 h-5" />
        </button>
      </div>

      {/* Right section - User controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onScreenshotCapture}
          className="p-2 rounded hover:bg-gray-800 transition-colors"
          title="Screenshot"
        >
          <FaCamera className="w-4 h-4" />
        </button>

        <button
          onClick={onFullscreenToggle}
          className="p-2 rounded hover:bg-gray-800 transition-colors"
          title="Fullscreen"
        >
          {chartState.isFullscreen ? (
            <MdFullscreenExit className="w-5 h-5" />
          ) : (
            <MdFullscreen className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={onSettingsToggle}
          className={`p-2 rounded transition-colors ${
            activePopups.settings
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-800'
          }`}
          title="Settings"
        >
          <LuMaximize className="w-5 h-5" />
        </button>

        <button
          onClick={onHelpToggle}
          className={`p-2 rounded transition-colors ${
            activePopups.help
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-800'
          }`}
          title="Help"
        >
          <BsQuestionCircle className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2 border-l border-gray-700 pl-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {getEmailInitial(userEmail)}
              </span>
            </div>
            <span className="text-sm text-gray-300 max-w-32 truncate">
              {userEmail}
            </span>
          </div>
          
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}