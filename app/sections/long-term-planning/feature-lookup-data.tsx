import { type FeatureLookupProps } from '@/components/bento-grid/components/bento-grid-feature-lookup-card'
import CrossTerm from '@/assets/cross-team.svg'
import Initiative from '@/assets/initiative.svg'
import Insight from '@/assets/insight.svg'
import Milestone from '@/assets/milestone.svg'
import { TabHeaders } from './components/wide-card/tab-header'

export const longTermFeatureLookup: FeatureLookupProps[] = [
	{
		id: 'long-term-feature-1',
		title: 'Strategy backtesting',
		description: 'Test and validate your trading strategies with historical data.',
		icon: <Initiative />,
	},
	{
		id: 'long-term-feature-2',
		title: 'Portfolio diversification',
		description: 'Spread risk across multiple markets and asset classes.',
		icon: <CrossTerm />,
	},
	{
		id: 'long-term-feature-3',
		title: 'Performance milestones',
		description: 'Track profit targets and performance benchmarks over time.',
		icon: <Milestone />,
	},
	{
		id: 'long-term-feature-4',
		title: 'Market insights',
		description: 'Track volatility, trends, and market sentiment over time.',
		icon: <Insight />,
	},
]

export const tabHeaders: TabHeaders[] = [
	{
		id: 'tab-header-1',
		title: 'Strategy documentation',
	},
	{
		id: 'tab-header-2',
		title: 'Trade annotations',
	},
	{
		id: 'tab-header-3',
		title: 'Voice-to-trade commands',
	},
]
