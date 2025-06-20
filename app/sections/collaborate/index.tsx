import { type FC } from 'react'
import styles from './styles.module.css'
import SectionHeading from '@/components/sectionHeading'
import Carousel from './components/carousel'
import LayoutWrapper from '@/components/layout-wrapper'

const Collaborate: FC = () => {
	return (
		<section className={styles.collaborate}>
			<LayoutWrapper>
				<div className={styles.heading__container}>
					<div className={styles.heading__inner__container}>
						<SectionHeading
							heading='Connect with brokers and data providers'
							badgeText='Integrations and APIs'
							badgeStyle='bg-[#b59aff] border-none'
						/>
					</div>

					<div className={styles.heading__text__container}>
						<p>
							Expand your trading capabilities with seamless integrations to major brokers,
							real-time data feeds, and third-party trading tools to maximize your
							market opportunities and execution speed.
						</p>
					</div>
				</div>
			</LayoutWrapper>

			<div className={styles.carousel__container}>
				<Carousel />
			</div>
		</section>
	)
}

export default Collaborate
