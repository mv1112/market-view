import { type FC } from 'react'
import People from '@/assets/people.svg'
import Placeholder from '@/assets/placeholder-1.svg'
import styles from './styles.module.css'

const CollaborativeDocsCard: FC = () => {
	return (
		<div className={styles.collaborative__docs}>
			<div className={styles.icons__container}>
				<People />
			</div>
			<span className={styles.heading}>
				<span className={styles.editor__remote__selection}>
					{' '}
					Document trading
				</span>
				<span className={styles.remote__selection__cursor}>
					<span className={styles.editor__remote__label}>
						<span className={styles.editor__remote__name}>Alex</span>
					</span>
				</span>
				{'    '}
				strategies
			</span>

			<span className={styles.paragraph}>
				Write down trading strategies and work together on algorithm specs in realtime,
				multiplayer strategy
				<span className={styles.remote__cursor}>
					<span className={styles.remote__label}>
						<span className={styles.remote__name}> sarah </span>
					</span>
				</span>
				documents. Add <span className={styles.hightlight}>**</span>emphasis
				<span className={styles.hightlight}>**</span> and{' '}
				<span className={styles.hightlight}>##</span>
				structure with rich-text formatting for trade analysis.
			</span>
			<Placeholder />
		</div>
	)
}

export default CollaborativeDocsCard
