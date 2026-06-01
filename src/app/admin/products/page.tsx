import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { GoldButton } from "@/components/ui/GoldButton"

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select(`*, categories(name)`)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-4xl text-[var(--color-off-white)]">Products</h1>
        <GoldButton asChild>
          <Link href="/admin/products/new">Add New Product</Link>
        </GoldButton>
      </div>

      <div className="bg-[var(--color-charcoal)] border border-[var(--color-gold)]/10 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[var(--color-off-white)]">
            <thead className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)] bg-[var(--color-deep-black)]">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-gold)]/5">
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-[var(--color-deep-black)]/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-[var(--color-muted-foreground)]">{product.categories?.name}</td>
                  <td className="px-6 py-4 text-[var(--color-gold)]">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4">{product.stock_count}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-sm ${product.is_published ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                      {product.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/products/${product.id}/edit`} className="text-[var(--color-gold)] hover:underline">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
