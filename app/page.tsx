"use client"

import { type FC, useState, useEffect } from 'react'
import Hero from './sections/hero'
import Customers from './sections/customers'
import ModernProductTeams from './sections/modern-product-teams'
import LongTermPlanning from './sections/long-term-planning'
import IssueTracking from './sections/issue-tracking'
import Collaborate from './sections/collaborate'
import Foundation from './sections/foundation'

import AmbientLighting from '@/components/ambient-lighting'
// Loading state handled by Next.js

const Home: FC = () => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Show skeleton for minimum time during page load
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 300) // Minimum loading time for smooth skeleton transition

		return () => clearTimeout(timer)
	}, [])

	// Show minimal loading state if needed
	if (isLoading) {
		return (
			<main className="min-h-screen pt-[calc(var(--header-top)+var(--header-height))] flex items-center justify-center">
				<div className="animate-pulse">Loading...</div>
			</main>
		)
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
		</main>
	)
}

export default Home
