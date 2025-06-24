'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '@/lib/hooks/use-auth'
import { useAuthRedirect } from '@/lib/hooks/use-auth'
import { useSearchParams } from 'next/navigation'

export default function CartPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [saveInfo, setSaveInfo] = useState(false)
  const { user } = useAuth()
  const { shouldRender } = useAuthRedirect({ requireAuth: true, redirectTo: '/auth?redirectTo=/cart' })
  const searchParams = useSearchParams()

  // Get plan info from URL params
  const [selectedPlan, setSelectedPlan] = useState({
    name: 'ViewMarket Pro',
    monthlyPrice: 2249,
    yearlyPrice: 22406
  })

  useEffect(() => {
    const planName = searchParams.get('plan')
    const monthlyPrice = searchParams.get('price')
    const yearlyPrice = searchParams.get('yearly')

    if (planName && monthlyPrice && yearlyPrice) {
      setSelectedPlan({
        name: `ViewMarket ${planName}`,
        monthlyPrice: parseInt(monthlyPrice),
        yearlyPrice: parseInt(yearlyPrice)
      })
    }
  }, [searchParams])

  // Calculate monthly price from yearly price
  const calculateMonthlyFromYearly = (yearlyPrice: number) => {
    return Math.round(yearlyPrice / 12)
  }

  // Calculate yearly savings
  const calculateYearlySavings = (monthlyPrice: number, yearlyPrice: number) => {
    const monthlyTotal = monthlyPrice * 12
    return monthlyTotal - yearlyPrice
  }

  // Format price display
  const formatPrice = (price: number) => {
    if (price === 0) return '₹0'
    return `₹${price.toLocaleString('en-IN')}`
  }

  // Calculate display prices
  const monthlyPrice = selectedPlan.monthlyPrice // Already in rupees (999, 2249, etc.)
  const yearlyMonthlyPrice = calculateMonthlyFromYearly(selectedPlan.yearlyPrice) // Monthly equivalent when billed yearly
  const annualSavings = calculateYearlySavings(selectedPlan.monthlyPrice, selectedPlan.yearlyPrice)

  // Current display price based on billing type
  const currentPrice = isAnnual ? yearlyMonthlyPrice : monthlyPrice
  const currentTotal = isAnnual ? selectedPlan.yearlyPrice : monthlyPrice

  // Show loading or redirect if user is not authenticated
  if (!shouldRender) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Full width container */}
      <div className="max-w-7xl mx-auto flex min-h-screen">
        {/* Left Side - Product Details */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <Link href="/pricing" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Link>
            
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-white rounded mr-3 flex items-center justify-center">
                <div className="w-5 h-5 bg-black rounded-sm transform rotate-45"></div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-2">Subscribe to {selectedPlan.name}</h2>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-medium">{formatPrice(currentPrice)}</span>
              <span className="text-gray-400 ml-2 text-lg">
                per<br />month
              </span>
            </div>
          </div>

          <div className="bg-gray-900/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-white rounded mr-3 flex items-center justify-center">
                  <div className="w-3 h-3 bg-black rounded-sm transform rotate-45"></div>
                </div>
                <span className="font-medium">{selectedPlan.name}</span>
              </div>
              <span className="font-medium">{formatPrice(currentPrice)}</span>
            </div>
            
            <p className="text-gray-400 text-sm mb-4">
              {selectedPlan.name} unlocks advanced trading features, unlimited charts, comprehensive analytics, and premium support.
            </p>
            
            <p className="text-gray-400 text-sm">{isAnnual ? 'Billed annually' : 'Billed monthly'}</p>
            
            <div className="flex items-center mt-4">
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="ml-3 text-sm">
                with annual billing
              </span>
              {isAnnual && (
                <span className="ml-2 text-blue-400 text-sm font-medium">
                  {formatPrice(yearlyMonthlyPrice)}/month
                </span>
              )}
            </div>
            
            {isAnnual && annualSavings > 0 && (
              <div className="mt-2 text-green-400 text-sm font-medium">
                Save {formatPrice(annualSavings)} yearly
              </div>
            )}
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(currentPrice)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span>Tax</span>
                <div className="w-4 h-4 ml-1 rounded-full border border-gray-400 flex items-center justify-center">
                  <span className="text-xs text-gray-400">i</span>
                </div>
              </div>
              <span>₹0.00</span>
            </div>
            <hr className="border-gray-700" />
            <div className="flex justify-between font-medium text-lg">
              <span>Total due today</span>
              <span>{formatPrice(isAnnual ? selectedPlan.yearlyPrice : currentPrice)}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Payment Details */}
        <div className="flex-1 bg-white text-black p-8">
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Contact information</h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Payment method</h3>
            
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={selectedPayment === 'card'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="mr-3"
                />
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-black rounded mr-3"></div>
                    <span>Card</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">VISA</div>
                    <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center">MC</div>
                    <div className="w-8 h-5 bg-blue-400 rounded text-white text-xs flex items-center justify-center">AE</div>
                    <div className="w-8 h-5 bg-green-500 rounded text-white text-xs flex items-center justify-center">DC</div>
                  </div>
                </div>
              </label>

              <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={selectedPayment === 'upi'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-orange-500 rounded mr-3 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">₹</span>
                  </div>
                  <span>UPI</span>
                </div>
              </label>

              <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="netbanking"
                  checked={selectedPayment === 'netbanking'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-blue-600 rounded mr-3 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">NB</span>
                  </div>
                  <span>Net Banking</span>
                </div>
              </label>

              <label className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="wallet"
                  checked={selectedPayment === 'wallet'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="mr-3"
                />
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-purple-500 rounded mr-3 flex items-center justify-center">
                      <div className="w-3 h-2 bg-white rounded-sm"></div>
                    </div>
                    <span>Wallet</span>
                  </div>
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                    ₹50 cashback
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="mb-8">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="mr-3 mt-1"
              />
              <div>
                <div className="font-medium">Securely save my information for 1-click checkout</div>
                <div className="text-sm text-gray-600">Pay faster on ViewMarket and everywhere our payment partner is accepted.</div>
              </div>
            </label>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-md font-medium text-lg mb-6 hover:bg-gray-800 transition-colors">
            Subscribe
          </button>

          <div className="text-center text-sm text-gray-600 mb-6">
            By confirming your subscription, you allow ViewMarket to charge you for future payments in accordance with their terms. You can always cancel your subscription.
          </div>

          <div className="flex justify-center items-center text-xs text-gray-500">
            <span>Powered by </span>
            <span className="font-bold ml-1">cashfree</span>
          </div>

          <div className="flex justify-center space-x-4 mt-2 text-xs text-gray-500">
            <Link href="/terms-and-conditions" className="hover:text-gray-700">Terms</Link>
            <Link href="/privacy" className="hover:text-gray-700">Privacy</Link>
          </div>
        </div>
      </div>
    </div>
  )
} 