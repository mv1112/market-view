'use client'

import React, { type FC, useState } from 'react'
import { Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/use-auth'

const PricingPage: FC = () => {
	const [isYearly, setIsYearly] = useState(false)
	const router = useRouter()
	const { isAuthenticated, isLoading } = useAuth()

	const handlePlanClick = (planName: string, plan: any) => {
		if (!isAuthenticated && !isLoading) {
			const planParams = new URLSearchParams({
				plan: planName,
				price: plan.monthlyPrice.toString(),
				yearly: plan.yearlyPrice.toString()
			})
			      router.push(`/auth?redirectTo=/cart?${planParams.toString()}`)
			return
		}

		if (isAuthenticated) {
			const planParams = new URLSearchParams({
				plan: planName,
				price: plan.monthlyPrice.toString(),
				yearly: plan.yearlyPrice.toString()
			})
			router.push(`/cart?${planParams.toString()}`)
			return
		}
	}

	const features = [
		{ name: "Charts per tab", values: [1, 2, 8, 16, "Unlimited"] },
		{ name: "Indicators per chart", values: [3, 10, 25, 50, "Unlimited"] },
		{ name: "Historical bars", values: ["5K", "10K", "20K", "40K", "Unlimited"] },
		{ name: "Real-time data", values: [false, true, true, true, true] },
		{ name: "Price alerts", values: [10, 100, 400, 1000, "Unlimited"] },
		{ name: "Technical alerts", values: [10, 100, 400, 1000, "Unlimited"] },
		{ name: "Watchlist alerts", values: [0, 0, 10, 25, "Unlimited"] },
		{ name: "No ads", values: [true, true, true, true, true] },
		{ name: "Volume profile", values: [false, true, true, true, true] },
		{ name: "Custom timeframes", values: [false, true, true, true, true] },
		{ name: "Custom Range Bars", values: [false, true, true, true, true] },
		{ name: "Multiple watchlists", values: [false, true, true, true, true] },
		{ name: "Mobile app access", values: [true, true, true, true, true] },
		{ name: "Desktop application", values: [false, false, true, true, true] },
		{ name: "API Access", values: [false, false, false, true, true] },
		{ name: "Priority Support", values: [false, false, true, true, true] },
		{ name: "Advanced Backtesting", values: [false, false, false, true, true] }
	]

	const plans = [
		{ name: 'Free', monthlyPrice: 0, yearlyPrice: 0, buttonText: 'Get Started' },
		{ name: 'Essential', monthlyPrice: 999, yearlyPrice: 9948, buttonText: 'Buy Now' },
		{ name: 'Pro', monthlyPrice: 2249, yearlyPrice: 22406, buttonText: 'Buy Now' },
		{ name: 'Premium', monthlyPrice: 3999, yearlyPrice: 39871, buttonText: 'Buy Now' },
		{ name: 'Enterprise', monthlyPrice: 'Custom', yearlyPrice: 'Custom', buttonText: 'Contact Sales' }
	]

	const formatPrice = (price: number) => {
		if (price === 0) return 'Free'
		return `₹${price.toLocaleString('en-IN')}`
	}

	const calculateSavingsPercentage = (monthlyPrice: number, yearlyPrice: number) => {
		const monthlyTotal = monthlyPrice * 12
		const savings = monthlyTotal - yearlyPrice
		return Math.round((savings / monthlyTotal) * 100)
	}

	const renderFeatureValue = (value: any) => {
		if (typeof value === 'boolean') {
			return value ? (
				<Check className="w-5 h-5 text-green-600 mx-auto" />
			) : (
				<X className="w-5 h-5 text-red-500 mx-auto" />
			)
		}
		
		if (value === 0) {
			return <X className="w-5 h-5 text-red-500 mx-auto" />
		}
		
		return <Check className="w-5 h-5 text-green-600 mx-auto" />
	}

	return (
		<div className="min-h-screen bg-white">
			{/* Header */}
			<div className="bg-gradient-to-b from-gray-50 to-white py-16">
				<div className="max-w-7xl mx-auto px-4 text-center">
					<h1 className="text-5xl font-bold text-gray-900 mb-4">Pricing Plans</h1>
					<p className="text-xl text-gray-600 mb-8">
						Compare our plans and choose the one that fits your needs.
					</p>
					
					{/* Billing Toggle */}
					<div className="flex justify-center items-center mb-12">
						<div className="bg-gray-100 rounded-full p-1">
							<button
								onClick={() => setIsYearly(false)}
								className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
									!isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
								}`}
							>
								Monthly
							</button>
							<button
								onClick={() => setIsYearly(true)}
								className={`px-6 py-2 rounded-full font-medium transition-all duration-200 relative ${
									isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
								}`}
							>
								Annual
								<span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
									Save 20%
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Pricing Table */}
			<div className="max-w-7xl mx-auto px-4 pb-16">
				<div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
					{/* Table Header */}
					<div className="bg-gray-50 border-b border-gray-200">
						<div className="grid grid-cols-6 gap-4 p-6">
							<div className="col-span-1">
								<h3 className="text-lg font-semibold text-gray-900">Features</h3>
							</div>
							{plans.map((plan) => (
								<div key={plan.name} className="text-center">
									<h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
									<div className="text-3xl font-bold text-gray-900 mb-2">
										{plan.monthlyPrice === 'Custom' ? 'Custom' : formatPrice(
											isYearly && typeof plan.yearlyPrice === 'number' 
												? Math.round(plan.yearlyPrice / 12)
												: typeof plan.monthlyPrice === 'number' ? plan.monthlyPrice : 0
										)}
									</div>
									
									{/* Reserved space for savings - always present to prevent layout shift */}
									<div className="h-6 mb-4 flex items-center justify-center">
										{isYearly && plan.monthlyPrice !== 'Custom' && typeof plan.monthlyPrice === 'number' && plan.monthlyPrice > 0 ? (
											<div className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">
												Save {calculateSavingsPercentage(plan.monthlyPrice, typeof plan.yearlyPrice === 'number' ? plan.yearlyPrice : 0)}%
											</div>
										) : (
											<div className="text-xs text-gray-500">
												{plan.monthlyPrice !== 'Custom' ? (isYearly ? 'billed annually' : 'billed monthly') : 'custom pricing'}
											</div>
										)}
									</div>

									<button
										onClick={() => handlePlanClick(plan.name, plan)}
										className="w-full py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all duration-200"
									>
										{plan.buttonText}
									</button>
								</div>
							))}
						</div>
					</div>

					{/* Features Table */}
					<div className="divide-y divide-gray-200">
						{features.map((feature, index) => (
							<div key={feature.name} className={`grid grid-cols-6 gap-4 p-4 items-center ${
								index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
							}`}>
								<div className="col-span-1">
									<div className="text-sm font-medium text-gray-900">
										{feature.name}
									</div>
								</div>
								{feature.values.map((value, planIndex) => (
									<div key={planIndex} className="flex items-center justify-center py-2">
										{renderFeatureValue(value)}
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PricingPage 