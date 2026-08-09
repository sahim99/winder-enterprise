import { Package, ShoppingBag, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createServiceClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

async function getDashboardStats() {
  const supabase = await createServiceClient()

  const [
    { count: totalProducts },
    { count: totalOrders },
    { count: todayOrders },
    { count: lowStock },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true })
      .gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
    supabase.from('products').select('*', { count: 'exact', head: true })
      .gt('stock', 0).lte('stock', 3),
    supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  return { totalProducts, totalOrders, todayOrders, lowStock, recentOrders: recentOrders ?? [] }
}

export default async function AdminDashboard() {
  const { totalProducts, totalOrders, todayOrders, lowStock, recentOrders } = await getDashboardStats()

  const stats = [
    { 
      label: 'Total Products', 
      value: totalProducts ?? 0, 
      icon: Package, 
      bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      href: '/admin/products'
    },
    { 
      label: 'Total Orders', 
      value: totalOrders ?? 0, 
      icon: ShoppingBag, 
      bg: 'bg-green-500/10 text-green-600 dark:text-green-400',
      href: '/admin/orders'
    },
    { 
      label: 'Orders Today', 
      value: todayOrders ?? 0, 
      icon: TrendingUp, 
      bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      href: '/admin/orders'
    },
    { 
      label: 'Low Stock Alert', 
      value: lowStock ?? 0, 
      icon: AlertTriangle, 
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      href: '/admin/products'
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Overview of store inventory, orders, and sales.</p>
        </div>
      </div>

      {/* Metrics Grid (2 columns on mobile, 4 on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map(stat => (
          <Link key={stat.label} href={stat.href} className="group block">
            <Card className="border border-border/50 bg-card rounded-2xl shadow-xs group-hover:shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between p-3.5 sm:p-5 pb-1 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{stat.label}</CardTitle>
                <div className={`p-2 rounded-xl ${stat.bg} shrink-0`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="p-3.5 sm:p-5 pt-0 sm:pt-0">
                <p className="text-xl sm:text-3xl font-bold text-foreground mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Orders List */}
      <Card className="border border-border/50 bg-card rounded-2xl sm:rounded-3xl shadow-xs overflow-hidden">
        <CardHeader className="p-4 sm:p-6 border-b border-border/40 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg font-bold text-foreground">Recent Orders</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Latest customer transactions placed online.</p>
          </div>
          <Link href="/admin/orders" className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
            All orders <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {recentOrders.length === 0 ? (
            <p className="text-sm text-muted-foreground py-12 text-center">No orders placed yet.</p>
          ) : (
            <div className="divide-y divide-border/40">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="p-4 sm:px-6 flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{order.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{order.city} · {order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-foreground">{formatPrice(order.total)}</p>
                    <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider mt-0.5 ${
                      order.status === 'pending' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' :
                      order.status === 'processing' ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400' :
                      order.status === 'shipped' ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400' :
                      'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    }`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
