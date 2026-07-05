import { createClient } from '@/lib/supabase/server'
import { SupportForm } from '@/components/support/SupportForm'
import { Badge } from '@/components/ui/badge'

const statusColors: Record<string, string> = {
  open: 'bg-blue-100 text-blue-800 border-blue-200',
  in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  resolved: 'bg-green-100 text-green-800 border-green-200',
  closed: 'bg-gray-100 text-gray-800 border-gray-200',
}

export default async function SupportPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let tickets: any[] = []
  if (user) {
    const { data } = await supabase
      .from('support_tickets')
      .select('id, subject, description, status, created_at, order_id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    tickets = data || []
  }

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Help & Support</h2>
        <p className="text-muted-foreground mt-1">Get assistance with your orders or account.</p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 items-start">
        <section className="space-y-6">
          <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            <details className="group border border-border/60 rounded-2xl p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="flex items-center justify-between font-medium text-foreground">
                What is your return policy?
                <span className="transition group-open:-rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                We offer a 30-day return policy for all unused items in their original packaging. 
                Custom furniture pieces may be subject to a restocking fee.
              </p>
            </details>
            
            <details className="group border border-border/60 rounded-2xl p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="flex items-center justify-between font-medium text-foreground">
                How long does shipping take?
                <span className="transition group-open:-rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Standard shipping takes 3-5 business days. Heavy furniture requires specialized freight and typically arrives within 7-14 business days.
              </p>
            </details>

            <details className="group border border-border/60 rounded-2xl p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:bg-muted/30 transition-colors">
              <summary className="flex items-center justify-between font-medium text-foreground">
                Do you offer assembly services?
                <span className="transition group-open:-rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Yes! White-glove delivery and assembly can be added at checkout for an additional fee.
              </p>
            </details>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-lg font-semibold">Contact Support</h3>
          <div className="bg-muted/20 border border-border/60 rounded-3xl p-6">
            <SupportForm />
          </div>
        </section>
      </div>

      {tickets.length > 0 && (
        <section className="border-t border-border/50 pt-10 space-y-6">
          <h3 className="text-xl font-bold text-foreground">Your Support Tickets</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {tickets.map(ticket => (
              <div key={ticket.id} className="border border-border/60 bg-background rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full border bg-muted/40 uppercase tracking-wider text-muted-foreground">
                    #{ticket.id.substring(0, 8).toUpperCase()}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusColors[ticket.status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm line-clamp-1">{ticket.subject}</h4>
                  <p className="text-muted-foreground text-xs line-clamp-2 mt-1 leading-relaxed">{ticket.description}</p>
                </div>
                {ticket.order_id && (
                  <p className="text-[11px] font-mono text-muted-foreground/80">
                    Order Ref: #{ticket.order_id.substring(0, 8).toUpperCase()}
                  </p>
                )}
                <div className="text-[11px] text-muted-foreground border-t border-border/40 pt-2 flex justify-between">
                  <span>Created: {new Date(ticket.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
