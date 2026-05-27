import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PageProps {
  searchParams: { id?: string }
}

export default function OrderConfirmedPage({ searchParams }: PageProps) {
  const orderId = searchParams.id?.slice(0, 8).toUpperCase() ?? '—'

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Order placed!</h1>
      <p className="text-gray-600">
        Your order <span className="font-mono font-semibold">#{orderId}</span> has been received.
        We will call you to confirm delivery details.
      </p>
      <div className="rounded-xl bg-gray-50 border p-4 text-sm text-gray-600 space-y-1 text-left">
        <p>✓ Cash on delivery — pay when it arrives</p>
        <p>✓ We will call to confirm your address</p>
        <p>✓ Questions? WhatsApp: +91 XXXXXXXXXX</p>
      </div>
      <Link href="/products" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
        Continue shopping
      </Link>
    </div>
  )
}
