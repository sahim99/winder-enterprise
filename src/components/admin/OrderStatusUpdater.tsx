'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const STATUSES = ['pending', 'processing', 'shipped', 'delivered'] as const
type Status = typeof STATUSES[number]

const STATUS_COLORS: Record<Status, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
}

interface OrderStatusUpdaterProps {
  orderId: string
  currentStatus: string
}

export function OrderStatusUpdater({ orderId, currentStatus }: OrderStatusUpdaterProps) {
  const [status, setStatus] = useState<Status>(currentStatus as Status)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleChange(val: string | null) {
    if (!val) return
    const newStatus = val as Status
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error('Update failed')
      setStatus(newStatus)
      router.refresh()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Select value={status} onValueChange={handleChange} disabled={loading}>
      <SelectTrigger className={`w-36 text-xs font-medium ${STATUS_COLORS[status]}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map(s => (
          <SelectItem key={s} value={s} className="text-sm capitalize">{s}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
