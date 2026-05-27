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
      <div className="overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-md">
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">No image</div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Badge variant="secondary" className="text-xs">Out of stock</Badge>
            </div>
          )}
        </div>
        <div className="p-4 space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">{product.categories?.name}</p>
            <h3 className="font-medium text-gray-900 line-clamp-2 leading-snug">{product.name}</h3>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex-shrink-0"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
