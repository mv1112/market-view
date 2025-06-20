import { ReactNode, type FC } from 'react'
import styles from './styles.module.css'
import Electric from '@/assets/electric.svg'
import OffTrack from '@/assets/off-track.svg'
import AtRisk from '@/assets/at-risk.svg'

const updateCards: UpdateCardProps[] = [
	{
		id: 'update-card-1',
		badge: <OffTrack />,
		badgeTitle: 'Below target',
		title: 'Market volatility impacted our algo performance…',
		time: 'Oct 27',
	},
	{
		id: 'update-card-2',
		badge: <AtRisk />,
		badgeTitle: 'At risk',
		title: 'Strategy drawdown exceeded safety limits…',
		time: 'Oct 27',
	},
	{
		id: 'update-card-3',
		badge: <Electric />,
		badgeTitle: 'Profitable',
		title: 'Strong performance this week, 15% ROI achieved',
		time: 'Sep 8',
	},
]

const SecondCard: FC = () => {
	return (
		<div className={styles.project__update__card}>
			<div className={styles.inner__container}>
				{updateCards.map((updateCard) => (
					<UpdateCard key={updateCard.id} {...updateCard} />
				))}
			</div>
		</div>
	)
}

type UpdateCardProps = {
	id: string
	badge: ReactNode
	badgeTitle: string
	title: string
	time: string
}

const UpdateCard: FC<UpdateCardProps> = ({
	badge,
	badgeTitle,
	title,
	time,
}) => {
	return (
		<div className={styles.update__card}>
			<div className={styles.inner__container}>
				<div className={styles.badge__container}>
					{badge}
					<span> {badgeTitle} </span>
				</div>
				<span className={styles.update__text}>{title}</span>
				<span className={styles.update__time}> {time} </span>
			</div>
		</div>
	)
}

export default SecondCard
