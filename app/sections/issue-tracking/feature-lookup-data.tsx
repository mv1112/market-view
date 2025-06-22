import { type FeatureLookupProps } from '@/components/bento-grid/components/bento-grid-feature-lookup-card'
import Views from '@/assets/views.svg'
import WorkFlow from '@/assets/workflow.svg'
import Sla from '@/assets/sla.svg'
import Filter from '@/assets/filter.svg'

export const issueTrackingFeatureLookup: FeatureLookupProps[] = [
	{
		id: 'issue-tracking-feature-1',
		title: 'Custom trading algorithms',
		description: 'Build and deploy personalized algorithmic trading strategies.',
		icon: <WorkFlow />,
	},
	{
		id: 'issue-tracking-feature-2',
		title: 'Advanced chart views',
		description: 'Switch between candlestick, line charts, and technical indicators.',
		icon: <Views />,
	},
	{
		id: 'issue-tracking-feature-3',
		title: 'Market filters',
		description: 'Refine market data down to the most profitable opportunities.',
		icon: <Filter />,
	},
	{
		id: 'issue-tracking-feature-4',
		title: 'Risk management',
		description: 'Automatically apply stop-losses and take-profit orders.',
		icon: <Sla />,
	},
]
