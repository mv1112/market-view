import { useState } from 'react';
import { ChevronDown, Search, Settings, ChevronUp, ChevronRight, ChevronLeft, MoreHorizontal, Filter } from 'lucide-react';

// Define types
interface Stock {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  relVolume: number;
  marketCap: string;
  pe: number;
  eps: number;
  epsGrowth: number;
  divYield: number;
  sector: string;
  analystRating: string;
}

interface FilterOption {
  id: string;
  label: string;
}

interface SortConfig {
  key: keyof Stock | '';
  direction: 'asc' | 'desc';
}

// Mock data for the screener table
const mockStocks: Stock[] = [
  {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc',
    price: 189.98,
    change: -0.45,
    changePercent: -0.24,
    volume: '45.2M',
    relVolume: 1.23,
    marketCap: '2.97T',
    pe: 31.45,
    eps: 6.04,
    epsGrowth: 8.76,
    divYield: 0.50,
    sector: 'Technology',
    analystRating: 'Buy'
  },
  {
    id: 2,
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 420.72,
    change: 2.34,
    changePercent: 0.56,
    volume: '23.1M',
    relVolume: 0.98,
    marketCap: '3.12T',
    pe: 36.72,
    eps: 11.48,
    epsGrowth: 12.34,
    divYield: 0.71,
    sector: 'Technology',
    analystRating: 'Strong Buy'
  },
  {
    id: 3,
    symbol: 'GOOGL',
    name: 'Alphabet Inc',
    price: 173.68,
    change: -1.23,
    changePercent: -0.70,
    volume: '18.9M',
    relVolume: 1.05,
    marketCap: '2.18T',
    pe: 26.45,
    eps: 6.57,
    epsGrowth: 15.23,
    divYield: 0.0,
    sector: 'Communication Services',
    analystRating: 'Buy'
  },
  {
    id: 4,
    symbol: 'AMZN',
    name: 'Amazon.com Inc',
    price: 178.75,
    change: 3.21,
    changePercent: 1.83,
    volume: '32.5M',
    relVolume: 1.45,
    marketCap: '1.85T',
    pe: 62.34,
    eps: 2.87,
    epsGrowth: 23.45,
    divYield: 0.0,
    sector: 'Consumer Cyclical',
    analystRating: 'Buy'
  },
  {
    id: 5,
    symbol: 'META',
    name: 'Meta Platforms Inc',
    price: 497.48,
    change: 5.67,
    changePercent: 1.15,
    volume: '15.3M',
    relVolume: 0.87,
    marketCap: '1.27T',
    pe: 32.18,
    eps: 15.46,
    epsGrowth: 18.76,
    divYield: 0.0,
    sector: 'Communication Services',
    analystRating: 'Strong Buy'
  },
  {
    id: 6,
    symbol: 'TSLA',
    name: 'Tesla Inc',
    price: 182.63,
    change: -2.34,
    changePercent: -1.27,
    volume: '98.7M',
    relVolume: 1.89,
    marketCap: '581.5B',
    pe: 42.76,
    eps: 4.27,
    epsGrowth: 5.34,
    divYield: 0.0,
    sector: 'Consumer Cyclical',
    analystRating: 'Hold'
  },
  {
    id: 7,
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 126.09,
    change: -0.62,
    changePercent: -0.49,
    volume: '42.1M',
    relVolume: 1.23,
    marketCap: '2.98T',
    pe: 74.32,
    eps: 1.70,
    epsGrowth: 25.45,
    divYield: 0.02,
    sector: 'Technology',
    analystRating: 'Strong Buy'
  },
];

// Mock data for the tabs
const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'performance', label: 'Performance' },
  { id: 'valuation', label: 'Valuation' },
  { id: 'dividends', label: 'Dividends' },
  { id: 'margin', label: 'Margin' },
  { id: 'income', label: 'Income' },
  { id: 'balance', label: 'Balance' },
  { id: 'cashflow', label: 'Cashflow' },
  { id: 'technicals', label: 'Technicals' },
];

// Mock data for the filter options
const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'stocks', label: 'Stocks' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'forex', label: 'Forex' },
  { id: 'futures', label: 'Futures' },
  { id: 'cfd', label: 'CFD' },
  { id: 'indices', label: 'Indices' },
  { id: 'bonds', label: 'Bonds' },
  { id: 'etf', label: 'ETF' },
];

