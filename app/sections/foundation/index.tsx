import { type FC } from 'react'
import SectionHeading from '@/components/sectionHeading'
import DefinitionList from './components/definitionList'
import FeatureList from './components/featureList'
import { foundationList } from '@/lib/constant'
import UnderTheHood from '@/assets/underToHood.svg'
import styles from './styles.module.css'
import LayoutWrapper from '@/components/layout-wrapper'

const Foundation: FC = () => {
	return (
		<section className={styles.foundation}>
			<LayoutWrapper>
				<div className={styles.inner__container}>
					<div className={styles.heading__container}>
						<SectionHeading
							badgeText='Under the hood'
							heading='Built on strong trading foundations'
						/>

						<p>
							{' '}
							ViewMarket is so intuitive to use, it&apos;s easy to overlook the sophisticated
							trading infrastructure and real-time data systems that keep ViewMarket
							secure, fast, and profitable for traders worldwide.{' '}
						</p>
					</div>

					<div className={styles.list__container}>
						<div className={styles.seperator} />

						<DefinitionList data={foundationList} />
					</div>

					<div className={styles.feature__list__container}>
						<div className={styles.seperator} />
						<FeatureList />
					</div>
				</div>

				<div className={styles.under__the__hood}>
					<UnderTheHood />
				</div>
			</LayoutWrapper>
		</section>
	)
}

export default Foundation
