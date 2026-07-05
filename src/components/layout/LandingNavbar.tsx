'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, LogOut, User, Package, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userInitial, setUserInitial] = useState('')

  const totalItems = useCartStore(s => s.totalItems())
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(async ({ data: { user } }) => {
      setUser(user)
      if (user) {
        const name = user.user_metadata?.name || user.email || ''
        setUserInitial(name.charAt(0).toUpperCase())
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        const name = u.user_metadata?.name || u.email || ''
        setUserInitial(name.charAt(0).toUpperCase())
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
    router.refresh()
  }

  if (pathname?.startsWith('/admin')) return null
  if (pathname === '/login' || pathname === '/register') return null

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-background/85 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-border/40 py-2"
            : "bg-background/0 border-b border-transparent py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
              Winder <span className="font-light text-muted-foreground">Enterprise</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => {
                const isActive = pathname === link.href || (pathname === '/' && link.href.startsWith('/#'))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative text-sm font-semibold transition-colors py-2 group",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 w-full h-0.5 rounded-full bg-primary transition-transform duration-300 ease-out origin-center",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              {/* Auth: logged-out state */}
              {!user && (
                <div className="hidden md:flex items-center gap-4">
                  <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Login
                  </Link>
                  <Link href="/register" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Register
                  </Link>
                </div>
              )}

              {/* Auth: logged-in state */}
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <button
                        className="relative h-8 w-8 rounded-full bg-foreground text-background text-sm font-medium flex items-center justify-center cursor-pointer select-none hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label="Account menu"
                      >
                        {userInitial}
                      </button>
                    }
                  />
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => router.push('/account/profile')} className="cursor-pointer">
                      My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/account/orders')} className="cursor-pointer">
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/account/address')} className="cursor-pointer">
                      Saved Address
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer" variant="destructive">
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full hover:bg-muted/50 transition-all duration-300 hover:scale-105 active:scale-95 h-10 w-10"
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingCart className="h-5 w-5 text-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold shadow-sm animate-in zoom-in duration-300">
                    {totalItems}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full hover:bg-muted/50 h-10 w-10"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300 ease-in-out absolute left-0 right-0 px-4",
              mobileOpen ? "max-h-[400px] opacity-100 top-full" : "max-h-0 opacity-0 top-full pointer-events-none"
            )}
          >
            <nav className="flex flex-col gap-2 py-4 border-b border-border/40 bg-background/95 backdrop-blur-md rounded-b-2xl px-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              {navLinks.map(link => {
                const isActive = pathname === link.href || (pathname === '/' && link.href.startsWith('/#'))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-base font-semibold px-4 py-3 rounded-xl transition-all",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}

              {/* Mobile auth links */}
              <div className="border-t border-border/30 mt-2 pt-2">
                {!user ? (
                  <>
                    <Link href="/login" className="block text-base font-semibold px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all" onClick={() => setMobileOpen(false)}>
                      Login
                    </Link>
                    <Link href="/register" className="block text-base font-semibold px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all" onClick={() => setMobileOpen(false)}>
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/account/profile" className="block text-base font-semibold px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all" onClick={() => setMobileOpen(false)}>
                      My Profile
                    </Link>
                    <Link href="/account/orders" className="block text-base font-semibold px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all" onClick={() => setMobileOpen(false)}>
                      My Orders
                    </Link>
                    <button onClick={() => { handleSignOut(); setMobileOpen(false) }} className="w-full text-left text-base font-semibold px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all">
                      Sign out
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
