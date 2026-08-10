'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import type { Product } from '@/types/supabase'
import { ProductCard } from '@/components/products/ProductCard'
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

export function ProductMarquee({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = window.innerWidth < 640 ? 182 : 240 // card width + gap
    const target = direction === 'left' ? -cardWidth : cardWidth
    
    // If we are near the end, reset scroll smoothly
    if (
      direction === 'right' &&
      scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth - 100
    ) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (direction === 'left' && scrollRef.current.scrollLeft <= 10) {
      scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth / 2, behavior: 'smooth' })
    } else {
      scrollRef.current.scrollBy({ left: target, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (isPaused) return

    // Auto-advance by 1 card every 3.5 seconds
    const timer = setInterval(() => {
      scroll('right')
    }, 3500)

    return () => clearInterval(timer)
  }, [isPaused, scroll])

  if (!products || products.length === 0) return null

  // Duplicate the array so there's plenty of scroll space
  const duplicatedProducts = [...products, ...products, ...products]

  return (
    <section 
      className="w-full bg-background border-y border-border/40 py-3 sm:py-6 flex flex-col gap-2.5 sm:gap-4 relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse" />
          <h2 className="text-base sm:text-2xl font-bold tracking-tight text-foreground uppercase">New Arrivals</h2>
        </div>

        {/* Header navigation arrows for quick access */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => scroll('left')}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-border/80 bg-background/80 hover:bg-muted/80 backdrop-blur-md flex items-center justify-center text-foreground transition-transform active:scale-90 shadow-xs cursor-pointer"
            aria-label="Previous products"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-border/80 bg-background/80 hover:bg-muted/80 backdrop-blur-md flex items-center justify-center text-foreground transition-transform active:scale-90 shadow-xs cursor-pointer"
            aria-label="Next products"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Carousel track */}
        <div 
          ref={scrollRef}
          className="flex w-full overflow-x-auto gap-3 sm:gap-5 px-4 sm:px-6 pb-2 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {duplicatedProducts.map((product, idx) => (
            <div key={`${product.id}-${idx}`} className="w-[170px] sm:w-[220px] md:w-[260px] flex-shrink-0 snap-start">
              <ProductCard product={product} variant="compact" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
