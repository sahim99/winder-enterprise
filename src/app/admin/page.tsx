import React from 'react'
import Link from 'next/link'
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  AlertTriangle, 
  ArrowRight, 
  Plus, 
  Upload, 
  Printer, 
  Boxes
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
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
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
        const matchedProduct = products.find(p => p.name === item.name || p.id === item.id)
        const catName = matchedProduct?.categories?.name || 'Furnishings'

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
    allOrders: orders,
    recentTickets: tickets.filter(t => t.status !== 'resolved').slice(0, 3),
  }
}

export default async function AdminDashboard() {
  const data = await getDashboardIntelligence()

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      
      {/* Compact Top Bar */}
      <div className="flex items-center justify-between gap-3 bg-card px-4 py-3 rounded-xl border border-border/50 shadow-xs">
        <div className="flex items-center gap-2">
          <h1 className="text-base sm:text-lg font-black tracking-tight text-foreground">
            Overview
          </h1>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Link href="/admin/products/new">
            <Button size="sm" className="h-8 text-xs font-bold rounded-lg px-2.5 shadow-xs">
              <Plus className="h-3.5 w-3.5 mr-1" /> Product
            </Button>
          </Link>
          <Link href="/admin/products/bulk">
            <Button size="sm" variant="outline" className="h-8 text-xs font-bold rounded-lg px-2.5 border-border/60">
              <Upload className="h-3.5 w-3.5 mr-1" /> Bulk
            </Button>
          </Link>
          <Link href="/admin/billing">
            <Button size="sm" variant="outline" className="h-8 text-xs font-bold rounded-lg px-2.5 border-border/60">
              <Printer className="h-3.5 w-3.5 mr-1" /> Invoices
            </Button>
          </Link>
        </div>
      </div>

      {/* Row 1: High Density 5-KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        <KpiCard
          label="Gross Revenue"
          value={formatPrice(data.totalRevenue)}
          sublabel={`₹${data.todayRevenue.toLocaleString('en-IN')} today`}
          trend={`${data.todayOrders} today`}
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
          sublabel={`${data.totalWarehouseUnits} units live`}
          trend="Inventory"
          icon={Boxes}
          colorBg="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        />
        <KpiCard
          label="Customers"
          value={data.totalCustomers}
          sublabel="Registered profiles"
          trend="Active"
          icon={Users}
          colorBg="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
        />
        <KpiCard
          label="Low Stock"
          value={data.criticalLowStockProducts.length}
          sublabel={data.criticalLowStockProducts.length > 0 ? "≤ 3 stock items" : "All optimal"}
          trend={data.criticalLowStockProducts.length > 0 ? "Urgent" : "Good"}
          trendPositive={data.criticalLowStockProducts.length === 0}
          icon={AlertTriangle}
          colorBg={data.criticalLowStockProducts.length > 0 ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"}
        />
      </div>

      {/* Row 2: Visual Charts & Pipelines (7 / 5 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
        
        {/* Left: 7-Day Revenue & Volume Trajectory */}
        <Card className="lg:col-span-7 border border-border/50 bg-card rounded-xl sm:rounded-2xl shadow-xs p-4">
          <RevenueBarChart data={data.last7Days} totalPeriodRevenue={data.total7DayRevenue} />
        </Card>

        {/* Right: Fulfillment Pipeline Funnel */}
        <Card className="lg:col-span-5 border border-border/50 bg-card rounded-xl sm:rounded-2xl shadow-xs p-4">
          <OrderFunnelBars pipeline={data.pipeline} totalOrders={data.totalOrders} orders={data.allOrders} />
        </Card>
      </div>

      {/* Row 3: Category Telemetry (6 / 6 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
        
        {/* Category Stock Health */}
        <Card className="lg:col-span-6 border border-border/50 bg-card rounded-xl sm:rounded-2xl shadow-xs p-4">
          <StockHealthBars categories={data.categoryStockHealth} totalWarehouseUnits={data.totalWarehouseUnits} />
        </Card>

        {/* Category Revenue Distribution */}
        <Card className="lg:col-span-6 border border-border/50 bg-card rounded-xl sm:rounded-2xl shadow-xs p-4">
          <CategoryRevenueBars categories={data.categoryRevenueShare} totalRevenue={data.totalRevenue} />
        </Card>
      </div>

      {/* Row 4: Action Boards (Low Stock, Orders, Live Chats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        
        {/* Critical Low Stock Action Board */}
        <Card className="border border-border/50 bg-card rounded-xl sm:rounded-2xl shadow-xs overflow-hidden">
          <CardHeader className="px-4 py-3 border-b border-border/40 flex flex-row items-center justify-between">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground">Restock</CardTitle>
            </div>
            <Link href="/admin/products" className="text-[11px] font-bold text-primary hover:underline flex items-center gap-0.5">
              All <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {data.criticalLowStockProducts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <p className="text-xs">Zero stock shortages.</p>
              </div>
            ) : (
              <div className="divide-y divide-border/40">
                {data.criticalLowStockProducts.slice(0, 4).map((prod: any) => (
                  <div key={prod.id} className="px-4 py-2.5 flex items-center justify-between gap-2 hover:bg-muted/30 transition-colors">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-foreground truncate">{prod.name}</p>
                      <p className="text-[9px] text-muted-foreground">{formatPrice(prod.price)}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                        prod.stock === 0 ? 'bg-red-500/15 text-red-600 dark:text-red-400' : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      }`}>
                        {prod.stock === 0 ? '0 Stock' : `${prod.stock} left`}
                      </span>
                      <Link href={`/admin/products/${prod.id}/edit`}>
                        <Button size="sm" variant="outline" className="h-5 text-[9px] rounded px-1.5 font-bold border-border/60">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Customer Activity */}
        <Card className="border border-border/50 bg-card rounded-xl sm:rounded-2xl shadow-xs overflow-hidden">
          <CardHeader className="px-4 py-3 border-b border-border/40 flex flex-row items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="h-3.5 w-3.5 text-primary" />
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground">Orders</CardTitle>
            </div>
            <Link href="/admin/orders" className="text-[11px] font-bold text-primary hover:underline flex items-center gap-0.5">
              All <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {data.recentOrders.length === 0 ? (
              <p className="text-[11px] text-muted-foreground py-6 text-center">No orders recorded.</p>
            ) : (
              <div className="divide-y divide-border/40">
                {data.recentOrders.slice(0, 4).map((order: any) => {
                  const phone = order.phone
                  const whatsappUrl = phone ? `https://wa.me/91${phone.replace(/[^0-9]/g, '')}` : null

                  return (
                    <div key={order.id} className="px-4 py-2.5 flex items-center justify-between gap-2 hover:bg-muted/30 transition-colors">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-[11px] font-bold text-foreground truncate">{order.customer_name}</p>
                          {whatsappUrl && (
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[8px] text-emerald-600 dark:text-emerald-400 hover:underline font-bold uppercase bg-emerald-500/10 px-1 rounded"
                            >
                              WA
                            </a>
                          )}
                        </div>
                        <p className="text-[9px] text-muted-foreground">{order.city} · {order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[11px] font-black text-foreground">{formatPrice(order.total)}</p>
                        <span className={`inline-block text-[8px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
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

        {/* Live Chats / Support */}
        <Card className="border border-border/50 bg-card rounded-xl sm:rounded-2xl shadow-xs overflow-hidden flex flex-col">
          <CardHeader className="px-4 py-3 border-b border-border/40 flex flex-row items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground">Live Chats</CardTitle>
            </div>
            <Link href="/admin/messages" className="text-[11px] font-bold text-primary hover:underline flex items-center gap-0.5">
              Open <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col items-center justify-center bg-muted/10 min-h-[160px]">
             <MessageSquare className="h-8 w-8 text-muted-foreground/30 mb-2" />
             <p className="text-xs font-medium text-foreground">Live Customer Chat Active</p>
             <p className="text-[10px] text-muted-foreground mt-1 text-center px-4">
               Click Open to view real-time incoming messages and reply directly to customers.
             </p>
             <Link href="/admin/messages" className="mt-3">
               <Button size="sm" className="h-7 text-[10px] font-bold rounded-lg px-3">
                 Go to Messages
               </Button>
             </Link>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
