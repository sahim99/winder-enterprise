'use client'

import React, { useState } from 'react'
import { formatPrice } from '@/lib/utils'

export interface DailySalesData {
  dayLabel: string
  fullDate: string
  revenue: number
  ordersCount: number
}

interface RevenueBarChartProps {
  data: DailySalesData[]
  totalPeriodRevenue: number
}

export function RevenueBarChart({ data, totalPeriodRevenue }: RevenueBarChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const maxRevenue = Math.max(...data.map(d => d.revenue), 1000)

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">7-Day Sales Trajectory</span>
          <p className="text-2xl font-extrabold text-foreground mt-0.5">{formatPrice(totalPeriodRevenue)}</p>
        </div>
        {hoveredIdx !== null ? (
          <div className="text-right bg-muted/60 px-3 py-1.5 rounded-xl border border-border/40 animate-in fade-in-0 duration-150">
            <p className="text-xs font-bold text-foreground">{data[hoveredIdx].dayLabel} ({data[hoveredIdx].fullDate})</p>
            <p className="text-xs text-primary font-extrabold">
              {formatPrice(data[hoveredIdx].revenue)} · {data[hoveredIdx].ordersCount} {data[hoveredIdx].ordersCount === 1 ? 'order' : 'orders'}
            </p>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground font-medium">Hover bars for daily details</span>
        )}
      </div>

      {/* SVG Chart */}
      <div className="relative h-44 w-full pt-4">
        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${data.length * 60} 140`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary, #6366f1)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--color-primary, #6366f1)" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="barHoverGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary, #6366f1)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--color-primary, #6366f1)" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="20" x2={data.length * 60} y2="20" stroke="currentColor" className="text-border/40" strokeDasharray="3 3" strokeWidth="1" />
          <line x1="0" y1="65" x2={data.length * 60} y2="65" stroke="currentColor" className="text-border/40" strokeDasharray="3 3" strokeWidth="1" />
          <line x1="0" y1="110" x2={data.length * 60} y2="110" stroke="currentColor" className="text-border/60" strokeWidth="1" />

          {data.map((item, i) => {
            const barWidth = 32
            const x = i * 60 + 14
            const barHeight = Math.max((item.revenue / maxRevenue) * 90, item.ordersCount > 0 ? 8 : 4)
            const y = 110 - barHeight
            const isHovered = hoveredIdx === i

            return (
              <g 
                key={i} 
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Touch/Hover target area */}
                <rect 
                  x={i * 60} 
                  y="0" 
                  width="60" 
                  height="140" 
                  fill="transparent" 
                />

                {/* Bar background highlight on hover */}
                {isHovered && (
                  <rect
                    x={i * 60 + 4}
                    y="10"
                    width="52"
                    height="100"
                    rx="8"
                    className="fill-primary/10"
                  />
                )}

                {/* Main Data Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="6"
                  fill={isHovered ? 'url(#barHoverGradient)' : 'url(#barGradient)'}
                  className="transition-all duration-300"
                />

                {/* Day Label */}
                <text
                  x={x + barWidth / 2}
                  y="128"
                  textAnchor="middle"
                  className={`text-[11px] font-semibold transition-colors ${
                    isHovered ? 'fill-primary font-bold' : 'fill-muted-foreground'
                  }`}
                >
                  {item.dayLabel}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
