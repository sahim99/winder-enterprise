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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All furniture</h1>
        <p className="text-gray-500">{products.length} products</p>
      </div>
      <div className="mb-8">
        <Suspense>
          <CategoryFilter categories={categories} />
        </Suspense>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
