import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { formatPrice } from "@/lib/utils"
import { ProductImageGallery } from "@/components/product/ProductImageGallery"
import { AddToCartButton } from "@/components/product/AddToCartButton"
import Link from "next/link"

export const revalidate = 60 // Cache for 60 seconds

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select(`*, categories(id, name, slug)`)
    .eq('slug', resolvedParams.slug)
    .single()

  if (!product || !product.is_published) {
    notFound()
  }

  // Fetch related products
  let relatedProducts = []
  if (product.category_id) {
    const { data } = await supabase
      .from('products')
      .select('id, name, slug, price, images, compare_price')
      .eq('category_id', product.category_id)
      .neq('id', product.id)
      .limit(4)
    relatedProducts = data || []
  }

  return (
    <div className="min-h-screen bg-[var(--color-deep-black)] pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] mb-8">
          <Link href="/" className="hover:text-[var(--color-gold)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[var(--color-gold)] transition-colors">Collection</Link>
          <span>/</span>
          {product.categories && (
            <>
              <Link href={`/products?category=${product.categories.slug}`} className="hover:text-[var(--color-gold)] transition-colors">
                {product.categories.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[var(--color-off-white)] truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <div className="reveal-up visible">
            <ProductImageGallery images={product.images || []} alt={product.name} />
          </div>

          {/* Details */}
          <div className="flex flex-col reveal-up visible" style={{ transitionDelay: '200ms' }}>
            <span className="text-sm uppercase tracking-widest text-[var(--color-gold)] mb-4">
              {product.categories?.name || 'Premium Furniture'}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-off-white)] mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-[var(--color-gold)]/10">
              <span className="text-3xl text-[var(--color-gold)]">{formatPrice(product.price)}</span>
              {product.compare_price && product.compare_price > product.price && (
                <span className="text-xl text-[var(--color-muted-foreground)] line-through mb-1">
                  {formatPrice(product.compare_price)}
                </span>
              )}
            </div>

            <div className="prose prose-invert prose-p:text-[var(--color-muted-foreground)] prose-p:leading-relaxed mb-12">
              <p>{product.description || 'No description available for this masterpiece.'}</p>
            </div>

            <AddToCartButton product={product} />

            <div className="mt-12 pt-8 border-t border-[var(--color-gold)]/10 text-sm text-[var(--color-muted-foreground)] space-y-4">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                Delivery exclusively across West Bengal.
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                100% Cash on Delivery available.
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                Premium white-glove installation included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
