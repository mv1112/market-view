import { type FC, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { AiFillApi } from "react-icons/ai"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { createPortal } from 'react-dom'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

// Custom Centered Dialog Component
const CenteredDialog: FC<{
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}> = ({ isOpen, onClose, children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog Container */}
      <div className="relative z-[100000] w-full max-w-md mx-4">
        {children}
      </div>
    </div>,
    document.body
  )
}

// Enhanced broker data with categories and required credentials
const brokers = [
  { 
    name: 'Alice Blue', 
    logo: 'AB', 
    category: 'Stocks',
    credentials: ['User ID', 'API Key', 'Secret Key']
  },
  { 
    name: 'Angel Broking', 
    logo: 'AN', 
    category: 'Stocks',
    credentials: ['Api Key', 'Secret Key']
  },
  { 
    name: 'Binance', 
    logo: 'BN', 
    category: 'Crypto',
    credentials: ['App Key', 'Secret key']
  },
  { 
    name: 'Delta Exchange', 
    logo: 'DX', 
    category: 'Crypto',
    credentials: ['API Key', 'Secret Key']
  },
  { 
    name: 'Dhan', 
    logo: 'DH', 
    category: 'Stocks',
    credentials: ['client id', 'access token']
  },
  { 
    name: 'Finvisia', 
    logo: 'FV', 
    category: 'Stocks',
    credentials: ['User ID', 'Password', 'Vendor Code', 'Api Key', '2FA']
  },
  { 
    name: 'Fyers', 
    logo: 'FY', 
    category: 'Stocks',
    credentials: ['API Key', 'Secret Key'] // Already implemented
  },
  { 
    name: 'ICICI Direct', 
    logo: 'IC', 
    category: 'Stocks',
    credentials: ['User ID', 'API Key', 'Secret Key', 'DOB', 'Password']
  },
  { 
    name: 'IIFL', 
    logo: 'IL', 
    category: 'Stocks',
    credentials: ['Interactive API Key', 'Interactive Secret Key', 'Market API Key', 'Market Secret Key']
  },
  { 
    name: 'Kotak Neo', 
    logo: 'KN', 
    category: 'Stocks',
    credentials: ['Consumer Key', 'Secret Key', 'Access Token', 'Mobile Number', 'Password', 'MPIN']
  },
  { 
    name: 'MetaTrader 4', 
    logo: 'M4', 
    category: 'Forex',
    credentials: ['User Id', 'Password', 'Host', 'Port']
  },
  { 
    name: 'MetaTrader 5', 
    logo: 'M5', 
    category: 'Forex',
    credentials: ['User Id', 'Password', 'Host', 'Port']
  },
  { 
    name: 'Upstox', 
    logo: 'UP', 
    category: 'Stocks',
    credentials: ['Api Key', 'App Secret Key', 'access token']
  },
  { 
    name: 'Zerodha', 
    logo: 'ZD', 
    category: 'Stocks',
    credentials: ['api key', 'secret key']
  },
]

