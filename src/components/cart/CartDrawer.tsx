'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/store/cart'
import { cn, formatPrice } from '@/lib/utils'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your cart ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-300" />
            <p className="text-sm text-gray-500">Your cart is empty</p>
            <Link href="/products" onClick={onClose} className={buttonVariants({ variant: "outline" })}>
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 items-center">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-muted/30 border border-border/40">
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="80px"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between h-20 py-1">
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm font-medium text-foreground line-clamp-1 hover:text-primary transition-colors cursor-pointer">{product.name}</p>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="h-6 w-6 flex items-center justify-center rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-full h-8 px-1 bg-muted/20">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-muted-foreground hover:text-foreground transition-all duration-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-foreground">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-muted-foreground hover:text-foreground transition-all duration-200"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{formatPrice(product.price * quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-6 space-y-4 bg-background">
              <div className="flex items-center justify-between text-base font-semibold text-foreground">
                <span>Subtotal</span>
                <span className="text-lg font-bold">{formatPrice(totalPrice())}</span>
              </div>
              <p className="text-xs text-muted-foreground tracking-wide">Delivery charges calculated at checkout</p>
              <div className="space-y-2.5 pt-2">
                <Link 
                  href="/checkout" 
                  onClick={onClose} 
                  className={cn(
                    buttonVariants({ size: "lg" }), 
                    "w-full h-12 rounded-full font-medium text-base shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:translate-y-0"
                  )}
                >
                  Proceed to checkout
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full h-12 rounded-full font-medium text-base hover:bg-muted/50 border-border/80 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0" 
                  onClick={onClose}
                >
                  Continue shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
