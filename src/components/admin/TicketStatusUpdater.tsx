'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { updateTicketStatus } from '@/app/actions/admin'

const STATUSES = ['open', 'in_progress', 'resolved', 'closed'] as const
type TicketStatus = typeof STATUSES[number]

const STATUS_COLORS: Record<TicketStatus, string> = {
  open: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
}

interface TicketStatusUpdaterProps {
  ticketId: string
  currentStatus: string
}

export function TicketStatusUpdater({ ticketId, currentStatus }: TicketStatusUpdaterProps) {
  const [status, setStatus] = useState<TicketStatus>(currentStatus as TicketStatus)
  const [loading, setLoading] = useState(false)

  async function handleChange(val: string | null) {
    if (!val) return
    const newStatus = val as TicketStatus
    setLoading(true)
    try {
      const res = await updateTicketStatus(ticketId, newStatus)
      if (res.success) {
        setStatus(newStatus)
        toast.success('Ticket status updated!')
      } else {
        toast.error(res.error || 'Failed to update status')
      }
    } catch {
      toast.error('An error occurred while updating status')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Select value={status} onValueChange={handleChange} disabled={loading}>
      <SelectTrigger className={`w-36 text-xs font-semibold ${STATUS_COLORS[status]}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map(s => (
          <SelectItem key={s} value={s} className="text-sm capitalize">{s.replace('_', ' ')}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
