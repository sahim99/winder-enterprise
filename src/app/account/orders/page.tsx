import { createClient } from "@/lib/supabase/server"
import { SectionHeading } from "@/components/ui/SectionHeading"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"

export default async function OrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[var(--color-deep-black)] pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeading 
          title="Order History" 
          subtitle="Track your golden acquisitions."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          {/* Sidebar */}
          <div className="flex flex-col gap-2">
            <Link href="/account" className="px-4 py-3 text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] hover:bg-[var(--color-charcoal)] transition-colors rounded-sm">
              Dashboard Overview
            </Link>
            <Link href="/account/orders" className="px-4 py-3 bg-[var(--color-gold)] text-deep-black font-medium rounded-sm">
              Order History
            </Link>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            
            {orders && orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-[var(--color-charcoal)] p-6 md:p-8 rounded-sm border border-[var(--color-gold)]/10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-[var(--color-gold)]/10 gap-4">
                      <div>
                        <p className="text-[var(--color-muted-foreground)] text-sm mb-1">Order Number</p>
                        <p className="text-[var(--color-off-white)] font-mono">#{order.id}</p>
                      </div>
                      <div>
                        <p className="text-[var(--color-muted-foreground)] text-sm mb-1">Date Placed</p>
                        <p className="text-[var(--color-off-white)]">{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[var(--color-muted-foreground)] text-sm mb-1">Total Amount</p>
                        <p className="text-[var(--color-gold)] font-medium">{formatPrice(order.total)}</p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-sm ${
                          order.status === 'Delivered' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                          'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm text-[var(--color-muted-foreground)] uppercase tracking-widest mb-4">Items</h4>
                      {(order.items as any[]).map((item, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <p className="text-[var(--color-off-white)]">{item.quantity}x {item.name}</p>
                          <p className="text-[var(--color-muted-foreground)]">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[var(--color-charcoal)] p-12 rounded-sm border border-[var(--color-gold)]/10 text-center">
                <p className="text-[var(--color-muted-foreground)] mb-6">You haven't placed any orders yet.</p>
                <Link href="/products" className="text-[var(--color-gold)] hover:underline">Start Shopping</Link>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}
