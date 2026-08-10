import type { Metadata } from 'next'
import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { OrderStatusUpdater } from '@/components/admin/OrderStatusUpdater'

export const metadata: Metadata = { title: 'Orders' }

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
}

async function getOrders() {
  const supabase = await createServiceClient()
  const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
  return data ?? []
}

export default async function AdminOrdersPage() {
  const orders = await getOrders()

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Orders ({orders.length})</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Track live customer orders, shipping status, and generate delivery invoices.</p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground glass-card">
            <p>No orders yet.</p>
          </div>
        ) : (
          orders.map((order: any) => (
            <div key={order.id} className="glass-card overflow-hidden shadow-xs">
              <div className="flex flex-col md:flex-row md:items-start justify-between p-5 sm:p-6 border-b border-border/40 gap-4">
                <div>
                  <p className="font-mono text-xs text-muted-foreground mb-1">#{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="font-bold text-foreground text-base">{order.customer_name}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 flex-wrap">
                    <span>{order.phone}</span>
                    <span className="text-border">|</span>
                    <a 
                      href={`https://wa.me/91${order.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-bold uppercase tracking-wider"
                    >
                      WhatsApp
                    </a>
                    <a 
                      href={`tel:${order.phone}`}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-bold uppercase tracking-wider"
                    >
                      Call
                    </a>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2">{order.address}, {order.city}, {order.state} — {order.pin_code}</p>
                </div>
                <div className="text-left md:text-right space-y-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-border/40">
                  <p className="text-xl font-extrabold text-foreground">{formatPrice(order.total)}</p>
                  <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleString('en-IN')}</p>
                  <div className="flex md:justify-end">
                    <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
                  </div>
                  <Link 
                    href={`/admin/billing/invoice/${order.id}`} 
                    target="_blank" 
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-bold mt-1"
                  >
                    View & Print Invoice →
                  </Link>
                </div>
              </div>
              <div className="p-5 sm:p-6 bg-muted/20">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Items Ordered</p>
                <div className="space-y-2">
                  {(order.items as any[]).map((item, i) => (
                    <div key={i} className="flex justify-between text-sm py-1 border-b border-border/20 last:border-0">
                      <span className="text-foreground font-medium">{item.name} <span className="text-muted-foreground">×{item.quantity}</span></span>
                      <span className="font-bold text-foreground">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
