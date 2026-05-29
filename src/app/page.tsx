import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/products/ProductCard'
import { createClient } from '@/lib/supabase/server'

const categoryEmojis: Record<string, string> = {
  'sofas': '🛋️',
  'beds': '🛏️',
  'chairs': '🪑',
  'tables': '🪵',
  'wardrobes': '🚪',
  'dining-sets': '🍽️',
  'office-chairs': '💼',
}

async function getCategories() {
  const supabase = await createClient()
  const { data } = await supabase.from('categories').select('*').order('name')
  return data ?? []
}

async function getFeaturedProducts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(4)
  return data ?? []
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories()
  ])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1 - Hero */}
      <section className="relative bg-muted overflow-hidden flex items-center min-h-[100vh]">
        <div className="absolute inset-0 bg-gray-900/80 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop)' }}
        />
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl pt-20 pb-24 md:pt-32 md:pb-40">
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight text-white">
              Premium furniture for every home
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-lg leading-relaxed">
              Handcrafted quality. Delivered across West Bengal. Cash on delivery available.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 font-medium h-14 text-base")}>
                Shop now
              </Link>
              <Link href="#categories" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full px-8 font-medium h-14 text-base bg-transparent text-white border-white hover:bg-white/10 hover:text-white transition-all")}>
                View catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Trust bar */}
      <section className="py-6 border-b border-border/40 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            {[
              "Cash on delivery",
              "Quality guaranteed",
              "West Bengal delivery"
            ].map(item => (
              <div key={item} className="flex items-center gap-2 text-foreground font-medium text-sm md:text-base">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Category showcase */}
      <section id="categories" className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">Shop by category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center gap-4 rounded-2xl bg-muted/30 p-6 text-center transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1"
              >
                <div className="h-16 w-16 rounded-full bg-white shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {categoryEmojis[cat.slug] || '✨'}
                </div>
                <span className="text-sm font-semibold tracking-wide text-muted-foreground group-hover:text-foreground">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 - Featured products strip */}
      <section className="py-24 bg-muted/10 border-t border-border/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">Latest arrivals</h2>
            <Link href="/products" className="hidden sm:flex text-sm font-semibold text-primary hover:text-primary/80 items-center gap-1 group transition-colors">
              View all <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground font-medium">New collections are arriving soon. Please check back shortly!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center sm:hidden">
            <Link href="/products" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full w-full")}>
              View all
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5 - About / why us */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-muted/20 border border-border/50 rounded-3xl p-10 text-center transition-transform hover:-translate-y-1 duration-300">
              <h3 className="text-xl font-bold text-foreground mb-3">Family business</h3>
              <p className="text-muted-foreground leading-relaxed">Built from a passion for timeless design, Winder Enterprise has been serving homes with dedication and a personal touch.</p>
            </div>
            <div className="bg-muted/20 border border-border/50 rounded-3xl p-10 text-center transition-transform hover:-translate-y-1 duration-300">
              <h3 className="text-xl font-bold text-foreground mb-3">Quality first</h3>
              <p className="text-muted-foreground leading-relaxed">Every piece is meticulously inspected by our experts before delivery. We never compromise on craftsmanship.</p>
            </div>
            <div className="bg-muted/20 border border-border/50 rounded-3xl p-10 text-center transition-transform hover:-translate-y-1 duration-300">
              <h3 className="text-xl font-bold text-foreground mb-3">Local delivery</h3>
              <p className="text-muted-foreground leading-relaxed">Based in Durgapur, we ensure fast and reliable delivery to your doorstep anywhere across West Bengal.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
