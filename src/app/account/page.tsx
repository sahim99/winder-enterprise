import { createClient } from "@/lib/supabase/server"
import { SectionHeading } from "@/components/ui/SectionHeading"
import Link from "next/link"
import { logout } from "@/app/actions/auth"
import { GoldButton } from "@/components/ui/GoldButton"

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <div className="min-h-screen bg-[var(--color-deep-black)] pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[var(--color-gold)]/10 pb-6 gap-6">
          <SectionHeading 
            title="My Account" 
            subtitle={`Welcome back, ${profile?.name || 'Valued Customer'}.`}
            align="left"
            className="mb-0"
          />
          <form action={logout}>
            <GoldButton variant="outline" size="sm" type="submit">Sign Out</GoldButton>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="flex flex-col gap-2">
            <Link href="/account" className="px-4 py-3 bg-[var(--color-gold)] text-deep-black font-medium rounded-sm">
              Dashboard Overview
            </Link>
            <Link href="/account/orders" className="px-4 py-3 text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] hover:bg-[var(--color-charcoal)] transition-colors rounded-sm">
              Order History
            </Link>
            {profile?.role === 'admin' && (
              <Link href="/admin" className="px-4 py-3 text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] hover:bg-[var(--color-charcoal)] transition-colors rounded-sm mt-4 border border-[var(--color-gold)]/20">
                Admin Panel
              </Link>
            )}
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            
            {/* Profile Info */}
            <div className="bg-[var(--color-charcoal)] p-8 rounded-sm border border-[var(--color-gold)]/10">
              <h3 className="font-serif text-2xl text-[var(--color-gold)] mb-6">Profile Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[var(--color-off-white)]">
                <div>
                  <p className="text-sm text-[var(--color-muted-foreground)] mb-1">Full Name</p>
                  <p>{profile?.name || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-muted-foreground)] mb-1">Email</p>
                  <p>{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-muted-foreground)] mb-1">Phone</p>
                  <p>{profile?.phone || '-'}</p>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-[var(--color-charcoal)] p-8 rounded-sm border border-[var(--color-gold)]/10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl text-[var(--color-gold)]">Recent Orders</h3>
                <Link href="/account/orders" className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)]">View All</Link>
              </div>
              
              {recentOrders && recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center py-4 border-b border-[var(--color-gold)]/5 last:border-0">
                      <div>
                        <p className="text-[var(--color-off-white)]">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-[var(--color-muted-foreground)]">{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[var(--color-gold)] font-medium">₹{order.total}</p>
                        <p className="text-sm text-[var(--color-muted-foreground)]">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--color-muted-foreground)]">No recent orders found.</p>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
