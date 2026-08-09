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
    <Card className="border border-border/50 bg-card rounded-xl sm:rounded-2xl shadow-xs hover:border-primary/30 transition-all">
      <CardContent className="p-3 sm:p-3.5">
        <div className="flex items-center justify-between gap-1.5">
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider truncate">
            {label}
          </span>
          <div className={cn("p-1.5 rounded-lg shrink-0", colorBg)}>
            <Icon className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="mt-1.5 flex items-baseline justify-between gap-1">
          <p className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground truncate">
            {value}
          </p>
          {trend && (
            <span
              className={cn(
                "text-[10px] font-bold px-1.5 py-0.2 rounded-full shrink-0",
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
          <p className="text-[10px] text-muted-foreground mt-0.5 truncate font-medium">
            {sublabel}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
