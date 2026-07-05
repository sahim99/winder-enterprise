import Link from 'next/link'
import { ArrowRight, CheckCircle2, TrendingUp, Sparkles, Sofa, Bed, Tv } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/products/ProductCard'
import { createClient } from '@/lib/supabase/server'
import { HomeHero } from '@/components/home/HomeHero'

async function getCategories() {
  const supabase = await createClient()
  const { data } = await supabase.from('categories').select('*').order('name')
  return data ?? []
}

async function getTrendingProducts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_published', true)
    .order('stock', { ascending: false }) // Trending mock
    .limit(4)
  return data ?? []
}

async function getCategoryShelf(categorySlugs: string[], limit = 4) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*, categories!inner(name, slug)')
    .eq('is_published', true)
    .in('categories.slug', categorySlugs)
    .order('created_at', { ascending: false })
    .limit(limit)
  return data ?? []
}

export default async function HomePage() {
  const [
    trending,
    livingRoom,
    bedroom,
    appliances,
    categories
  ] = await Promise.all([
    getTrendingProducts(),
    getCategoryShelf(['sofas', 'chairs', 'tables', 'office-chairs'], 4),
    getCategoryShelf(['beds', 'wardrobes', 'dining-sets'], 4),
    getCategoryShelf(['televisions', 'air-conditioners', 'refrigerators', 'washing-machines'], 4),
    getCategories()
  ])

  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      
      {/* Flipkart-Style Sliding Hero Banner */}
      <HomeHero />

      {/* Trust bar */}
      <section className="py-5 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Guaranteed Assured shopping</span>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {[
                { label: "Cash on delivery", desc: "Pay at your doorstep" },
                { label: "Quality guaranteed", desc: "100% inspected timber" },
                { label: "West Bengal shipping", desc: "Free assembly in Jangipur" }
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2.5 text-left">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Zone */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending Now</h2>
          </div>
          <Link href="/products" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 group">
            View All <ArrowRight className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        {trending.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed rounded-3xl text-gray-400 text-sm font-medium">
            New products are arriving shortly.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Flagship Departments - Line-by-Line Shelves */}
      <div className="space-y-16 pb-24">
        
        {/* Shelf 1: Living Room */}
        <section className="bg-white py-16 border-t border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 border-b pb-4">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-primary mb-1">
                  <Sofa className="h-3 w-3" /> Comfort Living
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Flagship Living Room</h2>
                <p className="text-xs text-gray-500 mt-1">Premium teak wood sofas, executive chairs, study desks, and center tables.</p>
              </div>
              <Link href="/products?category=sofas" className="text-xs font-semibold text-primary hover:underline">
                Explore sofas &rarr;
              </Link>
            </div>

            {livingRoom.length === 0 ? (
              <div className="text-center py-16 text-gray-400 text-sm italic">Items restocking soon.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {livingRoom.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Shelf 2: Bedroom */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-primary mb-1">
                <Bed className="h-3 w-3" /> Restful Space
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Royal Bedrooms</h2>
              <p className="text-xs text-gray-500 mt-1">Solid mahogany beds, spacious wardrobes, dressers, and custom dining sets.</p>
            </div>
            <Link href="/products?category=beds" className="text-xs font-semibold text-primary hover:underline">
              Explore beds &rarr;
            </Link>
          </div>

          {bedroom.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm italic">Items restocking soon.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bedroom.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Shelf 3: Appliances */}
        <section className="bg-white py-16 border-t border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 border-b pb-4">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-primary mb-1">
                  <Tv className="h-3 w-3" /> Modern Home
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Smart Electronics & Appliances</h2>
                <p className="text-xs text-gray-500 mt-1">Advanced televisions, high-cooling air conditioners, climate systems, and washing machines.</p>
              </div>
              <Link href="/products?category=televisions" className="text-xs font-semibold text-primary hover:underline">
                Explore appliances &rarr;
              </Link>
            </div>

            {appliances.length === 0 ? (
              <div className="text-center py-16 text-gray-400 text-sm italic">Items restocking soon.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {appliances.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Legacy & History Segment */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-1 text-xs uppercase font-bold tracking-widest text-primary">
                <Sparkles className="h-3 w-3" /> Winder Legacy
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
                Our Legacy of Handcrafted Timber & Modern Living
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Winder Enterprise began in a modest wood shop in Jangipur, West Bengal, driven by a simple goal: to design timber furniture that lasts for generations. Using locally sourced premium hardwoods like solid Teak, Sal, and Mahogany, our local master carpenters employ traditional joinery techniques paired with beautiful modern finishes.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Over the years, we have expanded our dedication to help build modern households. Today, we bring that same rigorous standard of quality check to essential home appliances and televisions, ensuring families throughout West Bengal have access to the finest living room setups, kitchen appliances, and climate systems.
              </p>
            </div>
            
            <div className="relative aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden bg-muted shadow-md group">
              <div className="absolute inset-0 bg-gray-950/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src="/winder_showroom.jpg" 
                alt="Winder Enterprise Modern Showroom Storefront" 
                className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
