import Link from 'next/link'
import { Plus, Package, Eye, AlertTriangle, Box } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createServiceClient } from '@/lib/supabase/server'
import { ProductsTable } from '@/components/admin/ProductsTable'
import { KpiCard } from '@/components/admin/dashboard/KpiCard'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types/supabase'

type Category = { name: string }
type ProductWithCategory = Product & { categories?: Category | null }

async function getProducts() {
  const supabase = await createServiceClient()
  const { data } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })
  return (data ?? []) as ProductWithCategory[]
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  const totalProducts = products.length
  const publishedProducts = products.filter(p => p.is_published).length
  const lowStockProducts = products.filter(p => p.stock <= 3).length
  const inventoryValue = products.reduce((sum, p) => sum + (Number(p.price || 0) * Number(p.stock || 0)), 0)

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Products</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Manage your furniture catalog, pricing, and live inventory.</p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link href="/admin/products/bulk">
            <Button variant="outline" className="rounded-xl border-border/60 glass-card">
              <Plus className="h-4 w-4 mr-1.5" /> Bulk Catalog
            </Button>
          </Link>
          <Link href="/admin/products/new">
            <Button className="rounded-xl shadow-md shadow-primary/20">
              <Plus className="h-4 w-4 mr-1.5" /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard
          label="Total Products"
          value={totalProducts}
          icon={Package}
          colorBg="bg-blue-500/10 text-blue-600 dark:text-blue-400"
        />
        <KpiCard
          label="Published"
          value={publishedProducts}
          icon={Eye}
          colorBg="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />
        <KpiCard
          label="Low Stock (≤3)"
          value={lowStockProducts}
          icon={AlertTriangle}
          colorBg={lowStockProducts > 0 ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"}
        />
        <KpiCard
          label="Inventory Value"
          value={formatPrice(inventoryValue)}
          icon={Box}
          colorBg="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        />
      </div>

      <ProductsTable products={products} />
    </div>
  )
}
