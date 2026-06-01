import { CheckoutForm } from "@/components/checkout/CheckoutForm"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { SectionHeading } from "@/components/ui/SectionHeading"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-deep-black)] pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeading 
          title="Checkout" 
          subtitle="Complete your golden transaction."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Left Column - Form */}
          <div className="lg:col-span-7">
            <CheckoutForm />
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-5">
            <OrderSummary />
          </div>
        </div>
        
      </div>
    </div>
  )
}
