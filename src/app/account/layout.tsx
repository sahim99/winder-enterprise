'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from '@/app/actions/auth'

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

  async function handleSignOut() {
    await signOut()
  }

  return (
    <div className="bg-muted/10 min-h-[calc(100vh-4rem)] pt-4 md:pt-8 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Account Navigation Tabs */}
        <div className="bg-background rounded-2xl border border-border/40 shadow-sm p-1.5 flex items-center justify-between gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <nav className="flex items-center whitespace-nowrap gap-1">
            {accountLinks.map(link => {
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-xl transition-all shrink-0",
                    isActive 
                      ? "bg-foreground text-background shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Clean Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors shrink-0 ml-auto cursor-pointer"
            title="Sign out of your account"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>

        {/* Page Content */}
        <div className="bg-background rounded-3xl border border-border/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
