'use client'

import { useEffect, useState } from 'react'
import type { Product } from '@/types/supabase'
import { ProductCard } from '@/components/products/ProductCard'
import { ChevronDown, Sparkles, Sofa, Bed, Tv, PackageCheck } from 'lucide-react'
import { VirtualShowroomPanel } from '../VirtualShowroomPanel'

interface MobileShowroomProps {
  fashion: Product[]
  furniture: Product[]
  electronics: Product[]
  essentials: Product[]
}

export default function MobileShowroom({ fashion, furniture, electronics, essentials }: MobileShowroomProps) {
  const [scrollY, setScrollY] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scale = Math.min(1 + scrollY * 0.0006, 1.25)
  const doorOpen = Math.max(0, Math.min((scrollY - 100) * 0.5, 100))

  return (
    <div className="bg-gray-950 min-h-screen text-white select-none">
      {/* Hero Exterior Background */}
      <div className="fixed inset-0 w-full h-[100svh] z-0 overflow-hidden pointer-events-none flex items-center justify-center bg-black">
        <div 
          className="absolute inset-0 w-full h-full transform origin-center transition-transform duration-75 ease-out"
          style={{ transform: `scale(${scale})` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/winder-shop-v3.png" 
            alt="Winder Enterprise Storefront" 
            className="w-full h-full object-cover opacity-85"
          />
        </div>

        {/* Floating Hero Text */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 transition-opacity duration-300"
          style={{ opacity: 1 - scrollY * 0.005 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-amber-300 mb-3 shadow-lg">
            <Sparkles className="h-3.5 w-3.5" /> Virtual Showroom
          </div>
          <h1 className="text-4xl font-black tracking-tight text-center mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            WINDER ENTERPRISE
          </h1>
          <p className="text-sm font-medium text-gray-200 drop-shadow-md">Swipe & Explore Our Collections</p>
          
          <div className="absolute bottom-20 animate-bounce flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest font-bold mb-1.5 text-white/80">Scroll to Enter</span>
            <ChevronDown className="h-5 w-5 text-amber-400" />
          </div>
        </div>

        {/* Sliding Glass Doors */}
        {scrollY > 40 && (
          <div className="absolute inset-0 z-10 flex">
            <div 
              className="h-full bg-black/70 border-r border-white/20 transition-transform duration-75 ease-out shadow-2xl"
              style={{ width: '50%', transform: `translateX(-${doorOpen}%)` }}
            />
            <div 
              className="h-full bg-black/70 border-l border-white/20 transition-transform duration-75 ease-out shadow-2xl"
              style={{ width: '50%', transform: `translateX(${doorOpen}%)` }}
            />
          </div>
        )}
      </div>

      {/* Showroom Content */}
      <div className="relative z-20 mt-[100svh] bg-gradient-to-b from-gray-950 via-gray-900 to-black rounded-t-3xl border-t border-white/15 p-4 pt-10 space-y-10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        <div className="text-center space-y-2">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-extrabold tracking-widest uppercase border border-amber-500/30">
            Interactive Catalog
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white">Explore Departments</h2>
          <p className="text-xs text-gray-400">Tap any item for instant 3D product view & quick checkout</p>
        </div>

        {/* Department Rows */}
        <DepartmentRow 
          title="Living Room & Sofas" 
          icon={<Sofa className="h-4 w-4 text-amber-400" />} 
          products={fashion} 
          onSelect={setSelectedProduct} 
        />

        <DepartmentRow 
          title="Bedroom & Dining" 
          icon={<Bed className="h-4 w-4 text-purple-400" />} 
          products={furniture} 
          onSelect={setSelectedProduct} 
        />

        <DepartmentRow 
          title="Televisions & Appliances" 
          icon={<Tv className="h-4 w-4 text-blue-400" />} 
          products={electronics} 
          onSelect={setSelectedProduct} 
        />

        <DepartmentRow 
          title="Home Decor & Essentials" 
          icon={<PackageCheck className="h-4 w-4 text-emerald-400" />} 
          products={essentials} 
          onSelect={setSelectedProduct} 
        />

        <div className="py-10 text-center border-t border-white/10">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">End of Virtual Showroom</p>
        </div>
      </div>

      {/* Product Drawer Panel */}
      {selectedProduct && (
        <VirtualShowroomPanel 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  )
}

function DepartmentRow({ 
  title, 
  icon, 
  products, 
  onSelect 
}: { 
  title: string
  icon: React.ReactNode
  products: Product[]
  onSelect: (p: Product) => void
}) {
  if (!products || products.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <span className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">
          {products.length} Items
        </span>
      </div>
      
      {/* Horizontal Swipe Row */}
      <div className="flex overflow-x-auto gap-3.5 pb-4 snap-x hide-scrollbar -mx-4 px-4">
        {products.map(product => (
          <div key={product.id} className="min-w-[240px] snap-start">
            <div 
              onClick={() => onSelect(product)}
              className="bg-white/95 rounded-2xl overflow-hidden shadow-xl border border-white/20 active:scale-98 transition-transform cursor-pointer"
            >
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
