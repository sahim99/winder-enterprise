'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { useDebounce } from '@/hooks/use-debounce'

export function AppNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userInitial, setUserInitial] = useState('')
  
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  
  const initialSearch = searchParams.get('search') || ''
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const debouncedSearch = useDebounce(searchQuery, 400)
  const [mounted, setMounted] = useState(false)

  const totalItems = useCartStore(s => s.totalItems())

  // Keep search input synced if URL changes externally
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '')
  }, [searchParams])

  // Live search effect
  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      return
    }
    
    // Create new URLSearchParams based on current params
    const params = new URLSearchParams(searchParams.toString())
    
    if (debouncedSearch.trim()) {
      params.set('search', debouncedSearch.trim())
    } else {
      params.delete('search')
    }
    
    // Only push if we are on /products or if we are actively searching
    if (pathname === '/products' || debouncedSearch.trim() !== '') {
      router.push(`/products?${params.toString()}`)
    }
  }, [debouncedSearch])

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
    window.location.href = '/'
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    // The useEffect will handle the routing naturally, but this prevents form submission reload
  }

  // Build the login redirect URL
  const currentUrl = encodeURIComponent(pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''))

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4 md:gap-8">
            <Link href="/" className="flex-shrink-0 text-xl md:text-2xl font-bold tracking-tighter text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
              Winder <span className="font-light text-muted-foreground hidden sm:inline">Enterprise</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-muted-foreground flex-shrink-0">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
              <Link href="/offers" className="hover:text-foreground transition-colors">Offers</Link>
              <Link href="/account/wishlist" className="hover:text-foreground transition-colors">Wishlist</Link>
            </nav>

            {/* Global Search Bar */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <form onSubmit={handleSearch} className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  type="search" 
                  placeholder="Search furniture, electronics..." 
                  className="w-full pl-10 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/30 h-10 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {/* Profile Link & Sign Out */}
              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/account"
                    className="relative h-9 w-9 rounded-full bg-foreground text-background text-sm font-medium flex items-center justify-center cursor-pointer select-none hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Account page"
                  >
                    {userInitial}
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut} 
                    className="hidden sm:inline-flex text-xs font-semibold text-muted-foreground hover:text-red-600 hover:bg-red-50/30 transition-colors h-9 px-3 rounded-full"
                  >
                    Sign out
                  </Button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Link 
                    href={`/login?redirect=${currentUrl}`}
                    className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'font-medium' })}
                  >
                    Login
                  </Link>
                </div>
              )}

              {/* Cart Button */}
              <Button
                variant="outline"
                size="icon"
                className="relative rounded-full h-10 w-10 border-border/60 hover:bg-muted/50 transition-all active:scale-95"
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingCart className="h-5 w-5 text-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold shadow-sm">
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
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search and Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[300px] pb-4' : 'max-h-0'}`}>
            <form onSubmit={handleSearch} className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="w-full pl-10 bg-muted/30 border-muted-foreground/20 rounded-full h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-2 mt-4 border-t pt-3 border-border/40">
              <Link href="/" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground py-1">Home</Link>
              <Link href="/products" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground py-1">Products</Link>
              <Link href="/offers" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground py-1">Offers</Link>
              <Link href="/account/wishlist" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground py-1">Wishlist</Link>
            </div>

            {!user && (
               <div className="flex gap-2 mt-4">
                 <Link 
                   href={`/login?redirect=${currentUrl}`} 
                   className={buttonVariants({ className: 'flex-1 rounded-full' })}
                 >
                   Login
                 </Link>
                 <Link 
                   href={`/register?redirect=${currentUrl}`} 
                   className={buttonVariants({ variant: 'outline', className: 'flex-1 rounded-full' })}
                 >
                   Register
                 </Link>
               </div>
            )}
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
