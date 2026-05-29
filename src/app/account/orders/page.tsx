'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import { formatPrice } from '@/lib/utils'

type OrderItem = {
  name: string
  quantity: number
  price: number
}

type Order = {
  id: string
  status: string
  total: number
  items: OrderItem[]
  created_at: string | null
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  shipped: 'bg-purple-100 text-purple-800 border-purple-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return

      const { data } = await supabase
        .from('orders')
        .select('id, status, total, items, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setOrders((data as Order[]) || [])
      setLoaded(true)
    })
  }, [])

  if (!loaded) {
    return <p className="text-muted-foreground py-8">Loading orders…</p>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">My Orders</h2>
        <p className="text-sm text-muted-foreground">View your order history</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-muted/20 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground mb-4">You haven&apos;t placed any orders yet.</p>
          <Link href="/products" className={buttonVariants({ variant: 'default' })}>
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-medium text-foreground">
                    #{order.id.substring(0, 8).toUpperCase()}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                    {order.status}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  }) : '—'}
                </span>
              </div>
              <div className="space-y-1.5">
                {(order.items as OrderItem[]).map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} <span className="text-muted-foreground/60">×{item.quantity}</span></span>
                    <span className="font-medium text-foreground">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center border-t border-border/50 pt-3">
                <span className="text-sm font-medium text-muted-foreground">Total</span>
                <span className="font-bold text-foreground">{formatPrice(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
