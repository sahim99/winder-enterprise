'use client'

import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

type WishlistStore = {
  wishlistIds: string[]
  isLoaded: boolean
  userId: string | null
  init: () => Promise<void>
  isWishlisted: (productId: string) => boolean
  toggleWishlist: (productId: string, productName?: string) => Promise<boolean>
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlistIds: [],
  isLoaded: false,
  userId: null,

  init: async () => {
    if (get().isLoaded) return
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      set({ wishlistIds: [], isLoaded: true, userId: null })
      return
    }

    set({ userId: user.id })
    const { data } = await supabase
      .from('wishlist_items')
      .select('product_id')
      .eq('user_id', user.id)

    const ids = (data || []).map(item => item.product_id).filter(Boolean) as string[]
    set({ wishlistIds: ids, isLoaded: true })
  },

  isWishlisted: (productId: string) => {
    return get().wishlistIds.includes(productId)
  },

  toggleWishlist: async (productId: string, productName?: string) => {
    const { wishlistIds, isWishlisted } = get()
    const exists = isWishlisted(productId)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      toast.error('Please log in to save items to your wishlist')
      return false
    }

    // Optimistic state update
    if (exists) {
      set({ wishlistIds: wishlistIds.filter(id => id !== productId) })
      toast.info('Removed from Wishlist', { description: productName })
    } else {
      set({ wishlistIds: [...wishlistIds, productId] })
      toast.success('Added to Wishlist', { description: productName })
    }

    try {
      const { toggleWishlist: serverToggle } = await import('@/app/actions/wishlist')
      const res = await serverToggle(productId)
      if (!res.success) {
        // Revert on error
        set({ wishlistIds })
        toast.error(res.error || 'Failed to update wishlist')
        return false
      }
      return true
    } catch {
      set({ wishlistIds })
      toast.error('Network error updating wishlist')
      return false
    }
  },
}))
