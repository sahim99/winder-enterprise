"use client"

import { useState } from "react"
import { useCart } from "@/hooks/useCart"
import { GoldButton } from "../ui/GoldButton"
import { PinCodeValidator } from "./PinCodeValidator"
import { createOrder } from "@/app/actions/orders"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function CheckoutForm() {
  const { items, totalPrice, clearCart, isClient } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [pin, setPin] = useState("")
  const [isPinValid, setIsPinValid] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!isClient || items.length === 0) {
      toast.error("Cart is empty")
      return
    }

    if (!isPinValid) {
      toast.error("Invalid delivery area", {
        description: "We currently only deliver to select West Bengal pin codes."
      })
      return
    }

    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const addressData = {
      address1: formData.get('address1') as string,
      address2: formData.get('address2') as string,
      city: formData.get('city') as string,
      pin: pin,
      state: "West Bengal"
    }

    const result = await createOrder({
      customerName: formData.get('name') as string,
      customerPhone: formData.get('phone') as string,
      customerEmail: formData.get('email') as string,
      shippingAddress: addressData,
      items: items,
      total: totalPrice
    })

    setLoading(false)

    if (result.error) {
      toast.error("Order failed", { description: result.error })
    } else {
      clearCart()
      toast.success("Order Placed Successfully", {
        description: "Your furniture is on its way."
      })
      router.push('/order-confirmed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-[var(--color-gold)] mb-6 pb-2 border-b border-[var(--color-gold)]/10">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-[var(--color-muted-foreground)]">Full Name *</label>
            <input name="name" required className="w-full bg-[var(--color-charcoal)] border border-[var(--color-gold)]/20 text-[var(--color-off-white)] px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--color-gold)]/60" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[var(--color-muted-foreground)]">Phone (10 digits) *</label>
            <input name="phone" required pattern="[0-9]{10}" title="10 digit mobile number" className="w-full bg-[var(--color-charcoal)] border border-[var(--color-gold)]/20 text-[var(--color-off-white)] px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--color-gold)]/60" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-[var(--color-muted-foreground)]">Email Address (Optional)</label>
            <input name="email" type="email" className="w-full bg-[var(--color-charcoal)] border border-[var(--color-gold)]/20 text-[var(--color-off-white)] px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--color-gold)]/60" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-2xl text-[var(--color-gold)] mb-6 pb-2 border-b border-[var(--color-gold)]/10">
          Shipping Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-[var(--color-muted-foreground)]">Address Line 1 *</label>
            <input name="address1" required className="w-full bg-[var(--color-charcoal)] border border-[var(--color-gold)]/20 text-[var(--color-off-white)] px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--color-gold)]/60" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-[var(--color-muted-foreground)]">Address Line 2 (Optional)</label>
            <input name="address2" className="w-full bg-[var(--color-charcoal)] border border-[var(--color-gold)]/20 text-[var(--color-off-white)] px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--color-gold)]/60" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[var(--color-muted-foreground)]">City/Town *</label>
            <input name="city" required className="w-full bg-[var(--color-charcoal)] border border-[var(--color-gold)]/20 text-[var(--color-off-white)] px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--color-gold)]/60" />
          </div>
          <PinCodeValidator pin={pin} onChange={setPin} onValidChange={setIsPinValid} />
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm text-[var(--color-muted-foreground)]">State</label>
            <input value="West Bengal" disabled className="w-full bg-[var(--color-charcoal)]/50 border border-[var(--color-gold)]/10 text-[var(--color-muted-foreground)] px-4 py-3 rounded-sm cursor-not-allowed" />
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 p-6 rounded-sm">
        <h3 className="font-serif text-xl text-[var(--color-gold)] mb-2">Payment Method</h3>
        <p className="text-[var(--color-off-white)] flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-4 border-[var(--color-gold)]"></span>
          Cash on Delivery (COD)
        </p>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-2 ml-6">
          Pay with cash or UPI upon delivery.
        </p>
      </div>

      <GoldButton 
        type="submit" 
        size="lg" 
        className="w-full h-14 text-lg"
        disabled={loading || !isPinValid || items.length === 0}
      >
        {loading ? 'Processing...' : 'Place Order via COD'}
      </GoldButton>
    </form>
  )
}
