import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { NavigationLoadingProvider } from '@/lib/navigation-loading'
import AuthErrorBoundary from '@/components/auth-error-boundary'
import { NavigationWrapper } from '@/components/navigation-wrapper'
import LayoutWrapper from './layout-wrapper'

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
					<AuthProvider>
						<NavigationLoadingProvider>
							<NavigationWrapper>
								<LayoutWrapper>
									{children}
								</LayoutWrapper>
							</NavigationWrapper>
						</NavigationLoadingProvider>
					</AuthProvider>
				</AuthErrorBoundary>
			</body>
		</html>
	)
}
