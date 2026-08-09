import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, TrendingUp, Sparkles, Sofa, Bed, Tv } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/products/ProductCard'
import { createClient } from '@/lib/supabase/server'
import { HomeHero } from '@/components/home/HomeHero'
import { ProductMarquee } from '@/components/home/ProductMarquee'

async function getNewArrivals() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(8)
  return data ?? []
}

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
    newArrivals,
    trending,
    livingRoom,
    bedroom,
    appliances,
    categories
  ] = await Promise.all([
    getNewArrivals(),
    getTrendingProducts(),
    getCategoryShelf(['sofas', 'chairs', 'tables', 'office-chairs'], 4),
    getCategoryShelf(['beds', 'wardrobes', 'dining-sets'], 4),
    getCategoryShelf(['televisions', 'air-conditioners', 'refrigerators', 'washing-machines'], 4),
    getCategories()
  ])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-emerald-50/20">

      {/* Flipkart-Style Sliding Hero Banner */}
      <HomeHero />

      {/* Auto-Swapping New Arrivals Marquee */}
      <ProductMarquee products={newArrivals} />

      {/* Trust bar */}
      <section className="py-8 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 glass-card p-6 md:px-10">
            <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Guaranteed Assured shopping</span>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {[
                { label: "Cash on delivery", desc: "Pay at your doorstep" },
                { label: "Quality guaranteed", desc: "100% inspected timber" },
                { label: "West Bengal shipping", desc: "Free assembly in Jangipur" }
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 text-left glass px-4 py-2 rounded-full border border-border/60">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm leading-tight">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground font-medium leading-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Zone */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/15 dark:bg-primary/25 rounded-xl text-primary flex items-center justify-center shadow-sm">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Trending Now</h2>
          </div>
          <Link href="/products" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 group glass px-4 py-2 rounded-full">
            View All <ArrowRight className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        {trending.length === 0 ? (
          <div className="text-center py-16 bg-card border border-dashed border-border/60 rounded-3xl text-muted-foreground text-sm font-medium">
            New products are arriving shortly.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {trending.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Flagship Departments - Line-by-Line Shelves */}
      <div className="space-y-10 sm:space-y-16 pb-24">
        
        {/* Shelf 1: Living Room */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="rounded-3xl border border-border/50 bg-card/60 p-4 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/40">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-primary mb-1">
                  <Sofa className="h-3 w-3" /> Comfort Living
                </span>
                <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">Flagship Living Room</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Premium teak wood sofas, executive chairs, study desks, and center tables.</p>
              </div>
              <Link href="/products?category=sofas" className="text-xs font-semibold text-primary hover:underline px-4 py-2 rounded-full border border-border/60 bg-background/80 hidden sm:inline-flex">
                Explore sofas &rarr;
              </Link>
            </div>

            {livingRoom.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm italic">Items restocking soon.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {livingRoom.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Shelf 2: Bedroom */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="rounded-3xl border border-border/50 bg-card/60 p-4 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/40">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-primary mb-1">
                  <Bed className="h-3 w-3" /> Master Suites
                </span>
                <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">Royal Bedrooms</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Solid wood king-size beds, modular wardrobes, and ergonomic dressers.</p>
              </div>
              <Link href="/products?category=beds" className="text-xs font-semibold text-primary hover:underline px-4 py-2 rounded-full border border-border/60 bg-background/80 hidden sm:inline-flex">
                Explore beds &rarr;
              </Link>
            </div>

          {bedroom.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm italic">Items restocking soon.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {bedroom.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          </div>
        </section>

        {/* Shelf 3: Appliances */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="rounded-3xl border border-border/50 bg-card/60 p-4 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/40">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-primary mb-1">
                  <Tv className="h-3 w-3" /> Digital Living
                </span>
                <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-foreground">Smart Electronics & Appliances</h2>
                <p className="text-xs text-muted-foreground mt-0.5">High-definition 4K smart TVs, energy-efficient refrigerators, and audio setups.</p>
              </div>
              <Link href="/products?category=televisions" className="text-xs font-semibold text-primary hover:underline px-4 py-2 rounded-full border border-border/60 bg-background/80 hidden sm:inline-flex">
                Explore appliances &rarr;
              </Link>
            </div>

            {appliances.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm italic">Items restocking soon.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {appliances.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Visit Our Store Strip */}
      <section className="relative w-full py-16 md:py-24 bg-gray-950 dark:bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Left */}
            <div className="relative aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5">
              <Image 
                 src="/winder-shop-v3.png"
                 alt="Winder Enterprise Storefront"
                 fill
                 className="object-cover object-center"
                 sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Text Right */}
            <div className="space-y-6 text-white md:pl-8">
              <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-widest text-primary mb-1">
                Since 2010
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Visit Our Showroom</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Experience the craftsmanship firsthand. From premium timber selection to the final polish, Winder Enterprise has been defining modern living in Jangipur for over a decade. Come explore our exclusive collection of luxury furniture and smart home appliances.
              </p>
              <div className="pt-4">
                <Link href="/#contact" className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-gradient-to-r from-primary to-primary/80 shimmer text-white font-bold hover:shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-all text-sm uppercase tracking-wider hover:scale-105 active:scale-95">
                  Get Directions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
