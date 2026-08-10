'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X, Search, Sparkles, Loader2, ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn, formatPrice } from '@/lib/utils'
import { ThemeToggle } from '@/components/ThemeToggle'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { useDebounce } from '@/hooks/use-debounce'
import type { Product } from '@/types/supabase'

import { MobileSearchModal } from '@/components/layout/MobileSearchModal'
import { useWishlistStore } from '@/store/wishlist'

export function AppNavbar() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userInitial, setUserInitial] = useState('')
  const [authLoading, setAuthLoading] = useState(true)
  
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  
  const initialSearch = searchParams.get('search') || ''
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const debouncedSearch = useDebounce(searchQuery, 250)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Auto-suggestions state
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  const totalItems = useCartStore(s => s.totalItems())

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keep search input synced if URL changes externally
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '')
  }, [searchParams])

  // Fetch live suggestions as user types - selecting only needed columns
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setSuggestions([])
      setShowSuggestions(false)
      setIsSearching(false)
      return
    }

    let active = true
    setIsSearching(true)
    const supabase = createClient()
    
    supabase
      .from('products')
      .select('id, name, slug, price, images, is_published')
      .eq('is_published', true)
      .ilike('name', `%${debouncedSearch.trim()}%`)
      .limit(6)
      .then(({ data }) => {
        if (active) {
          setSuggestions((data as Product[]) || [])
          setIsSearching(false)
          setShowSuggestions(true)
        }
      })

    return () => {
      active = false
    }
  }, [debouncedSearch])

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        const name = u.user_metadata?.name || u.email || ''
        setUserInitial(name.charAt(0).toUpperCase())
        useWishlistStore.getState().init().catch(console.error)
      }
    }).catch(console.error).finally(() => {
      setAuthLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        const name = u.user_metadata?.name || u.email || ''
        setUserInitial(name.charAt(0).toUpperCase())
        useWishlistStore.getState().init().catch(console.error)
      }
      setAuthLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setShowSuggestions(false)
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/products')
    }
  }

  // Build the login redirect URL
  const currentUrl = encodeURIComponent(pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''))

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-white/30 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-none" 
          : "bg-white/60 dark:bg-gray-950/60 backdrop-blur-md border-transparent"
      )}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4 md:gap-8">
            <Link href="/" className="flex-shrink-0 text-xl md:text-2xl font-bold tracking-tighter text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
              Winder <span className="font-light text-muted-foreground hidden sm:inline">Enterprise</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-muted-foreground flex-shrink-0">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
              <Link href="/showroom" className="hover:text-primary text-primary/80 transition-colors flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> 3D Showroom
              </Link>
              <Link href="/offers" className="hover:text-foreground transition-colors">Offers</Link>
              <Link href="/account/wishlist" className="hover:text-foreground transition-colors">Wishlist</Link>
            </nav>

            {/* Global Search Bar with Live Auto-Suggestions */}
            <div ref={searchContainerRef} className="flex-1 max-w-2xl hidden md:block relative">
              <form onSubmit={handleSearch} className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                <Input 
                  type="search" 
                  placeholder="Search furniture, electronics..." 
                  className="w-full pl-10 pr-10 bg-muted/40 hover:bg-muted/60 focus:bg-background border-muted-foreground/20 focus-visible:ring-primary/40 h-10 rounded-full transition-all"
                  value={searchQuery}
                  onFocus={() => {
                    if (searchQuery.trim().length > 0) setShowSuggestions(true)
                  }}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    if (e.target.value.trim().length > 0) setShowSuggestions(true)
                  }}
                />
                {isSearching && (
                  <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin pointer-events-none" />
                )}
              </form>

              {/* Auto-Suggestions Dropdown */}
              {showSuggestions && searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-background/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-border/60 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  {suggestions.length > 0 ? (
                    <div className="p-2 space-y-1">
                      <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                        Product Suggestions
                      </div>
                      {suggestions.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.slug || product.id}`}
                          onClick={() => setShowSuggestions(false)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/60 dark:hover:bg-muted/30 transition-colors group"
                        >
                          <div className="relative h-11 w-11 rounded-lg bg-muted/40 border border-border/40 overflow-hidden flex-shrink-0">
                            {product.images && product.images[0] ? (
                              <Image 
                                src={product.images[0]} 
                                alt={product.name} 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform" 
                                sizes="44px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Img</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                              {product.name}
                            </p>
                            <p className="text-xs font-semibold text-primary">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </Link>
                      ))}

                      {/* View All Results Footer */}
                      <Link
                        href={`/products?search=${encodeURIComponent(searchQuery.trim())}`}
                        onClick={() => setShowSuggestions(false)}
                        className="flex items-center justify-between px-3 py-2.5 mt-1 border-t border-border/40 text-xs font-semibold text-primary hover:bg-primary/5 rounded-lg transition-colors"
                      >
                        <span>View all results for &quot;{searchQuery}&quot;</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  ) : !isSearching ? (
                    <div className="p-6 text-center text-sm text-muted-foreground">
                      No products found for &quot;<span className="font-semibold text-foreground">{searchQuery}</span>&quot;
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              {/* Mobile Search Trigger Button */}
              <Button
                variant="outline"
                size="icon"
                className="md:hidden relative rounded-full h-10 w-10 border-border/60 hover:bg-muted/50 transition-all active:scale-95 cursor-pointer"
                onClick={() => setMobileSearchOpen(true)}
                aria-label="Open mobile search"
              >
                <Search className="h-4 w-4 text-foreground" />
              </Button>

              <ThemeToggle />
              
              {/* Cart Button */}
              <Button
                variant="outline"
                size="icon"
                className="relative rounded-full h-10 w-10 border-border/60 hover:bg-muted/50 transition-all active:scale-95 cursor-pointer"
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingCart className="h-5 w-5 text-foreground" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold shadow-sm">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Profile Link (Direct Link to Customer Dashboard) */}
              {authLoading ? (
                <div className="relative h-10 w-10 rounded-full bg-muted/50 animate-pulse border border-border/40 flex items-center justify-center">
                  <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                </div>
              ) : user ? (
                <Link
                  href="/account"
                  className="relative h-10 w-10 rounded-full bg-foreground text-background text-sm font-medium flex items-center justify-center cursor-pointer select-none hover:opacity-90 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm"
                  aria-label="Customer Dashboard"
                  title="Customer Dashboard"
                >
                  {userInitial}
                </Link>
              ) : (
                <Link 
                  href={`/login?redirect=${currentUrl}`}
                  className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'font-medium rounded-full' })}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Modal */}
      <MobileSearchModal open={mobileSearchOpen} onClose={() => setMobileSearchOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
