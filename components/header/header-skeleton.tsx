import { type FC } from 'react'
import { cn } from '@/lib/utils'
import styles from './styles.module.css'

interface HeaderSkeletonProps {
  className?: string
}

const HeaderSkeleton: FC<HeaderSkeletonProps> = ({ className }) => {
  return (
    <div className={cn(styles.header, className)}>
      <div className={styles.header__blur__mask}></div>
      <div className={styles.header__overlay}></div>
      <header className={styles.header__wrapper}>
        <nav className={styles.header__root}>
          <div className='relative'>
            <ul className={styles.header__list}>
              {/* Logo */}
              <li className={cn(styles.header__logo, styles.header__item)}>
                <div className={styles.header__logo__link}>
                  <div className={styles.header__logo__icon}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 2h16v16H2V2zm2 2v12h12V4H4zm2 2h8v8H6V6z"/>
                    </svg>
                  </div>
                  <span className={styles.header__logo__text}>ViewMarket</span>
                </div>
              </li>

              {/* Navigation Links */}
              <li className={cn(styles.hide__mobile, styles.header__item)}>
                <div className={styles.header__link}>
                  <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </li>

              <li className={cn(styles.hide__mobile, styles.header__trigger)}>
                <div className={styles.header__link}>
                  <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </li>

              <li className={cn(styles.hide__tablet, styles.header__item)}>
                <div className={styles.header__link}>
                  <div className="h-4 w-16 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </li>

              {/* Auth Loading State */}
              <li
                className={cn(
                  styles.header__item,
                  styles.header__button,
                  styles.header__get__started,
                )}>
                <div className={cn(styles.header__link, styles.button__get__started)}>
                  <div className="h-4 w-20 bg-gray-600 rounded animate-pulse"></div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default HeaderSkeleton 