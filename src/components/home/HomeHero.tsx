'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SLIDES = [
  {
    title: 'Solid Teak Wood Furniture',
    subtitle: 'Handcrafted in Jangipur. Built for Generations.',
    tag: '15% Off Monsoon Sale',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Smart Home Appliances',
    subtitle: 'Flagship Climate Control and Premium Entertainment Systems.',
    tag: 'Free Local Delivery',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Jangipur Legacy Woodworks',
    subtitle: 'Meticulous Mortise & Tenon Joinery with Professional Assembly.',
    tag: 'Zero Installation Fee',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
  }
]

export function HomeHero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  function prevSlide() {
    setActive((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  function nextSlide() {
    setActive((prev) => (prev + 1) % SLIDES.length)
  }

  return (
    <section className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] bg-gray-900 overflow-hidden flex items-center justify-center">

      {/* Background Slides */}
      {SLIDES.map((slide, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === active ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <Image 
             src={slide.image}
             alt={slide.title}
             fill
             className="object-cover"
             sizes="100vw"
             priority={idx === 0}
          />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center space-y-8 text-white mt-10">
        
        {/* Banner Tag */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground border border-white/10 text-xs font-bold uppercase tracking-wider animate-bounce">
          <Sparkles className="h-3.5 w-3.5" />
          {SLIDES[active].tag}
        </div>

        {/* Slided Titles */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] drop-shadow-md">
            {SLIDES[active].title}
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium">
            {SLIDES[active].subtitle}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Link href="/products" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95">
            Shop Now
          </Link>
        </div>

      </div>

      {/* Manual Slides Navigation */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/25 hover:bg-black/40 text-white backdrop-blur-sm transition-all focus:outline-none hidden sm:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/25 hover:bg-black/40 text-white backdrop-blur-sm transition-all focus:outline-none hidden sm:flex"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
        {SLIDES.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setActive(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === active ? 'w-8 bg-primary' : 'w-2.5 bg-white/40'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  )
}
