import React from 'react'
import Link from 'next/link'
import { ArrowRight, AlertTriangle } from 'lucide-react'

export interface CategoryStockHealth {
  categoryName: string
  totalProducts: number
  inStockUnits: number
  lowStockCount: number
}

interface StockHealthBarsProps {
  categories: CategoryStockHealth[]
  totalWarehouseUnits: number
}

export function StockHealthBars({ categories, totalWarehouseUnits }: StockHealthBarsProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Inventory By Category</span>
        <span className="text-[11px] font-bold text-foreground">{totalWarehouseUnits} Units</span>
      </div>

      <div className="space-y-2">
        {categories.length === 0 ? (
          <p className="text-xs text-muted-foreground py-2 text-center">No categories found.</p>
        ) : (
          categories.map((cat) => {
            const isCritical = cat.lowStockCount > 0
            const percentage = totalWarehouseUnits > 0 ? Math.round((cat.inStockUnits / totalWarehouseUnits) * 100) : 0

            return (
              <div key={cat.categoryName} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-foreground text-[11px]">
                    <span>{cat.categoryName}</span>
                    {isCritical && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] text-amber-500 font-extrabold bg-amber-500/10 px-1 py-0.2 rounded">
                        <AlertTriangle className="h-2 w-2" /> {cat.lowStockCount}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-medium text-[10px]">{cat.inStockUnits} u</span>
                    <span className="font-bold text-foreground font-mono text-[10px] w-7 text-right">{percentage}%</span>
                  </div>
                </div>

                <div className="w-full bg-muted/60 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCritical ? 'bg-amber-500' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.max(percentage, cat.inStockUnits > 0 ? 5 : 0)}%` }}
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
