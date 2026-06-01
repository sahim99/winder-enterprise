"use client"

import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/utils"
import { GoldButton } from "../ui/GoldButton"
import Link from "next/link"

interface CartSummaryProps {
  onCheckout?: () => void
}

export function CartSummary({ onCheckout }: CartSummaryProps) {
  const { totalPrice } = useCart()

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-[var(--color-off-white)]">
        <span className="text-[var(--color-muted-foreground)]">Subtotal</span>
        <span className="font-medium">{formatPrice(totalPrice)}</span>
      </div>
      <div className="flex justify-between text-[var(--color-off-white)] text-sm">
        <span className="text-[var(--color-muted-foreground)]">Shipping</span>
        <span className="text-[var(--color-gold)]">Calculated at checkout</span>
      </div>
      
      <div className="pt-4 border-t border-[var(--color-gold)]/20 flex justify-between items-center mb-6">
        <span className="text-lg font-serif text-[var(--color-off-white)]">Estimated Total</span>
        <span className="text-xl font-medium text-[var(--color-gold)]">{formatPrice(totalPrice)}</span>
      </div>

      <GoldButton className="w-full" size="lg" asChild onClick={onCheckout}>
        <Link href="/checkout">Proceed to Checkout</Link>
      </GoldButton>
    </div>
  )
}
