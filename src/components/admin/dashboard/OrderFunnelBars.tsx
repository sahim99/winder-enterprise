import React from 'react'
import { formatPrice } from '@/lib/utils'
import { Clock, PackageCheck, Truck, CheckCircle2 } from 'lucide-react'

export interface OrderPipelineStatus {
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  label: string
  count: number
  totalRevenue: number
}

interface OrderFunnelBarsProps {
  pipeline: OrderPipelineStatus[]
  totalOrders: number
}

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    color: 'bg-amber-500',
    badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20',
  },
  processing: {
    icon: PackageCheck,
    color: 'bg-blue-500',
    badge: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
  shipped: {
    icon: Truck,
    color: 'bg-purple-500',
    badge: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20',
  },
  delivered: {
    icon: CheckCircle2,
    color: 'bg-emerald-500',
    badge: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  },
}

export function OrderFunnelBars({ pipeline, totalOrders }: OrderFunnelBarsProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Fulfillment Pipeline</span>
        <span className="text-[11px] font-bold text-foreground">{totalOrders} Orders</span>
      </div>

      <div className="space-y-2">
        {pipeline.map((item) => {
          const config = STATUS_CONFIG[item.status]
          const Icon = config.icon
          const percentage = totalOrders > 0 ? Math.round((item.count / totalOrders) * 100) : 0

          return (
            <div key={item.status} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`p-1 rounded-md border ${config.badge}`}>
                    <Icon className="h-2.5 w-2.5" />
                  </span>
                  <span className="font-bold text-foreground text-[11px] truncate">{item.label}</span>
                  <span className="text-muted-foreground text-[10px]">({item.count})</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-foreground text-[11px]">{formatPrice(item.totalRevenue)}</span>
                  <span className="text-muted-foreground font-mono text-[10px] w-7 text-right">{percentage}%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-muted/60 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${config.color} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.max(percentage, item.count > 0 ? 4 : 0)}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
