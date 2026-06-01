"use server"

// Cart logic is handled client-side via Zustand for persistence across tabs.
// This file can be used for server-side cart validation (e.g. checking stock before checkout).

import { createClient } from "@/lib/supabase/server"

export async function validateCartStock(items: { id: string, quantity: number }[]) {
  const supabase = await createClient()
  
  for (const item of items) {
    const { data: product } = await supabase
      .from('products')
      .select('stock_count, name')
      .eq('id', item.id)
      .single()
      
    if (!product || product.stock_count < item.quantity) {
      return { 
        valid: false, 
        error: `Not enough stock for ${product?.name || 'an item'}. Available: ${product?.stock_count || 0}`
      }
    }
  }
  
  return { valid: true }
}
