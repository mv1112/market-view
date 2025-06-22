import { type FC } from 'react'
import Image from 'next/image'
import SectionHeading from '@/components/sectionHeading'
import {
	BentoGrid,
	BentoGridFeatureLookupWrapper,
	BentoGridSeperator,
	BentoGridTopLayer,
	BentoGridWideCardWrapper,
} from '@/components/bento-grid'
import styles from './styles.module.css'
import BentoCardLeft from '@/components/bento-grid/components/bento-grid-card-left'
import BentoGridCardRight from '@/components/bento-grid/components/bento-grid-card-right'
import FirstCard from './components/first-card'
import SecondCard from './components/second-card'
import WideCard from './components/wide-card'
import BentoGridFeatureLookUpCard from '@/components/bento-grid/components/bento-grid-feature-lookup-card'
import { issueTrackingFeatureLookup } from './feature-lookup-data'
import LayoutWrapper from '@/components/layout-wrapper'

const IssueTracking: FC = () => {
	return (
		<section className={styles.issue__tracking}>
			<LayoutWrapper>
				<div className={styles.heading__container}>
					<div className={styles.heading__inner__container}>
						<SectionHeading
							heading="Market analysis you will love using"
							badgeText="AI-powered market intelligence"
							badgeStyle="bg-[#D4B144] border-none"
						/>

						<div>
							<p>
								<span>Optimized for precision and speed.</span> Analyze market trends in
								real-time, execute trades with AI assistance, and navigate through
								complex market data with tools tailored to your trading style.
							</p>
						</div>
					</div>
				</div>
			</LayoutWrapper>

			<div className={styles.hero__img__wrapper}>
				<Image
					src='/issue-tracking-hero.png'
					alt=''
					width={3200}
					height={1620}
				/>
			</div>

			<LayoutWrapper>
				<BentoGrid>
					<BentoGridTopLayer>
						<BentoCardLeft
							title='Build momentum with AI Signals'
							description='Create profitable trading patterns and focus your strategy on high-probability setups.'>
							<FirstCard />
						</BentoCardLeft>
						<BentoGridCardRight
							title='Manage market opportunities with Smart Alerts'
							description='Review and act on real-time market signals, breakout patterns, and algorithmic trade opportunities.'>
							<SecondCard />
						</BentoGridCardRight>
					</BentoGridTopLayer>

					<BentoGridWideCardWrapper>
						<WideCard />
					</BentoGridWideCardWrapper>

					<BentoGridSeperator />

					<BentoGridFeatureLookupWrapper>
						{issueTrackingFeatureLookup.map((featureLookup) => (
							<BentoGridFeatureLookUpCard
								key={featureLookup.id}
								{...featureLookup}
							/>
						))}
					</BentoGridFeatureLookupWrapper>
				</BentoGrid>
			</LayoutWrapper>
		</section>
	)
}

export default IssueTracking
