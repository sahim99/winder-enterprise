'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const accountLinks = [
  { label: 'Overview', href: '/account' },
  { label: 'My Orders', href: '/account/orders' },
  { label: 'Wishlist', href: '/account/wishlist' },
  { label: 'Payment Methods', href: '/account/payment' },
  { label: 'Saved Address', href: '/account/address' },
  { label: 'Security & Settings', href: '/account/security' },
  { label: 'Help & Support', href: '/account/support' },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/10 min-h-[calc(100vh-4rem)] pt-8 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="bg-background rounded-3xl border border-border/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
