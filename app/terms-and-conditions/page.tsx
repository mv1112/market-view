import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Terms and Conditions - ViewMarket',
	description: 'Terms and Conditions for ViewMarket trading platform',
}

export default function TermsAndConditionsPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12 bg-black text-white min-h-screen">
			<h1 className="text-4xl font-bold mb-8 text-center">Terms and Conditions</h1>
			<p className="text-sm text-gray-300 mb-8 text-center">Last updated: {new Date().toLocaleDateString()}</p>
			
			<div className="space-y-8">
				<section>
					<h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
					<p className="text-lg leading-relaxed mb-4">
						Welcome to ViewMarket. These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and ViewMarket (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) regarding your access to and use of our trading platform, website, and related services.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						By accessing or using ViewMarket in any manner, you acknowledge that you have read, understood, and agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you must not access or use our services.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						These Terms apply to all users of ViewMarket, including without limitation users who are browsers, customers, merchants, contributors of content, and/or merchants of content.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Eligibility and Account Registration</h2>
					<p className="text-lg leading-relaxed mb-4">
						To use ViewMarket, you must be at least 18 years of age and have the legal capacity to enter into binding agreements. By creating an account, you represent and warrant that you meet these eligibility requirements.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Account Creation:</strong> To access certain features of our platform, you must create an account by providing accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Identity Verification:</strong> As part of our regulatory compliance requirements, you may be required to provide additional documentation to verify your identity, including government-issued identification, proof of address, and financial information.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Account Security:</strong> You must immediately notify us of any unauthorized use of your account or any other breach of security. We are not liable for any loss or damage arising from your failure to protect your account information.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>One Account Policy:</strong> Each user is permitted to maintain only one account. Creating multiple accounts may result in suspension or termination of all your accounts.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Trading Services</h2>
					<p className="text-lg leading-relaxed mb-4">
						ViewMarket provides access to various financial instruments and trading services, subject to the terms and conditions outlined herein and applicable regulatory requirements.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Order Execution:</strong> We will use reasonable efforts to execute your trades promptly and efficiently. However, we do not guarantee execution at any specific price or time. Market conditions, liquidity, and other factors may affect order execution.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Trading Hours:</strong> Trading is generally available during market hours, which vary by instrument and market. We reserve the right to suspend trading or modify trading hours due to market conditions, maintenance, or other operational requirements.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Fees and Commissions:</strong> You agree to pay all applicable fees, commissions, and charges associated with your use of our services. Fee schedules are available on our website and may be updated from time to time.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Risk Management:</strong> We may implement risk management measures, including position limits, margin requirements, and automatic stop-loss orders, to protect both you and our platform from excessive risk exposure.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">User Responsibilities and Prohibited Activities</h2>
					<p className="text-lg leading-relaxed mb-4">
						As a user of ViewMarket, you agree to use our services responsibly and in compliance with all applicable laws and regulations.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Compliance:</strong> You must comply with all applicable laws, regulations, and rules of relevant regulatory authorities in your jurisdiction. This includes but is not limited to securities laws, tax obligations, and anti-money laundering regulations.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Prohibited Activities:</strong> You may not use our platform for any illegal, fraudulent, or unauthorized purposes. Prohibited activities include but are not limited to market manipulation, insider trading, money laundering, financing of terrorism, and violation of sanctions.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>System Integrity:</strong> You may not attempt to compromise the security or functionality of our platform, including but not limited to hacking, introducing viruses, or engaging in any other activities that could disrupt our services.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Accurate Information:</strong> You must provide accurate and truthful information in all communications with us and promptly update any changes to your personal or financial information.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Intellectual Property Rights</h2>
					<p className="text-lg leading-relaxed mb-4">
						ViewMarket and its content, including but not limited to text, graphics, logos, images, software, and other materials, are protected by intellectual property laws and are the exclusive property of ViewMarket or its licensors.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Limited License:</strong> We grant you a limited, non-exclusive, non-transferable license to access and use our platform for your personal trading activities. This license does not include any right to redistribute, modify, or create derivative works.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Restrictions:</strong> You may not copy, reproduce, distribute, transmit, display, perform, publish, license, create derivative works from, transfer, or sell any content or information obtained from our platform without our express written permission.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Trademarks:</strong> ViewMarket, our logo, and other trademarks are the property of our company. You may not use our trademarks without our prior written consent.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Privacy and Data Protection</h2>
					<p className="text-lg leading-relaxed mb-4">
						Your privacy is important to us. Our collection, use, and protection of your personal information are governed by our Privacy Policy, which is incorporated into these Terms by reference.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						By using our services, you consent to the collection, processing, and use of your information as described in our Privacy Policy. You also acknowledge that we may be required to disclose your information to regulatory authorities or law enforcement agencies as required by law.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Disclaimers and Limitation of Liability</h2>
					<p className="text-lg leading-relaxed mb-4">
						<strong>No Warranties:</strong> Our services are provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, whether express or implied. We disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Investment Risk:</strong> Trading and investing involve substantial risk of loss. You acknowledge that you understand these risks and that you are solely responsible for your trading decisions and their consequences.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Limitation of Liability:</strong> To the maximum extent permitted by law, ViewMarket shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of our services, regardless of the cause of action or theory of liability.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Force Majeure:</strong> We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to acts of God, war, terrorism, pandemic, government actions, or technical failures.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Termination</h2>
					<p className="text-lg leading-relaxed mb-4">
						Either party may terminate this agreement at any time with or without cause. You may terminate your account by following the account closure procedures outlined on our platform.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Termination by ViewMarket:</strong> We reserve the right to suspend or terminate your account immediately if you violate these Terms, engage in prohibited activities, or if we are required to do so by law or regulation.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Effect of Termination:</strong> Upon termination, your right to access and use our services will cease immediately. We will process any pending transactions and return any remaining account balance, subject to applicable fees and legal requirements.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Survival:</strong> Provisions of these Terms that by their nature should survive termination shall remain in effect, including but not limited to limitations of liability, indemnification, and dispute resolution.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
					<p className="text-lg leading-relaxed mb-4">
						Any disputes arising out of or relating to these Terms or your use of our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Arbitration Process:</strong> Arbitration proceedings shall be conducted in English and shall take place in New York, New York. The arbitrator&apos;s decision shall be final and binding, and judgment may be entered in any court of competent jurisdiction.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Class Action Waiver:</strong> You agree that any dispute resolution proceedings shall be conducted on an individual basis and not as part of a class, consolidated, or representative action.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
					<p className="text-lg leading-relaxed mb-4">
						These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						Any legal action or proceeding arising under these Terms shall be brought exclusively in the federal or state courts located in New York, New York, and you hereby consent to the personal jurisdiction and venue therein.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Modifications to Terms</h2>
					<p className="text-lg leading-relaxed mb-4">
						We reserve the right to modify these Terms at any time. Updated Terms will be posted on our website with the effective date. Material changes will be communicated to you through email or platform notifications.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						Your continued use of our services after the effective date of any modifications constitutes your acceptance of the updated Terms. If you do not agree with the modifications, you must discontinue using our services.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
					<p className="text-lg leading-relaxed mb-4">
						If you have any questions about these Terms and Conditions, please contact us:
					</p>
					<p className="text-lg leading-relaxed">
						<strong>Email:</strong> support@viewmarket.in<br />
						<strong>Address:</strong> opp an clg boring rd patna, bihar, india<br />
						<strong>Phone:</strong> 9241740350
					</p>
				</section>
			</div>
		</div>
	)
}