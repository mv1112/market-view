import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Terms and Conditions - ViewMarket',
	description: 'Terms and Conditions for ViewMarket trading platform',
}

export default function TermsAndConditionsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
			<div className="max-w-6xl mx-auto px-6 py-16">
				{/* Header Section */}
				<div className="text-center mb-16">
					<h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
						Terms and Conditions
					</h1>
					<div className="w-24 h-0.5 bg-gray-300 mx-auto mb-8"></div>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Establishing clear guidelines and mutual understanding to ensure a secure, 
						compliant, and professional trading environment for all users.
					</p>
					<p className="text-sm text-gray-500 mt-6">Last updated: {new Date().toLocaleDateString()}</p>
				</div>

				{/* Content Sections */}
				<div className="space-y-16">
					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Acceptance of Terms</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-600">
							<p>
								Welcome to ViewMarket. These Terms and Conditions constitute a legally binding agreement between you and ViewMarket regarding your access to and use of our trading platform, website, and related services.
							</p>
							<div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
								<p className="font-medium text-gray-800 mb-3">By accessing or using ViewMarket, you acknowledge that you have:</p>
								<ul className="space-y-2 text-gray-600">
									<li>• Read and understood these Terms and all applicable laws</li>
									<li>• Agreed to be bound by these Terms and regulations</li>
									<li>• Confirmed your legal capacity to enter binding agreements</li>
								</ul>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Eligibility and Account Registration</h2>
						<div className="grid md:grid-cols-2 gap-8 mb-8">
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Age Requirement</h3>
								<p className="text-gray-600">Must be at least 18 years of age with legal capacity to enter binding agreements.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Account Creation</h3>
								<p className="text-gray-600">Provide accurate, complete information and maintain confidentiality of credentials.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Identity Verification</h3>
								<p className="text-gray-600">Additional documentation may be required for regulatory compliance and KYC procedures.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">One Account Policy</h3>
								<p className="text-gray-600">Each user permitted only one account. Multiple accounts may result in suspension.</p>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Trading Services</h2>
						<div className="space-y-8">
							<div className="bg-green-50 p-8 rounded-lg border border-green-100">
								<div className="text-center mb-6">
									<div className="w-16 h-0.5 bg-green-300 mx-auto mb-4"></div>
									<h3 className="text-xl font-medium text-gray-800 mb-4">Professional Trading Platform</h3>
								</div>
								<div className="grid md:grid-cols-2 gap-8">
									<div>
										<h4 className="font-semibold text-gray-800 mb-3">Order Execution</h4>
										<p className="text-gray-600 mb-4">Reasonable efforts for prompt execution, subject to market conditions and liquidity factors.</p>
										<h4 className="font-semibold text-gray-800 mb-3">Trading Hours</h4>
										<p className="text-gray-600">Available during market hours with possible suspensions for maintenance or operational requirements.</p>
									</div>
									<div>
										<h4 className="font-semibold text-gray-800 mb-3">Fees & Commissions</h4>
										<p className="text-gray-600 mb-4">Transparent fee structure available on website, subject to periodic updates.</p>
										<h4 className="font-semibold text-gray-800 mb-3">Risk Management</h4>
										<p className="text-gray-600">Position limits, margin requirements, and protective measures for user and platform security.</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">User Responsibilities</h2>
						<div className="space-y-6">
							<div className="bg-white/80 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-4 text-center">Compliance Requirements</h3>
								<div className="grid md:grid-cols-3 gap-6">
									<div className="text-center">
										<h4 className="font-medium text-gray-800 mb-2">Legal Compliance</h4>
										<p className="text-sm text-gray-600">Follow all applicable laws and regulatory requirements</p>
									</div>
									<div className="text-center">
										<h4 className="font-medium text-gray-800 mb-2">System Integrity</h4>
										<p className="text-sm text-gray-600">No hacking, viruses, or disruptive activities</p>
									</div>
									<div className="text-center">
										<h4 className="font-medium text-gray-800 mb-2">Accurate Information</h4>
										<p className="text-sm text-gray-600">Provide truthful information and prompt updates</p>
									</div>
								</div>
							</div>
							<div className="bg-red-50 p-6 rounded-lg border border-red-100">
								<h3 className="font-semibold text-gray-800 mb-3 text-center">Prohibited Activities</h3>
								<div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
									<div>• Market manipulation and insider trading</div>
									<div>• Money laundering and terrorism financing</div>
									<div>• Violation of sanctions and regulations</div>
									<div>• Fraudulent or unauthorized activities</div>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Intellectual Property Rights</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-600">
							<div className="bg-white/80 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Protected Content</h3>
								<p className="mb-4">ViewMarket content, including text, graphics, logos, software, and materials, are protected by intellectual property laws and remain our exclusive property.</p>
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<h4 className="font-medium text-gray-800 mb-2">Limited License</h4>
										<p className="text-sm text-gray-600">Non-exclusive access for personal trading activities only</p>
									</div>
									<div>
										<h4 className="font-medium text-gray-800 mb-2">Usage Restrictions</h4>
										<p className="text-sm text-gray-600">No copying, redistribution, or derivative works without permission</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Disclaimers and Liability</h2>
						<div className="bg-yellow-50 p-8 rounded-lg border border-yellow-100">
							<div className="text-center mb-6">
								<div className="w-16 h-0.5 bg-yellow-300 mx-auto mb-4"></div>
								<h3 className="text-xl font-medium text-gray-800 mb-4">Important Disclaimers</h3>
							</div>
							<div className="grid md:grid-cols-2 gap-8">
								<div>
									<h4 className="font-semibold text-gray-800 mb-3">No Warranties</h4>
									<p className="text-gray-600 mb-4">Services provided &quot;as is&quot; without warranties of merchantability or fitness for purpose.</p>
									<h4 className="font-semibold text-gray-800 mb-3">Investment Risk</h4>
									<p className="text-gray-600">Substantial risk of loss - users solely responsible for trading decisions.</p>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800 mb-3">Limitation of Liability</h4>
									<p className="text-gray-600 mb-4">Maximum legal limitation on direct, indirect, and consequential damages.</p>
									<h4 className="font-semibold text-gray-800 mb-3">Force Majeure</h4>
									<p className="text-gray-600">No liability for circumstances beyond reasonable control.</p>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Termination & Dispute Resolution</h2>
						<div className="grid md:grid-cols-2 gap-8">
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Account Termination</h3>
								<p className="text-gray-600 mb-3">Either party may terminate with or without cause. Violations result in immediate suspension.</p>
								<h4 className="font-medium text-gray-800 mb-2">Effect of Termination</h4>
								<p className="text-sm text-gray-600">Access ceases immediately with remaining balance returned per legal requirements.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Dispute Resolution</h3>
								<p className="text-gray-600 mb-3">Binding arbitration through American Arbitration Association rules in New York.</p>
								<h4 className="font-medium text-gray-800 mb-2">Class Action Waiver</h4>
								<p className="text-sm text-gray-600">Individual basis proceedings only, not as part of class actions.</p>
							</div>
						</div>
					</section>

					{/* Contact Information */}
					<section className="max-w-4xl mx-auto text-center bg-gray-50 p-8 rounded-lg">
						<h2 className="text-3xl font-light text-gray-800 mb-6">Legal Questions</h2>
						<div className="w-16 h-0.5 bg-gray-300 mx-auto mb-6"></div>
						<p className="text-lg text-gray-600 mb-6">
							If you have any questions about these Terms and Conditions, please contact us:
						</p>
						<div className="space-y-2 text-gray-700">
							<p><span className="font-medium">Email:</span> support@viewmarket.in</p>
							<p><span className="font-medium">Address:</span> opp an clg boring rd patna, bihar, india</p>
							<p><span className="font-medium">Phone:</span> 9241740350</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}