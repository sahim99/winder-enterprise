import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { Printer, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: { id: string }
}

async function getOrder(id: string) {
  const supabase = await createServiceClient()
  const { data } = await supabase.from('orders').select('*').eq('id', id).single()
  return data
}

export default async function InvoicePage({ params }: PageProps) {
  const order = await getOrder(params.id)
  if (!order) notFound()

  return (
    <div className="bg-gray-100 min-h-screen py-10 print:bg-white print:py-0">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 border shadow-sm print:shadow-none print:border-none rounded-2xl print:rounded-none">
        
        {/* Navigation & Print Actions (Hidden on Print) */}
        <div className="flex justify-between items-center mb-8 border-b pb-4 print:hidden">
          <Link href="/admin/billing" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Billing
          </Link>
          <button 
            onClick={() => {
              if (typeof window !== 'undefined') window.print()
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition-all shadow-sm"
          >
            <Printer className="h-4 w-4" /> Print Invoice
          </button>
        </div>

        {/* Invoice Header */}
        <div className="flex justify-between items-start gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">INVOICE</h1>
            <p className="font-mono text-sm text-gray-500 mt-1">Invoice No: #WE-{order.id.slice(0, 8).toUpperCase()}</p>
            <p className="text-xs text-gray-400 mt-1">Date: {order.created_at ? new Date(order.created_at).toLocaleString('en-IN') : '—'}</p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-bold text-gray-900">Winder Enterprise</h2>
            <p className="text-xs text-gray-500 mt-1">Raghunathganj, Jangipur</p>
            <p className="text-xs text-gray-500">West Bengal, India</p>
            <p className="text-xs text-gray-500">winderenterprise.admin@gmail.com</p>
          </div>
        </div>

        {/* Client Address */}
        <div className="grid grid-cols-2 gap-8 border-t border-b py-6 mb-8 text-sm">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Billed To:</p>
            <p className="font-semibold text-gray-900">{order.customer_name}</p>
            <p className="text-gray-600 mt-1">Phone: {order.phone}</p>
            {order.user_id && (
              <p className="text-gray-400 text-xs mt-1 font-mono">User Ref: #{order.user_id.slice(0, 8).toUpperCase()}</p>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Ship To Address:</p>
            <p className="text-gray-700 whitespace-pre-wrap">{order.address}</p>
            <p className="text-gray-700 mt-1">{order.city}, {order.state} — {order.pin_code}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-400 uppercase tracking-wider font-semibold text-xs text-left">
                <th className="py-3">Description</th>
                <th className="py-3 text-center w-20">Qty</th>
                <th className="py-3 text-right w-32">Unit Price</th>
                <th className="py-3 text-right w-32">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-700">
              {(order.items as any[]).map((item, i) => (
                <tr key={i}>
                  <td className="py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="py-4 text-center">{item.quantity}</td>
                  <td className="py-4 text-right">{formatPrice(item.price)}</td>
                  <td className="py-4 text-right font-medium">{formatPrice(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary */}
        <div className="border-t pt-6 flex justify-end">
          <div className="w-64 space-y-2.5 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping Fee</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Payment Type</span>
              <span>Cash on Delivery</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-lg border-t pt-2.5">
              <span>Total Due</span>
              <span className="text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer Remarks */}
        <div className="border-t border-dashed mt-12 pt-6 text-center text-xs text-gray-400">
          <p className="font-semibold text-gray-500">Thank you for shopping with Winder Enterprise!</p>
          <p className="mt-1">This is a computer generated invoice and does not require signature. For support, please contact us at winderenterprise.admin@gmail.com.</p>
        </div>

      </div>
    </div>
  )
}
