import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Cookies Policy - ViewMarket',
	description: 'Cookies Policy for ViewMarket trading platform',
}

export default function CookiesPage() {
	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-4xl mx-auto px-6 py-16">
				{/* Header Section */}
				<div className="text-center mb-16">
					<h1 className="text-5xl md:text-6xl font-light text-white mb-6">
						Cookies Policy
					</h1>
					<div className="w-24 h-0.5 bg-white mx-auto mb-8"></div>
					<p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Understanding how we use cookies and similar technologies to enhance 
						your trading experience, ensure security, and improve our platform.
					</p>
					<p className="text-sm text-gray-400 mt-6">Last updated: {new Date().toLocaleDateString()}</p>
				</div>

				{/* Content Sections */}
				<div className="space-y-16">
					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">What Are Cookies</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								Cookies are small text files stored on your device when you visit our website or use our trading platform. These files contain information that helps us improve your user experience, remember your preferences, and provide personalized services.
							</p>
							<div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
								<p className="font-medium text-gray-800 mb-3">Cookies serve various purposes:</p>
								<ul className="space-y-2 text-gray-600">
									<li>• Essential functionality enabling platform operation</li>
									<li>• Analytics helping us understand user interactions</li>
									<li>• Personalization based on your preferences</li>
									<li>• Security measures protecting your account</li>
								</ul>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Types of Cookies We Use</h2>
						<div className="grid md:grid-cols-2 gap-8 mb-8">
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Strictly Necessary Cookies</h3>
								<p className="text-gray-600">Essential for platform operation including security, authentication, and accessibility. Cannot be disabled.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Functional Cookies</h3>
								<p className="text-gray-600">Enable enhanced features and personalization like language settings and dashboard customizations.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Analytics Cookies</h3>
								<p className="text-gray-600">Help us understand user interactions, popular pages, and platform performance for improvements.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Security Cookies</h3>
								<p className="text-gray-600">Identify suspicious activities, prevent fraud, and protect against unauthorized access.</p>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">How We Use Cookies</h2>
						<div className="bg-green-50 p-8 rounded-lg border border-green-100">
							<div className="text-center mb-6">
								<div className="w-16 h-0.5 bg-green-300 mx-auto mb-4"></div>
								<h3 className="text-xl font-medium text-gray-800 mb-4">Platform Enhancement</h3>
							</div>
							<div className="grid md:grid-cols-2 gap-8">
								<div>
									<h4 className="font-semibold text-gray-800 mb-3">Authentication & Sessions</h4>
									<p className="text-gray-600 mb-4">Maintain login status and secure session management across platform features.</p>
									<h4 className="font-semibold text-gray-800 mb-3">Security & Fraud Prevention</h4>
									<p className="text-gray-600">Detect unusual patterns and protect against unauthorized access and fraudulent activities.</p>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800 mb-3">Personalization</h4>
									<p className="text-gray-600 mb-4">Remember preferences like language, currency, and dashboard configurations.</p>
									<h4 className="font-semibold text-gray-800 mb-3">Platform Analytics</h4>
									<p className="text-gray-600">Gather insights for continuous improvement and feature development.</p>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Third-Party Cookies</h2>
						<div className="space-y-6">
							<div className="bg-white/80 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-4 text-center">Trusted Partners</h3>
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<h4 className="font-medium text-gray-800 mb-2">Analytics Providers</h4>
										<p className="text-sm text-gray-600 mb-3">Google Analytics for platform usage insights and performance metrics</p>
										<h4 className="font-medium text-gray-800 mb-2">Customer Support</h4>
										<p className="text-sm text-gray-600">Live chat and help desk services for customer communication</p>
									</div>
									<div>
										<h4 className="font-medium text-gray-800 mb-2">Market Data Providers</h4>
										<p className="text-sm text-gray-600 mb-3">Real-time financial information and market analysis tools</p>
										<h4 className="font-medium text-gray-800 mb-2">Payment Processors</h4>
										<p className="text-sm text-gray-600">Secure transaction processing and fraud prevention services</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Managing Cookie Preferences</h2>
						<div className="bg-purple-50 p-8 rounded-lg border border-purple-100">
							<div className="text-center mb-6">
								<div className="w-16 h-0.5 bg-purple-300 mx-auto mb-4"></div>
								<h3 className="text-xl font-medium text-gray-800 mb-4">Your Control Options</h3>
							</div>
							<div className="grid md:grid-cols-2 gap-8">
								<div>
									<h4 className="font-semibold text-gray-800 mb-3">Platform Settings</h4>
									<p className="text-gray-600 mb-4">Cookie banner on first visit allows acceptance, rejection, or customization of preferences.</p>
									<h4 className="font-semibold text-gray-800 mb-3">Mobile Device Settings</h4>
									<p className="text-gray-600">Manage tracking through iOS and Android privacy settings and app permissions.</p>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800 mb-3">Browser Settings</h4>
									<p className="text-gray-600 mb-4">Control cookies through browser settings - accept, reject, or notification preferences.</p>
									<h4 className="font-semibold text-gray-800 mb-3">Industry Opt-Out Tools</h4>
									<p className="text-gray-600">Digital Advertising Alliance WebChoices and Network Advertising Initiative tools.</p>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Impact of Disabling Cookies</h2>
						<div className="grid md:grid-cols-2 gap-6">
							<div className="bg-red-50 p-6 rounded-lg border border-red-100">
								<h3 className="font-semibold text-gray-800 mb-3">Essential Cookies</h3>
								<p className="text-gray-600">Disabling may prevent access to platform areas and core trading features.</p>
							</div>
							<div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
								<h3 className="font-semibold text-gray-800 mb-3">Functional Cookies</h3>
								<p className="text-gray-600">Platform won&apos;t remember preferences; reconfiguration needed each visit.</p>
							</div>
							<div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
								<h3 className="font-semibold text-gray-800 mb-3">Analytics Cookies</h3>
								<p className="text-gray-600">Limits our ability to improve platform and identify potential issues.</p>
							</div>
							<div className="bg-green-50 p-6 rounded-lg border border-green-100">
								<h3 className="font-semibold text-gray-800 mb-3">Marketing Cookies</h3>
								<p className="text-gray-600">Less relevant advertising but no effect on core platform functionality.</p>
							</div>
						</div>
					</section>

					{/* Contact Information */}
					<section className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-light text-white mb-6">Cookie Questions</h2>
						<div className="w-16 h-0.5 bg-white mx-auto mb-6"></div>
						<p className="text-lg text-gray-300 mb-6">
							If you have any questions about our use of cookies or this policy:
						</p>
						<div className="space-y-2 text-gray-300">
							<p><span className="font-medium text-white">Email:</span> support@viewmarket.in</p>
							<p><span className="font-medium text-white">Address:</span> opp an clg boring rd patna, bihar, india</p>
							<p><span className="font-medium text-white">Phone:</span> 9241740350</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}