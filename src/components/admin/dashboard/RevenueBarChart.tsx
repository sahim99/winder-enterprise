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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">7-Day Sales Trajectory</span>
          <p className="text-xl font-extrabold text-foreground">{formatPrice(totalPeriodRevenue)}</p>
        </div>
        {hoveredIdx !== null ? (
          <div className="text-right bg-muted/60 px-2.5 py-1 rounded-lg border border-border/40 animate-in fade-in-0 duration-100">
            <span className="text-[11px] font-bold text-foreground mr-1.5">{data[hoveredIdx].dayLabel} ({data[hoveredIdx].fullDate}):</span>
            <span className="text-xs text-primary font-black">
              {formatPrice(data[hoveredIdx].revenue)} ({data[hoveredIdx].ordersCount})
            </span>
          </div>
        ) : null}
      </div>

      {/* SVG Chart */}
      <div className="relative h-32 w-full pt-1">
        <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${data.length * 60} 110`} preserveAspectRatio="none">
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
          <line x1="0" y1="15" x2={data.length * 60} y2="15" stroke="currentColor" className="text-border/30" strokeDasharray="2 2" strokeWidth="1" />
          <line x1="0" y1="50" x2={data.length * 60} y2="50" stroke="currentColor" className="text-border/30" strokeDasharray="2 2" strokeWidth="1" />
          <line x1="0" y1="85" x2={data.length * 60} y2="85" stroke="currentColor" className="text-border/50" strokeWidth="1" />

          {data.map((item, i) => {
            const barWidth = 32
            const x = i * 60 + 14
            const barHeight = Math.max((item.revenue / maxRevenue) * 70, item.ordersCount > 0 ? 6 : 3)
            const y = 85 - barHeight
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
                  height="110" 
                  fill="transparent" 
                />

                {/* Bar background highlight on hover */}
                {isHovered && (
                  <rect
                    x={i * 60 + 4}
                    y="5"
                    width="52"
                    height="80"
                    rx="6"
                    className="fill-primary/10"
                  />
                )}

                {/* Main Data Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="4"
                  fill={isHovered ? 'url(#barHoverGradient)' : 'url(#barGradient)'}
                  className="transition-all duration-300"
                />

                {/* Day Label */}
                <text
                  x={x + barWidth / 2}
                  y="100"
                  textAnchor="middle"
                  className={`text-[10px] font-bold transition-colors ${
                    isHovered ? 'fill-primary font-black' : 'fill-muted-foreground'
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
