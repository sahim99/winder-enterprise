import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { Users, Phone, Calendar, ShoppingBag, Mail, DollarSign } from 'lucide-react'

export const metadata: Metadata = { title: 'Customers Directory — Winder Enterprise' }

async function getCustomerDirectory() {
  const supabase = await createServiceClient()
  
  // Fetch profiles and orders
  const [
    { data: profiles },
    { data: orders }
  ] = await Promise.all([
    supabase.from('profiles').select('*').order('created_at', { ascending: false }),
    supabase.from('orders').select('*')
  ])

  const profileList = profiles ?? []
  const orderList = orders ?? []

  // Map orders to customer stats
  const directory = profileList.map(profile => {
    const customerOrders = orderList.filter(o => o.user_id === profile.id)
    const totalSpent = customerOrders.reduce((sum, o) => sum + Number(o.total), 0)
    
    return {
      ...profile,
      ordersCount: customerOrders.length,
      totalSpent
    }
  })

  return directory
}

export default async function AdminCustomersPage() {
  const directory = await getCustomerDirectory()

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers Directory ({directory.length})</h1>
        <p className="text-sm text-gray-500 mt-1">Manage registered customer accounts and review purchasing behavior.</p>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Customer Name</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Contact</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Account Role</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Signed Up</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600">Total Orders</th>
              <th className="text-left px-6 py-3 font-medium text-gray-600 text-right">Total Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {directory.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500">
                  <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  No registered customer profiles found.
                </td>
              </tr>
            ) : (
              directory.map((customer: any) => {
                // Connect options
                const whatsappUrl = customer.phone 
                  ? `https://wa.me/91${customer.phone.replace(/[^0-9]/g, '')}` 
                  : null

                return (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{customer.name || 'Anonymous User'}</p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {customer.id.slice(0, 8).toUpperCase()}</p>
                    </td>
                    <td className="px-6 py-4">
                      {customer.phone ? (
                        <div className="space-y-1">
                          <p className="text-gray-700 flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5 text-gray-400" />
                            {customer.phone}
                          </p>
                          {whatsappUrl && (
                            <div className="flex gap-2">
                              <a 
                                href={whatsappUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[10px] text-green-600 hover:text-green-700 font-bold uppercase tracking-wider"
                              >
                                WhatsApp
                              </a>
                              <a 
                                href={`tel:${customer.phone}`}
                                className="text-[10px] text-blue-600 hover:text-blue-700 font-bold uppercase tracking-wider"
                              >
                                Call
                              </a>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs italic">No number saved</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        customer.role === 'developer' 
                          ? 'bg-purple-100 text-purple-800' 
                          : customer.role === 'admin'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {customer.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <span className="flex items-center gap-1.5 text-xs">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        {new Date(customer.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      <span className="flex items-center gap-1.5">
                        <ShoppingBag className="h-3.5 w-3.5 text-gray-400" />
                        {customer.ordersCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 text-right">
                      {formatPrice(customer.totalSpent)}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
