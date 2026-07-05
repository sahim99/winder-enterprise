import { CreditCard, Plus, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PaymentMethodsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Payment Methods</h2>
        <p className="text-muted-foreground mt-1">Manage your saved cards and billing information.</p>
      </div>

      <div className="grid gap-6">
        <div className="flex items-start justify-between p-6 bg-card border border-border rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <CreditCard className="w-32 h-32" />
          </div>
          <div className="relative z-10 flex gap-4">
            <div className="h-12 w-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded flex items-center justify-center shadow-inner">
              <span className="text-white font-bold text-xs italic">VISA</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">Visa ending in 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/2028</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                  Default
                </span>
              </div>
            </div>
          </div>
          <div className="relative z-10 flex gap-2">
            <Button variant="outline" size="sm">Edit</Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">Remove</Button>
          </div>
        </div>

        <Button variant="outline" className="w-full h-14 border-dashed rounded-2xl text-muted-foreground hover:text-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Add new payment method
        </Button>
      </div>

      <div className="rounded-2xl bg-muted/30 p-6 flex items-start gap-4 text-sm text-muted-foreground">
        <ShieldCheck className="h-6 w-6 text-green-600 flex-shrink-0" />
        <p>
          Your security is our priority. We use industry-standard encryption to protect your payment details. 
          Your full card number is never stored on our servers.
        </p>
      </div>
    </div>
  )
}
