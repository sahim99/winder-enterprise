import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch basic stats
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true })
  const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true })
  
  const { data: orders } = await supabase.from('orders').select('total')
  const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total), 0) || 0

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('id, customer_name, total, status, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-4xl text-[var(--color-off-white)]">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-charcoal)] p-6 rounded-sm border border-[var(--color-gold)]/10">
          <h3 className="text-sm text-[var(--color-muted-foreground)] tracking-widest uppercase mb-2">Total Revenue</h3>
          <p className="text-3xl text-[var(--color-gold)] font-medium">{formatPrice(totalRevenue)}</p>
        </div>
        <div className="bg-[var(--color-charcoal)] p-6 rounded-sm border border-[var(--color-gold)]/10">
          <h3 className="text-sm text-[var(--color-muted-foreground)] tracking-widest uppercase mb-2">Total Orders</h3>
          <p className="text-3xl text-[var(--color-gold)] font-medium">{orderCount || 0}</p>
        </div>
        <div className="bg-[var(--color-charcoal)] p-6 rounded-sm border border-[var(--color-gold)]/10">
          <h3 className="text-sm text-[var(--color-muted-foreground)] tracking-widest uppercase mb-2">Total Products</h3>
          <p className="text-3xl text-[var(--color-gold)] font-medium">{productCount || 0}</p>
        </div>
      </div>

      <div className="bg-[var(--color-charcoal)] border border-[var(--color-gold)]/10 rounded-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--color-gold)]/10">
          <h3 className="font-serif text-2xl text-[var(--color-gold)]">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[var(--color-off-white)]">
            <thead className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] bg-[var(--color-deep-black)]">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-gold)]/5">
              {recentOrders?.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--color-deep-black)]/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm">#{order.id.slice(0, 8)}</td>
                  <td className="px-6 py-4">{order.customer_name}</td>
                  <td className="px-6 py-4 text-[var(--color-muted-foreground)]">{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</td>
                  <td className="px-6 py-4 text-[var(--color-gold)]">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-sm bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
