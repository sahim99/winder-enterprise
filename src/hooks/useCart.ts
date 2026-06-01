import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'

// Need to create a selector hook to prevent hydration mismatch errors with Zustand persist
export function useCart() {
  const [isClient, setIsClient] = useState(false)
  const cartStore = useCartStore()

  useEffect(() => {
    setIsClient(true)
  }, [])

  return {
    ...cartStore,
    isClient,
  }
}
