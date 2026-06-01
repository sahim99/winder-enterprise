import { ProductFilters } from "@/components/product/ProductFilters"
import { ProductGrid } from "@/components/product/ProductGrid"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 0 // Dynamic rendering for search params

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : null
  
  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select(`*, categories(id, name, slug)`)
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (category && category !== 'all') {
    // First find category id
    const { data: catData } = await supabase.from('categories').select('id').eq('slug', category).single()
    if (catData) {
      query = query.eq('category_id', catData.id)
    }
  }

  const { data: products } = await query

  return (
    <div className="min-h-screen bg-[var(--color-deep-black)] pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeading 
          title={category ? `The ${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} Collection` : "The Complete Collection"} 
          subtitle="Discover pieces that define modern luxury."
          align="left"
        />

        <div className="flex flex-col md:flex-row gap-12 mt-16">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-32">
              <ProductFilters />
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <ProductGrid products={products || []} />
          </div>
        </div>
        
      </div>
    </div>
  )
}
