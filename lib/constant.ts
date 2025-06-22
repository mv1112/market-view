import { type ReactNode } from 'react'
import { type UserCardProps } from '@/app/sections/issue-tracking/components/user-card'
import { CarouselCardProps } from '@/app/sections/modern-product-teams/components/carousel-card'

type FooterListItem = {
	id: string | number
	link: string
	item: string
}
export type FooterSection = {
	title: string
	items: FooterListItem[]
}

export const footerSections: FooterSection[] = [
	{
		title: 'Trading',
		items: [
			{
				id: 'footer-section-11',
				link: '/auto-trading',
				item: 'Auto Trading',
			},
			{
				id: 'footer-section-12',
				link: '/pricing',
				item: 'Pricing',
			},
			{
				id: 'footer-section-13',
				link: '/market-data',
				item: 'Market Data',
			},
			{
				id: 'footer-section-14',
				link: '/api-docs',
				item: 'API Docs',
			},
			{
				id: 'footer-section-15',
				link: '/trading-strategies',
				item: 'Trading Strategies',
			},
		],
	},
	{
		title: 'Company',
		items: [
			{
				id: 'footer-section-21',
				link: '/about-us',
				item: 'About us',
			},
			{
				id: 'footer-section-22',
				link: '/blog',
				item: 'Blog',
			},
			{
				id: 'footer-section-23',
				link: '/careers',
				item: 'Careers',
			},
			{
				id: 'footer-section-24',
				link: '/customers',
				item: 'Customers',
			},
			{
				id: 'footer-section-25',
				link: '/brand',
				item: 'Brand',
			},
		],
	},
	{
		title: 'Legal',
		items: [
			{
				id: 'footer-section-41',
				link: '/privacy',
				item: 'Privacy Policy',
			},
			{
				id: 'footer-section-42',
				link: '/disclaimer',
				item: 'Disclaimer',
			},
			{
				id: 'footer-section-43',
				link: '/terms-and-conditions',
				item: 'Terms and Conditions',
			},
			{
				id: 'footer-section-44',
				link: '/cookies',
				item: 'Cookies Policy',
			},
			{
				id: 'footer-section-45',
				link: '/refund-and-cancellation',
				item: 'Refund and Cancellation',
			},
		],
	},
	{
		title: 'Support',
		items: [
			{
				id: 'support-telegram',
				link: 'https://t.me/ViewMarketsupport',
				item: 'Telegram Support',
			},
			{
				id: 'support-whatsapp',
				link: 'https://wa.me/919241740350',
				item: 'WhatsApp Support',
			},
			{
				id: 'support-phone',
				link: 'tel:+919241740350',
				item: '+91 9241740350',
			},
		],
	},
]

export type FoundationListItem = {
	id: string | number
	label: string
	value: string
}

export type FoundationList = FoundationListItem[]

export const foundationList: FoundationList = [
	{
		id: 'foundation-1',
		label: 'Real-time Trading Engine',
		value:
			'Lightning-fast execution with microsecond latency for optimal trade timing and market advantage.',
	},
	{
		id: 'foundation-2',
		label: 'Bank-grade security',
		value:
			'Military-grade encryption and security protocols keep your funds and data protected at all times.',
	},
	{
		id: 'foundation-3',
		label: 'Scalable for all traders',
		value:
			'Built for traders of all levels. From individual retail traders to institutional hedge funds.',
	},
]

export const userCards: UserCardProps[] = [
	{
		id: 'user-card-1',
		title: 'Need faster execution for scalping strategies',
		img: '/user-1.png',
		name: 'Tom',
	},
	{
		id: 'user-card-2',
		title: 'AI algorithm optimization for risk management',
		img: '/user-2.jpg',
		name: 'Romain',
	},
	{
		id: 'user-card-3',
		title:
			'Setting up automated stop-loss orders for swing trading portfolio',
		img: '/user-3.jpg',
		name: 'Tuomas',
	},
]

export const modernProductCards: CarouselCardProps[] = [
	{
		id: 'modern-carousel-card-1',
		img: '/product-development.jpeg',
		title: 'Purpose-built for algorithmic trading',
	},
	{
		id: 'modern-carousel-card-2',
		img: '/fast-moving.avif',
		title: 'Lightning-fast execution',
	},
	{
		id: 'modern-carousel-card-3',
		img: '/perfection.avif',
		title: 'Precision trading tools',
	},
]
