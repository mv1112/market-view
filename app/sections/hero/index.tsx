import { type FC } from 'react'
import styles from './styles.module.css'
import LayoutWrapper from '@/components/layout-wrapper'
import BlurPopUpByWord from '@/components/blur-pop-up-by-words'
import { cn } from '@/lib/utils'
import BlurPopUp from '@/components/blur-pop-up'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const Hero: FC = () => {
	return (
		<section className={styles.hero}>
			<LayoutWrapper>
				<h1 className={cn(styles.heading, styles.hide__mobile)}>
					<BlurPopUpByWord text='ViewMarket is the ultimate AI-powered trading platform for algorithmic trading' />
				</h1>

				<h1 className={cn(styles.heading, styles.show__mobile, 'text-center')}>
					<BlurPopUpByWord text='AI-powered algorithmic trading' />
				</h1>

				<BlurPopUp delay={1}>
					<h2 className={cn(styles.sub__heading, styles.hide__mobile)}>
						Meet the advanced platform for modern algorithmic trading. Analyze markets with AI, 
						execute automated strategies, and maximize your trading potential.
					</h2>
					<h2 className={cn(styles.sub__heading, styles.show__mobile)}>
						ViewMarket is the ultimate trading platform with AI-powered analytics and 
						automated trading strategies for maximum market performance.
					</h2>
				</BlurPopUp>

				<div className={cn(styles.button__container)}>
					<BlurPopUp delay={1.1}>
						<Link className={styles.start__link} href='#'>
							{' '}
							Start trading{' '}
						</Link>
					</BlurPopUp>

					<BlurPopUp delay={1.15}>
						<Link className={styles.intoducing__link} href='#'>
							<span>Introducing AI Auto-Trading</span>
							<ChevronRight />
						</Link>
					</BlurPopUp>
				</div>

				<div className={styles.hero__img__container}>
					<div className={styles.hero__screenshot__container}>
						<BlurPopUp delay={1.5}>
							<div className={styles.hero__screenshot__wrapper}>
								<Image 
									src="/charts-page-screenshot.png.png" 
									alt="Charts page showing complete trading interface with header controls, TradingView chart, footer panels, and right sidebar tools"
									className={styles.hero__screenshot}
									width={1200}
									height={800}
									priority
								/>
							</div>
						</BlurPopUp>
					</div>
				</div>
			</LayoutWrapper>
		</section>
	)
}

export default Hero
