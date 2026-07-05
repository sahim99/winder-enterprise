'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleWishlist(productId: string) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return { success: false, error: 'You must be logged in to save items.' }
  }

  // Check if it already exists
  const { data: existing } = await supabase
    .from('wishlist_items')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .single()

  if (existing) {
    // Remove it
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('id', existing.id)
      
    if (error) return { success: false, error: error.message }
    revalidatePath('/products')
    revalidatePath('/account/wishlist')
    return { success: true, action: 'removed' }
  } else {
    // Add it
    const { error } = await supabase
      .from('wishlist_items')
      .insert({ user_id: user.id, product_id: productId })
      
    if (error) return { success: false, error: error.message }
    revalidatePath('/products')
    revalidatePath('/account/wishlist')
    return { success: true, action: 'added' }
  }
}
