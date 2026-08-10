'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Sparkles, Heart, User, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/providers/AuthProvider'
import { useCartStore } from '@/store/cart'

export function MobileBottomNav() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const { user } = useAuth()
  const isLoggedIn = !!user
  const [mounted, setMounted] = useState(false)
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null)
  const totalItems = useCartStore(s => s.totalItems())

  useEffect(() => {
    setTimeout(() => setMounted(true), 0)
  }, [])

  useEffect(() => {
    // Show nav on initial load, then set a timer to fade
    const resetTimer = () => {
      setVisible(true)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      hideTimerRef.current = setTimeout(() => {
        setVisible(false)
      }, 3000) // Vanish after 3s idle
    }

    const handleScroll = () => {
      resetTimer()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    resetTimer()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [pathname])

  const handleMouseEnter = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    setVisible(true)
  }

  const handleMouseLeave = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    hideTimerRef.current = setTimeout(() => setVisible(false), 2500)
  }

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Products', href: '/products', icon: Compass },
    { label: '3D Room', href: '/showroom', icon: Sparkles, highlight: true },
    { label: 'Wishlist', href: '/account/wishlist', icon: Heart },
  ]

  // Hide on admin routes and auth pages
  if (pathname?.startsWith('/admin') || pathname === '/login' || pathname === '/register') {
    return null
  }

  return (
    <div
      className={cn(
        "md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out transform",
        visible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-24 opacity-0 scale-95 pointer-events-none"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
    >
      <nav className="flex items-center gap-1 sm:gap-2 px-3.5 py-2 rounded-full bg-background/85 dark:bg-gray-950/85 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.2)]">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-full transition-all duration-200 active:scale-90",
                isActive
                  ? "bg-foreground text-background shadow-md"
                  : item.highlight
                  ? "text-primary hover:bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="text-[10px] font-medium tracking-tight mt-0.5">
                {item.label}
              </span>
            </Link>
          )
        })}

        <button
          onClick={() => useCartStore.getState().setIsOpen(true)}
          className="flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-full transition-all duration-200 active:scale-90 text-muted-foreground hover:text-foreground hover:bg-muted/50 relative"
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5 shrink-0" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground font-bold shadow-sm">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Cart</span>
        </button>
      </nav>
    </div>
  )
}
