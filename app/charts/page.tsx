"use client"

import { LogoutButton } from "@/components/logout-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { authService } from "@/lib/auth"
import { useEffect, useState, useRef, useCallback } from "react"
import SimpleChart from "@/components/simple-chart"
import SymbolSearchPopup from "@/components/symbol-search-popup"
import TimeFrameDropdown from "@/components/timeframe-dropdown"
import CandlestickDropdown from "@/components/candlestick-dropdown"
import IndicatorsPopup from "@/components/indicators-popup"
import SettingsPopup from "@/components/settings-popup"
import BrokerPage from "@/components/footer-pages/broker-page"
import AlgoScriptPage from "@/components/footer-pages/algo-script-page"
import ScreenerPage from "@/components/footer-pages/screener-page"
import StrategyTesterPage from "@/components/footer-pages/strategy-tester-page"
import HftPanelPage from "@/components/footer-pages/hft-panel-page"
import { LuAlarmClock, LuLogOut, LuScreenShare, LuMaximize } from "react-icons/lu"
import { SquarePlay } from "lucide-react"
import { GiArchiveResearch } from "react-icons/gi"
import { BiChat } from "react-icons/bi"
import { IoCalendarNumberOutline } from "react-icons/io5"
import { BsQuestionCircle } from "react-icons/bs"
import { IoMdNotificationsOutline } from "react-icons/io"
import { MdModeEditOutline, MdFullscreen } from "react-icons/md"
import { FaCamera } from "react-icons/fa"
import Link from "next/link"

type FooterPageType = 'broker' | 'algo-script' | 'screener' | 'strategy-tester' | 'hft-panel' | 'strategy-builder'

