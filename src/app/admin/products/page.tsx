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
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Products ({products.length})</h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/products/bulk">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" /> Bulk Catalog Upload
            </Button>
          </Link>
          <Link href="/admin/products/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add product
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Product</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Category</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Price</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Stock</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Status</th>
              <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500">
                  No products yet. <Link href="/admin/products/new" className="text-gray-900 underline">Add your first product.</Link>
                </td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-gray-600">{product.categories?.name ?? '—'}</td>
                  <td className="px-6 py-4 text-gray-900">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4">
                    <span className={product.stock === 0 ? 'text-red-600 font-medium' : product.stock <= 3 ? 'text-orange-600 font-medium' : 'text-gray-900'}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={product.is_published ? 'default' : 'secondary'}>
                      {product.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Button variant="ghost" size="sm">
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
  )
}
