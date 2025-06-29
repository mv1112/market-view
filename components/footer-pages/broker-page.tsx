import { type FC, useState } from 'react'
import { cn } from '@/lib/utils'
import { AiFillApi } from "react-icons/ai"
import { HiMagnifyingGlass } from "react-icons/hi2"

// Enhanced broker data with categories
const brokers = [
  { name: '5Paisa', logo: '5P', category: 'Stocks' },
  { name: 'AliceBlue V2', logo: 'AB', category: 'Stocks' },
  { name: 'Alpaca', logo: 'AL', category: 'Stocks' },
  { name: 'AnandRathi', logo: 'AR', category: 'Stocks' },
  { name: 'Angel Broking', logo: 'AN', category: 'Stocks' },
  { name: 'Aditya Trading', logo: 'AD', category: 'Stocks' },
  { name: 'Binance', logo: 'BN', category: 'Crypto' },
  { name: 'Binance V2', logo: 'B2', category: 'Crypto' },
  { name: 'BNS', logo: 'BS', category: 'Stocks' },
  { name: 'BitMEX', logo: 'BM', category: 'Crypto' },
  { name: 'ByBit', logo: 'BB', category: 'Crypto' },
  { name: 'CoinDCX', logo: 'CX', category: 'Crypto' },
  { name: 'Delta Exchange', logo: 'DX', category: 'Crypto' },
  { name: 'DhanHQ', logo: 'DH', category: 'Stocks' },
  { name: 'Finvasia', logo: 'FV', category: 'Stocks' },
  { name: 'Forex', logo: 'FX', category: 'Forex' },
]

const BrokerCard: FC<{ broker: { name: string; logo: string; category: string } }> = ({ broker }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const handleConnect = () => {
    if (isConnected) return
    
    setIsConnecting(true)
    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
    }, 1500)
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
      {/* Connection status indicator */}
      <div className={cn(
        "absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-300",
        isConnected ? "bg-green-500" : "bg-gray-600",
        isHovered && "scale-150"
      )} />
      
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
        disabled={isConnecting || isConnected}
        className={cn(
          "w-full py-2 px-3 rounded-md text-xs font-medium transition-all duration-200",
          "bg-black text-white border",
          "flex items-center justify-center space-x-1.5 group/button font-medium",
          isConnecting && "opacity-70 cursor-not-allowed",
          isConnected && "border-green-600 text-green-300"
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
      >
        {isConnecting ? (
          <>
            <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-400">Connecting...</span>
          </>
        ) : isConnected ? (
          <>
            <span className="text-green-300">✓ Connected</span>
          </>
        ) : (
          <>
            <AiFillApi className="w-4 h-4 group-hover/button:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>
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
                className="w-full md:w-72 bg-black rounded-lg px-4 py-2.5 text-base text-white placeholder-gray-400 focus:outline-none transition-all"
                style={{
                  backgroundColor: '#000000',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
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