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
  const pathname = usePathname()

  return (
    <div className="bg-muted/10 min-h-[calc(100vh-4rem)] pt-4 md:pt-8 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Account Navigation Tabs */}
        <div className="bg-background rounded-2xl border border-border/40 shadow-sm overflow-hidden">
          <nav className="flex items-center overflow-x-auto whitespace-nowrap p-1 gap-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {accountLinks.map(link => {
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn(
                    "px-4 py-2.5 text-sm font-medium rounded-xl transition-colors shrink-0",
                    isActive 
                      ? "bg-gray-900 text-white shadow-sm" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Page Content */}
        <div className="bg-background rounded-3xl border border-border/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
