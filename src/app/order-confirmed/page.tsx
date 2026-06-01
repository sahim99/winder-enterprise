import Link from "next/link"
import { GoldButton } from "@/components/ui/GoldButton"
import { CheckCircle2 } from "lucide-react"

export default function OrderConfirmedPage() {
  return (
    <div className="min-h-[80svh] bg-[var(--color-deep-black)] flex flex-col items-center justify-center px-4 py-32 text-center">
      <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-8 border border-green-500/20">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </div>
      
      <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-off-white)] mb-4">
        Order Confirmed
      </h1>
      
      <p className="text-[var(--color-muted-foreground)] max-w-md mx-auto mb-10 text-lg">
        Thank you for choosing Winder Enterprise. Your order has been placed successfully and will be delivered via Cash on Delivery.
      </p>
      
      <div className="flex gap-4">
        <GoldButton asChild>
          <Link href="/products">Continue Shopping</Link>
        </GoldButton>
        <GoldButton variant="outline" asChild>
          <Link href="/account/orders">Track Order</Link>
        </GoldButton>
      </div>
    </div>
  )
}
