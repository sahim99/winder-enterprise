import { Package, ShoppingBag, AlertTriangle, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createServiceClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'

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
    { label: 'Total products', value: totalProducts ?? 0, icon: Package, color: 'text-blue-600' },
    { label: 'Total orders', value: totalOrders ?? 0, icon: ShoppingBag, color: 'text-green-600' },
    { label: 'Orders today', value: todayOrders ?? 0, icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Low stock items', value: lowStock ?? 0, icon: AlertTriangle, color: 'text-orange-600' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(stat => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent orders</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.customer_name}</p>
                    <p className="text-xs text-gray-500">{order.city} · {new Date(order.created_at).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatPrice(order.total)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
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
