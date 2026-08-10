'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2, ArrowRight, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useDebounce } from '@/hooks/use-debounce'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types/supabase'

interface MobileSearchModalProps {
  open: boolean
  onClose: () => void
}

const POPULAR_SEARCHES = [
  'Teak Wood Sofa',
  'King Size Bed',
  'Wooden Wardrobe',
  'Dining Table',
  'Office Chair',
  'Smart TV',
]

export function MobileSearchModal({ open, onClose }: MobileSearchModalProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 250)
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setTimeout(() => {
        setQuery('')
        setSuggestions([])
      }, 0)
    }
  }, [open])

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setTimeout(() => {
        setSuggestions([])
        setIsSearching(false)
      }, 0)
      return
    }

    let active = true
    setTimeout(() => setIsSearching(true), 0)
    const supabase = createClient()

    supabase
      .from('products')
      .select('id, name, slug, price, images, is_published')
      .eq('is_published', true)
      .ilike('name', `%${debouncedQuery.trim()}%`)
      .limit(6)
      .then(({ data }) => {
        if (active) {
          setSuggestions((data as Product[]) || [])
          setIsSearching(false)
        }
      })

    return () => {
      active = false
    }
  }, [debouncedQuery])

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    onClose()
    router.push(`/products?search=${encodeURIComponent(query.trim())}`)
  }

  function handleTagClick(tag: string) {
    onClose()
    router.push(`/products?search=${encodeURIComponent(tag)}`)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/98 backdrop-blur-xl animate-in fade-in-0 duration-200">
      {/* Top Search Bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-background/90">
        <form onSubmit={handleSearchSubmit} className="flex-1 relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search furniture, electronics..."
            className="w-full h-11 pl-10 pr-10 rounded-full bg-muted/50 focus:bg-background border border-border/60 focus:border-primary text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all"
          />
          {query.length > 0 && !isSearching && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3.5 h-5 w-5 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          {isSearching && (
            <Loader2 className="absolute right-3.5 h-4 w-4 text-muted-foreground animate-spin" />
          )}
        </form>

        <button
          type="button"
          onClick={onClose}
          className="p-2 text-sm font-semibold text-muted-foreground hover:text-foreground active:scale-95 transition-transform"
        >
          Cancel
        </button>
      </div>

      {/* Results & Quick Tags Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {/* Live Search Results */}
        {query.trim().length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Products ({suggestions.length})
              </span>
            </div>

            {suggestions.length > 0 ? (
              <div className="space-y-1.5">
                {suggestions.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.slug || item.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-card border border-border/40 hover:border-primary/40 active:scale-[0.99] transition-all"
                  >
                    <div className="relative h-14 w-14 rounded-xl bg-muted/40 overflow-hidden shrink-0 border border-border/30">
                      {item.images && item.images[0] ? (
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[10px] text-muted-foreground">Img</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                      <p className="text-xs font-bold text-primary mt-0.5">{formatPrice(item.price)}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mr-1" />
                  </Link>
                ))}

                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="w-full mt-3 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
                >
                  <span>View All Results for &quot;{query}&quot;</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : !isSearching ? (
              <div className="text-center py-12 text-sm text-muted-foreground bg-muted/20 rounded-2xl border border-dashed border-border/60">
                No products found for &quot;<span className="font-semibold text-foreground">{query}</span>&quot;
              </div>
            ) : null}
          </div>
        )}

        {/* Popular Searches */}
        {query.trim().length === 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <span>Trending Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="px-3.5 py-1.5 rounded-full bg-muted/60 hover:bg-muted text-xs font-medium text-foreground border border-border/50 active:scale-95 transition-transform"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
