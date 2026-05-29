import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ProductCard } from '@/components/products/ProductCard'
import { CategoryFilter } from '@/components/products/CategoryFilter'
import { Skeleton } from '@/components/ui/skeleton'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'All Products' }

interface PageProps {
  searchParams: { category?: string }
}

async function getProducts(category?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (category) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', category)
      .single()
    if (cat) query = query.eq('category_id', cat.id)
  }

  const { data } = await query
  return data ?? []
}

async function getCategories() {
  const supabase = await createClient()
  const { data } = await supabase.from('categories').select('*').order('name')
  return data ?? []
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const [products, categories] = await Promise.all([
    getProducts(searchParams.category),
    getCategories(),
  ])

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="bg-muted py-16 md:py-24 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Our Collection</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our complete range of premium furniture, designed for modern living and crafted to last.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <p className="text-muted-foreground font-medium">Showing <span className="text-foreground">{products.length}</span> products</p>
          <Suspense>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-32 bg-muted/10 rounded-3xl border border-dashed border-border">
            <p className="text-muted-foreground text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
