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
	
	// Check for authentication pages, charts page, cart page, and pricing page
	const isAuthPage = pathname.startsWith('/auth')
	const isChartsPage = pathname.startsWith('/charts')
	const isCartPage = pathname.startsWith('/cart')
	const isPricingPage = pathname.startsWith('/pricing')
	const isLegalPage = legalPages.includes(pathname)
	
	// Return only children for legal pages, auth pages, charts page, cart page, and pricing page
	if (isLegalPage || isAuthPage || isChartsPage || isCartPage || isPricingPage) {
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