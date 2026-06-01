import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background border-t border-[var(--color-gold)]/10 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1 mb-6">
              <span className="font-serif text-2xl tracking-[0.2em] text-[var(--color-off-white)] uppercase">
                Winder
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] mb-1"></span>
            </Link>
            <p className="text-[var(--color-muted-foreground)] font-serif italic text-lg mb-6 max-w-xs">
              "Where Every Room Tells a Story"
            </p>
            <p className="text-sm text-[var(--color-muted-foreground)]/80 max-w-xs leading-relaxed">
              Premium home and office furniture, curated for the discerning few.
              Delivering excellence across West Bengal.
            </p>
          </div>

          <div>
            <h4 className="text-[var(--color-off-white)] font-semibold tracking-wider uppercase text-sm mb-6">Shop</h4>
            <ul className="space-y-4">
              {['Sofas', 'Beds', 'Chairs', 'Tables', 'Wardrobes', 'Office'].map((item) => (
                <li key={item}>
                  <Link href={`/products?category=${item.toLowerCase()}`} className="text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--color-off-white)] font-semibold tracking-wider uppercase text-sm mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/account" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] transition-colors text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] transition-colors text-sm">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] transition-colors text-sm">
                  Shipping & COD
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--color-off-white)] font-semibold tracking-wider uppercase text-sm mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-[var(--color-muted-foreground)]">
              <li>Durgapur, West Bengal</li>
              <li>India</li>
              <li className="pt-2">
                <a href="mailto:contact@winderenterprise.com" className="hover:text-[var(--color-gold)] transition-colors">
                  contact@winderenterprise.com
                </a>
              </li>
              <li>
                <a href="tel:+91XXXXXXXXXX" className="hover:text-[var(--color-gold)] transition-colors">
                  +91 XXXXXXXXXX
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-8">
              <a href="#" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[var(--color-gold)]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-muted-foreground)]/60">
            &copy; {new Date().getFullYear()} Winder Enterprise, Durgapur. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[var(--color-muted-foreground)]/60">
            <Link href="/privacy" className="hover:text-[var(--color-gold)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--color-gold)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
