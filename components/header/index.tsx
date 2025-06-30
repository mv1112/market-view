'use client'

import { type FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import styles from './styles.module.css'

// Simple Profile Avatar Component for Header
const SimpleProfileAvatar: FC = () => {
	const { userInitials, avatarUrl, userDisplayName } = useAuth()

	return (
		<Link 
			href="/charts" 
			className={cn(
				"w-8 h-8 rounded-full transition-all duration-200",
				"hover:ring-2 hover:ring-white/30 focus:outline-none focus:ring-2 focus:ring-white/30"
			)}
			title={`Go to dashboard - ${userDisplayName}`}
		>
			{avatarUrl ? (
				<Image
					src={avatarUrl}
					alt={userDisplayName}
					width={32}
					height={32}
					className="w-8 h-8 rounded-full object-cover"
					onError={(e) => {
						// Fallback to initials if image fails to load
						const target = e.target as HTMLImageElement
						target.style.display = 'none'
						const fallback = target.nextElementSibling as HTMLElement
						if (fallback) fallback.classList.remove('hidden')
					}}
				/>
			) : null}
			
			{/* Initials Fallback */}
			<div 
				className={cn(
					"w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600",
					"flex items-center justify-center text-white text-sm font-semibold",
					avatarUrl && "hidden"
				)}
			>
				{userInitials}
			</div>
		</Link>
	)
}

const Header: FC = () => {
	const { isAuthenticated, isLoading, isInitialized } = useAuth()

	// Show minimal header during initial load
	if (!isInitialized || isLoading) {
		return (
			<div className={styles.header}>
				<header className={styles.header__wrapper}>
					<nav className={styles.header__root}>
						<div className='relative'>
							<ul className={styles.header__list}>
								<li className={cn(styles.header__logo, styles.header__item)}>
									<Link href='/' className={styles.header__logo__link}>
										<div className={styles.header__logo__icon}>
											<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
												<path d="M2 2h16v16H2V2zm2 2v12h12V4H4zm2 2h8v8H6V6z"/>
											</svg>
										</div>
										<span className={styles.header__logo__text}>ViewMarket</span>
									</Link>
								</li>
							</ul>
						</div>
					</nav>
				</header>
			</div>
		)
	}

	return (
		<div className={styles.header}>
			<div className={styles.header__blur__mask}></div>
			<div className={styles.header__overlay}></div>
			<header className={styles.header__wrapper}>
				<nav className={styles.header__root}>
					<div className='relative'>
						<ul className={styles.header__list}>
							<li className={cn(styles.header__logo, styles.header__item)}>
								<Link href='/' className={styles.header__logo__link}>
									<div className={styles.header__logo__icon}>
										<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
											<path d="M2 2h16v16H2V2zm2 2v12h12V4H4zm2 2h8v8H6V6z"/>
										</svg>
									</div>
									<span className={styles.header__logo__text}>ViewMarket</span>
								</Link>
							</li>

							<li className={cn(styles.hide__mobile, styles.header__item)}>
								<Link className={styles.header__link} href='/pricing'>
									{' '}
									Pricing{' '}
								</Link>
							</li>

							<li className={cn(styles.hide__mobile, styles.header__trigger)}>
								<Link className={styles.header__link} href='#'>
									{' '}
									Company{' '}
								</Link>
							</li>

							<li className={cn(styles.hide__tablet, styles.header__item)}>
								<Link className={styles.header__link} href='#'>
									{' '}
									Support{' '}
								</Link>
							</li>

							{/* Always show Get Started button */}
							<li
								className={cn(
									styles.header__item,
									styles.header__button,
									styles.header__get__started,
								)}>
								<Link
									className={cn(styles.header__link, styles.button__get__started)}
									href={isAuthenticated ? '/charts' : '/auth'}>
									{' '}
									Get started
									{' '}
								</Link>
							</li>

							<li
								className={cn(
									styles.header__item,
									styles.header__button,
									styles.header__menu,
								)}>
								<button>
									<Menu />
								</button>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		</div>
	)
}

export default Header
