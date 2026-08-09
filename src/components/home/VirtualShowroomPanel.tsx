'use client'

import { X, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Product } from '@/types/supabase'

interface VirtualShowroomPanelProps {
  product: Product | null
  onClose: () => void
}

export function VirtualShowroomPanel({ product, onClose }: VirtualShowroomPanelProps) {
  if (!product) return null

  // Get first image from the images array
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null

  // Format currency
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price)

  const inStock = product.stock > 0

  return (
    <div className="absolute top-0 right-0 h-full w-full sm:w-[380px] bg-gray-950 border-l border-white/10 shadow-2xl z-50 flex flex-col pointer-events-auto animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gray-900">
        <h3 className="font-bold text-white tracking-tight">Product Details</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10 text-white h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Product Image */}
        <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-800 border border-white/10">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-gray-700 to-gray-900">
              🛍️
            </div>
          )}
        </div>

        {/* Name & Price */}
        <div>
          <h2 className="text-xl font-black tracking-tight text-white mb-2">{product.name}</h2>
          <p className="text-3xl font-bold text-primary">{formattedPrice}</p>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-gray-400 leading-relaxed text-sm">{product.description}</p>
        )}

        {/* Meta */}
        <div className="pt-3 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-emerald-400' : 'bg-red-500'}`} />
            <span className={inStock ? 'text-emerald-400' : 'text-red-400'}>
              {inStock ? `In Stock (${product.stock} left)` : 'Out of Stock'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {product.categories?.name && (
              <div className="bg-gray-800 p-3 rounded-xl border border-white/5">
                <p className="text-gray-500 text-xs mb-1">Category</p>
                <p className="font-semibold text-white capitalize">{product.categories.name}</p>
              </div>
            )}
            <div className="bg-gray-800 p-3 rounded-xl border border-white/5">
              <p className="text-gray-500 text-xs mb-1">Delivery</p>
              <p className="font-semibold text-white">2-4 Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 border-t border-white/10 bg-gray-900 space-y-3">
        <Button
          className="w-full h-12 rounded-xl text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg transition-all"
          disabled={!inStock}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <Link href={`/products/${product.slug}`} className="block w-full" onClick={onClose}>
          <Button variant="outline" className="w-full h-12 rounded-xl text-base font-bold border-white/20 text-white hover:bg-white/10 hover:text-white">
            View Full Details
          </Button>
        </Link>
      </div>
    </div>
  )
}
