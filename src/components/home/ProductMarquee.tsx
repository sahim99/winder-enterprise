'use client'

import React from 'react'
import type { Product } from '@/types/supabase'
import { ProductCard } from '@/components/products/ProductCard'
import { Sparkles } from 'lucide-react'

export function ProductMarquee({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null

  // Duplicate the array so the scroll is seamless
  const duplicatedProducts = [...products, ...products, ...products]

  return (
    <div className="w-full bg-white border-y py-12 overflow-hidden flex flex-col gap-6">
      <div className="flex items-center justify-center gap-2 px-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold tracking-tight text-gray-900 uppercase">New Arrivals</h2>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] hover:![animation-play-state:paused] motion-reduce:animate-none motion-reduce:overflow-x-auto gap-6 px-6">
          {duplicatedProducts.map((product, idx) => (
            <div key={`${product.id}-${idx}`} className="w-[280px] sm:w-[320px] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
