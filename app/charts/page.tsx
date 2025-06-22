"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { MdFullscreen } from "react-icons/md"
import { FaCamera } from "react-icons/fa"
import { LuScreenShare, LuLogOut } from "react-icons/lu"
import SymbolSearchPopup from "@/components/symbol-search-popup"
import TimeFrameDropdown from "@/components/timeframe-dropdown"
import CandlestickDropdown from "@/components/candlestick-dropdown"
import IndicatorsPopup from "@/components/indicators-popup"
import SettingsPopup from "@/components/settings-popup"
import { LogoutButton } from "@/components/logout-button"
import { ThemeToggle } from "@/components/theme-toggle"
import TradingViewChart from "@/components/trading-view-chart"

import BrokerPage from "@/components/footer-pages/broker-page"
import AlgoScriptPage from "@/components/footer-pages/algo-script-page"
import ScreenerPage from "@/components/footer-pages/screener-page"
import StrategyTesterPage from "@/components/footer-pages/strategy-tester-page"

import { LuAlarmClock, LuMaximize } from "react-icons/lu"
import { SquarePlay } from "lucide-react"
import { GiArchiveResearch } from "react-icons/gi"
import { BiChat } from "react-icons/bi"
import { IoCalendarNumberOutline } from "react-icons/io5"
import { BsQuestionCircle } from "react-icons/bs"
import { IoMdNotificationsOutline } from "react-icons/io"
import { MdModeEditOutline } from "react-icons/md"
import Link from "next/link"
import { authService } from "@/lib/auth"

