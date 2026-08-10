import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { NavbarWrapper } from '@/components/layout/NavbarWrapper'
import { Toaster } from '@/components/ui/sonner'
import { PromoBannerWrapper } from '@/components/layout/PromoBannerWrapper'
import { ThemeProvider } from '@/components/theme-provider'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { AuthProvider } from '@/providers/AuthProvider'

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthProvider>
          <Suspense fallback={null}>
            <PromoBannerWrapper />
          </Suspense>
          <Suspense fallback={null}>
            <NavbarWrapper />
          </Suspense>
          <main className="min-h-screen pb-16 md:pb-0">{children}</main>
          <MobileBottomNav />
          <Toaster />
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
