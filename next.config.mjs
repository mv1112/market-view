/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config, { isServer }) {
		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.('.svg'),
		)

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
				use: ['@svgr/webpack'],
			},
		)

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i

		// Suppress Supabase realtime warnings
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
				net: false,
				tls: false,
			}
		}

		// Ignore warnings from Supabase realtime
		config.ignoreWarnings = [
			...(config.ignoreWarnings || []),
			{
				module: /node_modules\/@supabase\/realtime-js/,
				message: /Critical dependency: the request of a dependency is an expression/,
			},
		]

		return config
	},
}

export default nextConfig
