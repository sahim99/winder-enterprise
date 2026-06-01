"use client"

import { useState } from "react"
import { useCart } from "@/hooks/useCart"
import { Product } from "@/types"
import { GoldButton } from "../ui/GoldButton"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import { toast } from "sonner"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (product.stock_count <= 0) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      quantity,
      slug: product.slug,
    })

    toast.success("Added to Selection", {
      description: `${quantity}x ${product.name} added to your cart.`
    })
  }

  const outOfStock = product.stock_count <= 0

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="text-[var(--color-muted-foreground)] text-sm uppercase tracking-widest">Quantity</span>
        <div className="flex items-center border border-[var(--color-gold)]/30 rounded-sm">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={outOfStock}
            className="p-3 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-colors disabled:opacity-50"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center text-[var(--color-off-white)] font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock_count, quantity + 1))}
            disabled={outOfStock}
            className="p-3 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-sm text-[var(--color-muted-foreground)]">
          {outOfStock ? 'Out of stock' : `${product.stock_count} available`}
        </span>
      </div>

      <GoldButton 
        size="lg" 
        className="w-full h-14 text-lg" 
        onClick={handleAddToCart}
        disabled={outOfStock}
      >
        <ShoppingBag className="w-5 h-5 mr-2" />
        {outOfStock ? 'Out of Stock' : 'Add to Cart'}
      </GoldButton>
    </div>
  )
}