export default function ChartsPage() {
  const [userEmail, setUserEmail] = useState<string>("")
  const [isSymbolSearchOpen, setIsSymbolSearchOpen] = useState(false)
  const [selectedSymbol, setSelectedSymbol] = useState("NIFTY")
  const [isTimeFrameDropdownOpen, setIsTimeFrameDropdownOpen] = useState(false)
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1m")
  const [isCandlestickDropdownOpen, setIsCandlestickDropdownOpen] = useState(false)
  const [selectedCandlestickType, setSelectedCandlestickType] = useState("candles")
  const [isIndicatorsPopupOpen, setIsIndicatorsPopupOpen] = useState(false)
  const [isSettingsPopupOpen, setIsSettingsPopupOpen] = useState(false)
  
  // Footer page state
  const [activeFooterPage, setActiveFooterPage] = useState<FooterPageType>('broker')
  
  // Draggable footer state
  const [isDragging, setIsDragging] = useState(false)
  const [footerHeight, setFooterHeight] = useState(48) // 48px = h-12 (3rem)
  const [startY, setStartY] = useState(0)
  const [startHeight, setStartHeight] = useState(48)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getCurrentUser = async () => {
      const { user } = await authService.getCurrentUser()
      if (user?.email) {
        setUserEmail(user.email)
      }
    }
    getCurrentUser()
  }, [])

  // Show broker page content even when footer is collapsed
  useEffect(() => {
    // Ensure broker is always the default active page
    if (activeFooterPage !== 'broker') {
      setActiveFooterPage('broker')
    }
  }, [activeFooterPage])

  // Handle clicking outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close candlestick dropdown if clicking outside
      if (isCandlestickDropdownOpen) {
        setIsCandlestickDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isCandlestickDropdownOpen])

  // Mouse event handlers for draggable footer
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setStartY(e.clientY)
    setStartHeight(footerHeight)
    e.preventDefault()
  }, [footerHeight])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const maxHeight = containerRect.height - 48 // Leave space for header (48px)
    const deltaY = startY - e.clientY // Inverted because we want to expand upward
    const newHeight = Math.min(Math.max(48, startHeight + deltaY), maxHeight)
    
    setFooterHeight(newHeight)
  }, [isDragging, startY, startHeight])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Function to open footer to 50% of screen height and set active page
  const openFooterTo50Percent = useCallback((page?: FooterPageType) => {
    if (!containerRef.current) return
    
    const containerRect = containerRef.current.getBoundingClientRect()
    const targetHeight = Math.floor(containerRect.height * 0.5) // 50% of screen height
    setFooterHeight(targetHeight)
    
    if (page) {
      setActiveFooterPage(page)
    }
  }, [])

  // Smart handler function that only expands if footer is collapsed
  const handleFooterPageChange = useCallback((page: FooterPageType) => {
    // If footer is collapsed (at minimum height), expand it to 50%
    if (footerHeight <= 48) {
      openFooterTo50Percent(page)
    } else {
      // If footer is already expanded, just switch the page without resizing
      setActiveFooterPage(page)
    }
  }, [footerHeight, openFooterTo50Percent])

  // Handler functions for each footer button
  const handleBrokerClick = useCallback(() => handleFooterPageChange('broker'), [handleFooterPageChange])
  const handleAlgoScriptClick = useCallback(() => handleFooterPageChange('algo-script'), [handleFooterPageChange])
  const handleScreenerClick = useCallback(() => handleFooterPageChange('screener'), [handleFooterPageChange])
  const handleStrategyTesterClick = useCallback(() => handleFooterPageChange('strategy-tester'), [handleFooterPageChange])
  const handleHftPanelClick = useCallback(() => handleFooterPageChange('hft-panel'), [handleFooterPageChange])
  const handleStrategyBuilderClick = useCallback(() => handleFooterPageChange('strategy-builder'), [handleFooterPageChange])

  // Function to render the active footer page
  const renderActiveFooterPage = useCallback(() => {
    switch (activeFooterPage) {
      case 'broker':
        return <BrokerPage />
      case 'algo-script':
        return <AlgoScriptPage />
      case 'screener':
        return <ScreenerPage />
      case 'strategy-tester':
        return <StrategyTesterPage />
      case 'hft-panel':
        return <HftPanelPage />
      case 'strategy-builder':
        return <div className="p-4 text-white">Strategy Builder Page - Coming Soon</div>
      default:
        return <BrokerPage />
    }
  }, [activeFooterPage])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'ns-resize'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const getEmailInitial = (email: string) => {
    return email.charAt(0).toUpperCase()
  }

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol)
  }

  const handleTimeFrameSelect = (timeFrame: string) => {
    setSelectedTimeFrame(timeFrame)
  }

  const handleCandlestickSelect = (candlestickType: string) => {
    setSelectedCandlestickType(candlestickType)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" ref={containerRef}>
      {/* Header - spans full width */}
      <header className="border-b-2 border-white bg-black rounded-b-lg">
        <div className="flex h-12 items-center justify-between pl-2 pr-1">
          {/* Left side - Avatar Logo and Header Buttons */}
          <div className="flex items-center gap-4">
            {/* Avatar Logo */}
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-semibold text-sm">
                {userEmail ? getEmailInitial(userEmail) : "U"}
              </span>
            </div>
            
            {/* Header Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Search Button - Made bigger */}
              <button 
                onClick={() => setIsSymbolSearchOpen(true)}
                className="h-8 pl-4 pr-6 hover:bg-white hover:text-black rounded flex items-center gap-2 text-sm transition-colors min-w-[120px]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>{selectedSymbol}</span>
              </button>
              
              {/* Time Frame Button - Removed clock icon */}
              <button 
                onClick={() => setIsTimeFrameDropdownOpen(true)}
                className="h-8 px-3 hover:bg-white hover:text-black rounded flex items-center gap-2 text-sm transition-colors"
              >
                <span>{selectedTimeFrame}</span>
              </button>
              
              {/* Candlestick Type Button */}
              <CandlestickDropdown 
                isOpen={isCandlestickDropdownOpen}
                onToggle={() => setIsCandlestickDropdownOpen(!isCandlestickDropdownOpen)}
                selectedType={selectedCandlestickType}
                onCandlestickSelect={(type) => {
                  handleCandlestickSelect(type)
                  setIsCandlestickDropdownOpen(false)
                }}
              />
              
              {/* Indicators Button - Made bigger */}
              <button 
                onClick={() => setIsIndicatorsPopupOpen(true)}
                className="h-8 px-4 hover:bg-white hover:text-black rounded flex items-center gap-2 text-sm transition-colors min-w-[100px]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Indicators</span>
              </button>
              
              {/* Replay Button */}
              <button 
                className="h-8 px-4 hover:bg-white hover:text-black rounded flex items-center gap-2 text-sm transition-colors min-w-[90px]"
              >
                <SquarePlay className="h-4 w-4" />
                <span>Replay</span>
              </button>
            </div>
          </div>
          
          {/* Right side icons */}
          <div className="flex items-center gap-2 mr-0">
            {/* Free Plan Capsule with Plus Button */}
            <div className="relative flex items-center mr-2">
              <Link 
                href="/pricing"
                className="bg-transparent hover:bg-white/10 text-white font-medium text-xs px-2 py-0.5 rounded-full transition-all duration-300 transform hover:scale-105 border border-white/30 hover:border-white/50 text-center"
              >
                Free
              </Link>
              <button className="absolute -top-1 -right-1 text-white text-sm font-bold hover:text-gray-300 transition-colors">
                +
              </button>
            </div>
            {/* Fullscreen Icon */}
            <button className="h-8 w-8 hover:bg-white hover:text-black rounded flex items-center justify-center transition-colors">
              <MdFullscreen className="h-4 w-4" />
            </button>
            
            {/* Camera Icon */}
            <button className="h-8 w-8 hover:bg-white hover:text-black rounded flex items-center justify-center transition-colors">
              <FaCamera className="h-4 w-4" />
            </button>
            
            {/* Theme Toggle (Sun/Moon) */}
            <ThemeToggle />
            
            {/* Screen Share Icon */}
            <button className="h-8 w-8 hover:bg-white hover:text-black rounded flex items-center justify-center transition-colors">
              <LuScreenShare className="h-4 w-4" />
            </button>
            
            {/* Settings Icon */}
            <button 
              onClick={() => setIsSettingsPopupOpen(true)}
              className="h-8 w-8 hover:bg-white hover:text-black rounded flex items-center justify-center transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            {/* Logout button with icon only positioned near right panel */}
            <LogoutButton variant="ghost" size="icon">
              <LuLogOut className="h-8 w-8" />
            </LogoutButton>
          </div>
        </div>
      </header>

      {/* Content area below header */}
      <div className="flex flex-1">
        {/* Main Content Container */}
        <div className="flex flex-col flex-1">
          {/* Main Content Area with Trading Chart */}
          <div 
            className="overflow-hidden"
            style={{ height: `calc(100vh - 48px - ${footerHeight}px)` }}
          >
            <SimpleChart className="w-full h-full max-h-full" />
          </div>

          {/* Draggable Footer */}
          <footer 
            className="bg-black border-t-2 border-white rounded-t-lg flex-shrink-0 relative"
            style={{ height: `${footerHeight}px` }}
          >
            {/* Draggable divider area */}
            <div 
              className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-white/10 transition-colors"
              onMouseDown={handleMouseDown}
              style={{ 
                borderTopLeftRadius: '0.5rem',
                borderTopRightRadius: '0.5rem',
              }}
            />
            
            <div className="flex items-center justify-between h-12 px-2">
              {/* Left side - Footer Buttons */}
              <div className="flex items-center gap-2 pl-4">
                {/* Broker Button */}
                <button 
                  onClick={handleBrokerClick}
                  className={`h-8 px-3 rounded flex items-center text-sm transition-colors ${
                    activeFooterPage === 'broker'
                      ? 'bg-white text-black'
                      : 'hover:bg-white hover:text-black'
                  }`}
                >
                  <span>Broker</span>
                </button>
                
                {/* Algo Script Button */}
                <button 
                  onClick={handleAlgoScriptClick}
                  className={`h-8 px-3 rounded flex items-center text-sm transition-colors ${
                    activeFooterPage === 'algo-script'
                      ? 'bg-white text-black'
                      : 'hover:bg-white hover:text-black'
                  }`}
                >
                  <span>Algo Script</span>
                </button>
                
                {/* Screener Button */}
                <button 
                  onClick={handleScreenerClick}
                  className={`h-8 px-3 rounded flex items-center text-sm transition-colors ${
                    activeFooterPage === 'screener'
                      ? 'bg-white text-black'
                      : 'hover:bg-white hover:text-black'
                  }`}
                >
                  <span>Screener</span>
                </button>
                
                {/* Strategy Tester Button */}
                <button 
                  onClick={handleStrategyTesterClick}
                  className={`h-8 px-3 rounded flex items-center text-sm transition-colors ${
                    activeFooterPage === 'strategy-tester'
                      ? 'bg-white text-black'
                      : 'hover:bg-white hover:text-black'
                  }`}
                >
                  <span>Strategy Tester</span>
                </button>
                
                {/* HFT Panel Button */}
                <button 
                  onClick={handleHftPanelClick}
                  className={`h-8 px-3 rounded flex items-center text-sm transition-colors ${
                    activeFooterPage === 'hft-panel'
                      ? 'bg-white text-black'
                      : 'hover:bg-white hover:text-black'
                  }`}
                >
                  <span>HFT Panel</span>
                </button>
                
                {/* Strategy Builder Button */}
                <button 
                  onClick={handleStrategyBuilderClick}
                  className={`h-8 px-3 rounded flex items-center text-sm transition-colors ${
                    activeFooterPage === 'strategy-builder'
                      ? 'bg-white text-black'
                      : 'hover:bg-white hover:text-black'
                  }`}
                >
                  <span>Strategy Builder</span>
                </button>
              </div>
              
              {/* Right side - Maximize Icon */}
              <div className="flex items-center">
                <button className="h-8 w-8 hover:bg-white hover:text-black rounded flex items-center justify-center transition-colors">
                  <LuMaximize className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Additional content area when footer is expanded */}
            {footerHeight > 48 && (
              <div className="overflow-y-auto" style={{ height: `${footerHeight - 48}px` }}>
                {renderActiveFooterPage()}
              </div>
            )}
          </footer>
        </div>
        
        {/* Right Side Panel - starts below header, extends to bottom */}
        <div className="w-12 bg-black border-l-2 border-white rounded-l-lg flex flex-col">
          {/* Top icons group */}
          <div className="flex flex-col items-center p-2 gap-3">
            {/* Edit Icon - First icon in right panel */}
            <button className="w-8 h-8 hover:bg-white hover:text-black rounded flex items-center justify-center transition-colors">
              <MdModeEditOutline className="w-5 h-5" />
            </button>
            
            {/* Alarm Icon - Second icon in right panel */}
            <button className="w-8 h-8 hover:bg-white hover:text-black rounded flex items-center justify-center transition-colors">
              <LuAlarmClock className="w-5 h-5" />
            </button>
            
            {/* Research Icon - Third icon in right panel */}
            <button className="w-8 h-8 hover:bg-white hover:text-black rounded flex items-center justify-center transition-colors">
              <GiArchiveResearch className="w-5 h-5" />
            </button>
            
            {/* Chat Icon - Fourth icon in right panel */}
            <button className="w-8 h-8 hover:bg-white hover:text-black rounded flex items-center justify-center transition-colors">
              <BiChat className="w-5 h-5" />
            </button>
            
            {/* Calendar Icon - Fifth icon in right panel */}
            <button className="w-8 h-8 hover:bg-white hover:text-black rounded flex items-center justify-center transition-colors">
              <IoCalendarNumberOutline className="w-5 h-5" />
            </button>
            
            {/* Arrow Keys Icon - Sixth icon in right panel */}
            <button className="w-8 h-8 hover:bg-white hover:text-black rounded flex items-center justify-center transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                {/* Up Arrow Key - centered above */}
                <rect x="7" y="0.5" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M12 2L9.5 4.5h5L12 2z" fill="currentColor" />
                
                {/* Left Arrow Key */}
                <rect x="0.5" y="7.5" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M2 12L4.5 9.5v5L2 12z" fill="currentColor" />
                
                {/* Down Arrow Key */}
                <rect x="7" y="7.5" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M12 15L14.5 12.5h-5L12 15z" fill="currentColor" />
                
                {/* Right Arrow Key */}
                <rect x="16.5" y="7.5" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M22 12L19.5 14.5v-5L22 12z" fill="currentColor" />
              </svg>
            </button>
          </div>
          
          {/* Spacer to push question icon to bottom */}
          <div className="flex-1"></div>
          
          {/* Bottom icons - aligned with footer */}
          <div className="flex flex-col items-center gap-3 p-2">
            {/* Notification Icon - Just above question circle */}
            <button className="w-8 h-8 hover:bg-white hover:text-black rounded flex items-center justify-center transition-colors">
              <IoMdNotificationsOutline className="w-5 h-5" />
            </button>
            
            {/* Question Circle Icon - Positioned at bottom aligned with footer */}
            <button className="w-8 h-8 hover:bg-white hover:text-black rounded flex items-center justify-center transition-colors">
              <BsQuestionCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Symbol Search Popup */}
      <SymbolSearchPopup
        isOpen={isSymbolSearchOpen}
        onClose={() => setIsSymbolSearchOpen(false)}
        onSymbolSelect={handleSymbolSelect}
      />

      {/* TimeFrame Dropdown */}
      <TimeFrameDropdown
        isOpen={isTimeFrameDropdownOpen}
        onClose={() => setIsTimeFrameDropdownOpen(false)}
        selectedTimeFrame={selectedTimeFrame}
        onTimeFrameSelect={handleTimeFrameSelect}
      />

      {/* Indicators Popup */}
      <IndicatorsPopup
        isOpen={isIndicatorsPopupOpen}
        onClose={() => setIsIndicatorsPopupOpen(false)}
      />

      {/* Settings Popup */}
      <SettingsPopup
        isOpen={isSettingsPopupOpen}
        onClose={() => setIsSettingsPopupOpen(false)}
      />
    </div>
  )
} 