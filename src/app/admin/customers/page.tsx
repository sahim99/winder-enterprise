import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { Users, Phone, Calendar, ShoppingBag, Mail, DollarSign, Trash2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'

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
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Customers Directory ({directory.length})</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Manage registered customer accounts and review lifetime purchasing behavior.</p>
      </div>

      <div className="glass-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b border-border/40">
              <tr>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Contact</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Signed Up</th>
                <th className="text-left px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Orders</th>
                <th className="text-right px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Total Spent</th>
                <th className="text-right px-6 py-3.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {directory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted-foreground">
                    <Users className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                    No registered customer profiles found.
                  </td>
                </tr>
              ) : (
                directory.map((customer: any) => {
                  const whatsappUrl = customer.phone 
                    ? `https://wa.me/91${customer.phone.replace(/[^0-9]/g, '')}` 
                    : null

                  return (
                    <tr key={customer.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-foreground">{customer.name || 'Anonymous User'}</p>
                        <p className="text-[11px] text-muted-foreground font-mono mt-0.5">ID: {customer.id.slice(0, 8).toUpperCase()}</p>
                      </td>
                      <td className="px-6 py-4">
                        {customer.phone ? (
                          <div className="space-y-1">
                            <p className="text-foreground text-xs flex items-center gap-1">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {customer.phone}
                            </p>
                            {whatsappUrl && (
                              <div className="flex gap-2">
                                <a 
                                  href={whatsappUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline font-bold uppercase tracking-wider"
                                >
                                  WhatsApp
                                </a>
                                <a 
                                  href={`tel:${customer.phone}`}
                                  className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-bold uppercase tracking-wider"
                                >
                                  Call
                                </a>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-xs italic">No number</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          customer.role === 'developer' 
                            ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400' 
                            : customer.role === 'admin'
                            ? 'bg-red-500/15 text-red-600 dark:text-red-400'
                            : 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                        }`}>
                          {customer.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-xs">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {new Date(customer.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-foreground">
                        <span className="flex items-center gap-1.5">
                          <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground" />
                          {customer.ordersCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-foreground text-right">
                        {formatPrice(customer.totalSpent)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <form action={async (formData: FormData) => {
                          'use server'
                          const id = formData.get('id') as string
                          if (!id) return
                          
                          const supabase = await createServiceClient()
                          
                          // 1. Delete from profiles
                          await supabase.from('profiles').delete().eq('id', id)
                          
                          // 2. Delete from auth.users (requires service role)
                          await supabase.auth.admin.deleteUser(id)
                          
                          revalidatePath('/admin/customers')
                        }}>
                          <input type="hidden" name="id" value={customer.id} />
                          <button 
                            type="submit" 
                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Delete Customer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
