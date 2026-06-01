"use client"

import { useCart } from "@/hooks/useCart"
import { CartItem as CartItemType } from "@/types"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4 group">
      <div className="relative w-24 h-24 bg-[var(--color-charcoal)] rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={item.image || "/placeholder.jpg"}
          alt={item.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1 justify-between py-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-[var(--color-off-white)] font-medium line-clamp-1">{item.name}</h4>
            <p className="text-sm text-[var(--color-muted-foreground)] mt-1">{formatPrice(item.price)}</p>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-[var(--color-muted-foreground)] hover:text-[var(--color-destructive)] transition-colors p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-[var(--color-gold)]/30 rounded-md">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1.5 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm text-[var(--color-off-white)]">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1.5 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
