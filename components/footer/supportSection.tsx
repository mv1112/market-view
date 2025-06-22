'use client'
import { type FC, useState } from 'react'
import Link from 'next/link'
import { FaTelegram, FaWhatsapp, FaPhone, FaCopy, FaCheck } from 'react-icons/fa'
import styles from './styles.module.css'

interface SupportItem {
	id: string | number
	link: string
	item: string
}

interface SupportSectionProps {
	title: string
	items: SupportItem[]
}

const SupportSection: FC<SupportSectionProps> = ({ title, items }) => {
	const [copiedPhone, setCopiedPhone] = useState(false)

	const getIcon = (id: string | number) => {
		const idStr = String(id)
		switch (idStr) {
			case 'support-telegram':
				return <FaTelegram className={styles.support__icon} />
			case 'support-whatsapp':
				return <FaWhatsapp className={styles.support__icon} />
			case 'support-phone':
				return <FaPhone className={styles.support__icon} />
			default:
				return null
		}
	}

	const handlePhoneCopy = async (phoneNumber: string) => {
		try {
			await navigator.clipboard.writeText(phoneNumber)
			setCopiedPhone(true)
			setTimeout(() => setCopiedPhone(false), 2000)
		} catch (err) {
			console.error('Failed to copy phone number:', err)
		}
	}

	return (
		<div className={styles.footer__section}>
			<h3 className={styles.footer__section__title}>{title}</h3>
			<ul className={styles.footer__section__list}>
				{items.map(({ id, item, link }) => (
					<li key={id} className={styles.support__item}>
						{String(id) === 'support-phone' ? (
							<div className={styles.phone__support}>
								<div className={styles.phone__info}>
									{getIcon(id)}
									<span className={styles.support__text}>{item}</span>
								</div>
								<button
									onClick={() => handlePhoneCopy(item)}
									className={styles.copy__button}
									title="Copy phone number"
								>
									{copiedPhone ? (
										<FaCheck className={styles.copy__icon} />
									) : (
										<FaCopy className={styles.copy__icon} />
									)}
								</button>
							</div>
						) : (
							<Link href={link} className={styles.support__link} target="_blank" rel="noopener noreferrer">
								{getIcon(id)}
								<span className={styles.support__text}>{item}</span>
							</Link>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}

export default SupportSection 