type FooterPageType = 'broker' | 'algo-script' | 'screener' | 'strategy-tester' | 'strategy-builder'

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
  const [appliedIndicators, setAppliedIndicators] = useState<string[]>([])
  
  // Footer page state
  const [activeFooterPage, setActiveFooterPage] = useState<FooterPageType>('broker')
  
  // Draggable footer state
  const [isDragging, setIsDragging] = useState(false)
  const [footerHeight, setFooterHeight] = useState(48)
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

  // Handle clicking outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    const maxHeight = containerRect.height - 48
    const deltaY = startY - e.clientY
    const newHeight = Math.min(Math.max(48, startHeight + deltaY), maxHeight)
    
    setFooterHeight(newHeight)
  }, [isDragging, startY, startHeight])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const openFooterTo50Percent = useCallback((page?: FooterPageType) => {
    if (!containerRef.current) return
    
    const containerRect = containerRef.current.getBoundingClientRect()
    const targetHeight = Math.floor(containerRect.height * 0.5)
    setFooterHeight(targetHeight)
    
    if (page) {
      setActiveFooterPage(page)
    }
  }, [])

  const handleFooterPageChange = useCallback((page: FooterPageType) => {
    if (footerHeight <= 48) {
      openFooterTo50Percent(page)
    } else {
      setActiveFooterPage(page)
    }
  }, [footerHeight, openFooterTo50Percent])

  const handleBrokerClick = useCallback(() => handleFooterPageChange('broker'), [handleFooterPageChange])
  const handleAlgoScriptClick = useCallback(() => handleFooterPageChange('algo-script'), [handleFooterPageChange])
  const handleScreenerClick = useCallback(() => handleFooterPageChange('screener'), [handleFooterPageChange])
  const handleStrategyTesterClick = useCallback(() => handleFooterPageChange('strategy-tester'), [handleFooterPageChange])
  const handleStrategyBuilderClick = useCallback(() => handleFooterPageChange('strategy-builder'), [handleFooterPageChange])

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
      case 'strategy-builder':
        return <div className="p-4 text-gray-900">Strategy Builder Page - Coming Soon</div>
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

  const handleApplyIndicator = (indicatorName: string) => {
    setAppliedIndicators(prev => [...prev, indicatorName])
  }



  return (
    <div className="h-screen bg-white text-gray-900 flex flex-col overflow-hidden" ref={containerRef}>
      {/* Header */}
      <header className="border-b-2 border-gray-200 bg-white rounded-b-lg flex-shrink-0">
        <div className="flex h-12 items-center justify-between pl-2 pr-1">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {userEmail ? getEmailInitial(userEmail) : "U"}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsSymbolSearchOpen(true)}
                className="h-8 pl-4 pr-6 hover:bg-gray-100 hover:text-gray-900 rounded flex items-center gap-2 text-sm transition-colors min-w-[120px]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>{selectedSymbol}</span>
              </button>
              
              <div className="w-px h-5 bg-gray-300 mx-1"></div>
              
              <button 
                onClick={() => setIsTimeFrameDropdownOpen(true)}
                className="h-8 px-3 hover:bg-gray-100 hover:text-gray-900 rounded flex items-center gap-2 text-sm transition-colors"
              >
                <span>{selectedTimeFrame}</span>
              </button>
              
              <div className="w-px h-5 bg-gray-300 mx-1"></div>
              
              <CandlestickDropdown 
                isOpen={isCandlestickDropdownOpen}
                onToggle={() => setIsCandlestickDropdownOpen(!isCandlestickDropdownOpen)}
                selectedType={selectedCandlestickType}
                onCandlestickSelect={(type) => {
                  handleCandlestickSelect(type)
                  setIsCandlestickDropdownOpen(false)
                }}
              />
              
              <div className="w-px h-5 bg-gray-300 mx-1"></div>
              
              <button 
                onClick={() => setIsIndicatorsPopupOpen(true)}
                className="h-8 px-4 hover:bg-gray-100 hover:text-gray-900 rounded flex items-center gap-2 text-sm transition-colors min-w-[100px]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Indicators</span>
              </button>
              
              <div className="w-px h-5 bg-gray-300 mx-1"></div>
              
              <button className="h-8 px-4 hover:bg-gray-100 hover:text-gray-900 rounded flex items-center gap-2 text-sm transition-colors min-w-[90px]">
                <SquarePlay className="h-4 w-4" />
                <span>Replay</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3 pr-4">
            <div className="relative flex items-center mr-1">
              <Link 
                href="/pricing"
                className="bg-transparent hover:bg-gray-100 text-gray-900 font-semibold text-xs px-3 py-1 rounded-full transition-colors duration-300 border border-gray-300 hover:border-gray-500 shadow-sm hover:shadow-md"
              >
                Free Plan
              </Link>
              <button 
                className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm"
                title="Upgrade Plan"
              >
                +
              </button>
            </div>
            
            <div className="w-px h-5 bg-gray-300 mx-1"></div>
            
            <button 
              className="h-9 w-9 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center justify-center transition-colors duration-200"
              title="Toggle Fullscreen"
            >
              <MdFullscreen className="h-5 w-5 transition-colors duration-200" />
            </button>
            
            <div className="w-px h-5 bg-gray-300 mx-1"></div>
            
            <button 
              className="h-9 w-9 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center justify-center transition-colors duration-200"
              title="Take Screenshot"
            >
              <FaCamera className="h-5 w-5 transition-colors duration-200" />
            </button>
            
            <div className="w-px h-5 bg-gray-300 mx-1"></div>
            
            <ThemeToggle className="h-9 w-9 rounded-lg" />
            
            <div className="w-px h-5 bg-gray-300 mx-1"></div>
            
            <button 
              className="h-9 w-9 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center justify-center transition-colors duration-200"
              title="Share Screen"
            >
              <LuScreenShare className="h-5 w-5 transition-colors duration-200" />
            </button>
            
            <div className="w-px h-5 bg-gray-300 mx-1"></div>
            
            <button 
              onClick={() => setIsSettingsPopupOpen(true)}
              className="h-9 w-9 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center justify-center transition-colors duration-200"
              title="Settings"
            >
              <svg className="h-5 w-5 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            <div className="w-px h-5 bg-gray-300 mx-1"></div>
            
            <LogoutButton variant="ghost" size="icon" className="h-9 w-9 rounded-lg transition-colors duration-200">
              <LuLogOut className="h-5 w-5 transition-colors duration-200" />
            </LogoutButton>
          </div>
        </div>
      </header>

      {/* Content area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* TradingView Chart Area */}
          <div 
            className="flex-1 overflow-hidden"
            style={{ height: `calc(100vh - 48px - ${footerHeight}px)`, minHeight: '300px' }}
          >
            <div className="w-full h-full bg-white">
              <TradingViewChart
                symbol={selectedSymbol}
                timeFrame={selectedTimeFrame}
                chartType={selectedCandlestickType}
                indicators={appliedIndicators}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Footer */}
          <footer 
            className="bg-white border-t-2 border-gray-200 rounded-t-lg flex-shrink-0 relative"
            style={{ height: `${footerHeight}px` }}
          >
            <div 
              className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize"
              onMouseDown={handleMouseDown}
              style={{ 
                borderTopLeftRadius: '0.5rem',
                borderTopRightRadius: '0.5rem',
              }}
            />
            
            <div className="flex items-center justify-between h-12 px-2">
              <div className="flex items-center gap-2 pl-4">
                <button 
                  onClick={handleBrokerClick}
                  className={`h-8 px-3 rounded flex items-center text-sm transition-colors ${
                    activeFooterPage === 'broker'
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span>Broker</span>
                </button>
                
                <button 
                  onClick={handleAlgoScriptClick}
                  className={`h-8 px-3 rounded flex items-center text-sm transition-colors ${
                    activeFooterPage === 'algo-script'
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span>Algo Script</span>
                </button>
                
                <button 
                  onClick={handleStrategyTesterClick}
                  className={`h-8 px-3 rounded flex items-center text-sm transition-colors ${
                    activeFooterPage === 'strategy-tester'
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span>Strategy Tester</span>
                </button>
                
                <button 
                  onClick={handleScreenerClick}
                  className={`h-8 px-3 rounded flex items-center text-sm transition-colors ${
                    activeFooterPage === 'screener'
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span>Screener</span>
                </button>
                
                <button 
                  onClick={handleStrategyBuilderClick}
                  className={`h-8 px-3 rounded flex items-center text-sm transition-colors ${
                    activeFooterPage === 'strategy-builder'
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span>Strategy Builder</span>
                </button>
              </div>
              
              <div className="flex items-center">
                <button className="h-8 w-8 hover:bg-gray-100 hover:text-gray-900 rounded flex items-center justify-center transition-colors">
                  <LuMaximize className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {footerHeight > 48 && (
              <div className="overflow-y-auto" style={{ height: `${footerHeight - 48}px` }}>
                {renderActiveFooterPage()}
              </div>
            )}
          </footer>
        </div>
        
        {/* Right Side Panel */}
        <div className="w-12 bg-white border-l-2 border-gray-200 rounded-l-lg flex flex-col flex-shrink-0">
          <div className="flex flex-col items-center p-2 gap-3">
            <button className="w-8 h-8 hover:bg-gray-100 hover:text-gray-900 rounded flex items-center justify-center transition-colors duration-200">
              <MdModeEditOutline className="w-6 h-6" />
            </button>
            
            <div className="h-px w-5 bg-gray-300 my-1"></div>
            
            <button className="w-8 h-8 hover:bg-gray-100 hover:text-gray-900 rounded flex items-center justify-center transition-colors duration-200">
              <LuAlarmClock className="w-6 h-6" />
            </button>
            
            <div className="h-px w-5 bg-gray-300 my-1"></div>
            
            <button className="w-8 h-8 hover:bg-gray-100 hover:text-gray-900 rounded flex items-center justify-center transition-colors duration-200">
              <GiArchiveResearch className="w-6 h-6" />
            </button>
            
            <div className="h-px w-5 bg-gray-300 my-1"></div>
            
            <button className="w-8 h-8 hover:bg-gray-100 hover:text-gray-900 rounded flex items-center justify-center transition-colors duration-200">
              <BiChat className="w-6 h-6" />
            </button>
            
            <div className="h-px w-5 bg-gray-300 my-1"></div>
            
            <button className="w-8 h-8 hover:bg-gray-100 hover:text-gray-900 rounded flex items-center justify-center transition-colors duration-200">
              <IoCalendarNumberOutline className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1"></div>
          
          <div className="flex flex-col items-center gap-3 p-2">
            <button className="w-8 h-8 hover:bg-gray-100 hover:text-gray-900 rounded flex items-center justify-center transition-colors duration-200">
              <IoMdNotificationsOutline className="w-6 h-6" />
            </button>
            
            <div className="h-px w-5 bg-gray-300 my-1"></div>
            
            <button className="w-8 h-8 hover:bg-gray-100 hover:text-gray-900 rounded flex items-center justify-center transition-colors duration-200">
              <BsQuestionCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Popups */}
      <SymbolSearchPopup 
        isOpen={isSymbolSearchOpen}
        onClose={() => setIsSymbolSearchOpen(false)}
        onSymbolSelect={handleSymbolSelect}
      />
      
      <TimeFrameDropdown 
        isOpen={isTimeFrameDropdownOpen}
        onClose={() => setIsTimeFrameDropdownOpen(false)}
        selectedTimeFrame={selectedTimeFrame}
        onTimeFrameSelect={handleTimeFrameSelect}
      />
      
      <IndicatorsPopup 
        isOpen={isIndicatorsPopupOpen}
        onClose={() => setIsIndicatorsPopupOpen(false)}
        onApplyIndicator={handleApplyIndicator}
      />
      
      <SettingsPopup 
        isOpen={isSettingsPopupOpen}
        onClose={() => setIsSettingsPopupOpen(false)}
      />
    </div>
  )
} 