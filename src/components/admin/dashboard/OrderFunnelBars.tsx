'use client'

import React, { useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { Clock, PackageCheck, Truck, CheckCircle2, ChevronDown, Phone, FileText } from 'lucide-react'
import Link from 'next/link'

export interface OrderPipelineStatus {
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  label: string
  count: number
  totalRevenue: number
}

interface OrderFunnelBarsProps {
  pipeline: OrderPipelineStatus[]
  totalOrders: number
  orders: any[]
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

export function OrderFunnelBars({ pipeline, totalOrders, orders }: OrderFunnelBarsProps) {
  const [expandedStatus, setExpandedStatus] = useState<string | null>(null)

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
          const isExpanded = expandedStatus === item.status
          
          const filteredOrders = orders.filter(o => o.status === item.status).slice(0, 5)

          return (
            <div key={item.status} className="space-y-1">
              <button 
                onClick={() => setExpandedStatus(isExpanded ? null : item.status)}
                className="w-full flex flex-col hover:bg-muted/30 p-1 -mx-1 rounded-lg transition-colors text-left"
              >
                <div className="flex w-full items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`p-1 rounded-md border ${config.badge}`}>
                      <Icon className="h-2.5 w-2.5" />
                    </span>
                    <span className="font-bold text-foreground text-[11px] truncate flex items-center gap-1">
                      {item.label}
                      <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </span>
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
              </button>

              {/* Accordion Content (Drilldown) */}
              {isExpanded && (
                <div className="pl-6 pr-2 pt-1 pb-2 space-y-2 animate-in slide-in-from-top-1 opacity-100">
                  {filteredOrders.length === 0 ? (
                    <p className="text-[10px] text-muted-foreground">No orders in this status.</p>
                  ) : (
                    <>
                      {filteredOrders.map(order => (
                        <div key={order.id} className="flex items-center justify-between bg-muted/20 border border-border/40 rounded-md p-2">
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-foreground truncate">{order.customer_name}</p>
                            <p className="text-[9px] text-muted-foreground truncate">{order.city || 'Unknown Location'} • #{order.id.split('-')[0].toUpperCase()}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            <span className="text-[10px] font-bold">{formatPrice(order.total)}</span>
                            {order.phone && (
                              <a href={`https://wa.me/91${order.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="bg-emerald-500/10 text-emerald-600 p-1 rounded hover:bg-emerald-500/20">
                                <Phone className="h-3 w-3" />
                              </a>
                            )}
                            <Link href={`/admin/billing/invoice/${order.id}`} className="bg-primary/10 text-primary p-1 rounded hover:bg-primary/20">
                              <FileText className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      ))}
                      {item.count > 5 && (
                        <Link href="/admin/orders" className="text-[10px] text-primary hover:underline block text-center pt-1 font-semibold">
                          View {item.count - 5} more...
                        </Link>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
