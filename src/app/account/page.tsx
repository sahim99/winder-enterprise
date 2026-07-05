import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Package, User, MapPin, Heart, MessageSquare, ShoppingBag, Sparkles, Compass } from 'lucide-react'
import { RecentlyViewed } from '@/components/products/RecentlyViewed'
import { formatPrice } from '@/lib/utils'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch metrics in parallel
  const [
    { data: profile },
    { count: orderCount },
    { count: wishlistCount },
    { count: activeTickets }
  ] = await Promise.all([
    supabase.from('profiles').select('name').eq('id', user.id).single(),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
    supabase.from('wishlist_items').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
    supabase.from('support_tickets').select('*', { count: 'exact', head: true }).eq('user_id', user.id).neq('status', 'closed'),
  ])

  // Get active promo banners
  const promotions = [
    {
      title: 'Monsoon Furniture Clearance',
      description: 'Upgrade your living room with hand-crafted solid teak wood sofas. Flat 15% discount.',
      code: 'MONSOON15',
      color: 'from-blue-600 to-indigo-700',
    },
    {
      title: 'Local Assembly Guarantee',
      description: 'Get free professional home assembly across the Jangipur region for all wooden beds.',
      code: 'FREEINSTALL',
      color: 'from-amber-500 to-orange-600',
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white shadow-lg">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent hidden md:block" />
        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-primary/20 text-primary-foreground border border-primary/20 px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="h-3 w-3 animate-spin" /> Customer Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {profile?.name || user.email?.split('@')[0]}!
          </h2>
          <p className="text-gray-300 max-w-xl leading-relaxed text-sm">
            Track your shipping status, submit support tickets, manage delivery addresses, and browse personalized furniture or appliance catalogs.
          </p>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/account/orders" className="bg-white border rounded-2xl p-5 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">My Orders</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{orderCount || 0}</p>
          </div>
        </Link>

        <Link href="/account/wishlist" className="bg-white border rounded-2xl p-5 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 text-red-600">
            <Heart className="h-6 w-6 fill-current" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Saved Items</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{wishlistCount || 0}</p>
          </div>
        </Link>

        <Link href="/account/support" className="bg-white border rounded-2xl p-5 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0 text-yellow-600">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Active Tickets</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{activeTickets || 0}</p>
          </div>
        </Link>

        <Link href="/products" className="bg-white border rounded-2xl p-5 hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-600">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Explore Store</p>
            <p className="text-sm font-semibold text-purple-600 mt-0.5">Browse products</p>
          </div>
        </Link>
      </div>

      {/* Offers & Coupons Carousel Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> Active Offers & Promotional Codes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promotions.map((promo, idx) => (
            <div key={idx} className={`rounded-2xl border p-6 bg-gradient-to-br ${promo.color} text-white flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-all`}>
              <div className="space-y-2">
                <h4 className="font-bold text-lg leading-snug">{promo.title}</h4>
                <p className="text-xs text-white/80 leading-relaxed">{promo.description}</p>
              </div>
              <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-auto">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-white/90">
                  Promo Code: <span className="font-mono bg-white/20 px-2 py-0.5 rounded font-bold">{promo.code}</span>
                </div>
                <Link href="/products" className="text-xs font-semibold bg-white text-gray-900 px-3.5 py-1.5 rounded-full hover:bg-white/90 transition-colors">
                  Shop Deal
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Settings Shortcut Cards */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-bold text-gray-900">Manage Account</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/account/profile" className="group p-6 rounded-2xl border bg-background shadow-sm hover:shadow-md transition-all flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600 group-hover:scale-110 transition-transform">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">Profile Details</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">Update contact number, fullname, and security credentials.</p>
            </div>
          </Link>

          <Link href="/account/address" className="group p-6 rounded-2xl border bg-background shadow-sm hover:shadow-md transition-all flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600 group-hover:scale-110 transition-transform">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">Delivery Address</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">Add, edit, or delete shipping destinations for faster checkout.</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recently Viewed Products strip */}
      <RecentlyViewed />
    </div>
  )
}
