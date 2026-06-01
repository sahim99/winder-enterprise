import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils"

export default async function AdminOrdersPage() {
  const supabase = await createClient()

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-4xl text-[var(--color-off-white)]">Manage Orders</h1>

      <div className="bg-[var(--color-charcoal)] border border-[var(--color-gold)]/10 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[var(--color-off-white)]">
            <thead className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] bg-[var(--color-deep-black)]">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-gold)]/5">
              {orders?.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--color-deep-black)]/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm">#{order.id.slice(0, 8)}</td>
                  <td className="px-6 py-4">
                    <div>{order.customer_name}</div>
                    <div className="text-xs text-[var(--color-muted-foreground)]">{order.customer_phone}</div>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted-foreground)] text-sm">{order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}</td>
                  <td className="px-6 py-4 text-[var(--color-gold)]">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <select 
                      defaultValue={order.status}
                      className="bg-[var(--color-deep-black)] border border-[var(--color-gold)]/20 text-xs px-2 py-1 rounded-sm text-[var(--color-off-white)]"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted-foreground)]">{order.payment_method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
