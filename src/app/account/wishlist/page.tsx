import { createClient } from '@/lib/supabase/server'
import { ProductCard } from '@/components/products/ProductCard'
import { HeartCrack } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default async function WishlistPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null // Layout handles redirect
  }

  // Fetch wishlist items with their associated products
  const { data: wishlistItems, error } = await supabase
    .from('wishlist_items')
    .select('*, products(*, categories(name, slug))')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const products = wishlistItems?.map(item => item.products) || []

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">My Wishlist</h2>
        <p className="text-muted-foreground mt-1">
          {products.length} {products.length === 1 ? 'item' : 'items'} saved for later.
        </p>
      </div>

      {error ? (
        <div className="p-4 bg-destructive/10 text-destructive rounded-xl border border-destructive/20 text-sm font-medium">
          Error loading wishlist. Have you applied the database migrations? ({error.message})
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 border border-dashed rounded-3xl">
          <HeartCrack className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Save items you like by clicking the heart icon on any product.
          </p>
          <Link href="/products" className={buttonVariants({ variant: 'default' })}>Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
