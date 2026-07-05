'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { createSupportTicket } from '@/app/actions/support'

export function SupportForm() {
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [orderId, setOrderId] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await createSupportTicket({
        subject,
        description,
        orderId,
      })

      if (res.success) {
        toast.success('Ticket submitted successfully!', {
          description: 'Our support team will get back to you shortly.',
        })
        setSubject('')
        setDescription('')
        setOrderId('')
      } else {
        toast.error(res.error || 'Failed to submit ticket.')
      }
    } catch {
      toast.error('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="orderId">Order ID / Reference (Optional)</Label>
        <Input 
          id="orderId" 
          value={orderId} 
          onChange={(e) => setOrderId(e.target.value)} 
          placeholder="e.g. #WE-10294 or UUID" 
          disabled={loading}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input 
          id="subject" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
          placeholder="What do you need help with?" 
          required 
          disabled={loading}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <textarea 
          id="message" 
          rows={4} 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={loading}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Describe your issue in detail (at least 15 characters)..."
        />
      </div>
      <Button type="submit" className="w-full h-11" disabled={loading}>
        {loading ? 'Submitting…' : 'Submit Ticket'}
      </Button>
    </form>
  )
}
