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
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Revenue By Department</span>
        <span className="text-[11px] font-bold text-foreground">{categories.length} Depts</span>
      </div>

      <div className="space-y-2">
        {categories.length === 0 ? (
          <p className="text-xs text-muted-foreground py-2 text-center">No sales recorded yet.</p>
        ) : (
          categories.slice(0, 5).map((cat, idx) => {
            const share = totalRevenue > 0 ? Math.round((cat.revenue / totalRevenue) * 100) : 0
            const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length]

            return (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`h-2 w-2 rounded-full shrink-0 ${color}`} />
                    <span className="font-bold text-foreground text-[11px] truncate">{cat.name}</span>
                    <span className="text-muted-foreground text-[10px]">({cat.unitsSold} sold)</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-foreground text-[11px]">{formatPrice(cat.revenue)}</span>
                    <span className="text-muted-foreground font-mono text-[10px] w-7 text-right">{share}%</span>
                  </div>
                </div>

                <div className="w-full bg-muted/60 h-1.5 rounded-full overflow-hidden">
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
