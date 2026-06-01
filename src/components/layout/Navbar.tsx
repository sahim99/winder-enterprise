"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { CartSheet } from '../cart/CartSheet'
import { createClient } from '@/lib/supabase/client'
import { User as SupabaseUser } from '@supabase/supabase-js'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const pathname = usePathname()
  const { totalItems, isClient } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )
    
    return () => subscription.unsubscribe()
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/products?sort=newest' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled 
            ? "bg-background/80 backdrop-blur-lg border-b border-border py-4" 
            : "bg-transparent py-6"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-1 z-50 relative">
              <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-[var(--color-off-white)] group-hover:text-[var(--color-gold)] transition-colors duration-300 uppercase">
                Winder
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] mb-1"></span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm tracking-wide uppercase transition-colors duration-300 hover:text-[var(--color-gold)]",
                    pathname === link.href ? "text-[var(--color-gold)]" : "text-[var(--color-muted-foreground)]"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4 md:gap-6 z-50 relative">
              <Link href="/products" className="text-[var(--color-off-white)] hover:text-[var(--color-gold)] transition-colors hidden md:block">
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </Link>
              
              <Link href={user ? "/account" : "/auth/login"} className="text-[var(--color-off-white)] hover:text-[var(--color-gold)] transition-colors hidden md:block">
                <User className="w-5 h-5" strokeWidth={1.5} />
              </Link>
              
              <CartSheet>
                <button className="text-[var(--color-off-white)] hover:text-[var(--color-gold)] transition-colors relative group">
                  <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                  {isClient && totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--color-gold)] text-deep-black text-[10px] font-bold flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                      {totalItems}
                    </span>
                  )}
                </button>
              </CartSheet>

              {/* Mobile menu toggle */}
              <button 
                className="md:hidden text-[var(--color-off-white)] hover:text-[var(--color-gold)] transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-[var(--color-deep-black)] z-40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden flex flex-col justify-center items-center",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              style={{ transitionDelay: mobileMenuOpen ? `${100 + i * 50}ms` : '0ms' }}
              className={cn(
                "text-2xl font-serif tracking-widest uppercase transition-all duration-500",
                mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                pathname === link.href ? "text-[var(--color-gold)]" : "text-[var(--color-off-white)]"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div 
            style={{ transitionDelay: mobileMenuOpen ? `${100 + navLinks.length * 50}ms` : '0ms' }}
            className={cn(
              "flex gap-6 mt-4 transition-all duration-500",
              mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <Link href="/products" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)]">
              <Search className="w-6 h-6" />
            </Link>
            <Link href={user ? "/account" : "/auth/login"} className="text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)]">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
