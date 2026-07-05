'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
  }

  function prevSlide() {
    setActive((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  function nextSlide() {
    setActive((prev) => (prev + 1) % SLIDES.length)
  }

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] bg-gray-900 overflow-hidden flex items-center justify-center">
      
      {/* Floating Login Button (Only visible if logged out) */}
      {!user && (
        <div className="absolute top-6 right-6 z-30 flex items-center gap-4">
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-white text-gray-900 font-bold hover:bg-white/95 active:scale-95 transition-all text-xs uppercase tracking-wider shadow-lg"
          >
            Sign In / Login
          </Link>
        </div>
      )}

      {/* Background Slides */}
      {SLIDES.map((slide, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === active ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-gray-950/70 z-10" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
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

        {/* Central Search Bar */}
        <form 
          onSubmit={handleSearchSubmit} 
          className="max-w-2xl mx-auto flex items-center bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20 shadow-2xl focus-within:bg-white focus-within:text-gray-900 focus-within:border-primary transition-all duration-300 group"
        >
          <div className="flex-1 flex items-center pl-3">
            <Search className="h-5 w-5 text-white/60 group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search wood beds, teak sofas, televisions, washing machines..."
              className="w-full bg-transparent border-none outline-none pl-3 text-sm text-white placeholder-white/60 group-focus-within:text-gray-900 group-focus-within:placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            className="rounded-full px-6 h-11 text-xs font-bold uppercase shadow-md group-focus-within:bg-primary group-focus-within:text-white"
          >
            Find Product
          </Button>
        </form>

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
