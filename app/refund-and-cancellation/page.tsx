import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Refund and Cancellation - ViewMarket',
	description: 'Refund and Cancellation Policy for ViewMarket trading platform',
}

export default function RefundAndCancellationPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
			<div className="max-w-6xl mx-auto px-6 py-16">
				{/* Header Section */}
				<div className="text-center mb-16">
					<h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
						Refund and Cancellation Policy
					</h1>
					<div className="w-24 h-0.5 bg-gray-300 mx-auto mb-8"></div>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Providing transparent and fair policies for refunds and cancellations 
						while maintaining regulatory compliance and professional standards.
					</p>
					<p className="text-sm text-gray-500 mt-6">Last updated: {new Date().toLocaleDateString()}</p>
				</div>

				{/* Content Sections */}
				<div className="space-y-16">
					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Overview</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-600">
							<p>
								This Refund and Cancellation Policy explains the terms and conditions under which ViewMarket provides refunds and handles cancellations for various services and transactions. Due to the nature of financial trading and regulatory requirements, different rules apply to different types of transactions and services.
							</p>
							<div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
								<p className="font-medium text-gray-800 mb-3">ViewMarket is committed to:</p>
								<ul className="space-y-2 text-gray-600">
									<li>• Providing fair and transparent policies</li>
									<li>• Complying with applicable financial regulations</li>
									<li>• Handling situations professionally and efficiently</li>
								</ul>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Trading Transaction Cancellations</h2>
						<div className="grid md:grid-cols-2 gap-8">
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Pre-Execution Cancellations</h3>
								<p className="text-gray-600">Cancel pending orders before execution through our trading platform on a best-efforts basis.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">System Error Cancellations</h3>
								<p className="text-gray-600">Technical errors or platform malfunctions may result in trade cancellation after thorough investigation.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Regulatory Cancellations</h3>
								<p className="text-gray-600">Required by authorities for market integrity and compliance with regulations.</p>
							</div>
							<div className="bg-white/50 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-3">Cooling-Off Period</h3>
								<p className="text-gray-600">Financial trading does not include cooling-off periods once transactions are executed.</p>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Subscription and Service Fees</h2>
						<div className="bg-green-50 p-8 rounded-lg border border-green-100">
							<div className="text-center mb-6">
								<div className="w-16 h-0.5 bg-green-300 mx-auto mb-4"></div>
								<h3 className="text-xl font-medium text-gray-800 mb-4">Subscription Policies</h3>
							</div>
							<div className="grid md:grid-cols-2 gap-8">
								<div>
									<h4 className="font-semibold text-gray-800 mb-3">Monthly Subscriptions</h4>
									<p className="text-gray-600 mb-4">Cancel anytime through account settings. Access continues until end of billing cycle with no partial refunds.</p>
									<h4 className="font-semibold text-gray-800 mb-3">Premium Tools</h4>
									<p className="text-gray-600">Generally non-refundable once access granted. Contact support for technical issues.</p>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800 mb-3">Annual Subscriptions</h4>
									<p className="text-gray-600 mb-4">30-day full refund window. After 30 days, non-refundable but can prevent auto-renewal.</p>
									<h4 className="font-semibold text-gray-800 mb-3">Educational Content</h4>
									<p className="text-gray-600">Non-refundable once access provided to protect intellectual property.</p>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Account Closure and Fund Withdrawal</h2>
						<div className="space-y-6">
							<div className="bg-white/80 p-6 rounded-lg border border-gray-100">
								<h3 className="font-semibold text-gray-800 mb-4 text-center">Closure Process</h3>
								<div className="grid md:grid-cols-3 gap-6">
									<div className="text-center">
										<h4 className="font-medium text-gray-800 mb-2">Written Request</h4>
										<p className="text-sm text-gray-600">Submit through customer support system</p>
									</div>
									<div className="text-center">
										<h4 className="font-medium text-gray-800 mb-2">Close Positions</h4>
										<p className="text-sm text-gray-600">All open positions and pending orders must be closed</p>
									</div>
									<div className="text-center">
										<h4 className="font-medium text-gray-800 mb-2">Fund Return</h4>
										<p className="text-sm text-gray-600">Remaining balance returned minus applicable fees</p>
									</div>
								</div>
							</div>
							<div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
								<h3 className="font-semibold text-gray-800 mb-3 text-center">Processing Information</h3>
								<div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
									<div>• Processing time: 5-10 business days typically</div>
									<div>• International transfers may take additional time</div>
									<div>• Identity verification documentation may be required</div>
									<div>• Withdrawal to original funding source when possible</div>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Exceptional Circumstances</h2>
						<div className="bg-purple-50 p-8 rounded-lg border border-purple-100">
							<div className="text-center mb-6">
								<div className="w-16 h-0.5 bg-purple-300 mx-auto mb-4"></div>
								<h3 className="text-xl font-medium text-gray-800 mb-4">Special Considerations</h3>
							</div>
							<div className="grid md:grid-cols-2 gap-8">
								<div>
									<h4 className="font-semibold text-gray-800 mb-3">Technical Issues</h4>
									<p className="text-gray-600 mb-4">Platform problems preventing access may warrant compensation or refunds case-by-case.</p>
									<h4 className="font-semibold text-gray-800 mb-3">Force Majeure Events</h4>
									<p className="text-gray-600">Special policies during extraordinary circumstances beyond our control.</p>
								</div>
								<div>
									<h4 className="font-semibold text-gray-800 mb-3">Data Errors</h4>
									<p className="text-gray-600 mb-4">Incorrect market data significantly impacting decisions may result in remedies.</p>
									<h4 className="font-semibold text-gray-800 mb-3">Customer Hardship</h4>
									<p className="text-gray-600">Documented personal hardship may receive compassionate consideration.</p>
								</div>
							</div>
						</div>
					</section>

					{/* Contact Information */}
					<section className="max-w-4xl mx-auto text-center bg-gray-50 p-8 rounded-lg">
						<h2 className="text-3xl font-light text-gray-800 mb-6">Refund Support</h2>
						<div className="w-16 h-0.5 bg-gray-300 mx-auto mb-6"></div>
						<p className="text-lg text-gray-600 mb-6">
							For questions about refunds, cancellations, or to submit a refund request:
						</p>
						<div className="space-y-2 text-gray-700">
							<p><span className="font-medium">Email:</span> support@viewmarket.in</p>
							<p><span className="font-medium">Phone:</span> 9241740350</p>
							<p><span className="font-medium">Address:</span> opp an clg boring rd patna, bihar, india</p>
							<p><span className="font-medium">Live Chat:</span> Available 24/7 through our trading platform</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}