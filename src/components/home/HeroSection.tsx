"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { GoldButton } from "../ui/GoldButton"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[var(--color-deep-black)] flex items-center">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0 right-0 md:left-1/3"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-deep-black)] via-[var(--color-deep-black)]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-[var(--color-deep-black)]/40 z-10 md:hidden" />
        
        {/* We use a standard img tag here instead of next/image for simpler parallax transform on the wrapper, 
            but next/image with 'fill' and 'object-cover' works too if wrapped. */}
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400')" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 backdrop-blur-sm reveal-up visible stagger-1">
            <span className="text-[var(--color-gold)] text-xs tracking-wider uppercase font-medium">
              Now delivering across West Bengal
            </span>
          </div>

          <h1 className="flex flex-col gap-2 mb-6">
            <span className="font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--color-off-white)] leading-none reveal-up visible stagger-2">
              Crafted for
            </span>
            <span className="font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--color-gold)] italic leading-none reveal-up visible stagger-3">
              the Discerning
            </span>
            <span className="font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--color-off-white)] leading-none reveal-up visible stagger-4">
              Few.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-muted-foreground)] mb-10 max-w-md reveal-up visible stagger-5">
            Premium furniture for West Bengal's finest homes. Where every room tells a story.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 reveal-up visible" style={{ transitionDelay: '0.6s' }}>
            <GoldButton size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/products">Explore Collection</Link>
            </GoldButton>
            <Link 
              href="/#about" 
              className="text-[var(--color-off-white)] uppercase tracking-widest text-sm font-medium hover:text-[var(--color-gold)] transition-colors relative group"
            >
              Our Story
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 reveal-fade visible" style={{ transitionDelay: '1s' }}>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted-foreground)]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-gold)] to-transparent overflow-hidden">
          <div className="w-full h-full bg-[var(--color-off-white)] animate-bounce" />
        </div>
      </div>
    </section>
  )
}
