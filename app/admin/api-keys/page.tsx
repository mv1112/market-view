"use client"

import { useState, useEffect } from 'react'
import { useRoleAccess } from '@/lib/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Key, 
  Plus, 
  Eye, 
  EyeOff, 
  Edit, 
  Trash2, 
  Settings,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { safeConsole } from '@/lib/utils'

interface ApiProvider {
  id: string
  name: string
  display_name: string
  base_url: string
  websocket_url?: string
  is_active: boolean
}

interface ApiKey {
  id: string
  provider_name: string
  key_name: string
  key_type: string
  is_active: boolean
  last_used_at?: string
  created_at: string
}

export default function ApiKeysManagement() {
  const { isAdmin } = useRoleAccess('admin')
  const [providers, setProviders] = useState<ApiProvider[]>([])
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState('')
  const [newKeyData, setNewKeyData] = useState({
    keyName: '',
    keyValue: '',
    keyType: 'rest'
  })

  useEffect(() => {
    if (isAdmin) {
      loadProviders()
      loadApiKeys()
    }
  }, [isAdmin])

  const loadProviders = async () => {
    // For demo purposes, using mock data
    // In real implementation, this would call /api/admin/providers
    setProviders([
      {
        id: '1',
        name: 'alpha_vantage',
        display_name: 'Alpha Vantage',
        base_url: 'https://www.alphavantage.co/query',
        is_active: true
      },
      {
        id: '2',
        name: 'finnhub',
        display_name: 'Finnhub',
        base_url: 'https://finnhub.io/api/v1',
        websocket_url: 'wss://ws.finnhub.io',
        is_active: true
      },
      {
        id: '3',
        name: 'polygon',
        display_name: 'Polygon.io',
        base_url: 'https://api.polygon.io',
        websocket_url: 'wss://socket.polygon.io',
        is_active: true
      },
      {
        id: '4',
        name: 'iex_cloud',
        display_name: 'IEX Cloud',
        base_url: 'https://cloud.iexapis.com',
        is_active: false
      }
    ])
  }

  const loadApiKeys = async () => {
    // Mock data for demo
    setApiKeys([
      {
        id: '1',
        provider_name: 'Alpha Vantage',
        key_name: 'Primary',
        key_type: 'rest',
        is_active: true,
        last_used_at: '2024-01-15T10:30:00Z',
        created_at: '2024-01-01T09:00:00Z'
      },
      {
        id: '2',
        provider_name: 'Finnhub',
        key_name: 'WebSocket',
        key_type: 'websocket',
        is_active: true,
        last_used_at: '2024-01-15T11:45:00Z',
        created_at: '2024-01-02T10:00:00Z'
      }
    ])
    setLoading(false)
  }

  const handleAddKey = async () => {
    if (!selectedProvider || !newKeyData.keyName || !newKeyData.keyValue) {
      alert('Please fill in all fields')
      return
    }

    // Here you would call the API to save the key
    safeConsole.log('Adding API key:', {
      provider: selectedProvider,
      ...newKeyData
    })

    // Reset form
    setNewKeyData({ keyName: '', keyValue: '', keyType: 'rest' })
    setSelectedProvider('')
    setShowAddForm(false)
    
    // Reload keys
    loadApiKeys()
  }

  if (!isAdmin) {
    return <div>Access denied</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">API Keys Management</h1>
            </div>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add API Key</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Key Form */}
        {showAddForm && (
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Add New API Key</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Provider
                </label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Provider</option>
                  {providers.map((provider) => (
                    <option key={provider.id} value={provider.name}>
                      {provider.display_name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Name
                </label>
                <Input
                  value={newKeyData.keyName}
                  onChange={(e) => setNewKeyData({...newKeyData, keyName: e.target.value})}
                  placeholder="e.g., Primary, Backup, WebSocket"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <Input
                  type="password"
                  value={newKeyData.keyValue}
                  onChange={(e) => setNewKeyData({...newKeyData, keyValue: e.target.value})}
                  placeholder="Enter API key"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Type
                </label>
                <select
                  value={newKeyData.keyType}
                  onChange={(e) => setNewKeyData({...newKeyData, keyType: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="rest">REST API</option>
                  <option value="websocket">WebSocket</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddKey}>
                Add Key
              </Button>
            </div>
          </Card>
        )}

        {/* Providers Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Supported Stock Market Data Providers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.map((provider) => (
              <Card key={provider.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{provider.display_name}</h3>
                  <Badge variant={provider.is_active ? "default" : "secondary"}>
                    {provider.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{provider.base_url}</p>
                {provider.websocket_url && (
                  <p className="text-xs text-blue-600">WebSocket: {provider.websocket_url}</p>
                )}
                <div className="flex justify-end mt-3">
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* API Keys Table */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Configured API Keys
          </h2>
          
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : apiKeys.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No API keys configured yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Key Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Used
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {apiKeys.map((key) => (
                    <tr key={key.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Key className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {key.provider_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {key.key_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline">
                          {key.key_type}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {key.is_active ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className={`text-sm ${key.is_active ? 'text-green-700' : 'text-red-700'}`}>
                            {key.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {key.last_used_at ? 
                          new Date(key.last_used_at).toLocaleDateString() : 
                          'Never'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Usage Statistics */}
        <Card className="mt-6 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            API Usage Statistics (Last 24 Hours)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">12,548</p>
              <p className="text-sm text-gray-600">Total API Calls</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">99.2%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">156ms</p>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 