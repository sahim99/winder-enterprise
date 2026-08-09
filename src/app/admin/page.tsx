import React from 'react'
import Link from 'next/link'
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  AlertTriangle, 
  Package, 
  ArrowRight, 
  Plus, 
  Upload, 
  Printer, 
  Phone,
  Store,
  Boxes,
  Clock,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createServiceClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { KpiCard } from '@/components/admin/dashboard/KpiCard'
import { RevenueBarChart, DailySalesData } from '@/components/admin/dashboard/RevenueBarChart'
import { OrderFunnelBars, OrderPipelineStatus } from '@/components/admin/dashboard/OrderFunnelBars'
import { StockHealthBars, CategoryStockHealth } from '@/components/admin/dashboard/StockHealthBars'
import { CategoryRevenueBars, CategoryRevenueShare } from '@/components/admin/dashboard/CategoryRevenueBars'

async function getDashboardIntelligence() {
  const supabase = await createServiceClient()

  const [
    { data: allProducts },
    { data: allCategories },
    { data: allOrders },
    { data: allProfiles },
    { data: allTickets },
  ] = await Promise.all([
    supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('name'),
    supabase.from('orders').select('*').order('created_at', { ascending: false }),
    supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    supabase.from('support_tickets').select('*, profiles(name, phone)').order('created_at', { ascending: false }),
  ])

  const products = allProducts ?? []
  const categories = allCategories ?? []
  const orders = allOrders ?? []
  const profiles = allProfiles ?? []
  const tickets = allTickets ?? []

  // 1. Executive High-Level Totals
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0)
  const totalOrders = orders.length
  const totalCustomers = profiles.length
  const openTickets = tickets.filter(t => t.status !== 'resolved')
  const criticalLowStockProducts = products.filter(p => p.stock <= 3).sort((a, b) => a.stock - b.stock)
  
  // Total Warehouse asset value (Retail worth)
  const totalWarehouseAssetValue = products.reduce((sum, p) => sum + (Number(p.price || 0) * Number(p.stock || 0)), 0)
  const totalWarehouseUnits = products.reduce((sum, p) => sum + Number(p.stock || 0), 0)

  // Orders placed today
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayOrders = orders.filter(o => o.created_at ? new Date(o.created_at) >= todayStart : false)
  const todayRevenue = todayOrders.reduce((sum, o) => sum + Number(o.total || 0), 0)

  // 2. 7-Day Revenue & Orders Trajectory
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const last7Days: DailySalesData[] = []
  let total7DayRevenue = 0

  for (let i = 6; i >= 0; i--) {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() - i)
    const dateStr = targetDate.toISOString().split('T')[0]
    const dayLabel = i === 0 ? 'Today' : dayNames[targetDate.getDay()]
    const fullDate = targetDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })

    const dayOrders = orders.filter(o => o.created_at && o.created_at.startsWith(dateStr))
    const dayRev = dayOrders.reduce((sum, o) => sum + Number(o.total || 0), 0)
    total7DayRevenue += dayRev

    last7Days.push({
      dayLabel,
      fullDate,
      revenue: dayRev,
      ordersCount: dayOrders.length,
    })
  }

  // 3. Fulfillment Pipeline Funnel
  const pipelineStatuses: Array<'pending' | 'processing' | 'shipped' | 'delivered'> = ['pending', 'processing', 'shipped', 'delivered']
  const pipelineLabels: Record<string, string> = {
    pending: 'Pending Approval',
    processing: 'Processing In Factory',
    shipped: 'Shipped (In Transit)',
    delivered: 'Delivered & Collected',
  }

  const pipeline: OrderPipelineStatus[] = pipelineStatuses.map(status => {
    const matching = orders.filter(o => o.status === status)
    return {
      status,
      label: pipelineLabels[status],
      count: matching.length,
      totalRevenue: matching.reduce((sum, o) => sum + Number(o.total || 0), 0),
    }
  })

  // 4. Category Stock Health
  const categoryStockHealth: CategoryStockHealth[] = categories.map(cat => {
    const catProducts = products.filter(p => p.category_id === cat.id)
    const inStockUnits = catProducts.reduce((sum, p) => sum + Number(p.stock || 0), 0)
    const lowStockCount = catProducts.filter(p => p.stock <= 3).length

    return {
      categoryName: cat.name,
      totalProducts: catProducts.length,
      inStockUnits,
      lowStockCount,
    }
  }).sort((a, b) => b.inStockUnits - a.inStockUnits)

  // 5. Category Revenue Share
  const categoryRevenueMap: Record<string, { revenue: number, units: number }> = {}
  orders.forEach(order => {
    if (Array.isArray(order.items)) {
      order.items.forEach((item: any) => {
        // Try finding category via product match
        const matchedProduct = products.find(p => p.name === item.name || p.id === item.id)
        const catName = matchedProduct?.categories?.name || 'General Furnishings'

        if (!categoryRevenueMap[catName]) {
          categoryRevenueMap[catName] = { revenue: 0, units: 0 }
        }
        categoryRevenueMap[catName].revenue += Number(item.price || 0) * Number(item.quantity || 1)
        categoryRevenueMap[catName].units += Number(item.quantity || 1)
      })
    }
  })

  const categoryRevenueShare: CategoryRevenueShare[] = Object.entries(categoryRevenueMap).map(([name, data]) => ({
    name,
    revenue: data.revenue,
    unitsSold: data.units,
  })).sort((a, b) => b.revenue - a.revenue)

  // If no order items recorded yet, populate with category list as baseline
  if (categoryRevenueShare.length === 0 && categories.length > 0) {
    categories.slice(0, 4).forEach(c => {
      categoryRevenueShare.push({
        name: c.name,
        revenue: 0,
        unitsSold: 0,
      })
    })
  }

  return {
    totalRevenue,
    totalOrders,
    totalCustomers,
    openTickets,
    criticalLowStockProducts,
    totalWarehouseAssetValue,
    totalWarehouseUnits,
    todayOrders: todayOrders.length,
    todayRevenue,
    last7Days,
    total7DayRevenue,
    pipeline,
    categoryStockHealth,
    categoryRevenueShare,
    recentOrders: orders.slice(0, 5),
    recentTickets: tickets.slice(0, 3),
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardIntelligence()

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Executive Welcome & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-5 sm:p-6 rounded-2xl border border-border/50 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Business Intelligence Hub
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Store
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Real-time financial velocity, warehouse inventory health, and customer fulfillment tracking.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link href="/admin/products/new">
            <Button size="sm" className="rounded-xl font-bold shadow-xs">
              <Plus className="h-4 w-4 mr-1.5" /> Add Product
            </Button>
          </Link>
          <Link href="/admin/products/bulk">
            <Button size="sm" variant="outline" className="rounded-xl border-border/60 font-bold">
              <Upload className="h-4 w-4 mr-1.5" /> Bulk Upload
            </Button>
          </Link>
          <Link href="/admin/billing">
            <Button size="sm" variant="outline" className="rounded-xl border-border/60 font-bold">
              <Printer className="h-4 w-4 mr-1.5" /> Invoices
            </Button>
          </Link>
        </div>
      </div>

      {/* Row 1: Executive KPI Metrics (5 Cards Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <KpiCard
          label="Gross Revenue"
          value={formatPrice(data.totalRevenue)}
          sublabel={`₹${data.todayRevenue.toLocaleString('en-IN')} today`}
          trend={`${data.todayOrders} new today`}
          trendPositive={true}
          icon={TrendingUp}
          colorBg="bg-blue-500/10 text-blue-600 dark:text-blue-400"
        />
        <KpiCard
          label="Total Orders"
          value={data.totalOrders}
          sublabel={`${data.pipeline.find(p => p.status === 'delivered')?.count ?? 0} delivered`}
          trend="Lifetime"
          icon={ShoppingBag}
          colorBg="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />
        <KpiCard
          label="Warehouse Value"
          value={formatPrice(data.totalWarehouseAssetValue)}
          sublabel={`${data.totalWarehouseUnits} total units in stock`}
          trend="Asset Value"
          icon={Boxes}
          colorBg="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        />
        <KpiCard
          label="Active Customers"
          value={data.totalCustomers}
          sublabel="Registered client profiles"
          trend="Growth"
          icon={Users}
          colorBg="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
        />
        <KpiCard
          label="Urgent Restocks"
          value={data.criticalLowStockProducts.length}
          sublabel={data.criticalLowStockProducts.length > 0 ? "Items with ≤ 3 stock" : "Inventory healthy"}
          trend={data.criticalLowStockProducts.length > 0 ? "Action Req." : "Optimal"}
          trendPositive={data.criticalLowStockProducts.length === 0}
          icon={AlertTriangle}
          colorBg={data.criticalLowStockProducts.length > 0 ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"}
        />
      </div>

      {/* Row 2: Visual Charts & Analytics (2 Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 7-Day Revenue & Volume Trajectory */}
        <Card className="lg:col-span-7 border border-border/50 bg-card rounded-2xl shadow-xs p-5 sm:p-6">
          <RevenueBarChart data={data.last7Days} totalPeriodRevenue={data.total7DayRevenue} />
        </Card>

        {/* Right: Fulfillment Pipeline Funnel */}
        <Card className="lg:col-span-5 border border-border/50 bg-card rounded-2xl shadow-xs p-5 sm:p-6">
          <OrderFunnelBars pipeline={data.pipeline} totalOrders={data.totalOrders} />
        </Card>
      </div>

      {/* Row 3: Category Health & Revenue Share (2 Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Stock Health */}
        <Card className="lg:col-span-6 border border-border/50 bg-card rounded-2xl shadow-xs p-5 sm:p-6">
          <StockHealthBars categories={data.categoryStockHealth} totalWarehouseUnits={data.totalWarehouseUnits} />
        </Card>

        {/* Category Revenue Distribution */}
        <Card className="lg:col-span-6 border border-border/50 bg-card rounded-2xl shadow-xs p-5 sm:p-6">
          <CategoryRevenueBars categories={data.categoryRevenueShare} totalRevenue={data.totalRevenue} />
        </Card>
      </div>

      {/* Row 4: Critical Low Stock Alert Board & Open Support Tickets (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Critical Low Stock Action Board */}
        <Card className="lg:col-span-7 border border-border/50 bg-card rounded-2xl shadow-xs overflow-hidden">
          <CardHeader className="p-5 border-b border-border/40 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-sm sm:text-base font-bold text-foreground">Critical Inventory Restock Alerts</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">High priority items requiring immediate reorder.</p>
              </div>
            </div>
            <Link href="/admin/products" className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1">
              All Products <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {data.criticalLowStockProducts.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <p className="text-xs font-medium">All products are well-stocked. Zero critical shortages.</p>
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {data.criticalLowStockProducts.slice(0, 5).map((prod: any) => (
                  <div key={prod.id} className="p-4 sm:px-6 flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{prod.name}</p>
                      <p className="text-xs text-muted-foreground">{prod.categories?.name ?? 'General'} · {formatPrice(prod.price)}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                        prod.stock === 0 ? 'bg-red-500/15 text-red-600 dark:text-red-400' : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      }`}>
                        {prod.stock === 0 ? 'Out of Stock' : `${prod.stock} left`}
                      </span>
                      <Link href={`/admin/products/${prod.id}/edit`}>
                        <Button size="sm" variant="outline" className="h-7 text-xs rounded-lg px-2.5 font-bold border-border/60">
                          Restock
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Support Tickets Triage */}
        <Card className="lg:col-span-5 border border-border/50 bg-card rounded-2xl shadow-xs overflow-hidden">
          <CardHeader className="p-5 border-b border-border/40 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-sm sm:text-base font-bold text-foreground">Customer Support Triage</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">{data.openTickets.length} Open Inquiries</p>
              </div>
            </div>
            <Link href="/admin/tickets" className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {data.recentTickets.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <p className="text-xs font-medium">No open tickets. Customer satisfaction is 100%.</p>
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {data.recentTickets.map((ticket: any) => {
                  const phone = ticket.profiles?.phone
                  const whatsappUrl = phone ? `https://wa.me/91${phone.replace(/[^0-9]/g, '')}` : null

                  return (
                    <div key={ticket.id} className="p-4 sm:px-5 flex items-start justify-between gap-3 hover:bg-muted/30 transition-colors">
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-foreground truncate">{ticket.subject}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{ticket.profiles?.name || 'Customer'} · {ticket.description}</p>
                      </div>
                      <div className="shrink-0 flex items-center gap-1.5">
                        {whatsappUrl && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <Phone className="h-3 w-3" />
                          </a>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          ticket.status === 'open' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' :
                          ticket.status === 'in_progress' ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400' :
                          'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Row 5: Recent Live Customer Activity Feed */}
      <Card className="border border-border/50 bg-card rounded-2xl shadow-xs overflow-hidden">
        <CardHeader className="p-5 border-b border-border/40 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg font-bold text-foreground">Live Customer Transactions</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Most recent orders placed across India.</p>
          </div>
          <Link href="/admin/orders" className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1">
            All Orders <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {data.recentOrders.length === 0 ? (
            <p className="text-sm text-muted-foreground py-12 text-center">No orders placed yet.</p>
          ) : (
            <div className="divide-y divide-border/40">
              {data.recentOrders.map((order: any) => {
                const phone = order.phone
                const whatsappUrl = phone ? `https://wa.me/91${phone.replace(/[^0-9]/g, '')}` : null

                return (
                  <div key={order.id} className="p-4 sm:px-6 flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground truncate">{order.customer_name}</p>
                        {whatsappUrl && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline font-bold uppercase tracking-wider"
                          >
                            WhatsApp
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{order.city}, {order.state} · {order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-extrabold text-foreground">{formatPrice(order.total)}</p>
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mt-0.5 ${
                        order.status === 'pending' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' :
                        order.status === 'processing' ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400' :
                        order.status === 'shipped' ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400' :
                        'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      }`}>{order.status}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
