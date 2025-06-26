import type { Metadata } from 'next'
import './globals.css'
import dynamic from 'next/dynamic'
import { AuthProvider } from '@/lib/auth-context'
import AuthErrorBoundary from '@/components/auth-error-boundary'
import { Skeleton } from '@/components/ui/skeleton'

const LayoutWrapper = dynamic(() => import('./layout-wrapper'), { 
	ssr: false,
	loading: () => (
		<div className="min-h-screen bg-white">
			{/* Header Skeleton */}
			<div className="w-full h-16 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<Skeleton className="h-8 w-8 rounded-full" />
						<Skeleton className="h-6 w-32" />
					</div>
					<div className="hidden md:flex items-center space-x-6">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-16" />
					</div>
					<Skeleton className="h-8 w-24 rounded-md" />
				</div>
			</div>
			
			{/* Hero Section Skeleton */}
			<div className="max-w-7xl mx-auto px-6 py-20 text-center">
				<Skeleton className="h-16 w-3/4 mx-auto mb-6" />
				<Skeleton className="h-6 w-2/3 mx-auto mb-4" />
				<Skeleton className="h-6 w-1/2 mx-auto mb-8" />
				<div className="flex justify-center space-x-4">
					<Skeleton className="h-12 w-32" />
					<Skeleton className="h-12 w-40" />
				</div>
			</div>
			
			{/* Content Section Skeleton */}
			<div className="max-w-7xl mx-auto px-6 pb-20">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
					<Skeleton className="h-64 w-full rounded-lg" />
					<Skeleton className="h-64 w-full rounded-lg" />
					<Skeleton className="h-64 w-full rounded-lg" />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<Skeleton className="h-48 w-full rounded-lg" />
					<Skeleton className="h-48 w-full rounded-lg" />
				</div>
			</div>
		</div>
	)
})

export const metadata: Metadata = {
	title: 'ViewMarket - AI-Powered Algorithmic Trading Platform',
	description: 'Advanced trading platform with AI-powered analytics, automated strategies, and real-time market data. The ultimate solution for algorithmic trading and financial analysis.',
	icons: {
		icon: [
			{
				url: '/favicon.ico',
				sizes: 'any',
			},
			{
				url: '/icon.svg',
				type: 'image/svg+xml',
			},
		],
		apple: [
			{
				url: '/apple-touch-icon.png',
				sizes: '180x180',
				type: 'image/png',
			},
		],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>
				<AuthErrorBoundary>
					<AuthProvider fallback={
						<div className="min-h-screen bg-white">
							{/* Header Skeleton */}
							<div className="w-full h-16 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
								<div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<Skeleton className="h-8 w-8 rounded-full" />
										<Skeleton className="h-6 w-32" />
									</div>
									<div className="hidden md:flex items-center space-x-6">
										<Skeleton className="h-4 w-16" />
										<Skeleton className="h-4 w-20" />
										<Skeleton className="h-4 w-16" />
									</div>
									<Skeleton className="h-8 w-24 rounded-md" />
								</div>
							</div>
							
							{/* Loading Authentication Skeleton */}
							<div className="max-w-md mx-auto px-6 py-20 text-center">
								<div className="flex items-center justify-center space-x-3 mb-8">
									<Skeleton className="h-10 w-10 rounded-full" />
									<Skeleton className="h-8 w-40" />
								</div>
								<Skeleton className="h-6 w-full mb-4" />
								<Skeleton className="h-6 w-5/6 mx-auto mb-4" />
								<Skeleton className="h-6 w-4/5 mx-auto mb-8" />
								<div className="space-y-3">
									<Skeleton className="h-10 w-full" />
									<Skeleton className="h-10 w-full" />
									<div className="flex space-x-3">
										<Skeleton className="h-10 w-1/2" />
										<Skeleton className="h-10 w-1/2" />
									</div>
								</div>
							</div>
						</div>
					}>
						<LayoutWrapper>
							{children}
						</LayoutWrapper>
					</AuthProvider>
				</AuthErrorBoundary>
			</body>
		</html>
	)
}
