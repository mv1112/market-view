import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Privacy Policy - ViewMarket',
	description: 'Privacy Policy for ViewMarket trading platform',
}

export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-4xl mx-auto px-6 py-16">
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
						<h2 className="text-3xl font-light text-white mb-8 text-center">Information We Collect</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								<strong className="text-white">Personal Information:</strong> We collect your name, email address, phone number, residential address, identification documents, and financial information during the registration and verification process. This information is necessary to provide our trading services and comply with regulatory requirements.
							</p>
							<p>
								<strong className="text-white">Trading Information:</strong> We maintain records of your transaction history, account balances, investment preferences, risk tolerance settings, and portfolio performance data. This information helps us provide personalized trading experiences and maintain accurate account records.
							</p>
							<p>
								<strong className="text-white">Technical Information:</strong> Our systems automatically collect your IP address, device information, browser type, access times, and platform interaction data through cookies and tracking technologies. This technical data helps us maintain platform security and improve user experience.
							</p>
							<p>
								<strong className="text-white">Communication Data:</strong> We keep records of customer service interactions, support tickets, live chat conversations, and all correspondence with our team. These records help us provide better support and resolve any issues efficiently.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">How We Use Your Information</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								<strong className="text-white">Service Provision:</strong> We use your information for account management, trade execution, customer support, and delivery of trading tools and platform features. This ensures you receive the full benefits of our trading platform.
							</p>
							<p>
								<strong className="text-white">Security and Fraud Prevention:</strong> Your information helps us verify your identity, prevent unauthorized access, detect suspicious activities, and maintain overall platform security. These measures protect both your account and our trading community.
							</p>
							<p>
								<strong className="text-white">Compliance and Legal Requirements:</strong> We use your data for AML/KYC compliance, tax reporting obligations, regulatory requirements, and fulfillment of legal obligations. This ensures our platform operates within all applicable laws and regulations.
							</p>
							<p>
								<strong className="text-white">Platform Improvement:</strong> We analyze usage patterns, develop new features, enhance user experience, and conduct market trend research. This helps us continuously improve our trading platform to better serve our users.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">Information Sharing</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								We do not sell, rent, or trade your personal information to third parties for marketing purposes. We may share your information only in the following circumstances:
							</p>
							<p>
								<strong className="text-white">Service Providers:</strong> We may share information with trusted partners who help us operate our platform, process transactions, and provide customer support. These partners are bound by strict confidentiality agreements and can only use your information for specified purposes.
							</p>
							<p>
								<strong className="text-white">Regulatory Compliance:</strong> We may disclose information to regulatory authorities, law enforcement agencies, and other government bodies when required by law or to comply with legal processes and investigations.
							</p>
							<p>
								<strong className="text-white">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity, subject to the same privacy protections outlined in this policy.
							</p>
							<p>
								<strong className="text-white">Consent-Based Sharing:</strong> We may share your information with third parties when you provide explicit consent, such as for third-party integrations or additional services you request.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">Data Security</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								We implement comprehensive security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our security framework includes multiple layers of protection designed to safeguard your data.
							</p>
							<p>
								<strong className="text-white">Encryption:</strong> We use industry-standard encryption protocols for all data transmission and storage, employing advanced cryptographic techniques to ensure your information remains secure both in transit and at rest.
							</p>
							<p>
								<strong className="text-white">Access Controls:</strong> We maintain strict authentication procedures with role-based access controls. All personnel undergo comprehensive background checks and receive regular security training to handle sensitive information appropriately.
							</p>
							<p>
								<strong className="text-white">Infrastructure Security:</strong> Our servers are protected by advanced firewalls, intrusion detection systems, and continuous monitoring. We conduct regular security audits and penetration testing to identify and address potential vulnerabilities.
							</p>
							<p>
								<strong className="text-white">Account Security:</strong> We provide two-factor authentication, secure login procedures, and comprehensive account activity monitoring to help protect your individual account from unauthorized access.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">Your Rights and Choices</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								You have several rights regarding your personal information and how we use it. We are committed to honoring these rights and providing you with control over your data.
							</p>
							<p>
								<strong className="text-white">Access and Portability:</strong> You can request access to your personal information and receive it in a structured, commonly used format. This allows you to understand what data we hold about you and potentially transfer it to another service provider.
							</p>
							<p>
								<strong className="text-white">Correction and Updates:</strong> You can request correction of inaccurate or incomplete information through your user profile settings or by contacting our customer support team. We will update your information promptly upon verification.
							</p>
							<p>
								<strong className="text-white">Deletion:</strong> You can request deletion of your personal information, subject to legal and regulatory retention requirements. Some information may need to be retained for compliance purposes even after account closure.
							</p>
							<p>
								<strong className="text-white">Marketing Communications:</strong> You can opt out of marketing communications at any time through email unsubscribe links or your account settings. This will not affect essential service-related communications.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">Data Retention and International Transfers</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								<strong className="text-white">Data Retention:</strong> We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and resolve disputes. Account and trading records are typically retained for several years after account closure to meet regulatory compliance requirements.
							</p>
							<p>
								<strong className="text-white">International Transfers:</strong> ViewMarket operates globally, and your information may be transferred to and processed in countries outside your residence. We implement appropriate safeguards, including standard contractual clauses and adequacy decisions, to ensure your data receives adequate protection regardless of location.
							</p>
							<p>
								When transferring data internationally, we ensure that recipient countries provide adequate levels of data protection or that appropriate contractual safeguards are in place to protect your information according to applicable privacy laws.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">Changes to This Privacy Policy</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes through email notification or prominent notices on our platform.
							</p>
							<p>
								We encourage you to review this Privacy Policy regularly to stay informed about how we protect your information. Your continued use of our services after any changes constitutes acceptance of the updated Privacy Policy.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-light text-white mb-6">Contact Our Data Protection Officer</h2>
						<div className="w-16 h-0.5 bg-white mx-auto mb-6"></div>
						<p className="text-lg text-gray-300 mb-6">
							For questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
						</p>
						<div className="space-y-2 text-gray-300">
							<p><span className="font-medium text-white">Email:</span> support@viewmarket.in</p>
							<p><span className="font-medium text-white">Address:</span> opp an clg boring rd patna, bihar, india</p>
							<p><span className="font-medium text-white">Phone:</span> 9241740350</p>
						</div>
						<p className="text-sm text-gray-400 mt-4">
							We are committed to addressing your privacy concerns and will respond within a reasonable timeframe.
						</p>
					</section>
				</div>
			</div>
		</div>
	)
}