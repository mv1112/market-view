"use client"

import { type FC, useState, useEffect } from 'react'
import Hero from './sections/hero'
import Customers from './sections/customers'
import ModernProductTeams from './sections/modern-product-teams'
import LongTermPlanning from './sections/long-term-planning'
import IssueTracking from './sections/issue-tracking'
import Collaborate from './sections/collaborate'
import Foundation from './sections/foundation'
import PreFooter from './sections/prefooter'
import AmbientLighting from '@/components/ambient-lighting'
import { LandingPageSkeleton } from '@/components/ui/skeleton'

const Home: FC = () => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Show skeleton for minimum time during page load
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 300) // Minimum loading time for smooth skeleton transition

		return () => clearTimeout(timer)
	}, [])

	// Show skeleton during initial loading only (not navigation)
	if (isLoading) {
		return <LandingPageSkeleton />
	}

	return (
		<main className=' min-h-screen pt-[calc(var(--header-top)+var(--header-height))]'>
			<AmbientLighting />
			<Hero />
			<Customers />
			<ModernProductTeams />
			<LongTermPlanning />
			<IssueTracking />
			<Collaborate />
			<Foundation />
			<PreFooter />
		</main>
	)
}

export default Home
