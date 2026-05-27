import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/products/ProductCard'
import { createClient } from '@/lib/supabase/server'

const categories = [
  { name: 'Sofas', slug: 'sofas', emoji: '🛋️' },
  { name: 'Beds', slug: 'beds', emoji: '🛏️' },
  { name: 'Chairs', slug: 'chairs', emoji: '🪑' },
  { name: 'Tables', slug: 'tables', emoji: '🪵' },
  { name: 'Wardrobes', slug: 'wardrobes', emoji: '🚪' },
  { name: 'Dining Sets', slug: 'dining-sets', emoji: '🍽️' },
  { name: 'Office Chairs', slug: 'office-chairs', emoji: '💼' },
]

async function getFeaturedProducts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(8)
  return data ?? []
}

export default async function HomePage() {
  const products = await getFeaturedProducts()

  return (
    <div>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Furniture that feels like home
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Handpicked quality furniture delivered to your door across West Bengal.
              Cash on delivery available.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className={cn(buttonVariants({ size: "lg" }), "bg-white text-gray-900 hover:bg-gray-100")}>
                Shop now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#categories" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "border-white text-white hover:bg-white hover:text-gray-900")}>
                Browse categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group flex flex-col items-center gap-2 rounded-xl border bg-white p-4 text-center transition-all hover:border-gray-900 hover:shadow-sm"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Latest arrivals</h2>
          <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>Products coming soon. Check back shortly!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section id="about" className="bg-gray-50 border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'Cash on delivery', desc: 'No online payment required. Pay when your furniture arrives.' },
              { title: 'Quality guaranteed', desc: 'Every piece is inspected before delivery to your home.' },
              { title: 'Local delivery', desc: 'We deliver across Durgapur and all of West Bengal. Winder Enterprise.' },
            ].map(item => (
              <div key={item.title} className="space-y-2">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
