import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createServiceClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'

async function getProducts() {
  const supabase = await createServiceClient()
  const { data } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Products ({products.length})</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Manage your furniture catalog, pricing, and live inventory.</p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link href="/admin/products/bulk">
            <Button variant="outline" className="rounded-xl border-border/60">
              <Plus className="h-4 w-4 mr-1.5" /> Bulk Catalog
            </Button>
          </Link>
          <Link href="/admin/products/new">
            <Button className="rounded-xl">
              <Plus className="h-4 w-4 mr-1.5" /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b border-border/40">
              <tr>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Price</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Stock</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    No products yet. <Link href="/admin/products/new" className="text-primary underline font-medium">Add your first product.</Link>
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">{product.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{product.categories?.name ?? '—'}</td>
                    <td className="px-6 py-4 font-bold text-foreground">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4">
                      <span className={product.stock === 0 ? 'text-red-500 font-bold' : product.stock <= 3 ? 'text-amber-500 font-bold' : 'text-foreground font-medium'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={product.is_published ? 'default' : 'secondary'} className="rounded-full text-[11px]">
                        {product.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Button variant="ghost" size="sm" className="rounded-lg h-8 w-8 p-0">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteProductButton productId={product.id} productName={product.name} />
                      </div>
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
