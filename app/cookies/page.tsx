import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Cookies Policy - ViewMarket',
	description: 'Cookies Policy for ViewMarket trading platform',
}

export default function CookiesPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12 bg-black text-white min-h-screen">
			<h1 className="text-4xl font-bold mb-8 text-center">Cookies Policy</h1>
			<p className="text-sm text-gray-300 mb-8 text-center">Last updated: {new Date().toLocaleDateString()}</p>
			
			<div className="space-y-8">
				<section>
					<h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
					<p className="text-lg leading-relaxed mb-4">
						Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit our website or use our trading platform. These files contain information that helps us improve your user experience, remember your preferences, and provide you with personalized services.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						Cookies serve various purposes, from essential functionality that enables our platform to work properly to analytics that help us understand how users interact with our services. They can be temporary (session cookies) that are deleted when you close your browser, or persistent cookies that remain on your device for a specified period.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						ViewMarket uses cookies and similar tracking technologies to enhance your trading experience, ensure security, and comply with regulatory requirements. This Cookies Policy explains what cookies we use, why we use them, and how you can manage your cookie preferences.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
					<p className="text-lg leading-relaxed mb-4">
						We use different types of cookies for various purposes to ensure our platform functions properly and to provide you with the best possible trading experience.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Strictly Necessary Cookies:</strong> These cookies are essential for the operation of our trading platform. They enable core functionality such as security, network management, authentication, and accessibility. Without these cookies, our platform cannot function properly, and certain features may not be available. These cookies do not collect personally identifiable information and cannot be disabled.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Functional Cookies:</strong> These cookies enable enhanced functionality and personalization features on our platform. They help us remember your preferences, such as language settings, dashboard layout, and trading interface customizations. Functional cookies improve your user experience but are not essential for basic platform operation.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Analytics and Performance Cookies:</strong> We use analytics cookies to understand how users interact with our platform, which pages are most popular, how long users spend on different sections, and where users encounter difficulties. This information helps us improve our platform performance, user interface, and overall user experience.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Security Cookies:</strong> These cookies help us identify suspicious activities, prevent fraudulent transactions, and protect your account from unauthorized access. Security cookies are crucial for maintaining the integrity and safety of our trading platform.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Marketing and Advertising Cookies:</strong> These cookies are used to deliver relevant advertisements and marketing content based on your interests and browsing behavior. They help us measure the effectiveness of our marketing campaigns and provide you with more relevant promotional content.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
					<p className="text-lg leading-relaxed mb-4">
						ViewMarket uses cookies for multiple purposes related to platform functionality, user experience enhancement, security, and regulatory compliance.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Authentication and Session Management:</strong> We use cookies to authenticate your identity when you log into your account and to maintain your session while you use our platform. This ensures that you remain logged in as you navigate between different pages and features.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Personalization:</strong> Cookies help us remember your preferences and settings, such as your preferred language, currency display, chart configurations, and dashboard layout. This personalization ensures that your trading environment is tailored to your specific needs and preferences.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Security and Fraud Prevention:</strong> We use cookies to detect unusual activity patterns, prevent unauthorized access, and protect against fraudulent transactions. Security cookies help us maintain the highest levels of platform security and protect your financial information.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Platform Analytics:</strong> Analytics cookies provide us with valuable insights into how our platform is used, which features are most popular, and where users encounter difficulties. This information guides our development efforts and helps us continuously improve our services.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Regulatory Compliance:</strong> Some cookies are necessary for compliance with financial regulations, including record-keeping requirements, audit trails, and reporting obligations mandated by regulatory authorities.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
					<p className="text-lg leading-relaxed mb-4">
						In addition to our own cookies, we may use third-party cookies from trusted partners and service providers to enhance our platform functionality and provide additional services.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Analytics Providers:</strong> We work with third-party analytics providers such as Google Analytics to gather insights about platform usage, user behavior, and performance metrics. These services help us understand how to improve our platform and user experience.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Market Data Providers:</strong> Third-party market data providers may set cookies to deliver real-time financial information, news feeds, and market analysis tools integrated into our platform.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Customer Support Tools:</strong> We may use third-party customer support platforms that utilize cookies to provide live chat functionality, help desk services, and customer communication tools.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Payment Processors:</strong> When you make deposits or withdrawals, payment processing partners may set cookies to facilitate secure transaction processing and fraud prevention.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						We carefully select our third-party partners and ensure they meet our privacy and security standards. However, we do not control third-party cookies, and their use is governed by the respective third parties&apos; privacy policies.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Managing Your Cookie Preferences</h2>
					<p className="text-lg leading-relaxed mb-4">
						You have various options for managing cookies on our platform and controlling how they are used. We provide tools and settings that allow you to customize your cookie preferences according to your comfort level and privacy preferences.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Cookie Settings on Our Platform:</strong> When you first visit our website, you will be presented with a cookie banner that allows you to accept all cookies, reject non-essential cookies, or customize your preferences. You can access and modify these settings at any time through the cookie preferences link in our website footer.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can typically choose to accept all cookies, reject all cookies, or be notified when a cookie is being set. However, please note that disabling certain cookies may affect the functionality of our platform.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Mobile Device Settings:</strong> If you access our platform through a mobile app, you can manage tracking preferences through your device&apos;s privacy settings. Both iOS and Android devices provide options to limit ad tracking and manage app permissions.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Opt-Out Tools:</strong> For analytics and advertising cookies, you can use industry opt-out tools such as the Digital Advertising Alliance&apos;s WebChoices tool or the Network Advertising Initiative&apos;s opt-out page to manage your preferences across multiple websites and services.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Impact of Disabling Cookies</h2>
					<p className="text-lg leading-relaxed mb-4">
						While you have the right to disable cookies, doing so may impact your experience on our trading platform. Different types of cookies have varying effects when disabled.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Essential Cookies:</strong> If you disable essential cookies, you may not be able to access certain areas of our platform or use core trading features. Login functionality, session management, and security features may not work properly without these cookies.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Functional Cookies:</strong> Disabling functional cookies means that our platform will not remember your preferences and settings. You may need to reconfigure your trading interface, language preferences, and other personalization settings each time you visit.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Analytics Cookies:</strong> Disabling analytics cookies will prevent us from collecting information about how you use our platform. While this doesn&apos;t affect functionality, it may limit our ability to improve the platform and identify potential issues.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Marketing Cookies:</strong> Disabling marketing cookies means you may see less relevant advertising content, but it will not affect the core functionality of our trading platform.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Cookie Retention and Deletion</h2>
					<p className="text-lg leading-relaxed mb-4">
						Different cookies have different lifespans, and we maintain cookies only for as long as necessary to fulfill their intended purposes.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Session Cookies:</strong> These temporary cookies are automatically deleted when you close your browser or end your trading session. They are used for essential functionality during your visit to our platform.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Persistent Cookies:</strong> These cookies remain on your device for a predetermined period, typically ranging from 30 days to 2 years, depending on their purpose. They are automatically deleted when they expire.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Manual Deletion:</strong> You can manually delete cookies at any time through your browser settings. However, this may require you to re-enter your preferences and settings when you next visit our platform.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Updates to This Cookie Policy</h2>
					<p className="text-lg leading-relaxed mb-4">
						We may update this Cookie Policy from time to time to reflect changes in our use of cookies, new technologies, or changes in applicable laws and regulations.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						When we make material changes to this policy, we will notify you through our platform, email, or other appropriate communication methods. We encourage you to review this policy periodically to stay informed about our use of cookies.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						Your continued use of our platform after any updates to this Cookie Policy constitutes your acceptance of the revised terms.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
					<p className="text-lg leading-relaxed mb-4">
						If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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