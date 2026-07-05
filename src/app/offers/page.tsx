import type { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, Gift, Flame, ArrowRight, ShieldCheck } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = { title: 'Special Offers & Coupons — Winder Enterprise' }

export default function OffersPage() {
  const deals = [
    {
      title: 'Monsoon Celebration Furniture Sale',
      description: 'Get premium solid teak wood sofas, dining tables, and beds at unparalleled pricing. Meticulously handcrafted in Jangipur.',
      discount: 'Flat 15% OFF',
      code: 'MONSOON15',
      badge: 'Limited Time',
      badgeColor: 'bg-red-100 text-red-800',
      icon: Flame,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'Free Professional Home Assembly',
      description: 'Zero hassle setup. Our local expert carpenters will assemble and install your solid timber beds, wardrobes, and sets for free.',
      discount: 'FREE Setup & Shipping',
      code: 'FREEINSTALL',
      badge: 'Jangipur Special',
      badgeColor: 'bg-green-100 text-green-800',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Smart Television Discount',
      description: 'Upgrade your living room experience with high-definition smart TVs. Free delivery and brand warranty included.',
      discount: 'Flat ₹2,500 OFF',
      code: 'SMARTTV25',
      badge: 'Electronics Deal',
      badgeColor: 'bg-purple-100 text-purple-800',
      icon: Gift,
      color: 'from-purple-600 to-pink-600',
    }
  ]

  return (
    <div className="bg-muted/10 min-h-[calc(100vh-4rem)] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Exclusive Discounts
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Active Offers & Promo Codes</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Copy active promotional codes to apply during checkout. COD and premium delivery available across West Bengal.
          </p>
        </div>

        {/* Deals list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => {
            const Icon = deal.icon
            return (
              <div 
                key={deal.code} 
                className="bg-white rounded-3xl border border-border/50 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className={`p-6 bg-gradient-to-r ${deal.color} text-white space-y-4`}>
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-gray-900`}>
                      {deal.badge}
                    </span>
                    <Icon className="h-6 w-6 opacity-80" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{deal.discount}</h3>
                    <p className="text-xs text-white/80 mt-1">On selected items</p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 leading-snug">{deal.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{deal.description}</p>
                  </div>

                  <div className="space-y-4 pt-4 border-t mt-auto">
                    <div className="flex justify-between items-center bg-muted/40 p-3 rounded-2xl border border-border/20">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase">Promo Code</span>
                      <span className="font-mono text-sm font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-lg">
                        {deal.code}
                      </span>
                    </div>
                    <Link 
                      href="/products" 
                      className={buttonVariants({ className: 'w-full rounded-full h-11 text-xs font-semibold' })}
                    >
                      Shop catalog <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
