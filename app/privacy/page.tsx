import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Privacy Policy - ViewMarket',
	description: 'Privacy Policy for ViewMarket trading platform',
}

export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-4xl mx-auto px-6 py-16">
				{/* Header Section */}
				<div className="text-center mb-16">
					<h1 className="text-5xl md:text-6xl font-light text-white mb-6">
						Privacy Policy
					</h1>
					<div className="w-24 h-0.5 bg-white mx-auto mb-8"></div>
					<p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Protecting your privacy and ensuring the security of your personal information 
						through transparent data practices and robust security measures.
					</p>
					<p className="text-sm text-gray-400 mt-6">Last updated: {new Date().toLocaleDateString()}</p>
				</div>

				{/* Content Sections */}
				<div className="space-y-16">
					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">Introduction</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								Welcome to ViewMarket. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our trading platform, website, and related services.
							</p>
							<p>
								By accessing or using ViewMarket, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our services.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Information We Collect</h2>
						<div className="grid md:grid-cols-2 gap-8 mb-8">
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Personal Information</h3>
								<p className="text-gray-600">Name, email, phone number, address, identification documents, and financial information collected during registration and verification.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Trading Information</h3>
								<p className="text-gray-600">Transaction history, account balances, investment preferences, risk tolerance, and portfolio performance data.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Technical Information</h3>
								<p className="text-gray-600">IP address, device information, browser type, access times, and platform interaction data through cookies and tracking technologies.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Communication Data</h3>
								<p className="text-gray-600">Records of customer service interactions, support tickets, live chat conversations, and correspondence with our team.</p>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">How We Use Your Information</h2>
						<div className="space-y-8">
							<div className="bg-blue-50 p-8 rounded-lg border border-blue-100">
								<div className="grid md:grid-cols-2 gap-8">
									<div>
										<h3 className="font-semibold text-gray-800 mb-4 text-lg">Service Provision</h3>
										<p className="text-gray-600">Account management, trade execution, customer support, and delivery of trading tools and features.</p>
									</div>
									<div>
										<h3 className="font-semibold text-gray-800 mb-4 text-lg">Security & Fraud Prevention</h3>
										<p className="text-gray-600">Identity verification, unauthorized access prevention, suspicious activity detection, and platform security maintenance.</p>
									</div>
									<div>
										<h3 className="font-semibold text-gray-800 mb-4 text-lg">Compliance & Legal</h3>
										<p className="text-gray-600">AML/KYC compliance, tax reporting, regulatory requirements, and legal obligation fulfillment.</p>
									</div>
									<div>
										<h3 className="font-semibold text-gray-800 mb-4 text-lg">Platform Improvement</h3>
										<p className="text-gray-600">Usage analysis, feature development, user experience enhancement, and market trend research.</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Information Sharing</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-600">
							<div className="bg-white/80 p-6 rounded-lg border border-gray-100">
								<p className="text-center mb-6 font-medium text-gray-800">
									We do not sell, rent, or trade your personal information to third parties for marketing purposes.
								</p>
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<h4 className="font-semibold text-gray-800 mb-2">Service Providers</h4>
										<p className="text-sm text-gray-600">Trusted partners for platform operations, transaction processing, and customer support</p>
									</div>
									<div>
										<h4 className="font-semibold text-gray-800 mb-2">Regulatory Compliance</h4>
										<p className="text-sm text-gray-600">Required disclosures to authorities, law enforcement, and regulatory bodies</p>
									</div>
									<div>
										<h4 className="font-semibold text-gray-800 mb-2">Business Transfers</h4>
										<p className="text-sm text-gray-600">Information transfer during mergers, acquisitions, or asset sales</p>
									</div>
									<div>
										<h4 className="font-semibold text-gray-800 mb-2">Consent-Based</h4>
										<p className="text-sm text-gray-600">Sharing with explicit user consent for third-party integrations</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Data Security</h2>
						<div className="bg-green-50 p-8 rounded-lg border border-green-100">
							<div className="text-center mb-6">
								<div className="w-16 h-0.5 bg-green-300 mx-auto mb-4"></div>
								<h3 className="text-xl font-medium text-gray-800 mb-4">Comprehensive Protection</h3>
							</div>
							<div className="grid md:grid-cols-2 gap-8">
								<div>
									<h4 className="font-semibold text-gray-800 mb-3">Encryption</h4>
									<p className="text-gray-600 mb-4">Industry-standard encryption for data transmission and storage using advanced cryptographic techniques.</p>
									<h4 className="font-semibold text-gray-800 mb-3">Access Controls</h4>
									<p className="text-gray-600">Strict authentication procedures with background-checked personnel and regular security training.</p>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800 mb-3">Infrastructure Security</h4>
									<p className="text-gray-600 mb-4">Secure servers with firewalls, intrusion detection, and regular security audits and penetration testing.</p>
									<h4 className="font-semibold text-gray-800 mb-3">Account Security</h4>
									<p className="text-gray-600">Two-factor authentication, secure login procedures, and account activity monitoring features.</p>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Your Rights and Choices</h2>
						<div className="grid md:grid-cols-2 gap-6">
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Access & Portability</h3>
								<p className="text-gray-600">Request access to your personal information and receive it in a structured, commonly used format.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Correction & Updates</h3>
								<p className="text-gray-600">Request correction of inaccurate information through your user profile or customer support.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Deletion</h3>
								<p className="text-gray-600">Request deletion of personal information, subject to legal and regulatory retention requirements.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Marketing Communications</h3>
								<p className="text-gray-600">Opt out of marketing communications through email unsubscribe or account settings.</p>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Data Retention & International Transfers</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-600">
							<div className="bg-white/80 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Data Retention</h3>
								<p>We retain personal information only as long as necessary to fulfill outlined purposes, comply with legal obligations, and resolve disputes. Account and trading records are typically retained for several years after closure for regulatory compliance.</p>
							</div>
							<div className="bg-white/80 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">International Transfers</h3>
								<p>ViewMarket operates globally, and information may be transferred internationally. We implement appropriate safeguards including standard contractual clauses and adequacy decisions to ensure adequate protection.</p>
							</div>
						</div>
					</section>

					{/* Contact Information */}
					<section className="max-w-4xl mx-auto text-center bg-gray-50 p-8 rounded-lg">
						<h2 className="text-3xl font-light text-gray-800 mb-6">Contact Our Data Protection Officer</h2>
						<div className="w-16 h-0.5 bg-gray-300 mx-auto mb-6"></div>
						<p className="text-lg text-gray-600 mb-6">
							For questions, concerns, or requests regarding this Privacy Policy or our privacy practices:
						</p>
						<div className="space-y-2 text-gray-700">
							<p><span className="font-medium">Email:</span> support@viewmarket.in</p>
							<p><span className="font-medium">Address:</span> opp an clg boring rd patna, bihar, india</p>
							<p><span className="font-medium">Phone:</span> 9241740350</p>
						</div>
						<p className="text-sm text-gray-600 mt-4">
							We are committed to addressing your privacy concerns and will respond within a reasonable timeframe.
						</p>
					</section>
				</div>
			</div>
		</div>
	)
}