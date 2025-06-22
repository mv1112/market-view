'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'

interface LayoutWrapperProps {
	children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
	const pathname = usePathname()
	
	// List of paths that should not have header/footer
	const legalPages = [
		'/privacy',
		'/disclaimer', 
		'/terms-and-conditions',
		'/cookies',
		'/refund-and-cancellation'
	]
	
	// List of trading and company pages that should not have header/footer
	const tradingCompanyPages = [
		'/auto-trading',
		'/market-data',
		'/api-docs',
		'/trading-strategies',
		'/about-us',
		'/blog',
		'/careers',
		'/customers',
		'/brand'
	]
	
	// Check for authentication pages, charts page, cart page, and pricing page
	const isAuthPage = pathname.startsWith('/auth')
	const isChartsPage = pathname.startsWith('/charts')
	const isCartPage = pathname.startsWith('/cart')
	const isPricingPage = pathname.startsWith('/pricing')
	const isLegalPage = legalPages.includes(pathname)
	const isTradingCompanyPage = tradingCompanyPages.includes(pathname)
	
	// Return only children for legal pages, auth pages, charts page, cart page, pricing page, and trading/company pages
	if (isLegalPage || isAuthPage || isChartsPage || isCartPage || isPricingPage || isTradingCompanyPage) {
		return <>{children}</>
	}
	
	// For all other pages, include header and footer
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
} 