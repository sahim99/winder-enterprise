'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/store/cart'
import { toast } from 'sonner'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types/supabase'
import { RecentlyViewed } from '@/components/products/RecentlyViewed'

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore(s => s.addItem)
  const isOutOfStock = product.stock === 0

  useEffect(() => {
    if (typeof window === 'undefined') return
    const cachedRaw = localStorage.getItem('winder_recently_viewed')
    let cached: any[] = []
    if (cachedRaw) {
      try { cached = JSON.parse(cachedRaw) } catch {}
    }
    const filtered = cached.filter((item: any) => item.slug !== product.slug)
    const updated = [
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        imageUrl: product.images[0] || '',
        category: (product as any).categories?.name || ''
      },
      ...filtered
    ].slice(0, 4)
    localStorage.setItem('winder_recently_viewed', JSON.stringify(updated))
  }, [product])

  function handleAddToCart() {
    addItem({ id: product.id, name: product.name, price: product.price, images: product.images, slug: product.slug }, quantity)
    toast.success(`${quantity} item${quantity > 1 ? 's' : ''} added to cart`, { description: product.name })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-10">
        <ArrowLeft className="h-4 w-4" /> Back to Collection
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-4 sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted/30">
            {product.images[selectedImage] ? (
              <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">No image</div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${selectedImage === i ? 'border-primary ring-2 ring-primary/20 ring-offset-2' : 'border-transparent hover:opacity-80'}`}>
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-8 pt-4">
          <div className="space-y-4">
            {product.categories && (
              <Link href={`/products?category=${product.categories.slug}`}>
                <Badge variant="secondary" className="uppercase tracking-widest text-xs font-semibold bg-muted/50 hover:bg-muted transition-colors px-3 py-1">{product.categories.name}</Badge>
              </Link>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.1]">{product.name}</h1>
            <p className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</p>
          </div>
          
          <div className="flex items-center gap-2 pb-6 border-b border-border/50">
            <Package className="h-5 w-5 text-muted-foreground" />
            {isOutOfStock
              ? <span className="text-sm text-destructive font-medium uppercase tracking-wider">Out of stock</span>
              : <span className="text-sm text-primary font-medium uppercase tracking-wider">{product.stock} in stock</span>
            }
          </div>
          
          {product.description && (
            <div className="prose prose-sm md:prose-base prose-gray">
              <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
            </div>
          )}
          
          {!isOutOfStock && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6">
              <div className="flex items-center border border-border rounded-full h-14 w-full sm:w-auto px-2">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Decrease">−</button>
                <span className="w-8 text-center text-base font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Increase">+</button>
              </div>
              <Button size="lg" className="flex-1 h-14 rounded-full text-base font-medium shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>
          )}
          
          <div className="rounded-2xl bg-muted/30 p-6 space-y-4 mt-8">
            <h3 className="font-semibold text-foreground tracking-tight">Delivery & Services</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary">✓</span> Cash on delivery available</li>
              <li className="flex items-start gap-2"><span className="text-primary">✓</span> Premium delivery across West Bengal</li>
              <li className="flex items-start gap-2"><span className="text-primary">✓</span> Need help? Call us at +91 XXXXXXXXXX</li>
            </ul>
          </div>
        </div>
      </div>
      <RecentlyViewed />
    </div>
  )
}