const BrokerCard: FC<{ broker: { name: string; logo: string; category: string; credentials: string[] } }> = ({ broker }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [credentialValues, setCredentialValues] = useState<Record<string, string>>({})

  const handleConnect = () => {
    if (isConnected) {
      // Disconnect if already connected
      setIsConnected(false)
      setCredentialValues({}) // Clear saved credentials
      return
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    setIsDialogOpen(false)
    setIsConnecting(true)
    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
    }, 1500)
  }

  const handleCredentialChange = (credentialName: string, value: string) => {
    setCredentialValues(prev => ({
      ...prev,
      [credentialName]: value
    }))
  }

  return (
    <div 
      className={cn(
        "relative rounded-lg p-4 flex flex-col items-center justify-between min-h-[144px] w-full",
        "bg-black border shadow-sm",
        "transition-all duration-200 hover:border-gray-600",
        "group"
      )}
      style={{
        backgroundColor: '#000000',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#000000'
      }}
    >

      
      {/* Broker Logo */}
      <div className="flex-1 flex flex-col items-center justify-center w-full p-2">
        <div className={cn(
          "w-12 h-12 mb-3 rounded-full flex items-center justify-center",
          "bg-black border",
          "transition-all duration-200"
        )}
        style={{
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }}>
          <span className="text-lg font-bold text-white">
            {broker.logo}
          </span>
        </div>
        
        <div className="text-center">
          <h3 className="font-medium text-white text-sm">{broker.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{broker.category}</p>
        </div>
      </div>
      
      {/* Action Button */}
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className={cn(
          "w-full py-2 px-3 rounded-md text-xs font-medium transition-all duration-200",
          "bg-black text-white border",
          "flex items-center justify-center space-x-1.5 group/button font-medium",
          isConnecting && "opacity-70 cursor-not-allowed",
          isConnected && "border-green-600 text-green-300 hover:bg-red-900/20 hover:border-red-500 hover:text-red-300"
        )}
        style={{
          backgroundColor: isConnected ? 'rgba(34, 197, 94, 0.1)' : '#000000',
          borderColor: isConnected ? 'rgba(34, 197, 94, 0.5)' : 'rgba(255, 255, 255, 0.2)'
        }}
        onMouseEnter={(e) => {
          if (!isConnecting && !isConnected) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isConnecting && !isConnected) {
            e.currentTarget.style.backgroundColor = '#000000'
          }
        }}
        title={isConnected ? "Click to disconnect" : "Click to connect"}
      >
        {isConnecting ? (
          <>
            <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-400">Connecting...</span>
          </>
        ) : isConnected ? (
          <span className="group-hover/button:hidden">✓ Connected</span>
        ) : (
          <AiFillApi className="w-4 h-4 group-hover/button:translate-x-0.5 transition-transform" />
        )}
        
        {/* Disconnect text shown on hover when connected */}
        {isConnected && (
          <span className="hidden group-hover/button:inline">× Disconnect</span>
        )}
      </button>

      {/* Connect Dialog */}
      <CenteredDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
      >
        <div className="bg-black border border-gray-800 text-white rounded-lg p-6 shadow-xl relative">
          {/* Close button */}
          <button
            onClick={() => setIsDialogOpen(false)}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Dialog Header */}
          <h2 className="text-xl font-bold text-white mb-4">
            Connect to {broker.name}
          </h2>
          
          {/* Dialog Content */}
          <div className="space-y-4">
            {broker.credentials.map((credential) => (
              <div key={credential} className="space-y-2">
                <Label htmlFor={credential} className="text-sm text-gray-300">
                  {credential}
                </Label>
                <Input
                  id={credential}
                  type={credential.toLowerCase().includes('password') || 
                        credential.toLowerCase().includes('secret') || 
                        credential.toLowerCase().includes('mpin') ? 'password' : 'text'}
                  value={credentialValues[credential] || ''}
                  onChange={(e) => handleCredentialChange(credential, e.target.value)}
                  className="!bg-black border-gray-700 text-white placeholder-gray-500 focus:border-gray-500 focus:ring-0 focus:outline-none focus:!bg-black hover:!bg-black"
                  placeholder={`Enter ${credential}`}
                  style={{
                    backgroundColor: '#000000',
                    borderColor: '#374151',
                    boxShadow: 'none',
                    outline: 'none',
                    color: '#ffffff'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.outline = 'none'
                    e.currentTarget.style.borderColor = '#6b7280'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.outline = 'none'
                    e.currentTarget.style.borderColor = '#374151'
                  }}
                />
              </div>
            ))}
            
            <Button
              onClick={handleSubmit}
              className="w-full bg-white text-black hover:bg-gray-200 font-medium"
              disabled={Object.keys(credentialValues).length !== broker.credentials.length ||
                       Object.values(credentialValues).some(val => !val)}
            >
              Connect
            </Button>
          </div>
        </div>
      </CenteredDialog>
    </div>
  )
}

const BrokerPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ['All', 'Stocks', 'Crypto', 'Forex']
  
  const filteredBrokers = brokers.filter(broker => 
    broker.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === 'All' || !selectedCategory || broker.category === selectedCategory)
  )

  return (
    <div className="h-full w-full flex flex-col">
      {/* Top Divider */}
      <div className="h-px w-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
      
      <div className="h-full bg-black text-white overflow-auto">
        <div className="max-w-7xl mx-auto p-4 pb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-white mb-1">Available Brokers</h2>
              <p className="text-xs text-gray-400">Connect your preferred trading platform</p>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search brokers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-72 bg-black rounded-lg px-4 py-2.5 text-base text-white placeholder-gray-400 focus:outline-none transition-all focus:ring-0 focus:border-gray-500"
                style={{
                  backgroundColor: '#000000',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: 'none'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.outline = 'none'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
              <HiMagnifyingGlass
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6 pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-md border transition-all",
                  selectedCategory === (category === 'All' ? null : category) 
                    ? "bg-white/10 text-white" 
                    : "text-gray-400"
                )}
                style={{
                  borderColor: selectedCategory === (category === 'All' ? null : category)
                    ? 'rgba(255, 255, 255, 0.3)'
                    : 'rgba(255, 255, 255, 0.2)',
                  backgroundColor: selectedCategory === (category === 'All' ? null : category)
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== (category === 'All' ? null : category)) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== (category === 'All' ? null : category)) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Broker Grid */}
          {filteredBrokers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredBrokers.map((broker, index) => (
                <BrokerCard key={index} broker={broker} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4 border"
                style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-1">No brokers found</h3>
              <p className="text-sm text-gray-400 max-w-md">
                We couldn&apos;t find any brokers matching your search. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BrokerPage