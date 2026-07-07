import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ProductCard } from '@/components/products/ProductCard'
import { CategoryFilter } from '@/components/products/CategoryFilter'
import { Skeleton } from '@/components/ui/skeleton'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Products | Winder Enterprise' }

interface PageProps {
  searchParams: Promise<{ category?: string, search?: string }>
}

async function getProducts(category?: string, search?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('products')
    .select('*, categories!inner(name, slug)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (category) {
    query = query.eq('categories.slug', category)
  }
  
  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data } = await query
  return data ?? []
}

async function getCategories() {
  const supabase = await createClient()
  const { data } = await supabase.from('categories').select('*').order('name')
  return data ?? []
}

export default async function ProductsPage(props: PageProps) {
  const searchParams = await props.searchParams
  const [products, categories] = await Promise.all([
    getProducts(searchParams.category, searchParams.search),
    getCategories(),
  ])

  return (
    <div className="bg-muted/10 min-h-[calc(100vh-4rem)] pt-4 md:pt-8 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {searchParams.search ? `Search results for "${searchParams.search}"` : 'All Products'}
          </h1>
          <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
            Showing {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 bg-background p-5 rounded-3xl border border-border/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="font-semibold text-foreground mb-4 pb-4 border-b border-border/40">Categories</h3>
            <Suspense fallback={<div className="h-40 bg-muted animate-pulse rounded-xl" />}>
              <CategoryFilter categories={categories} />
            </Suspense>
          </aside>

          {/* Sidebar Filters - Mobile Collapsible */}
          <aside className="lg:hidden w-full bg-background p-4 rounded-2xl border border-border/40 shadow-sm">
            <details className="group">
              <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                Filter by Category
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-open:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
              </summary>
              <div className="pt-4 mt-4 border-t border-border/40">
                <Suspense fallback={<div className="h-20 bg-muted animate-pulse rounded-xl" />}>
                  <CategoryFilter categories={categories} />
                </Suspense>
              </div>
            </details>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 w-full min-w-0">
            {products.length === 0 ? (
              <div className="text-center py-24 bg-background rounded-3xl border border-dashed border-border/60 p-8 space-y-3">
                <h3 className="text-xl font-bold text-gray-900">Coming Soon!</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  {searchParams.search 
                    ? `The product "${searchParams.search}" is not currently in our catalog, but it's coming soon! Our team is preparing this item.` 
                    : 'We are expanding our product catalog. Check back shortly!'}
                </p>
                <div className="pt-2">
                  <a href="/products" className="text-xs font-semibold bg-primary text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
                    Browse All Products
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  )
}
