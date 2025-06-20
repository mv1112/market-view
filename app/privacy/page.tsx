import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Privacy Policy - ViewMarket',
	description: 'Privacy Policy for ViewMarket trading platform',
}

export default function PrivacyPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12 bg-black text-white min-h-screen">
			<h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
			<p className="text-sm text-gray-300 mb-8 text-center">Last updated: {new Date().toLocaleDateString()}</p>
			
			<div className="space-y-8">
				<section>
					<h2 className="text-2xl font-semibold mb-4">Introduction</h2>
					<p className="text-lg leading-relaxed mb-4">
						Welcome to ViewMarket. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our trading platform, website, and related services.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						By accessing or using ViewMarket, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our services.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
					<p className="text-lg leading-relaxed mb-4">
						We collect several types of information from and about users of our services, including personal information, trading data, and technical information.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Personal Information:</strong> We collect information that identifies you personally, such as your name, email address, phone number, postal address, date of birth, government-issued identification numbers, financial information, and employment details. This information is collected when you register for an account, verify your identity, or contact our customer support.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Trading Information:</strong> We collect information related to your trading activities, including transaction history, account balances, investment preferences, risk tolerance, trading strategies, and portfolio performance. This data helps us provide you with personalized services and comply with regulatory requirements.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Technical Information:</strong> We automatically collect certain technical information when you use our platform, including your IP address, device information, browser type, operating system, access times, pages viewed, and the routes by which you access our services. We also collect information through cookies and similar tracking technologies.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Communication Data:</strong> We maintain records of communications between you and ViewMarket, including customer service interactions, support tickets, live chat conversations, and any other correspondence.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
					<p className="text-lg leading-relaxed mb-4">
						We use the information we collect for various purposes related to providing and improving our trading services, ensuring security, and complying with legal obligations.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Service Provision:</strong> We use your information to create and maintain your trading account, execute trades, process transactions, provide customer support, and deliver the trading tools and features you request. This includes real-time market data, trading signals, portfolio analytics, and risk management tools.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Security and Fraud Prevention:</strong> We use your information to verify your identity, prevent unauthorized access, detect and prevent fraudulent activities, monitor for suspicious transactions, and maintain the security and integrity of our platform.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Compliance and Legal Requirements:</strong> We use your information to comply with applicable laws, regulations, and industry standards, including anti-money laundering (AML) requirements, know your customer (KYC) regulations, tax reporting obligations, and regulatory reporting requirements.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Platform Improvement:</strong> We analyze usage patterns and user feedback to improve our platform, develop new features, enhance user experience, optimize performance, and conduct research and analytics to better understand market trends and user preferences.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Information Sharing and Disclosure</h2>
					<p className="text-lg leading-relaxed mb-4">
						We understand the importance of keeping your information confidential and secure. We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in operating our platform, processing transactions, providing customer support, conducting security audits, and performing other business functions. These providers are contractually obligated to protect your information and use it only for the specific services they provide to us.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Regulatory and Legal Compliance:</strong> We may disclose your information to regulatory authorities, law enforcement agencies, courts, or other government entities when required by law, regulation, legal process, or governmental request. This includes compliance with subpoenas, court orders, regulatory investigations, and tax reporting requirements.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Business Transfers:</strong> In the event of a merger, acquisition, sale of assets, or bankruptcy, your information may be transferred to the acquiring entity or successor organization, subject to appropriate confidentiality and security measures.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Consent-Based Sharing:</strong> We may share your information with third parties when you have given us explicit consent to do so, such as when you choose to connect your account with third-party financial services or trading tools.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Data Security</h2>
					<p className="text-lg leading-relaxed mb-4">
						We implement comprehensive security measures to protect your personal and financial information from unauthorized access, use, disclosure, alteration, or destruction.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Encryption:</strong> We use industry-standard encryption protocols to protect data transmission and storage. All sensitive information is encrypted both in transit and at rest using advanced cryptographic techniques.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Access Controls:</strong> We maintain strict access controls and authentication procedures to ensure that only authorized personnel can access your information. Our employees undergo background checks and receive regular security training.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Infrastructure Security:</strong> Our platform is hosted on secure servers with multiple layers of protection, including firewalls, intrusion detection systems, and regular security monitoring. We conduct regular security audits and penetration testing to identify and address potential vulnerabilities.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Account Security:</strong> We provide multiple security features for your account, including two-factor authentication, secure login procedures, session timeouts, and account activity monitoring. We recommend that you use strong, unique passwords and enable all available security features.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
					<p className="text-lg leading-relaxed mb-4">
						You have certain rights regarding your personal information, and we provide various tools and options to help you manage your privacy preferences.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Access and Portability:</strong> You have the right to request access to the personal information we hold about you and to receive a copy of this information in a structured, commonly used format. You can access most of your account information through your user dashboard.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Correction and Updates:</strong> You have the right to request correction of inaccurate or incomplete personal information. You can update most of your account information directly through your user profile, or you can contact our customer support team for assistance.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Deletion:</strong> In certain circumstances, you have the right to request deletion of your personal information. Please note that we may need to retain certain information for legal, regulatory, or legitimate business purposes, such as compliance with financial regulations and transaction records.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Marketing Communications:</strong> You can opt out of receiving marketing communications from us at any time by following the unsubscribe instructions in our emails or by updating your communication preferences in your account settings.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
					<p className="text-lg leading-relaxed mb-4">
						ViewMarket operates globally, and your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws than your country.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						When we transfer your information internationally, we implement appropriate safeguards to ensure your information receives adequate protection. This includes using standard contractual clauses, adequacy decisions, and other legal mechanisms approved by relevant data protection authorities.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
					<p className="text-lg leading-relaxed mb-4">
						We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						The retention period varies depending on the type of information and the purpose for which it was collected. Account information and trading records are typically retained for several years after account closure to comply with regulatory requirements and for potential legal proceedings.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Children&apos;s Privacy</h2>
					<p className="text-lg leading-relaxed mb-4">
						ViewMarket is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
					<p className="text-lg leading-relaxed mb-4">
						We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated Privacy Policy on our website and, where appropriate, by sending you a notification.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						Your continued use of ViewMarket after the effective date of any changes constitutes your acceptance of the updated Privacy Policy. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
					<p className="text-lg leading-relaxed mb-4">
						If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact our Data Protection Officer:
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Email:</strong> support@viewmarket.in<br />
						<strong>Address:</strong> opp an clg boring rd patna, bihar, india<br />
						<strong>Phone:</strong> 9241740350
					</p>
					<p className="text-lg leading-relaxed">
						We are committed to addressing your privacy concerns and will respond to your inquiries within a reasonable timeframe.
					</p>
				</section>
			</div>
		</div>
	)
}