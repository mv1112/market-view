import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Disclaimer - ViewMarket',
	description: 'Legal disclaimer for ViewMarket trading platform',
}

export default function DisclaimerPage() {
	return (
		<div className="max-w-4xl mx-auto px-6 py-12 bg-black text-white min-h-screen">
			<h1 className="text-4xl font-bold mb-8 text-center">Disclaimer</h1>
			<p className="text-sm text-gray-300 mb-8 text-center">Last updated: {new Date().toLocaleDateString()}</p>
			
			<div className="space-y-8">
				<section>
					<h2 className="text-2xl font-semibold mb-4">General Disclaimer</h2>
					<p className="text-lg leading-relaxed mb-4">
						The information provided on ViewMarket and through our trading platform is for general informational and educational purposes only. It should not be considered as personalized investment advice, financial advice, or a recommendation to buy or sell any particular security, commodity, or investment product.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						ViewMarket does not provide investment, tax, legal, or accounting advice. You should consult with qualified professionals regarding your specific financial situation and investment objectives before making any trading or investment decisions.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						All trading and investment activities carry inherent risks, and past performance is not indicative of future results. You should carefully consider your financial situation, investment experience, and risk tolerance before using our platform or making any investment decisions.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Investment Risk Disclaimer</h2>
					<p className="text-lg leading-relaxed mb-4">
						Trading and investing in financial markets involves substantial risk of loss and is not suitable for all investors. The value of investments can go down as well as up, and you may lose some or all of your invested capital.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Market Risk:</strong> Financial markets are volatile and unpredictable. Prices of securities, commodities, currencies, and other financial instruments can fluctuate rapidly due to various factors including economic conditions, political events, market sentiment, and regulatory changes.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Liquidity Risk:</strong> Some investments may be difficult to sell or may only be sellable at a significant discount to their perceived value. During volatile market conditions, liquidity may be reduced, making it challenging to execute trades at desired prices.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Leverage Risk:</strong> If you use leverage or margin trading, your potential losses may exceed your initial investment. Leveraged trading amplifies both potential gains and losses, and you could lose more money than you initially deposited.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Currency Risk:</strong> If you trade in instruments denominated in currencies other than your base currency, you are exposed to currency exchange rate fluctuations that may affect the value of your investments.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">No Guarantee of Performance</h2>
					<p className="text-lg leading-relaxed mb-4">
						ViewMarket makes no representations or warranties regarding the performance of any investment strategy, trading system, or market analysis provided through our platform. We do not guarantee any specific investment results or returns.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						Any historical performance data, backtesting results, or simulated trading results presented on our platform are for illustrative purposes only and should not be considered as indicative of future performance. Actual trading results may differ significantly from historical or simulated results.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						Trading algorithms, automated systems, and artificial intelligence tools provided through our platform are subject to technical limitations, market conditions, and other factors that may affect their performance. No trading system or strategy is guaranteed to be profitable.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Third-Party Information</h2>
					<p className="text-lg leading-relaxed mb-4">
						ViewMarket may provide access to third-party research, analysis, news, data, and other information. We do not endorse or verify the accuracy, completeness, or reliability of any third-party information.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						Third-party information is provided for convenience and informational purposes only. ViewMarket is not responsible for any errors, omissions, or inaccuracies in third-party content, nor for any investment decisions made based on such information.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						Market data provided through our platform may be delayed, and we do not guarantee the accuracy or timeliness of such data. Real-time data may be subject to exchange fees and licensing requirements.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Regulatory Considerations</h2>
					<p className="text-lg leading-relaxed mb-4">
						Financial regulations vary by jurisdiction, and it is your responsibility to ensure that you comply with all applicable laws and regulations in your country of residence and any country where you conduct trading activities.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						Some investment products and services may not be available to residents of certain jurisdictions due to regulatory restrictions. It is your responsibility to determine whether you are eligible to use our services and trade specific financial instruments.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						ViewMarket may be required to report your trading activities to relevant regulatory authorities and tax agencies. You are responsible for understanding and complying with your tax obligations related to trading and investment activities.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Technology Risks</h2>
					<p className="text-lg leading-relaxed mb-4">
						Our trading platform relies on complex technology systems, and there are inherent risks associated with electronic trading platforms, including but not limited to system failures, internet connectivity issues, and cybersecurity threats.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>System Downtime:</strong> Our platform may experience temporary outages, maintenance periods, or technical difficulties that could prevent you from accessing your account or executing trades. We cannot guarantee uninterrupted service availability.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Execution Delays:</strong> During periods of high market volatility or heavy trading volume, order execution may be delayed. Slippage between expected and actual execution prices may occur.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						<strong>Data Security:</strong> While we implement robust security measures, no system is completely immune to security breaches. You should take appropriate precautions to protect your account credentials and personal information.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
					<p className="text-lg leading-relaxed mb-4">
						To the maximum extent permitted by law, ViewMarket, its affiliates, officers, directors, employees, and agents shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of our platform or services.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						This limitation of liability applies regardless of whether the damages arise from breach of contract, tort, negligence, strict liability, or any other legal theory, and whether or not ViewMarket has been advised of the possibility of such damages.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						In jurisdictions where limitations of liability are not permitted or are limited, our liability shall be limited to the maximum extent permitted by law.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Professional Advice</h2>
					<p className="text-lg leading-relaxed mb-4">
						Before making any investment decisions, you should seek advice from qualified financial advisors, accountants, and legal professionals who can provide personalized guidance based on your specific circumstances.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						If you are unsure about any aspect of trading or investing, or if you do not understand the risks involved, you should not proceed without seeking professional advice. Education and understanding are crucial for successful trading and investing.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Updates to This Disclaimer</h2>
					<p className="text-lg leading-relaxed mb-4">
						We may update this disclaimer from time to time to reflect changes in our services, applicable laws, or regulatory requirements. Updated versions will be posted on our website with the effective date.
					</p>
					<p className="text-lg leading-relaxed mb-4">
						Your continued use of ViewMarket after any updates constitutes your acceptance of the revised disclaimer. We encourage you to review this disclaimer periodically to stay informed of any changes.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
					<p className="text-lg leading-relaxed mb-4">
						If you have any questions about this disclaimer or need clarification on any aspect of our services, please contact our legal team:
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