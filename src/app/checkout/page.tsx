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
      if (!user) return
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
    <div className="bg-muted/10 min-h-screen pt-10 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-10">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Step 1: Delivery Details */}
              <div className="bg-background rounded-3xl border border-border/50 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/40">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">1</div>
                  <h2 className="text-xl font-semibold text-foreground">Delivery details</h2>
                </div>
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
              </div>

              {/* Step 2: Payment Method */}
              <div className="bg-background rounded-3xl border border-border/50 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/40">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">2</div>
                  <h2 className="text-xl font-semibold text-foreground">Payment method</h2>
                </div>
                
                <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 flex items-start gap-4">
                  <div className="mt-0.5 relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Cash on Delivery (COD)</p>
                    <p className="text-sm text-muted-foreground mt-1">Pay when your order arrives at your door. Available across West Bengal.</p>
                  </div>
                </div>

                {error && <div className="mt-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 font-medium">{error}</div>}
                
                <Button type="submit" size="lg" className="w-full h-14 mt-8 rounded-full font-bold text-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 transition-all" disabled={loading}>
                  {loading ? 'Processing Order…' : 'Confirm Order'}
                </Button>
              </div>

            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
            <div className="bg-background rounded-3xl border border-border/50 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
              <h2 className="text-xl font-semibold text-foreground mb-6 pb-6 border-b border-border/40">Order summary</h2>
              <div className="space-y-6">
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
                <Separator className="my-6" />
                <div className="flex justify-between items-center font-bold text-foreground">
                  <span className="text-lg">Total</span>
                  <span className="text-2xl text-primary">{formatPrice(totalPrice())}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
