"use client"

import { useScrollReveal } from "@/hooks/useScrollReveal"
import { SectionHeading } from "../ui/SectionHeading"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { name: 'Sofas', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800', size: 'large' },
  { name: 'Beds', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800', size: 'small' },
  { name: 'Office Chairs', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800', size: 'small' },
  { name: 'Wardrobes', image: 'https://images.unsplash.com/photo-1595526114101-2a13cc7abddf?w=800', size: 'medium' },
  { name: 'Dining Sets', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800', size: 'medium' },
  { name: 'Accent Chairs', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800', size: 'medium' },
]

export function FeaturedCategories() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-24 bg-[var(--color-charcoal)]" id="categories" ref={ref as any}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Browse by Category" 
          align="left" 
          className={cn("reveal-up", isVisible && "visible")}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name.toLowerCase().replace(' ', '-')}`}
              className={cn(
                "group relative overflow-hidden rounded-sm bg-[var(--color-deep-black)] reveal-up",
                isVisible && "visible",
                {
                  'md:col-span-2 md:row-span-2 h-[300px] md:h-full': cat.size === 'large',
                  'md:col-span-2 md:row-span-1 h-[250px] md:h-full': cat.size === 'small',
                  'md:col-span-1 md:row-span-1 md:col-start-3 md:col-end-5 h-[250px] md:h-full': i === 1,
                  'md:col-span-1 md:row-span-1 md:col-start-3 md:col-end-5 md:row-start-2 h-[250px] md:h-full': i === 2,
                  'md:col-span-1 md:row-span-1 h-[250px] md:h-auto': cat.size === 'medium' && i > 2,
                  'hidden': i > 2 && cat.size !== 'medium', // Adjusting grid for extra items
                }
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-black)]/90 via-[var(--color-deep-black)]/20 to-transparent transition-opacity group-hover:opacity-80" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--color-gold)]/50 m-4 transition-colors duration-500 rounded-sm pointer-events-none" />
              
              <div className="absolute bottom-6 left-6">
                <h3 className="font-serif text-2xl text-[var(--color-off-white)] group-hover:text-[var(--color-gold)] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-[var(--color-muted-foreground)] tracking-widest uppercase mt-1 block transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore Collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
