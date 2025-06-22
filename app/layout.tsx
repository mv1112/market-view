import type { Metadata } from 'next'
import './globals.css'
import dynamic from 'next/dynamic'
import { AuthProvider } from '@/lib/auth-context'
import AuthErrorBoundary from '@/components/auth-error-boundary'

const LayoutWrapper = dynamic(() => import('./layout-wrapper'), { 
	ssr: false,
	loading: () => <div>Loading...</div>
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
						<div className="min-h-screen bg-white flex items-center justify-center">
							<div className="text-gray-900">Loading ViewMarket...</div>
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
