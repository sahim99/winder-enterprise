'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types/supabase'
import { toast } from 'sonner'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { ShoppingBag, Plus, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'shelf'
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const [animating, setAnimating] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const isOutOfStock = product.stock === 0
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id))
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist)

  async function handleToggleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    setAnimating(true)
    setTimeout(() => setAnimating(false), 450)
    await toggleWishlist(product.id, product.name)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)
    useCartStore.getState().addItem(product)
    toast.success('Added to Cart', { description: product.name })
    setTimeout(() => setIsAdding(false), 400)
  }

  if (variant === 'compact') {
    return (
      <Link href={`/products/${product.slug || product.id}`} className="group block select-none">
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
          {/* Image Container */}
          <div className="relative aspect-[4/5] sm:aspect-square bg-muted/30 overflow-hidden">
            {product.images && product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 180px, 260px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs">No image</div>
            )}

            {isOutOfStock && (
              <div className="absolute inset-0 bg-background/70 backdrop-blur-xs flex items-center justify-center">
                <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider">Out of stock</Badge>
              </div>
            )}

            {/* Wishlist button */}
            <button 
              onClick={handleToggleWishlist}
              className={`absolute top-2 right-2 p-1.5 rounded-full bg-background/90 border border-border/40 shadow-sm transition-all z-10 ${
                isWishlisted ? 'text-red-500 opacity-100' : 'text-muted-foreground opacity-80 group-hover:opacity-100 hover:text-red-500'
              } ${animating ? 'animate-heart-pop' : ''}`}
              aria-label="Add to wishlist"
            >
              <Heart className={`h-3.5 w-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Details */}
          <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between gap-1.5">
            <div>
              {product.categories?.name && (
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider truncate mb-0.5">
                  {product.categories.name}
                </p>
              )}
              <h3 className="text-xs sm:text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center justify-between pt-1 mt-auto">
              <span className="text-xs sm:text-sm font-bold text-foreground">
                {formatPrice(product.price)}
              </span>

              <button
                disabled={isAdding || isOutOfStock}
                onClick={handleAddToCart}
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-50 transition-transform shadow-xs"
                aria-label="Add to cart"
              >
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/products/${product.slug || product.id}`} className="group block select-none">
      <div className="bg-card rounded-2xl sm:rounded-3xl border border-border/50 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-400 hover:-translate-y-1.5 flex flex-col h-full">
        {/* Image Frame */}
        <div className="relative aspect-[4/5] bg-muted/20 overflow-hidden">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">No image</div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/70 backdrop-blur-xs flex items-center justify-center">
              <Badge variant="secondary" className="text-xs font-semibold uppercase tracking-wider shadow-sm">Out of stock</Badge>
            </div>
          )}
          
          <button 
            onClick={handleToggleWishlist}
            className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-2 rounded-full bg-background/90 border border-border/40 shadow-sm transition-all z-10 ${
              isWishlisted ? 'text-red-500 opacity-100' : 'text-muted-foreground opacity-90 group-hover:opacity-100 hover:text-red-500'
            } ${animating ? 'animate-heart-pop' : ''}`}
            aria-label="Add to wishlist"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Card Content */}
        <div className="p-3.5 sm:p-5 flex flex-col flex-1 gap-2 sm:gap-3">
          <div>
            {product.categories?.name && (
              <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1 truncate">
                {product.categories.name}
              </p>
            )}
            <h3 className="text-sm sm:text-base font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between mt-auto pt-1">
            <span className="text-base sm:text-lg font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            <button 
              disabled={isAdding || isOutOfStock}
              onClick={handleAddToCart}
              className="sm:hidden h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-50 transition-transform shadow-xs"
              aria-label="Quick add to cart"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Desktop Full Action Button */}
          <div className="hidden sm:block pt-1">
            <Button 
              disabled={isAdding || isOutOfStock}
              onClick={handleAddToCart}
              className="w-full h-9 rounded-xl font-semibold text-xs tracking-wide shadow-xs transition-all active:scale-95 bg-primary text-primary-foreground hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" /> 
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
