"use client"

import { useScrollReveal } from "@/hooks/useScrollReveal"
import { AnimatedCounter } from "../ui/AnimatedCounter"
import { cn } from "@/lib/utils"

export function StatsSection() {
  const { ref, isVisible } = useScrollReveal()

  const stats = [
    { value: 500, suffix: '+', label: 'Happy Customers' },
    { value: 50, suffix: '+', label: 'Product Designs' },
    { value: 5, suffix: '', label: 'Years of Excellence' },
    { value: 100, suffix: '%', label: 'COD Available' },
  ]

  return (
    <section className="py-24 bg-[var(--color-cream)] border-y border-[var(--color-gold)]/30" ref={ref as any}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div 
              key={stat.label} 
              className={cn("flex flex-col items-center gap-2 reveal-up", isVisible && "visible")}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="font-serif text-5xl md:text-6xl text-[var(--color-gold-dark)]">
                {isVisible ? (
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2500} />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <p className="text-sm md:text-base font-medium tracking-widest uppercase text-[var(--color-warm-gray)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
