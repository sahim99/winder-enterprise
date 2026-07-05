import type { Metadata } from 'next'
import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { CreditCard, Printer, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = { title: 'Billing & Invoices — Winder Enterprise' }

async function getBillingData() {
  const supabase = await createServiceClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    
  return orders ?? []
}

export default async function AdminBillingPage() {
  const orders = await getBillingData()

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0)
  
  const pendingCollection = orders
    .filter(order => order.status !== 'delivered')
    .reduce((sum, order) => sum + Number(order.total), 0)
    
  const completedCollection = orders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + Number(order.total), 0)

  const stats = [
    { label: 'Total Revenue', value: totalRevenue, icon: TrendingUp, color: 'text-blue-600', format: true },
    { label: 'Collected (Delivered)', value: completedCollection, icon: CheckCircle, color: 'text-green-600', format: true },
    { label: 'Pending (In Transit)', value: pendingCollection, icon: Clock, color: 'text-yellow-600', format: true },
    { label: 'Total Invoices', value: orders.length, icon: CreditCard, color: 'text-purple-600', format: false },
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
        <p className="text-sm text-gray-500 mt-1">Track payments, collection statuses, and generate customer receipts.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">
                {stat.format ? formatPrice(stat.value) : stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invoice List */}
      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b bg-gray-50/50">
          <h2 className="font-semibold text-gray-900 text-base">All Transactions</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Invoice Ref</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Customer</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Date</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Payment Type</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Collection Status</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Amount</th>
              <th className="text-right px-6 py-3 font-medium text-gray-600">Print</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-500">
                  No billing transactions found.
                </td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono font-medium text-gray-900">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{order.customer_name}</p>
                    <p className="text-xs text-gray-500">{order.city}, {order.state}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      COD (Cash on Delivery)
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      order.status === 'delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status === 'delivered' ? 'Collected' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/billing/invoice/${order.id}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-semibold"
                    >
                      <Printer className="h-4 w-4" /> Invoice
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
