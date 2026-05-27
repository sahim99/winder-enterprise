import type { Metadata } from 'next'
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
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Orders ({orders.length})</h1>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white rounded-xl border">
            <p>No orders yet.</p>
          </div>
        ) : (
          orders.map((order: any) => (
            <div key={order.id} className="bg-white rounded-xl border overflow-hidden">
              <div className="flex items-start justify-between p-6 border-b">
                <div>
                  <p className="font-mono text-xs text-gray-500 mb-1">#{order.id.slice(0, 8).toUpperCase()}</p>
                  <p className="font-semibold text-gray-900">{order.customer_name}</p>
                  <p className="text-sm text-gray-600">{order.phone}</p>
                  <p className="text-sm text-gray-600 mt-1">{order.address}, {order.city}, {order.state} — {order.pin_code}</p>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-lg font-bold text-gray-900">{formatPrice(order.total)}</p>
                  <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString('en-IN')}</p>
                  <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Items ordered</p>
                <div className="space-y-2">
                  {(order.items as any[]).map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.name} <span className="text-gray-400">×{item.quantity}</span></span>
                      <span className="font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</span>
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
