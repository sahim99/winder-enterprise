'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { Clock } from 'lucide-react'

interface CachedProduct {
  slug: string
  name: string
  price: number
  imageUrl: string
  category: string
}

export function RecentlyViewed() {
  const [items, setItems] = useState<CachedProduct[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const cachedRaw = localStorage.getItem('winder_recently_viewed')
    if (cachedRaw) {
      try {
        const parsed = JSON.parse(cachedRaw)
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      } catch {}
    }
  }, [])

  if (items.length === 0) return null

  return (
    <div className="space-y-6 mt-16 border-t pt-10">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-muted-foreground animate-pulse" />
        <h2 className="text-xl font-bold text-foreground">Recently Viewed</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item) => (
          <Link 
            key={item.slug} 
            href={`/products/${item.slug}`}
            className="group flex flex-col rounded-2xl bg-white border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[4/5] bg-muted/20 w-full overflow-hidden">
              {item.imageUrl ? (
                <Image 
                  src={item.imageUrl} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">No Image</div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                {item.category && (
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{item.category}</span>
                )}
                <h3 className="font-semibold text-sm text-foreground mt-0.5 group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
              </div>
              <p className="font-bold text-sm text-foreground mt-2">{formatPrice(item.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
