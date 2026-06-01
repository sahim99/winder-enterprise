'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
}

interface CategoryFilterProps {
  categories: Category[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('category')

  function setCategory(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) params.set('category', slug)
    else params.delete('category')
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setCategory(null)}
        className={cn(
          'rounded-full border px-4 py-1.5 text-sm transition-colors',
          !active ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 hover:border-gray-400'
        )}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => setCategory(cat.slug)}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm transition-colors',
            active === cat.slug ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 hover:border-gray-400'
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
