import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Refund and Cancellation - ViewMarket',
	description: 'Refund and Cancellation Policy for ViewMarket trading platform',
}

export default function RefundAndCancellationPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12 bg-black text-white min-h-screen">
			<h1 className="text-4xl font-bold mb-8 text-center">Refund and Cancellation Policy</h1>
			<p className="text-sm text-gray-300 mb-8 text-center">Last updated: {new Date().toLocaleDateString()}</p>
			
			<div className="space-y-8">
				<section>
					<h2 className="text-2xl font-semibold mb-4">Overview</h2>
					<p className="text-lg leading-relaxed mb-4">
						This Refund and Cancellation Policy explains the terms and conditions under which ViewMarket provides refunds and handles cancellations for various services and transactions. Due to the nature of financial trading and regulatory requirements, different rules apply to different types of transactions and services.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						ViewMarket is committed to providing fair and transparent policies while complying with applicable financial regulations and industry standards. We understand that circumstances may arise where refunds or cancellations are necessary, and we strive to handle such situations professionally and efficiently.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						Please read this policy carefully to understand your rights and obligations regarding refunds and cancellations. If you have any questions or concerns, please contact our customer support team for assistance.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Trading Transaction Cancellations</h2>
					<p className="text-lg leading-relaxed mb-4">
						Trading transactions on financial markets are generally final and irreversible once executed. However, there are specific circumstances under which trade cancellations may be considered.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Pre-Execution Cancellations:</strong> You may cancel pending orders (limit orders, stop orders, etc.) before they are executed, provided the order has not been filled or partially filled. Cancellation requests must be submitted through our trading platform, and we will process them on a best-efforts basis.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>System Error Cancellations:</strong> In rare cases where technical errors, system malfunctions, or platform issues result in erroneous trade execution, ViewMarket reserves the right to cancel or modify such trades. We will investigate such incidents thoroughly and take appropriate action to protect all parties involved.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Regulatory Cancellations:</strong> Trades may be cancelled if required by regulatory authorities, court orders, or in cases of suspected market manipulation, fraud, or other illegal activities. Such cancellations are beyond our control and are implemented to maintain market integrity.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Cooling-Off Period:</strong> Please note that financial trading does not typically include a cooling-off period or right of withdrawal once transactions are executed. This is standard practice in the financial services industry and is necessary to maintain market efficiency and liquidity.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Subscription and Service Fees</h2>
					<p className="text-lg leading-relaxed mb-4">
						ViewMarket offers various subscription services, premium features, and additional tools that may involve recurring or one-time fees. Our refund and cancellation policies for these services are designed to be fair while protecting our business interests.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Monthly Subscriptions:</strong> You may cancel monthly subscription services at any time through your account settings or by contacting customer support. Cancellations will take effect at the end of your current billing cycle, and you will continue to have access to premium features until that date. No refunds will be provided for partial months of service.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Annual Subscriptions:</strong> For annual subscription plans, you may request cancellation within 30 days of the initial purchase for a full refund. After this period, annual subscriptions are non-refundable, but you may cancel to prevent automatic renewal for the following year.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Premium Tools and Features:</strong> One-time purchases of premium trading tools, analytical software, or additional features are generally non-refundable once access has been granted. However, if you experience technical issues that prevent you from using purchased tools, please contact our support team for assistance.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Educational Content:</strong> Purchases of educational materials, courses, webinars, or training programs are non-refundable once access has been provided. This policy helps protect our intellectual property while ensuring serious commitment from participants.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Account Closure and Fund Withdrawal</h2>
					<p className="text-lg leading-relaxed mb-4">
						You have the right to close your ViewMarket account at any time, subject to the completion of outstanding obligations and compliance with regulatory requirements.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Account Closure Process:</strong> To close your account, you must submit a written request through our customer support system or by contacting our support team directly. All open positions must be closed, and all pending orders must be cancelled before account closure can be processed.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Fund Withdrawal:</strong> Upon account closure, any remaining account balance will be returned to you, minus any applicable fees, charges, or outstanding obligations. Withdrawals will be processed to the original funding source when possible, in accordance with anti-money laundering regulations.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Processing Time:</strong> Account closure and fund withdrawal typically take 5-10 business days to complete, depending on the withdrawal method and any required regulatory compliance procedures. International wire transfers may take additional time.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Document Requirements:</strong> You may be required to provide additional documentation to verify your identity and confirm the withdrawal request, especially for large amounts or in cases where enhanced due diligence is required.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Deposit and Funding Refunds</h2>
					<p className="text-lg leading-relaxed mb-4">
						Deposits made to your ViewMarket account are generally intended for trading purposes and are not refundable once credited to your account. However, certain circumstances may warrant refund consideration.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Accidental Deposits:</strong> If you accidentally deposit funds to your account or deposit an incorrect amount, you may request a refund within 24 hours of the deposit. Such requests will be reviewed on a case-by-case basis and may be subject to verification procedures.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Duplicate Deposits:</strong> In cases where technical issues or payment processing errors result in duplicate deposits, the excess amount will be automatically refunded to your original payment method within 5-7 business days.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Unauthorized Deposits:</strong> If you believe that deposits were made to your account without your authorization, please contact our security team immediately. We will investigate such claims and take appropriate action, which may include freezing your account pending investigation.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Regulatory Restrictions:</strong> If deposits are made from jurisdictions where our services are not available or from sources that violate our terms of service, such funds will be returned to the original source after appropriate compliance procedures.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Exceptional Circumstances</h2>
					<p className="text-lg leading-relaxed mb-4">
						ViewMarket recognizes that extraordinary circumstances may arise that warrant special consideration for refunds or cancellations outside of our standard policies.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Technical Issues:</strong> If widespread technical problems with our platform prevent you from trading or accessing your account for extended periods, we may consider compensation or refunds for affected fees on a case-by-case basis.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Data Errors:</strong> In cases where incorrect market data, pricing errors, or data feed issues significantly impact your trading decisions, we will investigate and may provide appropriate remedies, including potential trade adjustments or compensation.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Force Majeure Events:</strong> During extraordinary events such as natural disasters, pandemics, war, or other circumstances beyond our control that significantly disrupt our services, we may implement special policies for refunds and cancellations.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Customer Hardship:</strong> In cases of documented personal hardship, serious illness, or other extraordinary personal circumstances, we may consider exceptions to our standard refund policies on a compassionate basis.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Refund Processing</h2>
					<p className="text-lg leading-relaxed mb-4">
						When refunds are approved, ViewMarket will process them efficiently while complying with financial regulations and industry standards.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Processing Time:</strong> Approved refunds are typically processed within 3-5 business days from the date of approval. However, the time for funds to appear in your account may vary depending on your bank or payment provider.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Refund Method:</strong> Refunds will generally be processed to the original payment method used for the transaction. This policy helps prevent money laundering and ensures compliance with financial regulations.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Currency Conversion:</strong> If currency conversion is required for refunds, we will use prevailing market exchange rates at the time of processing. Currency fluctuations may result in slight differences between the original deposit amount and the refunded amount.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Documentation:</strong> All approved refunds will be documented and reported as required by applicable regulations. You will receive confirmation of the refund processing via email and account notifications.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
					<p className="text-lg leading-relaxed mb-4">
						If you disagree with a refund decision or have concerns about our cancellation policies, we provide several avenues for dispute resolution.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Customer Support:</strong> Your first step should be to contact our customer support team, who will review your case and attempt to reach a satisfactory resolution. Our support team has the authority to approve certain refunds and make exceptions within established guidelines.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Management Review:</strong> If you are not satisfied with the initial decision, you may request a review by our management team. Management reviews are typically completed within 10 business days and involve a thorough examination of your case.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Regulatory Complaints:</strong> If you believe that our refund policies violate applicable regulations or that we have not handled your case appropriately, you may file a complaint with relevant regulatory authorities in your jurisdiction.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Important Limitations</h2>
					<p className="text-lg leading-relaxed mb-4">
						Please be aware of important limitations and restrictions that apply to our refund and cancellation policies.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Time Limits:</strong> Most refund requests must be submitted within 30 days of the original transaction. Requests submitted after this period may not be considered unless exceptional circumstances apply.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Market Losses:</strong> ViewMarket does not provide refunds for trading losses, poor investment performance, or market volatility. Trading involves inherent risks, and losses are a natural part of market participation.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Third-Party Fees:</strong> We are not responsible for refunding fees charged by third parties, including bank transfer fees, credit card processing fees, or currency conversion fees imposed by your financial institution.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Regulatory Compliance:</strong> All refunds and cancellations must comply with applicable financial regulations, anti-money laundering requirements, and tax reporting obligations, which may limit our ability to process certain requests.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
					<p className="text-lg leading-relaxed mb-4">
						For questions about refunds, cancellations, or to submit a refund request, please contact our customer support team:
					</p>
					<p className="text-lg leading-relaxed">
						<strong>Email:</strong> support@viewmarket.in<br />
						<strong>Phone:</strong> 9241740350<br />
						<strong>Address:</strong> opp an clg boring rd patna, bihar, india<br />
						<strong>Live Chat:</strong> Available 24/7 through our trading platform
					</p>
				</section>
			</div>
		</div>
	)
}