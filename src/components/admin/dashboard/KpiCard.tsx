import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KpiCardProps {
  label: string
  value: string | number
  sublabel?: string
  trend?: string
  trendPositive?: boolean
  icon: LucideIcon
  colorBg?: string
  href?: string
}

export function KpiCard({
  label,
  value,
  sublabel,
  trend,
  trendPositive = true,
  icon: Icon,
  colorBg = 'bg-primary/10 text-primary',
}: KpiCardProps) {
  return (
    <Card className="border border-border/50 bg-card rounded-2xl shadow-xs hover:shadow-md transition-all">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">
            {label}
          </span>
          <div className={cn("p-2 rounded-xl shrink-0", colorBg)}>
            <Icon className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline justify-between gap-2">
          <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground">
            {value}
          </p>
          {trend && (
            <span
              className={cn(
                "text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0",
                trendPositive
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
              )}
            >
              {trend}
            </span>
          )}
        </div>

        {sublabel && (
          <p className="text-[11px] text-muted-foreground mt-1 truncate">
            {sublabel}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
