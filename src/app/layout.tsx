import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { NavbarWrapper } from '@/components/layout/NavbarWrapper'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/sonner'
import { PromoBannerWrapper } from '@/components/layout/PromoBannerWrapper'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: { default: 'Winder Enterprise', template: '%s | Winder Enterprise' },
  description: 'Premium furniture store in Jangipur, West Bengal. Shop sofas, beds, chairs, office furniture and more. Cash on delivery available.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          <PromoBannerWrapper />
        </Suspense>
        <Suspense fallback={null}>
          <NavbarWrapper />
        </Suspense>
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
