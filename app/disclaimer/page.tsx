import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Disclaimer - ViewMarket',
	description: 'Legal disclaimer for ViewMarket trading platform',
}

export default function DisclaimerPage() {
	return (
		<div className="min-h-screen bg-black text-white">
			<div className="max-w-4xl mx-auto px-6 py-16">
				{/* Header Section */}
				<div className="text-center mb-16">
					<h1 className="text-5xl md:text-6xl font-light text-white mb-6">
						Disclaimer
					</h1>
					<div className="w-24 h-0.5 bg-white mx-auto mb-8"></div>
					<p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Empowering informed trading decisions through transparent risk disclosure 
						and comprehensive legal protection for all market participants.
					</p>
					<p className="text-sm text-gray-400 mt-6">Last updated: {new Date().toLocaleDateString()}</p>
				</div>

				{/* Content Sections */}
				<div className="space-y-16">
					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">General Disclaimer</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								The information provided on ViewMarket and through our trading platform is for general informational and educational purposes only. It should not be considered as personalized investment advice, financial advice, or a recommendation to buy or sell any particular security, commodity, or investment product.
							</p>
							<p>
								ViewMarket does not provide investment, tax, legal, or accounting advice. You should consult with qualified professionals regarding your specific financial situation and investment objectives before making any trading or investment decisions.
							</p>
							<p>
								All trading and investment activities carry inherent risks, and past performance is not indicative of future results. You should carefully consider your financial situation, investment experience, and risk tolerance before using our platform or making any investment decisions.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">Investment Risk Disclaimer</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								Trading and investing in financial markets involves substantial risk of loss and is not suitable for all investors. The value of investments can go down as well as up, and you may lose some or all of your invested capital.
							</p>
							<div className="space-y-8 mt-8">
								<div>
									<h3 className="font-semibold text-white mb-3">Market Risk</h3>
									<p className="text-gray-300">Financial markets are volatile and unpredictable. Prices of securities, commodities, currencies, and other financial instruments can fluctuate rapidly due to various factors including economic conditions, political events, market sentiment, and regulatory changes.</p>
								</div>
								<div>
									<h3 className="font-semibold text-white mb-3">Liquidity Risk</h3>
									<p className="text-gray-300">Some investments may be difficult to sell or may only be sellable at a significant discount to their perceived value. During volatile market conditions, liquidity may be reduced, making it challenging to execute trades at desired prices.</p>
								</div>
								<div>
									<h3 className="font-semibold text-white mb-3">Leverage Risk</h3>
									<p className="text-gray-300">If you use leverage or margin trading, your potential losses may exceed your initial investment. Leveraged trading amplifies both potential gains and losses, and you could lose more money than you initially deposited.</p>
								</div>
								<div>
									<h3 className="font-semibold text-white mb-3">Currency Risk</h3>
									<p className="text-gray-300">If you trade in instruments denominated in currencies other than your base currency, you are exposed to currency exchange rate fluctuations that may affect the value of your investments.</p>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">No Guarantee of Performance</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								ViewMarket makes no representations or warranties regarding the performance of any investment strategy, trading system, or market analysis provided through our platform. We do not guarantee any specific investment results or returns.
							</p>
							<p>
								Any historical performance data, backtesting results, or simulated trading results presented on our platform are for illustrative purposes only and should not be considered as indicative of future performance. Actual trading results may differ significantly from historical or simulated results.
							</p>
							<p>
								Trading algorithms, automated systems, and artificial intelligence tools provided through our platform are subject to technical limitations, market conditions, and other factors that may affect their performance. No trading system or strategy is guaranteed to be profitable.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">Third-Party Information</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								ViewMarket may provide access to third-party research, analysis, news, data, and other information. We do not endorse or verify the accuracy, completeness, or reliability of any third-party information.
							</p>
							<p>
								Third-party information is provided for convenience and informational purposes only. ViewMarket is not responsible for any errors, omissions, or inaccuracies in third-party content, nor for any investment decisions made based on such information.
							</p>
							<p>
								Market data provided through our platform may be delayed, and we do not guarantee the accuracy or timeliness of such data. Real-time data may be subject to exchange fees and licensing requirements.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">Technology Risks</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-300">
							<p>
								Our trading platform relies on complex technology systems, and there are inherent risks associated with electronic trading platforms, including but not limited to system failures, internet connectivity issues, and cybersecurity threats.
							</p>
							<div className="space-y-6 mt-6">
								<div>
									<h3 className="font-semibold text-white mb-3">System Downtime</h3>
									<p className="text-gray-300">Platform may experience temporary outages or maintenance periods</p>
								</div>
								<div>
									<h3 className="font-semibold text-white mb-3">Execution Delays</h3>
									<p className="text-gray-300">Order execution may be delayed during high volatility periods</p>
								</div>
								<div>
									<h3 className="font-semibold text-white mb-3">Data Security</h3>
									<p className="text-gray-300">Robust security measures implemented with user precautions advised</p>
								</div>
							</div>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-white mb-8 text-center">Professional Advice</h2>
						<div className="space-y-6">
							<div className="text-center mb-6">
								<div className="w-16 h-0.5 bg-white mx-auto mb-4"></div>
								<h3 className="text-xl font-medium text-white mb-4">Seek Expert Guidance</h3>
							</div>
							<div className="space-y-4 text-lg leading-relaxed text-gray-300">
								<p>
									Before making any investment decisions, you should seek advice from qualified financial advisors, accountants, and legal professionals who can provide personalized guidance based on your specific circumstances.
								</p>
								<p>
									If you are unsure about any aspect of trading or investing, or if you do not understand the risks involved, you should not proceed without seeking professional advice. Education and understanding are crucial for successful trading and investing.
								</p>
							</div>
						</div>
					</section>

					{/* Contact Information */}
					<section className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-light text-white mb-6">Contact Information</h2>
						<div className="w-16 h-0.5 bg-white mx-auto mb-6"></div>
						<p className="text-lg text-gray-300 mb-6">
							If you have any questions about this disclaimer or need clarification on any aspect of our services, please contact our legal team:
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