'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart'
import { toast } from 'sonner'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types/supabase'

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore(s => s.addItem)
  const isOutOfStock = product.stock === 0

  function handleAddToCart() {
    addItem({ id: product.id, name: product.name, price: product.price, images: product.images, slug: product.slug }, quantity)
    toast.success(`${quantity} item${quantity > 1 ? 's' : ''} added to cart`, { description: product.name })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
            {product.images[selectedImage] ? (
              <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">No image</div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${selectedImage === i ? 'border-gray-900' : 'border-transparent'}`}>
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          {product.categories && (
            <Link href={`/products?category=${product.categories.slug}`}>
              <Badge variant="secondary">{product.categories.name}</Badge>
            </Link>
          )}
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</p>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-400" />
            {isOutOfStock
              ? <span className="text-sm text-red-600 font-medium">Out of stock</span>
              : <span className="text-sm text-green-700 font-medium">{product.stock} in stock</span>
            }
          </div>
          {product.description && <p className="text-gray-600 leading-relaxed">{product.description}</p>}
          {!isOutOfStock && (
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-gray-600 hover:text-gray-900" aria-label="Decrease">−</button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="px-3 py-2 text-gray-600 hover:text-gray-900" aria-label="Increase">+</button>
              </div>
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to cart
              </Button>
            </div>
          )}
          <div className="rounded-xl bg-gray-50 p-4 space-y-2 text-sm text-gray-600">
            <p>✓ Cash on delivery available</p>
            <p>✓ Delivery across West Bengal</p>
            <p>✓ Call us at +91 XXXXXXXXXX for bulk orders</p>
          </div>
        </div>
      </div>
    </div>
  )
}
