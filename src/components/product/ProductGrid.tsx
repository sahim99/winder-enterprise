"use client"

import { ProductCard } from "./ProductCard"
import { Product } from "@/types"
import { cn } from "@/lib/utils"
import { PackageX } from "lucide-react"

interface ProductGridProps {
  products: Product[]
  loading?: boolean
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[450px] bg-[var(--color-charcoal)] animate-pulse rounded-md" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border border-[var(--color-gold)]/10 rounded-sm bg-[var(--color-charcoal)]/30">
        <div className="w-16 h-16 rounded-full bg-[var(--color-charcoal)] flex items-center justify-center mb-4">
          <PackageX className="w-8 h-8 text-[var(--color-gold)]" />
        </div>
        <h3 className="font-serif text-2xl text-[var(--color-off-white)] mb-2">No Products Found</h3>
        <p className="text-[var(--color-muted-foreground)]">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, i) => (
        <div 
          key={product.id}
          className={cn("reveal-up visible")}
          style={{ transitionDelay: `${(i % 6) * 100}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
