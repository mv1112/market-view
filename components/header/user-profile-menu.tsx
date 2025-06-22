'use client'

import { type FC, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import { LogoutButton } from '@/components/logout-button'
import { 
  User, 
  Settings, 
  Shield, 
  BarChart3, 
  HelpCircle, 
  LogOut,
  ChevronDown,
  Crown,
  AlertTriangle
} from 'lucide-react'
import styles from './styles.module.css'

interface UserProfileMenuProps {
  className?: string
}

const UserProfileMenu: FC<UserProfileMenuProps> = ({ className }) => {
  const { 
    user, 
    profile, 
    userDisplayName, 
    userInitials, 
    avatarUrl,
    isSessionExpiring 
  } = useAuth()
  
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Professional menu structure
  const menuSections = [
    {
      title: 'Account',
      links: [
        {
          href: '/charts',
          label: 'Dashboard',
          icon: <BarChart3 className="h-4 w-4" />,
          description: 'Trading dashboard'
        },
        {
          href: '/protected',
          label: 'Profile',
          icon: <User className="h-4 w-4" />,
          description: 'Account settings'
        },
        {
          href: '/protected#security',
          label: 'Security',
          icon: <Shield className="h-4 w-4" />,
          description: 'Security settings',
          badge: profile?.two_factor_enabled ? undefined : 'Setup'
        }
      ]
    },
    {
      title: 'Support',
      links: [
        {
          href: '/help',
          label: 'Help Center',
          icon: <HelpCircle className="h-4 w-4" />,
          description: 'Get support'
        }
      ]
    }
  ]

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        handleClose()
      }
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyPress)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 150)
  }

  const handleToggle = () => {
    if (isOpen) {
      handleClose()
    } else {
      setIsOpen(true)
    }
  }

  if (!user) return null

  return (
    <div className={cn("relative", className)}>
      {/* Profile Button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
          "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20",
          "text-white/90 hover:text-white",
          isOpen && "bg-white/10"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${userDisplayName} profile menu`}
      >
        {/* Avatar */}
        <div className="relative">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={userDisplayName}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20"
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
              "ring-2 ring-white/20",
              avatarUrl && "hidden"
            )}
          >
            {userInitials}
          </div>
          
          {/* Session Warning Indicator */}
          {isSessionExpiring && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse" 
                 title="Session expiring soon" />
          )}
        </div>

        {/* User Info - Hidden on mobile */}
        <div className="hidden sm:block text-left min-w-0">
          <div className="text-sm font-medium truncate max-w-32">
            {userDisplayName}
          </div>
          <div className="text-xs text-white/60 truncate max-w-32">
            {profile?.role && (
              <span className="capitalize">{profile.role}</span>
            )}
          </div>
        </div>

        {/* Chevron */}
        <ChevronDown 
          className={cn(
            "hidden sm:block h-4 w-4 text-white/60 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute right-0 top-full mt-2 w-80 bg-[#1a1a1a] border border-white/10",
            "rounded-xl shadow-2xl backdrop-blur-xl z-50",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            isClosing && "animate-out fade-out-0 zoom-out-95 duration-150"
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={userDisplayName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-semibold ring-2 ring-white/20">
                    {userInitials}
                  </div>
                )}
                
                {/* Role Badge */}
                {profile?.role === 'admin' && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown className="h-3 w-3 text-yellow-900" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold truncate">
                  {userDisplayName}
                </div>
                <div className="text-white/60 text-sm truncate">
                  {user.email}
                </div>
                {profile?.role && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/80 capitalize">
                      {profile.role}
                    </span>
                    {!profile.email_verified && (
                      <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded-full flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Unverified
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Menu Sections */}
          <div className="py-2">
            {menuSections.map((section, sectionIndex) => (
              <div key={section.title}>
                {sectionIndex > 0 && <div className="border-t border-white/10 my-2" />}
                
                <div className="px-4 py-2">
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                    {section.title}
                  </div>
                </div>
                
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white",
                      "hover:bg-white/5 transition-colors duration-150",
                      "focus:outline-none focus:bg-white/5"
                    )}
                    role="menuitem"
                    onClick={() => handleClose()}
                  >
                    <div className="text-white/60">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{link.label}</div>
                      {link.description && (
                        <div className="text-xs text-white/50">{link.description}</div>
                      )}
                    </div>
                    {link.badge && (
                      <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Logout Section */}
          <div className="border-t border-white/10 p-2">
            <LogoutButton
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-4 py-3 text-white/80 hover:text-white",
                "hover:bg-red-500/10 hover:text-red-300 transition-colors duration-150",
                "focus:outline-none focus:bg-red-500/10 focus:text-red-300"
              )}
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </LogoutButton>
          </div>

          {/* Session Warning */}
          {isSessionExpiring && (
            <div className="border-t border-yellow-500/20 bg-yellow-500/10 p-3">
              <div className="flex items-center gap-2 text-yellow-300 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Session expiring soon</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UserProfileMenu 