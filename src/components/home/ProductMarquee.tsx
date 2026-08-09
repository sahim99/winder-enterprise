'use client'

import React, { useRef, useEffect, useState } from 'react'
import type { Product } from '@/types/supabase'
import { ProductCard } from '@/components/products/ProductCard'
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ProductMarquee({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  if (!products || products.length === 0) return null

  // Duplicate the array so the scroll can continue
  const duplicatedProducts = [...products, ...products, ...products, ...products]

  useEffect(() => {
    // If the user hovers, we pause the auto-scroll so they can interact or use arrows
    if (isHovered) return

    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 1, behavior: 'auto' })
        
        // Loop back seamlessly if we reach the duplicated end
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
        ) {
          scrollRef.current.scrollLeft = 0
        }
      }
    }, 40) // Smooth continuous scroll (slowed down)

    return () => clearInterval(interval)
  }, [isHovered])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340 // Approx width of one card + gap
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div 
      className="w-full bg-background border-y border-border/30 py-12 flex flex-col gap-6 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center gap-2 px-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold tracking-tight text-foreground uppercase">New Arrivals</h2>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Navigation Buttons */}
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300 bg-background/90 backdrop-blur-xl border-border shadow-lg z-20 cursor-pointer flex"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </Button>

        <div 
          ref={scrollRef}
          className="flex w-full overflow-x-auto gap-6 px-6 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
        >
          {duplicatedProducts.map((product, idx) => (
            <div key={`${product.id}-${idx}`} className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300 bg-background/90 backdrop-blur-xl border-border shadow-lg z-20 cursor-pointer flex"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-6 w-6 text-foreground" />
        </Button>
      </div>
    </div>
  )
}
