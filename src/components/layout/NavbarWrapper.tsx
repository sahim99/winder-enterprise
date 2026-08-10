'use client'

import { usePathname } from 'next/navigation'
import { AppNavbar } from './AppNavbar'

export function NavbarWrapper() {
  const pathname = usePathname()

  // Do not render any navbar on admin routes, login, or register
  if (pathname?.startsWith('/admin')) return null
  if (pathname === '/login' || pathname === '/register') return null

  // All other pages show the App Navbar
  return <AppNavbar />
}
