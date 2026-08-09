import React from 'react'
import { formatPrice } from '@/lib/utils'
import { PieChart } from 'lucide-react'

export interface CategoryRevenueShare {
  name: string
  revenue: number
  unitsSold: number
}

interface CategoryRevenueBarsProps {
  categories: CategoryRevenueShare[]
  totalRevenue: number
}

const CATEGORY_COLORS = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-purple-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
]

export function CategoryRevenueBars({ categories, totalRevenue }: CategoryRevenueBarsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Top Revenue Departments</span>
        <span className="text-xs font-bold text-foreground">{categories.length} Active Categories</span>
      </div>

      <div className="space-y-3">
        {categories.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">No sales recorded per category yet.</p>
        ) : (
          categories.slice(0, 5).map((cat, idx) => {
            const share = totalRevenue > 0 ? Math.round((cat.revenue / totalRevenue) * 100) : 0
            const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length]

            return (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                    <span className="font-semibold text-foreground">{cat.name}</span>
                    <span className="text-muted-foreground">({cat.unitsSold} sold)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-foreground">{formatPrice(cat.revenue)}</span>
                    <span className="text-muted-foreground font-mono text-[11px] w-8 text-right">{share}%</span>
                  </div>
                </div>

                <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.max(share, cat.revenue > 0 ? 6 : 0)}%` }}
                  />
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
