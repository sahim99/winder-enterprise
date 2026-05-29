'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart'
import { toast } from 'sonner'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types/supabase'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(s => s.addItem)

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      slug: product.slug,
    })
    toast.success('Added to cart', { description: product.name })
  }

  const isOutOfStock = product.stock === 0

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
        </div>
        <div className="p-5 flex flex-col gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-1.5">{product.categories?.name}</p>
            <h3 className="font-medium text-foreground line-clamp-2 leading-snug">{product.name}</h3>
          </div>
          <div className="flex items-end justify-between mt-auto pt-2">
            <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="rounded-full px-4 font-medium transition-transform active:scale-95"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="h-4 w-4 mr-1.5" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
