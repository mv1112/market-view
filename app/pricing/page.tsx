'use client'

import { type FC, useState } from 'react'
import { Check, X, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/use-auth'

const PricingPage: FC = () => {
	const [isYearly, setIsYearly] = useState(false)
	const router = useRouter()
	const { isAuthenticated, isLoading } = useAuth()

	const handlePlanClick = (planName: string, plan: any) => {
		// If user is not authenticated, redirect to login
		if (!isAuthenticated && !isLoading) {
			const planParams = new URLSearchParams({
				plan: planName,
				price: plan.monthlyPrice.toString(),
				yearly: plan.yearlyPrice.toString()
			})
			router.push(`/auth/login?redirectTo=/cart?${planParams.toString()}`)
			return
		}

		// If user is authenticated, redirect to cart with plan info
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
		{ name: "Parallel chart connections", values: [5, 20, 50, 200, "Unlimited"] },
		{ name: "Price alerts", values: [10, 100, 400, 1000, "Unlimited"] },
		{ name: "Technical alerts", values: [10, 100, 400, 1000, "Unlimited"] },
		{ name: "Watchlist alerts", values: [0, 0, 10, 25, "Unlimited"] },
		{ name: "No ads", values: [true, true, true, true, true] },
		{ name: "Volume profile", values: [false, true, true, true, true] },
		{ name: "Custom timeframes", values: [false, true, true, true, true] },
		{ name: "Custom Range Bars", values: [false, true, true, true, true] },
		{ name: "Multiple watchlists", values: [false, true, true, true, true] }
	]

	const plans = [
		{
			name: 'Free',
			monthlyPrice: 0,
			yearlyPrice: 0,
			buttonText: 'Get Started Free',
			subText: 'Forever free with basic features',
			isCustom: false
		},
		{
			name: 'Essential',
			monthlyPrice: 999,
			yearlyPrice: 9948,
			buttonText: 'Get Essential',
			subText: 'Start trading with essential features',
			isCustom: false
		},
		{
			name: 'Pro',
			monthlyPrice: 2249,
			yearlyPrice: 22406,
			buttonText: 'Get Pro',
			subText: 'Best for professional traders',
			isCustom: false
		},
		{
			name: 'Premium',
			monthlyPrice: 3999,
			yearlyPrice: 39871,
			buttonText: 'Get Premium',
			subText: 'Advanced features for power users',
			isCustom: false
		},
		{
			name: 'Enterprise',
			monthlyPrice: 'Custom',
			yearlyPrice: 'Custom',
			buttonText: 'Contact Sales',
			subText: 'Get a custom quote for your organization',
			isCustom: true
		}
	]

	// Calculate monthly price from yearly price and savings
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

	const renderFeatureValue = (value: any, featureName: string, planIndex: number) => {
		if (typeof value === 'boolean') {
			return value ? (
				<div className="flex items-center">
					<Check className="w-4 h-4 text-green-400 mr-2" />
					<span className="text-white text-sm">{featureName.replace(/^(No ads|Volume profile|Custom timeframes|Custom Range Bars|Multiple watchlists)$/, (match) => match)}</span>
				</div>
			) : (
				<div className="flex items-center">
					<X className="w-4 h-4 text-red-400 mr-2" />
					<span className="text-gray-500 text-sm line-through">{featureName.replace(/^(Volume profile|Custom timeframes|Custom Range Bars|Multiple watchlists)$/, (match) => match)}</span>
				</div>
			)
		}
		
		if (value === 0 && featureName.includes('alerts')) {
			return (
				<div>
					<div className="flex items-center">
						<X className="w-4 h-4 text-red-400 mr-2" />
						<span className="text-gray-500 text-sm">0 {featureName.toLowerCase()}</span>
					</div>
					{/* Progress bar below */}
					<div className="mt-1 ml-6">
						<div className="h-0.5 bg-gray-700 rounded w-full max-w-32">
							<div 
								className="h-0.5 bg-gray-400 rounded"
								style={{ width: '0%' }}
							></div>
						</div>
					</div>
				</div>
			)
		}
		
		return (
			<div>
				<div className="flex items-center">
					<Check className="w-4 h-4 text-green-400 mr-2" />
					<span className="text-white text-sm font-medium">{value} {featureName.toLowerCase()}</span>
				</div>
				{/* Progress bar below the feature text */}
				<div className="mt-1 ml-6">
					<div className="h-0.5 bg-gray-700 rounded w-full max-w-32">
						<div 
							className="h-0.5 bg-gray-400 rounded"
							style={{ 
								width: value === "Unlimited" ? '100%' : `${Math.min(100, ((planIndex + 1) / 5) * 100)}%` 
							}}
						></div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-7xl mx-auto px-4 py-16">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-5xl font-bold mb-8 pt-16">Pricing</h1>
					
					{/* Monthly/Yearly Toggle */}
					<div className="flex justify-center items-center mb-8 gap-4">
						<span className={`font-medium transition-colors duration-200 ${!isYearly ? 'text-white' : 'text-gray-400'}`}>
							Monthly
						</span>
						<button
							onClick={() => setIsYearly(!isYearly)}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${
								isYearly ? 'bg-white' : 'bg-gray-600'
							}`}
						>
							<span
								className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-200 ${
									isYearly ? 'translate-x-6 bg-black' : 'translate-x-1 bg-white'
								}`}
							/>
						</button>
						<span className={`font-medium transition-colors duration-200 ${isYearly ? 'text-white' : 'text-gray-400'}`}>
							Yearly
						</span>
					</div>
				</div>

				{/* Pricing Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0 max-w-full mx-auto">
					{plans.map((plan, planIndex) => {
						const isCustomPlan = plan.isCustom
						const monthlyPrice = typeof plan.monthlyPrice === 'number' ? plan.monthlyPrice : 0
						const yearlyPrice = typeof plan.yearlyPrice === 'number' ? plan.yearlyPrice : 0
						
						// For yearly pricing, show monthly equivalent
						const displayPrice = isYearly && !isCustomPlan 
							? calculateMonthlyFromYearly(yearlyPrice)
							: monthlyPrice
						
						// Calculate savings
						const yearlySavings = !isCustomPlan && monthlyPrice > 0 
							? calculateYearlySavings(monthlyPrice, yearlyPrice)
							: 0

						return (
							<div key={plan.name} className="bg-gray-900/50 border border-gray-700 p-6 flex flex-col min-h-[900px] first:rounded-l-lg last:rounded-r-lg">
								{/* Plan Header */}
								<div className="mb-8">
									<h3 className="text-2xl font-bold mb-4 text-white">{plan.name}</h3>
									<div className="mb-6">
										<div className="flex items-baseline mb-1">
											<span className="text-4xl font-bold">
												{isCustomPlan ? 'Custom' : formatPrice(displayPrice)}
											</span>
											{!isCustomPlan && (
												<span className="text-gray-400 ml-1 text-lg">/ mo</span>
											)}
										</div>
										<p className="text-gray-400 text-sm mb-2">
											{isCustomPlan 
												? 'billed as per usage' 
												: isYearly 
													? 'billed annually' 
													: 'billed monthly'
											}
										</p>
										
										{/* Savings indicator for yearly plans */}
										{isYearly && !isCustomPlan && yearlySavings > 0 && (
											<div className="flex items-center text-white text-sm">
												<span>Save {formatPrice(yearlySavings)} a year</span>
												<Info className="w-3 h-3 ml-1 opacity-60" />
											</div>
										)}
									</div>

									{/* CTA Button */}
									<div className="mb-4">
										<button 
											onClick={() => handlePlanClick(plan.name, plan)}
											className="w-full py-3 px-4 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition-colors duration-200 text-sm"
										>
											{plan.buttonText}
										</button>
									</div>
									<p className="text-center text-xs">
										<a href="#" className="text-gray-400 hover:text-white">{plan.subText}</a>
									</p>
								</div>

								{/* Features List */}
								<div className="flex-1 space-y-4">
									{features.map((feature, featureIndex) => {
										const value = feature.values[planIndex]
										
										return (
											<div key={feature.name} className="py-2">
												{renderFeatureValue(value, feature.name, planIndex)}
											</div>
										)
									})}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default PricingPage 