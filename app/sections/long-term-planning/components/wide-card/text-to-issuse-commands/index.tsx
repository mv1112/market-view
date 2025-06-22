import { type FC } from 'react'
import styles from './styles.module.css'
import Convert from '@/assets/convert.svg'
import Placeholder from '@/assets/placeholder-1.svg'

const TextToIssueCommands: FC = () => {
	return (
		<div className={styles.test__to__issue__commands}>
			<div className={styles.icon__container}>
				<Convert />
			</div>
			<div className={styles.heading}>Convert voice to trades</div>

			<div className={styles.description}>
				Seamlessly move between market analysis and trade execution.
			</div>
			<div className='mb-6'></div>
			<Placeholder />
		</div>
	)
}

export default TextToIssueCommands
