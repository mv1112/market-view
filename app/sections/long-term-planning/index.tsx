import { type FC } from 'react'
import styles from './styles.module.css'
import LayoutWrapper from '@/components/layout-wrapper'
import SectionHeading from '@/components/sectionHeading'
import Link from 'next/link'
import Image from 'next/image'
import {
	BentoGrid,
	BentoGridFeatureLookupWrapper,
	BentoGridSeperator,
	BentoGridTopLayer,
	BentoGridWideCardWrapper,
} from '@/components/bento-grid'
import BentoCardLeft from '@/components/bento-grid/components/bento-grid-card-left'
import BentoGridCardRight from '@/components/bento-grid/components/bento-grid-card-right'
import BentoGridFeatureLookUpCard from '@/components/bento-grid/components/bento-grid-feature-lookup-card'
import { longTermFeatureLookup } from './feature-lookup-data'
import FirstCard from './components/first-card'
import SecondCard from './components/second-card'
import WideCard from './components/wide-card'

const LongTermPlanning: FC = () => {
	return (
		<section className={styles.long__term__planning}>
			<LayoutWrapper>
				<div className={styles.heading__container}>
					<div className={styles.heading__inner__container}>
						<Link href='/'>
							<SectionHeading
								heading='Build profitable trading strategies'
								badgeText='Strategy development and backtesting'
								badgeStyle='bg-[#68CC58] border-none'
							/>
						</Link>
					</div>
					<div className={styles.description__container}>
						<p>
							<span>Create and optimize your trading strategies with confidence.</span>{' '}
							Develop, backtest, and deploy algorithmic trading strategies with ViewMarket&apos;s
							advanced strategy builder and AI-powered optimization tools.
						</p>
					</div>
				</div>
			</LayoutWrapper>

			<div className={styles.hero__img__wrapper}>
				<Image src='/roadmap.png' alt='' width={3200} height={1620} />
			</div>

			<LayoutWrapper>
				<BentoGrid>
					<BentoGridTopLayer>
						<BentoCardLeft
							title='Strategy development suite'
							description='Create, test, and optimize trading algorithms with comprehensive backtesting and paper trading environments.'>
							<FirstCard />
						</BentoCardLeft>
						<BentoGridCardRight
							title='Performance analytics'
							description='Monitor your trading performance with detailed analytics, risk metrics, and profitability reports.'>
							<SecondCard />
						</BentoGridCardRight>
					</BentoGridTopLayer>

					<div className='h-6'></div>

					<BentoGridWideCardWrapper>
						<WideCard />
					</BentoGridWideCardWrapper>

					<BentoGridSeperator />

					<BentoGridFeatureLookupWrapper>
						{longTermFeatureLookup.map((featureLookup) => (
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

export default LongTermPlanning
