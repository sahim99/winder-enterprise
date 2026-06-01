'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const accountLinks = [
  { label: 'My Profile', href: '/account/profile' },
  { label: 'My Orders', href: '/account/orders' },
  { label: 'Saved Address', href: '/account/address' },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login?redirect=/account')
        return
      }
      setChecked(true)
    })
  }, [router])

  if (!checked) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-foreground mb-8">My Account</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar / top tabs */}
        <nav className="flex md:flex-col gap-2 md:w-52 flex-shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {accountLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap text-sm font-medium px-4 py-2.5 rounded-lg transition-all",
                pathname === link.href
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  )
}
