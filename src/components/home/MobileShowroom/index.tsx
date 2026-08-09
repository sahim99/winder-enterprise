'use client'

import { useEffect, useState } from 'react'
import type { Product } from '@/types/supabase'
import { ProductCard } from '@/components/products/ProductCard'
import { ChevronDown } from 'lucide-react'

interface MobileShowroomProps {
  fashion: Product[]
  furniture: Product[]
  electronics: Product[]
  essentials: Product[]
}

export default function MobileShowroom({ fashion, furniture, electronics, essentials }: MobileShowroomProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate parallax and scale values
  // Max scale is 1.3, min is 1 (subtle, not too aggressive)
  const scale = Math.min(1 + scrollY * 0.0007, 1.3)
  
  // At scroll 100, doors start opening (0 to 100%)

  const doorOpen = Math.max(0, Math.min((scrollY - 150) * 0.4, 100))

  return (
    <div className="bg-gray-950 min-h-screen">
      {/* Sticky Hero Background */}
      <div className="fixed inset-0 w-full h-[100svh] z-0 overflow-hidden pointer-events-none flex items-center justify-center bg-black">
        {/* The Exterior Photo */}
        <div 
          className="absolute inset-0 w-full h-full transform origin-center transition-transform duration-75 ease-out"
          style={{ transform: `scale(${scale})` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/winder-shop-v3.png" 
            alt="Winder Enterprise Exterior" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Text overlay that fades out on scroll */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 transition-opacity duration-300"
          style={{ opacity: 1 - scrollY * 0.005 }}
        >
          <h1 className="text-4xl font-black tracking-tight text-center mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            WINDER ENTERPRISE
          </h1>
          <p className="text-lg font-medium drop-shadow-md">Style For Everyone</p>
          
          <div className="absolute bottom-20 animate-bounce flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest font-bold mb-2">Scroll to Enter</span>
            <ChevronDown className="h-6 w-6" />
          </div>
        </div>

        {/* CSS Glass Doors that slide open */}
        {scrollY > 50 && (
          <div className="absolute inset-0 z-10 flex">
            {/* Left Door */}
            <div 
              className="h-full bg-black/60 backdrop-blur-md border-r border-white/20 transition-transform duration-75 ease-out shadow-2xl"
              style={{ width: '50%', transform: `translateX(-${doorOpen}%)` }}
            />
            {/* Right Door */}
            <div 
              className="h-full bg-black/60 backdrop-blur-md border-l border-white/20 transition-transform duration-75 ease-out shadow-2xl"
              style={{ width: '50%', transform: `translateX(${doorOpen}%)` }}
            />
          </div>
        )}
      </div>

      {/* Content wrapper with margin-top to allow scrolling past the fixed background */}
      <div className="relative z-20 mt-[100svh] bg-gray-900 rounded-t-3xl border-t border-white/10 p-6 pt-12 space-y-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-widest uppercase mb-4 border border-white/20">
            Inside The Showroom
          </span>
          <h2 className="text-2xl font-bold text-white mb-2">Explore Departments</h2>
        </div>

        {/* Department Rows */}
        <DepartmentRow title="Fashion & Lifestyle" products={fashion} color="bg-blue-500" />
        <DepartmentRow title="Furniture & Home Décor" products={furniture} color="bg-amber-500" />
        <DepartmentRow title="Electronics & Appliances" products={electronics} color="bg-purple-500" />
        <DepartmentRow title="Home Essentials" products={essentials} color="bg-emerald-500" />

        <div className="py-12 text-center border-t border-white/10">
          <p className="text-gray-500 text-sm">End of Virtual Showroom</p>
        </div>
      </div>
    </div>
  )
}

function DepartmentRow({ title, products, color }: { title: string, products: Product[], color: string }) {
  if (!products || products.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${color} shadow-[0_0_10px_currentColor]`} />
        {title}
      </h3>
      {/* Horizontal scrolling row */}
      <div className="flex overflow-x-auto gap-4 pb-6 snap-x hide-scrollbar -mx-6 px-6">
        {products.map(product => (
          <div key={product.id} className="min-w-[260px] snap-center">
            {/* The ProductCard is designed for white backgrounds, so we wrap it in a div that controls its appearance */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
