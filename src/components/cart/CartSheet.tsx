"use client"

import { useCart } from "@/hooks/useCart"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingBag, X } from "lucide-react"
import { CartItem } from "./CartItem"
import { CartSummary } from "./CartSummary"
import { useState } from "react"
import Link from "next/link"
import { GoldButton } from "../ui/GoldButton"

export function CartSheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const { items, isClient, totalItems } = useCart()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md border-l border-[var(--color-gold)]/20 bg-[var(--color-deep-black)] p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-[var(--color-gold)]/10">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-serif text-2xl text-[var(--color-gold)]">Your Selection</SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {isClient && items.length > 0 ? (
            <div className="space-y-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[var(--color-charcoal)] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-[var(--color-gold)]" />
              </div>
              <p className="text-[var(--color-muted-foreground)]">Your cart is empty.</p>
              <GoldButton variant="outline" onClick={() => setOpen(false)} asChild>
                <Link href="/products">Explore Collection</Link>
              </GoldButton>
            </div>
          )}
        </div>

        {isClient && items.length > 0 && (
          <div className="p-6 border-t border-[var(--color-gold)]/10 bg-[var(--color-charcoal)]">
            <CartSummary onCheckout={() => setOpen(false)} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
