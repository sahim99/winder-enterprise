"use client"

import { Product } from "@/types"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (product.stock_count <= 0) {
      toast.error("Out of stock", { description: "This item is currently unavailable." })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      quantity: 1,
      slug: product.slug,
    })

    toast.success("Added to cart", {
      description: `${product.name} has been added to your selection.`
    })
  }

  const categoryName = product.categories?.name || "Furniture"

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-charcoal)] rounded-sm mb-4">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-muted-foreground)]">
            No image
          </div>
        )}
        
        {/* Quick Add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] bg-gradient-to-t from-[var(--color-deep-black)] to-transparent">
          <button 
            onClick={handleAddToCart}
            disabled={product.stock_count <= 0}
            className="w-full bg-[var(--color-gold)] text-deep-black py-3 rounded-sm flex items-center justify-center gap-2 font-medium hover:bg-[var(--color-gold-light)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-4 h-4" />
            {product.stock_count > 0 ? 'Quick Add' : 'Out of Stock'}
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)] mb-1">
          {categoryName}
        </span>
        <h3 className="font-serif text-xl text-[var(--color-off-white)] group-hover:text-[var(--color-gold)] transition-colors mb-2 line-clamp-1">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center gap-3">
          <span className="text-lg text-[var(--color-gold)]">{formatPrice(product.price)}</span>
          {product.compare_price && product.compare_price > product.price && (
            <span className="text-sm text-[var(--color-muted-foreground)] line-through">
              {formatPrice(product.compare_price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
