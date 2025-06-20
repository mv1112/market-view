import { type FC } from 'react'
import styles from './styles.module.css'

const SectionHeading: FC = () => {
	return (
		<div className={styles.top__container}>
			<div className={styles.heading}>
				<h2>Made for modern traders</h2>
			</div>

			<div className={styles.description}>
				<p>
					ViewMarket is shaped by the practices and principles that distinguish
					successful traders from the rest: disciplined strategy execution, risk management,
					and a commitment to data-driven decision making.
				</p>
			</div>
		</div>
	)
}

export default SectionHeading