const ScreenerPage = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: 'symbol', 
    direction: 'asc' 
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Handle sorting
  const requestSort = (key: keyof Stock) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting and filtering
  const sortedAndFilteredStocks = [...mockStocks]
    .filter((stock: Stock) => 
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a: Stock, b: Stock) => {
      if (!sortConfig.key) return 0;
      
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAndFilteredStocks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAndFilteredStocks.length / itemsPerPage);

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Get sort indicator
  const getSortIndicator = (key: keyof Stock): string | null => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Top Divider */}
      <div className="h-px w-full bg-gray-700"></div>
      
      <div className="h-full flex flex-col bg-black text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button className="flex items-center px-3 py-1 text-sm bg-gray-800 rounded hover:bg-gray-700 text-white">
                <span>Stock Screener</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
            <button className="p-1 text-gray-400 hover:text-white">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center p-2 border-b border-gray-700 overflow-x-auto">
          <div className="flex space-x-2">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                className="px-3 py-1 text-xs bg-gray-800 rounded hover:bg-gray-700 whitespace-nowrap text-white"
              >
                {option.label}
              </button>
            ))}
            <button className="flex items-center px-2 py-1 text-xs text-gray-400 hover:text-white">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab.id ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex items-center justify-between p-2 border-b border-gray-700">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-1.5 text-sm bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-400"
              placeholder="Search for stocks, indices, forex, etc."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 ml-2">
            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded">
              <Filter className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="sticky top-0 bg-gray-900 z-10">
              <tr>
                <th 
                  className="px-4 py-2 font-medium text-gray-400 cursor-pointer hover:text-white"
                  onClick={() => requestSort('symbol')}
                >
                  <div className="flex items-center">Symbol {getSortIndicator('symbol')}</div>
                </th>
                <th 
                  className="px-4 py-2 font-medium text-gray-400 cursor-pointer hover:text-white"
                  onClick={() => requestSort('price')}
                >
                  <div className="flex items-center">Price {getSortIndicator('price')}</div>
                </th>
                <th 
                  className="px-4 py-2 font-medium text-gray-400 cursor-pointer hover:text-white"
                  onClick={() => requestSort('changePercent')}
                >
                  <div className="flex items-center">Change % {getSortIndicator('changePercent')}</div>
                </th>
                <th 
                  className="px-4 py-2 font-medium text-gray-400 cursor-pointer hover:text-white"
                  onClick={() => requestSort('volume')}
                >
                  <div className="flex items-center">Volume {getSortIndicator('volume')}</div>
                </th>
                <th 
                  className="px-4 py-2 font-medium text-gray-400 cursor-pointer hover:text-white"
                  onClick={() => requestSort('marketCap')}
                >
                  <div className="flex items-center">Market Cap {getSortIndicator('marketCap')}</div>
                </th>
                <th 
                  className="px-4 py-2 font-medium text-gray-400 cursor-pointer hover:text-white"
                  onClick={() => requestSort('pe')}
                >
                  <div className="flex items-center">P/E {getSortIndicator('pe')}</div>
                </th>
                <th 
                  className="px-4 py-2 font-medium text-gray-400 cursor-pointer hover:text-white"
                  onClick={() => requestSort('eps')}
                >
                  <div className="flex items-center">EPS {getSortIndicator('eps')}</div>
                </th>
                <th 
                  className="px-4 py-2 font-medium text-gray-400 cursor-pointer hover:text-white"
                  onClick={() => requestSort('sector')}
                >
                  <div className="flex items-center">Sector {getSortIndicator('sector')}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((stock) => (
                <tr key={stock.id} className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="px-4 py-3 text-white">
                    <div className="flex items-center">
                      <span className="font-medium">{stock.symbol}</span>
                      <span className="ml-2 text-xs text-gray-400">{stock.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white">${stock.price.toFixed(2)}</td>
                  <td className={`px-4 py-3 ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                  </td>
                  <td className="px-4 py-3 text-white">{stock.volume}</td>
                  <td className="px-4 py-3 text-white">${stock.marketCap}</td>
                  <td className="px-4 py-3 text-white">{stock.pe.toFixed(2)}</td>
                  <td className="px-4 py-3 text-white">${stock.eps.toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-400">{stock.sector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-2 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedAndFilteredStocks.length)} of{' '}
            {sortedAndFilteredStocks.length} results
          </div>
          <div className="flex items-center space-x-1">
            <button
              className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    className={`w-8 h-8 text-sm rounded ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="px-2 text-gray-400">...</span>
              )}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <button
                  className={`w-8 h-8 text-sm rounded ${
                    currentPage === totalPages
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              )}
            </div>
            <button
              className="p-1.5 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenerPage;