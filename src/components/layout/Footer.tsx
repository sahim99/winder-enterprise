'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Lock, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'

const shopLinks = [
  { label: 'Sofas & Seating', slug: 'sofas' },
  { label: 'Premium Beds', slug: 'beds' },
  { label: 'Chairs', slug: 'chairs' },
  { label: 'Center Tables', slug: 'tables' },
  { label: 'Wardrobes', slug: 'wardrobes' },
  { label: 'Dining Sets', slug: 'dining-sets' },
  { label: 'Office Chairs', slug: 'office-chairs' },
]

const customerLinks = [
  { label: 'My Account', href: '/account' },
  { label: 'Order History', href: '/account/orders' },
  { label: 'Track Order', href: '/account/orders' },
  { label: 'Returns & Refunds', href: '/#support' },
  { label: 'Contact Support', href: '/#support' },
]

export function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) return null
  if (pathname?.startsWith('/account')) return null
  if (pathname === '/login' || pathname === '/register' || pathname === '/checkout') return null

  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-white/10 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Newsletter / Tagline */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-12 border-b border-white/10 gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Join the Winder family.</h2>
            <p className="text-gray-400 text-sm">Sign up to get the latest on sales, new releases, and expert design advice.</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full md:w-auto items-center gap-2">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-white/5 border border-white/10 rounded-full px-4 h-10 text-sm w-full md:w-72 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-500"
            />
            <Button className="rounded-full h-10 px-6 font-semibold bg-white text-black hover:bg-gray-200 transition-colors w-full sm:w-auto">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black tracking-tighter text-white">WINDER</h3>
              <p className="text-xs tracking-[0.2em] text-gray-500 font-bold uppercase mt-1">Enterprise</p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Mastercrafted timber furniture and premium smart home appliances. Defining modern living across West Bengal since 2010.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-6 text-gray-300">Shop Collection</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {shopLinks.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/products?category=${cat.slug}`} className="hover:text-white transition-colors relative group inline-block">
                    {cat.label}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-6 text-gray-300">Customer Care</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {customerLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors relative group inline-block">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-6 text-gray-300">Get in Touch</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                <span>Jangipur, Murshidabad<br/>West Bengal, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-500 shrink-0" />
                <span>+91 90000 00000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500 shrink-0" />
                <span>contact@winderenterprise.com</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-white transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5"
              >
                <Lock className="h-3.5 w-3.5" />
                Admin Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section: Trust Badges & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col-reverse lg:flex-row justify-between items-center gap-6">
          <div className="text-xs text-gray-500 flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <span>© {new Date().getFullYear()} Winder Enterprise. All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10">
              <Truck className="h-3.5 w-3.5 text-gray-400" /> Cash on Delivery
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10">
              <ShieldCheck className="h-3.5 w-3.5 text-gray-400" /> Quality Guaranteed
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
