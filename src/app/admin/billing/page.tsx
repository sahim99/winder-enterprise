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
    { label: 'Total Revenue', value: totalRevenue, icon: TrendingUp, bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400', format: true },
    { label: 'Collected (Delivered)', value: completedCollection, icon: CheckCircle, bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', format: true },
    { label: 'Pending (In Transit)', value: pendingCollection, icon: Clock, bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', format: true },
    { label: 'Total Invoices', value: orders.length, icon: CreditCard, bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400', format: false },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Billing & Invoices</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Track payments, collection statuses, and generate customer receipts.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map(stat => (
          <Card key={stat.label} className="border border-border/50 bg-card rounded-2xl shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-5 pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{stat.label}</CardTitle>
              <div className={`p-2 rounded-xl ${stat.bg} shrink-0`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0">
              <p className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                {stat.format ? formatPrice(stat.value) : stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invoice List */}
      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-border/40 bg-muted/20">
          <h2 className="font-bold text-foreground text-sm uppercase tracking-wider">All Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b border-border/40">
              <tr>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Invoice Ref</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Payment Type</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Collection Status</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Amount</th>
                <th className="text-right px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted-foreground">
                    No billing transactions found.
                  </td>
                </tr>
              ) : (
                orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-foreground text-xs">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{order.customer_name}</p>
                      <p className="text-xs text-muted-foreground">{order.city}, {order.state}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                        COD
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        order.status === 'delivered' 
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      }`}>
                        {order.status === 'delivered' ? 'Collected' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-foreground">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/admin/billing/invoice/${order.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
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
    </div>
  )
}
