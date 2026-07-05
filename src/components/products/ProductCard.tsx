'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types/supabase'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false)
  const [animating, setAnimating] = useState(false)

  const isOutOfStock = product.stock === 0

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase
        .from('wishlist_items')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single()
        .then(({ data }) => {
          if (data) setWishlisted(true)
        })
    })
  }, [product.id])

  async function handleToggleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    setAnimating(true)
    setTimeout(() => setAnimating(false), 450)

    const { toggleWishlist } = await import('@/app/actions/wishlist')
    const res = await toggleWishlist(product.id)

    if (res.success) {
      if (res.action === 'added') {
        setWishlisted(true)
        toast.success('Added to Wishlist', { description: product.name })
      } else {
        setWishlisted(false)
        toast.info('Removed from Wishlist', { description: product.name })
      }
    } else {
      toast.error(res.error || 'Please log in to save items')
    }
  }

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:-translate-y-1">
        <div className="relative aspect-[4/5] bg-muted/30 overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">No image</div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="secondary" className="text-xs font-semibold uppercase tracking-wider">Out of stock</Badge>
            </div>
          )}
          
          <button 
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full bg-white/70 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-10 ${
              wishlisted ? 'text-red-500 bg-white opacity-100' : 'text-gray-500 hover:text-red-500 hover:bg-white'
            } ${animating ? 'animate-heart-pop' : ''}`}
            aria-label="Add to wishlist"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill={wishlisted ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>

        </div>
        <div className="p-5 flex flex-col gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1.5">{product.categories?.name}</p>
            <h3 className="font-medium text-foreground line-clamp-2 leading-snug">{product.name}</h3>
          </div>
          <div className="flex items-end justify-between mt-auto pt-2">
            <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
            <span className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">View details &rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
