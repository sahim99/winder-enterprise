'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createSupportTicket(formData: {
  subject: string
  description: string
  orderId?: string
}) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'You must be logged in to submit support tickets.' }
  }

  if (!formData.subject || formData.subject.trim().length < 5) {
    return { success: false, error: 'Subject must be at least 5 characters long.' }
  }

  if (!formData.description || formData.description.trim().length < 15) {
    return { success: false, error: 'Description must be at least 15 characters long.' }
  }

  // Validate and parse order ID if provided
  let orderUUID: string | null = null
  if (formData.orderId && formData.orderId.trim()) {
    const rawId = formData.orderId.trim().replace('#', '')
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (uuidRegex.test(rawId)) {
      orderUUID = rawId
    } else {
      // Look up if user has an order matching this partial ID
      const { data: matchedOrder } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user.id)
        .ilike('id', `%${rawId}%`)
        .limit(1)
        .maybeSingle()
      if (matchedOrder) {
        orderUUID = matchedOrder.id
      }
    }
  }

  const { error } = await supabase
    .from('support_tickets')
    .insert({
      user_id: user.id,
      subject: formData.subject,
      description: formData.description,
      order_id: orderUUID,
      status: 'open'
    })

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/account/support')
  return { success: true }
}
