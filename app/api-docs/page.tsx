import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'API Documentation - ViewMarket | Trading API Integration',
	description: 'Comprehensive REST API documentation for ViewMarket trading platform with WebSocket API, financial API endpoints, and API integration guides',
}

export default function ApiDocsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
			<div className="max-w-6xl mx-auto px-6 py-16">
				<div className="text-center mb-16">
					<h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
						API Documentation
					</h1>
					<div className="w-24 h-0.5 bg-gray-300 mx-auto mb-8"></div>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Comprehensive API documentation for integrating with ViewMarket&apos;s trading API platform. 
						Build powerful trading applications with our robust and secure REST API and WebSocket API infrastructure.
					</p>
					<p className="text-sm text-gray-500 mt-6">Version 2.0 - Updated with latest financial API endpoints and features</p>
				</div>

				<div className="space-y-16">
					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Introduction to ViewMarket Trading API</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-600">
							<p>
								ViewMarket trading API provides programmatic access to our comprehensive trading platform, allowing developers, quantitative traders, and institutions to build custom trading applications, automate strategies, and integrate with third-party systems. Our REST API follows industry standards and provides extensive endpoints for all trading operations, market data access, and account management features through our powerful financial API.
							</p>
							<p>
								The trading API is designed with performance, security, and reliability in mind, supporting both high-frequency trading applications that require sub-millisecond response times and institutional systems that need robust error handling and comprehensive audit trails. Whether you&apos;re building a simple trading bot or a complex multi-asset portfolio management system, our API integration provides the foundation you need for success.
							</p>
							<p>
								Our financial API architecture supports both synchronous request-response patterns for account queries and order placement, as well as asynchronous WebSocket API streams for real-time market data and order updates. This dual approach ensures optimal performance for different use cases while maintaining consistency across all REST API endpoints through our comprehensive API documentation.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Authentication and Security</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-600">
							<p>
								Security is paramount in financial API design, and ViewMarket implements multiple layers of authentication and authorization to protect user accounts and trading activities. Our primary authentication mechanism uses API keys with configurable permissions, allowing users to create separate keys for different applications with specific access rights through our secure trading API infrastructure.
							</p>
							<p>
								API integration supports both read-only keys for market data and account information access, as well as trading keys that enable order placement and account modifications through our REST API. Each key can be configured with specific IP address restrictions, expiration dates, and rate limits to provide granular security control across all financial API endpoints.
							</p>
							<p>
								For institutional clients and third-party API integration, we also support OAuth 2.0 authentication flow, enabling secure authorization without exposing user credentials to third-party applications. The OAuth implementation includes support for refresh tokens, scope-based permissions, and standard token revocation mechanisms through our comprehensive trading API documentation.
							</p>
							<p>
								All trading API communications are encrypted using TLS 1.3 with perfect forward secrecy, and sensitive operations require additional authentication factors such as SMS verification or hardware security keys. Request signing using HMAC-SHA256 ensures message integrity and prevents replay attacks across our REST API and WebSocket API endpoints.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Trading Operations REST API</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-600">
							<p>
								The trading operations REST API provides comprehensive order management capabilities supporting all major order types including market orders, limit orders, stop orders, stop-limit orders, and advanced order types such as iceberg orders and time-weighted average price orders. Each order type includes configurable parameters for fine-tuning execution behavior through our financial API endpoints.
							</p>
							<p>
								Order placement endpoints support both single-order submission and batch order operations for high-volume trading applications through our trading API. Batch operations include atomic order groups where all orders in a group either succeed or fail together, preventing partial execution scenarios that could create unwanted positions via our REST API integration.
							</p>
							<p>
								Order modification and cancellation operations provide granular control over active orders through our trading API, with support for partial modifications such as price updates without changing order quantity. The financial API also supports conditional order modifications based on market conditions or portfolio metrics accessible through our API documentation.
							</p>
							<p>
								Position management endpoints provide real-time position information, profit and loss calculations, margin requirements, and risk metrics through our REST API. The position API integration supports both individual instrument positions and portfolio-level aggregation across multiple accounts and strategies via our comprehensive trading API platform.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Market Data API Endpoints</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-600">
							<p>
								Our market data financial API provides access to real-time and historical market information across all supported asset classes. Real-time endpoints deliver live quotes, trade data, market depth, and order book information with sub-millisecond latency through our trading API. The data is available through both REST API endpoints for point-in-time queries and WebSocket API streams for continuous updates.
							</p>
							<p>
								Historical market data endpoints support flexible time range queries with multiple data frequencies from tick-level data to monthly aggregations through our comprehensive API integration. Historical data includes not only price and volume information but also market microstructure data such as bid-ask spreads, trade sizes, and order flow metrics accessible via our REST API documentation.
							</p>
							<p>
								The market data trading API includes comprehensive options chain data with real-time Greeks calculations, implied volatility surfaces, and options flow analysis. Futures market data includes settlement prices, open interest, and basis calculations for term structure analysis through our financial API endpoints and WebSocket API feeds.
							</p>
							<p>
								Alternative data feeds accessible through the financial API include news sentiment analysis, social media sentiment, earnings estimates, economic indicators, and corporate actions data. These data sources can be combined with traditional market data to create comprehensive trading and research applications through our REST API integration platform.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">WebSocket API Streaming Protocol</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-600">
							<p>
								Real-time data streaming is provided through WebSocket API connections that support multiple subscription channels with flexible filtering and aggregation options. Clients can subscribe to specific instruments, market segments, or create custom filters based on price movements, volume thresholds, or technical indicators through our trading API infrastructure.
							</p>
							<p>
								The WebSocket API protocol includes heartbeat mechanisms, automatic reconnection logic, and message sequence numbering to ensure reliable data delivery even in challenging network conditions. Clients receive immediate notification of connection issues and can implement seamless failover to backup data feeds through our comprehensive API integration documentation.
							</p>
							<p>
								Order update streaming provides real-time notifications of order status changes, trade executions, and account balance updates through our financial API. The order stream includes detailed execution information such as fill prices, quantities, fees, and counterparty information for trade analysis and reconciliation via our REST API and WebSocket API combination.
							</p>
							<p>
								News and event streaming delivers real-time market news, economic announcements, earnings releases, and other market-moving events through our trading API platform. The news stream includes sentiment analysis, relevance scoring, and entity extraction to help automated systems quickly identify and react to important information via our WebSocket API feeds.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Rate Limiting and Performance</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-600">
							<p>
								Trading API rate limiting is implemented using a token bucket algorithm with different limits for different endpoint categories and user subscription levels. Market data endpoints have higher rate limits than trading operations to support high-frequency data analysis while ensuring fair access to trading functionality through our REST API and financial API infrastructure.
							</p>
							<p>
								Rate limits are communicated through standard HTTP headers in our trading API, and clients receive advance warning when approaching rate limits. Burst allowances accommodate temporary spikes in activity, while sustained high-volume usage requires upgrading to higher-tier subscription plans for enhanced API integration capabilities.
							</p>
							<p>
								Performance optimization features include request compression, response caching where appropriate, and efficient data serialization formats across our REST API endpoints. The financial API supports both JSON and binary message formats, with binary formats providing significant performance advantages for high-frequency applications through our WebSocket API and trading API platform.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-light text-gray-800 mb-8 text-center">Software Development Kits</h2>
						<div className="space-y-6 text-lg leading-relaxed text-gray-600">
							<p>
								Native software development kits are available for Python, JavaScript, Java, C#, and Go, providing idiomatic interfaces for each language while abstracting away the complexity of direct trading API communication. Each SDK includes comprehensive API documentation, code examples, and API integration guides for seamless implementation.
							</p>
							<p>
								The Python SDK includes integration with popular data analysis libraries such as pandas, NumPy, and matplotlib, making it easy to incorporate ViewMarket data into quantitative research workflows through our financial API. Async support enables high-performance applications that need to handle multiple concurrent operations via our REST API and WebSocket API.
							</p>
							<p>
								JavaScript and TypeScript SDKs support both Node.js server applications and browser-based trading interfaces through our trading API platform. The SDK includes React components and hooks for building modern web applications, as well as WebSocket API connection management and automatic reconnection logic for robust API integration.
							</p>
							<p>
								Enterprise SDKs for Java and C# include additional features such as connection pooling, automatic failover, comprehensive logging, and integration with popular enterprise frameworks. These SDKs are designed for mission-critical trading applications that require the highest levels of reliability and performance through our comprehensive REST API and financial API infrastructure.
							</p>
						</div>
					</section>

					<section className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-light text-gray-800 mb-6">Trading API Support & Documentation</h2>
						<div className="w-16 h-0.5 bg-gray-300 mx-auto mb-6"></div>
						<p className="text-lg text-gray-600 mb-6">
							Need help with API integration or have technical questions? Our developer support team provides comprehensive assistance for all trading API and financial API-related inquiries.
						</p>
						<div className="space-y-2 text-gray-700">
							<p><span className="font-medium">Developer Email:</span> api@viewmarket.in</p>
							<p><span className="font-medium">Support Email:</span> support@viewmarket.in</p>
							<p><span className="font-medium">Phone:</span> 9241740350</p>
						</div>
					</section>
				</div>
			</div>
		</div>
	)
} 