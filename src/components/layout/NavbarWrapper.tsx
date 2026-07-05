'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { AppNavbar } from './AppNavbar'
import { createClient } from '@/lib/supabase/client'

export function NavbarWrapper() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Do not render any navbar on admin routes, login, or register
  if (pathname?.startsWith('/admin')) return null
  if (pathname === '/login' || pathname === '/register') return null

  // On the homepage:
  if (pathname === '/') {
    // If not logged in, DO NOT render any navbar (single landing page experience)
    if (!user) return null
    // If logged in, show the full e-commerce navbar
    return <AppNavbar />
  }

  // All other pages show the App Navbar
  return <AppNavbar />
}
