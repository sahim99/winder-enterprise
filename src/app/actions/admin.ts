'use server'

import { createServiceClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateTicketStatus(ticketId: string, status: string) {
  const supabase = await createServiceClient()
  const { error } = await supabase
    .from('support_tickets')
    .update({ status: status as any })
    .eq('id', ticketId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/tickets')
  return { success: true }
}
