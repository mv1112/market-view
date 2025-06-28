'use client'

import React, { type FC, useState } from 'react'
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

	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-4xl mx-auto px-6 py-16">
				<div className="text-center mb-16">
					<h1 className="text-5xl font-bold text-white mb-6">Pricing Plans</h1>
					<div className="w-24 h-0.5 bg-white mx-auto mb-8"></div>
					<p className="text-xl text-gray-300 mb-8">
						Compare our plans and choose the one that fits your needs.
					</p>
					
					<div className="mb-12">
						<button
							onClick={() => setIsYearly(false)}
							className={`px-6 py-2 mr-4 rounded font-medium transition-all duration-200 ${
								!isYearly ? 'bg-white text-black' : 'text-gray-300 border border-gray-600'
							}`}
						>
							Monthly
						</button>
						<button
							onClick={() => setIsYearly(true)}
							className={`px-6 py-2 rounded font-medium transition-all duration-200 ${
								isYearly ? 'bg-white text-black' : 'text-gray-300 border border-gray-600'
							}`}
						>
							Annual (Save 20%)
						</button>
					</div>
				</div>

				<div className="space-y-16">
					{plans.map((plan) => (
						<section key={plan.name} className="text-center">
							<h2 className="text-3xl font-bold text-white mb-4">{plan.name}</h2>
							<div className="text-4xl font-bold text-white mb-4">
								{plan.monthlyPrice === 'Custom' ? 'Custom' : formatPrice(
									isYearly && typeof plan.yearlyPrice === 'number' 
										? Math.round(plan.yearlyPrice / 12)
										: typeof plan.monthlyPrice === 'number' ? plan.monthlyPrice : 0
								)}
							</div>
							
							{isYearly && plan.monthlyPrice !== 'Custom' && typeof plan.monthlyPrice === 'number' && plan.monthlyPrice > 0 ? (
								<div className="text-sm text-green-400 mb-6">
									Save {calculateSavingsPercentage(plan.monthlyPrice, typeof plan.yearlyPrice === 'number' ? plan.yearlyPrice : 0)}% annually
								</div>
							) : (
								<div className="text-sm text-gray-400 mb-6">
									{plan.monthlyPrice !== 'Custom' ? (isYearly ? 'billed annually' : 'billed monthly') : 'custom pricing'}
								</div>
							)}

							<button
								onClick={() => handlePlanClick(plan.name, plan)}
								className="px-8 py-3 bg-white text-black rounded font-semibold transition-all duration-200 hover:bg-gray-200 mb-8"
							>
								{plan.buttonText}
							</button>

							<div className="text-left space-y-4 text-gray-300 max-w-2xl mx-auto">
								<h3 className="text-xl font-semibold text-white mb-4">Features:</h3>
								<p>• Charts per tab: {plan.name === 'Free' ? '1' : plan.name === 'Essential' ? '2' : plan.name === 'Pro' ? '8' : plan.name === 'Premium' ? '16' : 'Unlimited'}</p>
								<p>• Indicators per chart: {plan.name === 'Free' ? '3' : plan.name === 'Essential' ? '10' : plan.name === 'Pro' ? '25' : plan.name === 'Premium' ? '50' : 'Unlimited'}</p>
								<p>• Historical bars: {plan.name === 'Free' ? '5K' : plan.name === 'Essential' ? '10K' : plan.name === 'Pro' ? '20K' : plan.name === 'Premium' ? '40K' : 'Unlimited'}</p>
								<p>• Real-time data: {plan.name === 'Free' ? 'No' : 'Yes'}</p>
								<p>• Price alerts: {plan.name === 'Free' ? '10' : plan.name === 'Essential' ? '100' : plan.name === 'Pro' ? '400' : plan.name === 'Premium' ? '1000' : 'Unlimited'}</p>
								<p>• No ads: Yes</p>
								<p>• Volume profile: {plan.name === 'Free' ? 'No' : 'Yes'}</p>
								<p>• Custom timeframes: {plan.name === 'Free' ? 'No' : 'Yes'}</p>
								<p>• Mobile app access: Yes</p>
								<p>• Desktop application: {plan.name === 'Free' || plan.name === 'Essential' ? 'No' : 'Yes'}</p>
								<p>• API Access: {plan.name === 'Free' || plan.name === 'Essential' || plan.name === 'Pro' ? 'No' : 'Yes'}</p>
								<p>• Priority Support: {plan.name === 'Free' || plan.name === 'Essential' ? 'No' : 'Yes'}</p>
								<p>• Advanced Backtesting: {plan.name === 'Free' || plan.name === 'Essential' || plan.name === 'Pro' ? 'No' : 'Yes'}</p>
							</div>
						</section>
					))}
				</div>

				<section className="text-center mt-16">
					<h2 className="text-3xl font-light text-white mb-6">Need Help Choosing?</h2>
					<div className="w-16 h-0.5 bg-white mx-auto mb-6"></div>
					<p className="text-lg text-gray-300 mb-6">
						Contact our team to find the perfect plan for your trading needs.
					</p>
					<div className="space-y-2 text-gray-300">
						<p><span className="font-medium text-white">Email:</span> support@viewmarket.in</p>
						<p><span className="font-medium text-white">Phone:</span> 9241740350</p>
						<p><span className="font-medium text-white">WhatsApp:</span> +91 9241740350</p>
					</div>
				</section>
			</div>
		</div>
	)
}

export default PricingPage 