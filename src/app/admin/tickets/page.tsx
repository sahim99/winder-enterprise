import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/server'
import { TicketStatusUpdater } from '@/components/admin/TicketStatusUpdater'
import { MessageSquare, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = { title: 'Support Tickets — Winder Enterprise' }

async function getTickets() {
  const supabase = await createServiceClient()
  const { data } = await supabase
    .from('support_tickets')
    .select('*, profiles(*), orders(*)')
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function AdminTicketsPage() {
  const tickets = await getTickets()

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Tickets ({tickets.length})</h1>
          <p className="text-sm text-gray-500 mt-1">Review and manage customer help requests.</p>
        </div>
      </div>

      <div className="space-y-4">
        {tickets.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white rounded-xl border">
            <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p>No support tickets submitted yet.</p>
          </div>
        ) : (
          tickets.map((ticket: any) => {
            const customerName = ticket.profiles?.name || 'Unknown Customer'
            const customerPhone = ticket.profiles?.phone || 'No Phone'
            const profileEmail = ticket.profiles?.id ? `User Ref: ${ticket.profiles.id.slice(0, 8)}` : ''
            
            // Connect options
            const whatsappUrl = customerPhone !== 'No Phone' 
              ? `https://wa.me/91${customerPhone.replace(/[^0-9]/g, '')}` 
              : null

            return (
              <div key={ticket.id} className="bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between p-6 gap-6 border-b">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                        #{ticket.id.slice(0, 8).toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(ticket.created_at).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-snug">{ticket.subject}</h3>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed whitespace-pre-wrap">{ticket.description}</p>
                    </div>

                    {ticket.orders && (
                      <div className="text-xs text-gray-500 bg-muted/30 p-3 rounded-lg border inline-block">
                        <p className="font-semibold text-gray-700">Associated Order Details:</p>
                        <p className="mt-1">Order Ref: #{ticket.orders.id.slice(0, 8).toUpperCase()}</p>
                        <p>Total Value: ₹{ticket.orders.total} · Delivery: {ticket.orders.city}, {ticket.orders.state}</p>
                      </div>
                    )}
                  </div>

                  {/* Customer Contact & Status Action */}
                  <div className="w-full md:w-64 flex flex-col gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex-shrink-0">
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Customer Profile</p>
                      <h4 className="font-semibold text-gray-900 text-sm">{customerName}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{profileEmail}</p>
                    </div>

                    <div className="space-y-2 border-t pt-3">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Actions</p>
                      <div className="flex flex-wrap gap-2">
                        {whatsappUrl && (
                          <a 
                            href={whatsappUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors"
                          >
                            WhatsApp
                          </a>
                        )}
                        {customerPhone !== 'No Phone' && (
                          <a 
                            href={`tel:${customerPhone}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
                          >
                            Call
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="border-t pt-3 space-y-1.5">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Ticket Status</p>
                      <TicketStatusUpdater ticketId={ticket.id} currentStatus={ticket.status} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
