"use client"

import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"

export function OrderSummary() {
  const { items, totalPrice, isClient } = useCart()

  if (!isClient) return <div className="animate-pulse bg-[var(--color-charcoal)] h-[400px] rounded-sm" />

  return (
    <div className="bg-[var(--color-charcoal)] border border-[var(--color-gold)]/10 rounded-sm p-6 lg:p-8 sticky top-32">
      <h2 className="font-serif text-2xl text-[var(--color-off-white)] mb-6 pb-4 border-b border-[var(--color-gold)]/10">
        Order Summary
      </h2>

      <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto hide-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-16 h-16 bg-[var(--color-deep-black)] rounded-sm overflow-hidden flex-shrink-0 border border-[var(--color-gold)]/5">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--color-gold)] text-deep-black text-xs font-bold flex items-center justify-center rounded-full z-10">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm text-[var(--color-off-white)] line-clamp-1">{item.name}</h4>
              <p className="text-sm text-[var(--color-gold)] mt-1">{formatPrice(item.price)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 border-t border-[var(--color-gold)]/10 pt-6">
        <div className="flex justify-between text-[var(--color-off-white)]">
          <span className="text-[var(--color-muted-foreground)] text-sm">Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-[var(--color-off-white)]">
          <span className="text-[var(--color-muted-foreground)] text-sm">Shipping</span>
          <span className="text-[var(--color-gold)] text-sm">Free (West Bengal)</span>
        </div>
        
        <div className="pt-4 border-t border-[var(--color-gold)]/20 flex justify-between items-center">
          <span className="text-xl font-serif text-[var(--color-off-white)]">Total</span>
          <span className="text-2xl font-medium text-[var(--color-gold)]">{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </div>
  )
}
