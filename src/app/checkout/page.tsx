'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import { Minus, Plus, X } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

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
  const { items, totalPrice, clearCart, updateQuantity, removeItem } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [authChecked, setAuthChecked] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { state: 'West Bengal' },
  })

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.push('/login?redirect=/checkout')
        return
      }
      setAuthChecked(true)

      // Auto-fill from profile + saved address
      const { data: profile } = await supabase
        .from('profiles')
        .select('name, phone, saved_address')
        .eq('id', user.id)
        .single()

      if (profile) {
        const savedAddr = profile.saved_address as { address?: string; city?: string; state?: string; pin_code?: string } | null
        reset({
          customer_name: profile.name || '',
          phone: profile.phone || '',
          address: savedAddr?.address || '',
          city: savedAddr?.city || '',
          state: savedAddr?.state || 'West Bengal',
          pin_code: savedAddr?.pin_code || '',
        })
      }
    })
  }, [router, reset])

  if (!authChecked) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    )
  }

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
          <Button type="submit" size="lg" className="w-full h-12 rounded-full font-medium text-base shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:translate-y-0" disabled={loading}>
            {loading ? 'Placing order…' : 'Place order'}
          </Button>
        </form>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order summary</h2>
          <div className="rounded-2xl border bg-white p-6 space-y-5 shadow-sm">
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
                      type="button"
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
                        type="button"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-foreground">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-muted-foreground hover:text-foreground transition-all duration-200"
                        aria-label="Increase quantity"
                        type="button"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{formatPrice(product.price * quantity)}</p>
                  </div>
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center font-semibold text-foreground pt-1">
              <span>Total</span>
              <span className="text-lg font-bold text-primary">{formatPrice(totalPrice())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
