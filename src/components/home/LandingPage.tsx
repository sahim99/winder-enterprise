'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp, Sofa, ChevronDown, Shirt, Tv, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/ProductCard'
import type { Product } from '@/types/supabase'

interface LandingPageProps {
  trending?: Product[]
  livingRoom?: Product[]
}

export function LandingPage({ trending = [], livingRoom = [] }: LandingPageProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. Minimal Auth Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-950/90 backdrop-blur-md shadow-lg py-3' : 'bg-gradient-to-b from-black/50 to-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-white">WINDER</span>
            <span className="text-sm tracking-widest text-white/70 uppercase hidden sm:inline-block">Enterprise</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 rounded-full font-semibold">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white text-black hover:bg-gray-200 rounded-full font-semibold">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Premium Shop Showcase Hero */}
      <section className="relative w-full pt-[80px] lg:pt-[100px] pb-12 lg:pb-20 overflow-hidden bg-gray-950 flex items-center min-h-[70vh]">
        {/* Blurred Background Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/shop-photo.png" 
            alt="Background blur" 
            className="w-full h-full object-cover blur-3xl opacity-40 scale-110"
          />
          {/* Gradient overlay: dark on left for text readability, clear on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />
        </div>
        
        {/* Content Layer */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Text and CTA */}
            <div className="text-white space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] animate-fade-in-up delay-100">
                Style For <br className="hidden lg:block" /> Everyone.
              </h1>
              <p className="text-gray-300 font-medium text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200">
                Serving Jangipur & West Bengal since 2010. Experience premium handcrafted quality and smart living essentials all under one roof.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 animate-fade-in-up delay-300">
                <Link href="/register">
                  <Button size="lg" className="rounded-full px-10 font-bold bg-white text-black hover:bg-gray-200 h-14 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-base">
                    Sign Up & Shop
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" className="rounded-full px-10 font-bold bg-transparent border border-white/20 text-white hover:bg-white/10 hover:text-white h-14 w-full sm:w-auto hover:-translate-y-0.5 transition-all text-base backdrop-blur-md">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side: Crisp Foreground Image */}
            <div className="flex justify-center lg:justify-end perspective-1000 animate-slide-in-right delay-200">
              <img 
                src="/shop-photo.png" 
                alt="Winder Enterprise Shop" 
                className="w-full max-w-2xl h-auto object-contain rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transform hover:scale-[1.02] hover:-rotate-1 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick-Stats Strip */}
      <section className="bg-gray-950 border-t border-gray-900 py-8 relative z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-800">
            {[
              { stat: "15+", label: "Years Experience" },
              { stat: "500+", label: "Premium Products" },
              { stat: "100%", label: "Quality Inspected" },
              { stat: "COD", label: "Cash on Delivery" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-center px-4">
                <span className="text-3xl font-black text-white mb-1">{item.stat}</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Category Showcase Cards */}
      <section className="py-24 bg-gray-50 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">Explore Our Departments</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Everything you need to furnish and upgrade your home, carefully curated for lasting quality.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Fashion & Lifestyle", icon: <Shirt className="w-6 h-6" />, link: "/login", color: "bg-blue-50 text-blue-600 border-blue-100" },
              { title: "Furniture & Home Décor", icon: <Sofa className="w-6 h-6" />, link: "/login", color: "bg-amber-50 text-amber-600 border-amber-100" },
              { title: "Electronics & Appliances", icon: <Tv className="w-6 h-6" />, link: "/login", color: "bg-purple-50 text-purple-600 border-purple-100" },
              { title: "Home Essentials", icon: <Package className="w-6 h-6" />, link: "/login", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
            ].map((cat, i) => (
              <Link href={cat.link} key={i} className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl ${cat.color} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
                <p className="text-sm font-semibold text-gray-400 group-hover:text-gray-600 flex items-center gap-1 transition-colors">
                  Shop now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trending Products */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-white">
        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Trending Now</h2>
          </div>
          <Link href="/login" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 group">
            Sign in to view all <ArrowRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        {trending.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-200 rounded-3xl text-gray-400 text-sm font-medium">
            New products are arriving shortly.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trending.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 6. Flagship Living Room */}
      <section className="bg-gray-50 py-24 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-4">
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-primary mb-1">
                <Sofa className="h-3 w-3" /> Comfort Living
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Flagship Living Room</h2>
            </div>
            <Link href="/login" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 group hidden sm:flex">
              Explore all furniture <ArrowRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {livingRoom.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm italic">Items restocking soon.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {livingRoom.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-10 flex justify-center sm:hidden">
            <Link href="/login">
              <Button variant="outline" className="rounded-full px-8">Explore all furniture</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Brand Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-primary">
              <Sparkles className="h-4 w-4" /> Winder Legacy
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Handcrafted Timber & Modern Living
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Winder Enterprise began in a modest wood shop in Jangipur, West Bengal, driven by a simple goal: to design timber furniture that lasts for generations. Using locally sourced premium hardwoods like solid Teak, Sal, and Mahogany, our local master carpenters employ traditional joinery techniques paired with beautiful modern finishes.
              </p>
              <p>
                Over the years, we have expanded our dedication to help build modern households. Today, we bring that same rigorous standard of quality check to essential home appliances and televisions, ensuring families throughout West Bengal have access to the finest living room setups, kitchen appliances, and climate systems.
              </p>
            </div>
            <div className="pt-4">
              <Link href="/register">
                <Button size="lg" className="rounded-full px-8 text-base">Join the Family</Button>
              </Link>
            </div>
          </div>
          
          <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <img 
              src="/winder_showroom.jpg" 
              alt="Winder Enterprise Modern Showroom Storefront" 
              className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-1000" 
            />
          </div>
        </div>
      </section>

      {/* 8. Final CTA Banner */}
      <section className="bg-gray-950 text-white py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20" />
        <div className="max-w-3xl mx-auto px-4 space-y-10 relative z-10">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">Ready to furnish your dream home?</h2>
          <p className="text-gray-300 text-xl font-medium max-w-2xl mx-auto">Join thousands of satisfied customers across West Bengal who have chosen Winder Enterprise for quality and trust.</p>
          <div className="pt-4 flex justify-center">
            <Link href="/register" className="inline-block">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full h-16 px-12 text-lg font-bold shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all hover:-translate-y-1">
                Create Your Account Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  )
}
