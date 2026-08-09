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
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Support Tickets ({tickets.length})</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Review customer inquiries, order issues, and update resolution statuses.</p>
        </div>
      </div>

      <div className="space-y-4">
        {tickets.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground bg-card rounded-2xl border border-border/50">
            <MessageSquare className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
            <p>No support tickets submitted yet.</p>
          </div>
        ) : (
          tickets.map((ticket: any) => {
            const customerName = ticket.profiles?.name || 'Unknown Customer'
            const customerPhone = ticket.profiles?.phone || 'No Phone'
            const profileEmail = ticket.profiles?.id ? `User Ref: ${ticket.profiles.id.slice(0, 8)}` : ''
            
            const whatsappUrl = customerPhone !== 'No Phone' 
              ? `https://wa.me/91${customerPhone.replace(/[^0-9]/g, '')}` 
              : null

            return (
              <div key={ticket.id} className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between p-5 sm:p-6 gap-6 border-b border-border/40">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
                        #{ticket.id.slice(0, 8).toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(ticket.created_at).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-foreground text-base sm:text-lg leading-snug">{ticket.subject}</h3>
                      <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed whitespace-pre-wrap">{ticket.description}</p>
                    </div>

                    {ticket.orders && (
                      <div className="text-xs text-muted-foreground bg-muted/40 p-3 rounded-xl border border-border/40 inline-block">
                        <p className="font-semibold text-foreground">Associated Order:</p>
                        <p className="mt-0.5">Order Ref: #{ticket.orders.id.slice(0, 8).toUpperCase()} · Total: ₹{ticket.orders.total}</p>
                        <p>Delivery Location: {ticket.orders.city}, {ticket.orders.state}</p>
                      </div>
                    )}
                  </div>

                  {/* Customer Contact & Status Action */}
                  <div className="w-full md:w-64 flex flex-col gap-3 bg-muted/30 p-4 rounded-xl border border-border/40 shrink-0">
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Customer Profile</p>
                      <h4 className="font-bold text-foreground text-sm">{customerName}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{profileEmail}</p>
                    </div>

                    <div className="space-y-2 border-t border-border/40 pt-3">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Direct Actions</p>
                      <div className="flex flex-wrap gap-2">
                        {whatsappUrl && (
                          <a 
                            href={whatsappUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                          >
                            WhatsApp
                          </a>
                        )}
                        {customerPhone !== 'No Phone' && (
                          <a 
                            href={`tel:${customerPhone}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors"
                          >
                            Call
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-border/40 pt-3 space-y-1.5">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Ticket Status</p>
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
