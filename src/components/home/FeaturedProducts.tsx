"use client"

import { useEffect, useState } from "react"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { SectionHeading } from "../ui/SectionHeading"
import { ProductCard } from "../product/ProductCard"
import { createClient } from "@/lib/supabase/client"
import { Product } from "@/types"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { GoldButton } from "../ui/GoldButton"

export function FeaturedProducts() {
  const { ref, isVisible } = useScrollReveal()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('products')
        .select(`*, categories(id, name, slug)`)
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(4)

      if (!error && data) {
        setProducts(data)
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  return (
    <section className="py-32 bg-[var(--color-deep-black)]" ref={ref as any}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={cn("flex justify-between items-end mb-12 reveal-up", isVisible && "visible")}>
          <SectionHeading title="Curated Masterpieces" align="left" className="mb-0" />
          <Link href="/products" className="hidden sm:block text-[var(--color-gold)] hover:text-[var(--color-off-white)] transition-colors text-sm uppercase tracking-widest pb-2 border-b border-[var(--color-gold)]/30 hover:border-[var(--color-off-white)]">
            View Complete Collection
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[400px] bg-[var(--color-charcoal)] animate-pulse rounded-md" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <div 
                key={product.id} 
                className={cn("reveal-up", isVisible && "visible")}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-muted-foreground)] text-center py-12">New collections arriving soon.</p>
        )}

        <div className="mt-12 text-center sm:hidden reveal-up visible" style={{ transitionDelay: '500ms' }}>
          <GoldButton variant="outline" asChild>
            <Link href="/products">View Complete Collection</Link>
          </GoldButton>
        </div>
      </div>
    </section>
  )
}
