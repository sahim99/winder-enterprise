'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Lock } from 'lucide-react'

const shopLinks = [
  { label: 'Sofas', slug: 'sofas' },
  { label: 'Beds', slug: 'beds' },
  { label: 'Chairs', slug: 'chairs' },
  { label: 'Tables', slug: 'tables' },
  { label: 'Wardrobes', slug: 'wardrobes' },
  { label: 'Dining Sets', slug: 'dining-sets' },
  { label: 'Office Chairs', slug: 'office-chairs' },
]

const customerLinks = [
  { label: 'My Account', href: '/account' },
  { label: 'My Orders', href: '/account/orders' },
  { label: 'Track Order', href: '/account/orders' },
]

export function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) return null
  if (pathname === '/login' || pathname === '/register') return null

  return (
    <footer className="bg-foreground text-background mt-20 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo + tagline */}
          <div>
            <h3 className="text-xl font-bold tracking-tighter mb-3 text-background">Winder Enterprise</h3>
            <p className="text-sm text-background/60 leading-relaxed">
              Premium furniture for every home.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-background/50">Shop</h3>
            <ul className="space-y-2.5 text-sm text-background/70">
              {shopLinks.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/products?category=${cat.slug}`} className="hover:text-background transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-background/50">Customer</h3>
            <ul className="space-y-2.5 text-sm text-background/70">
              {customerLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-background/50">Contact</h3>
            <ul className="space-y-2.5 text-sm text-background/70">
              <li>Durgapur, West Bengal</li>
              <li>+91 XXXXXXXXXX</li>
              <li>winderenterprise.admin@gmail.com</li>
            </ul>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 mt-4 text-xs text-gray-400 hover:text-gray-200 transition-colors border border-gray-700 rounded-md px-3 py-1.5"
            >
              <Lock className="h-3 w-3" />
              Admin login
            </Link>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-background/40">
          <div>© {new Date().getFullYear()} Winder Enterprise. All rights reserved.</div>
          <div className="flex gap-4">
            <span>Cash on delivery</span>
            <span>·</span>
            <span>Quality guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
