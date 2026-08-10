'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Pencil, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'
import type { Product } from '@/types/supabase'

type Category = {
  name: string
}

type ProductWithCategory = Product & {
  categories?: Category | null
}

export function ProductsTable({ products }: { products: ProductWithCategory[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' 
      ? true 
      : statusFilter === 'published' ? p.is_published : !p.is_published
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-card/40 border border-white/10 p-3 rounded-2xl">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 h-9 rounded-xl bg-background/50 border-white/10 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex bg-background/50 rounded-xl p-1 border border-white/10 w-full sm:w-auto">
            <button 
              onClick={() => setStatusFilter('all')}
              className={`flex-1 sm:flex-none px-3 py-1 text-xs font-medium rounded-lg transition-all ${statusFilter === 'all' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              All
            </button>
            <button 
              onClick={() => setStatusFilter('published')}
              className={`flex-1 sm:flex-none px-3 py-1 text-xs font-medium rounded-lg transition-all ${statusFilter === 'published' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Live
            </button>
            <button 
              onClick={() => setStatusFilter('draft')}
              className={`flex-1 sm:flex-none px-3 py-1 text-xs font-medium rounded-lg transition-all ${statusFilter === 'draft' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Draft
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b border-white/10 dark:border-white/5">
              <tr>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-[10px] uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-[10px] uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-[10px] uppercase tracking-wider">Price</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-[10px] uppercase tracking-wider">Stock</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-[10px] uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3.5 font-semibold text-muted-foreground text-[10px] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 dark:divide-white/5">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const image = product.images?.[0]
                  
                  return (
                    <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl overflow-hidden bg-muted flex-shrink-0 relative border border-white/10">
                            {image ? (
                              <Image src={image} alt={product.name} fill className="object-cover" sizes="40px" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-[10px] text-muted-foreground">No img</div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-sm">{product.name}</p>
                            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">ID: {product.id.slice(0,8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-muted/50 text-muted-foreground border border-white/5">
                          {product.categories?.name ?? 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-foreground">{formatPrice(product.price)}</td>
                      <td className="px-6 py-4">
                        {product.stock === 0 ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-600 dark:text-red-400">
                            Out of Stock
                          </span>
                        ) : product.stock <= 3 ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                            Low: {product.stock}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            {product.stock} units
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={product.is_published ? 'default' : 'secondary'} className="rounded-full text-[10px] font-bold shadow-none">
                          {product.is_published ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Button variant="ghost" size="sm" className="rounded-lg h-8 w-8 p-0 hover:bg-white/10 hover:text-foreground">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeleteProductButton productId={product.id} productName={product.name} />
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
