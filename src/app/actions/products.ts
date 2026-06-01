"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteProduct(id: string) {
  const supabase = await createClient()

  // Verify admin role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return { error: "Unauthorized" }

  const { error } = await supabase.from('products').delete().eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/products')
  revalidatePath('/products')
  
  return { success: true }
}

export async function toggleProductPublish(id: string, isPublished: boolean) {
  const supabase = await createClient()

  // Verify admin role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Unauthorized" }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return { error: "Unauthorized" }

  const { error } = await supabase.from('products').update({ is_published: isPublished }).eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin/products')
  revalidatePath('/products')
  
  return { success: true }
}
