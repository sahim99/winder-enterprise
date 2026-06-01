"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  "All",
  "Sofas",
  "Beds",
  "Chairs",
  "Tables",
  "Wardrobes",
  "Dining Sets",
  "Office Chairs"
]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentCategory = searchParams.get('category') || 'all'

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (cat.toLowerCase() === 'all') {
      params.delete('category')
    } else {
      params.set('category', cat.toLowerCase().replace(' ', '-'))
    }
    router.push(`/products?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif text-xl text-[var(--color-gold)] mb-4">Categories</h3>
        <ul className="space-y-3">
          {CATEGORIES.map((cat) => {
            const catSlug = cat.toLowerCase().replace(' ', '-')
            const isActive = currentCategory === catSlug || (currentCategory === 'all' && cat === 'All')
            
            return (
              <li key={cat}>
                <button
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "text-sm tracking-wider uppercase transition-colors hover:text-[var(--color-gold)] flex items-center gap-2",
                    isActive ? "text-[var(--color-off-white)] font-medium" : "text-[var(--color-muted-foreground)]"
                  )}
                >
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                  )} />
                  {cat}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="h-px w-full bg-[var(--color-gold)]/10" />

      <div>
         <h3 className="font-serif text-xl text-[var(--color-gold)] mb-4">Availability</h3>
         <label className="flex items-center gap-3 cursor-pointer group">
           <div className="relative flex items-center justify-center">
             <input type="checkbox" className="peer sr-only" />
             <div className="w-5 h-5 border border-[var(--color-muted-foreground)] rounded-sm group-hover:border-[var(--color-gold)] transition-colors peer-checked:bg-[var(--color-gold)] peer-checked:border-[var(--color-gold)] flex items-center justify-center">
                <svg className="w-3 h-3 text-deep-black opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
             </div>
           </div>
           <span className="text-sm text-[var(--color-off-white)] tracking-wide">In Stock Only</span>
         </label>
      </div>
    </div>
  )
}
