'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'

const checkoutSchema = z.object({
  customer_name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  address: z.string().min(10, 'Please enter your full address'),
  pin_code: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit PIN code'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { state: 'West Bengal' },
  })

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <a href="/products" className={buttonVariants()}>Shop now</a>
      </div>
    )
  }

  async function onSubmit(data: CheckoutForm) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items: items.map(({ product, quantity }) => ({
            product_id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.images[0] ?? '',
          })),
          total: totalPrice(),
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error ?? 'Order failed')
      clearCart()
      router.push(`/order-confirmed?id=${result.data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">Delivery details</h2>
          <div className="space-y-1">
            <Label htmlFor="customer_name">Full name</Label>
            <Input id="customer_name" {...register('customer_name')} placeholder="Your full name" />
            {errors.customer_name && <p className="text-xs text-red-600">{errors.customer_name.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Mobile number</Label>
            <Input id="phone" {...register('phone')} placeholder="10-digit number" maxLength={10} />
            {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="address">Full address</Label>
            <Input id="address" {...register('address')} placeholder="House no., street, landmark" />
            {errors.address && <p className="text-xs text-red-600">{errors.address.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="pin_code">PIN code</Label>
              <Input id="pin_code" {...register('pin_code')} placeholder="6-digit PIN" maxLength={6} />
              {errors.pin_code && <p className="text-xs text-red-600">{errors.pin_code.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register('city')} placeholder="City" />
              {errors.city && <p className="text-xs text-red-600">{errors.city.message}</p>}
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="state">State</Label>
            <Input id="state" {...register('state')} placeholder="State" />
            {errors.state && <p className="text-xs text-red-600">{errors.state.message}</p>}
          </div>
          {error && <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>}
          <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600 space-y-1">
            <p className="font-medium text-gray-900">Payment: Cash on delivery</p>
            <p>Pay when your furniture arrives at your door.</p>
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Placing order…' : 'Place order'}
          </Button>
        </form>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order summary</h2>
          <div className="rounded-xl border bg-white p-4 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {product.images[0] && <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="64px" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</p>
                  <p className="text-sm text-gray-500">Qty: {quantity}</p>
                </div>
                <p className="text-sm font-medium">{formatPrice(product.price * quantity)}</p>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(totalPrice())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
