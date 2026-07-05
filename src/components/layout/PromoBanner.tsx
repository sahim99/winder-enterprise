'use client'

import { useState, useEffect } from 'react'
import { Copy, X, Check } from 'lucide-react'

export function PromoBanner() {
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem('winder_promo_dismissed')
      if (dismissed) {
        setVisible(false)
      }
    }
  }, [])

  function handleCopy() {
    if (typeof window === 'undefined') return
    navigator.clipboard.writeText('WINDER10')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDismiss(e: React.MouseEvent) {
    e.stopPropagation()
    setVisible(false)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('winder_promo_dismissed', 'true')
    }
  }

  if (!visible) return null

  return (
    <div 
      onClick={handleCopy}
      className="bg-primary hover:bg-primary/95 text-primary-foreground text-center py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300 relative select-none"
    >
      <span className="flex items-center gap-1.5 animate-pulse">
        🎉 Monsoon Celebration Offer: Flat 10% off on all Solid Teak furniture!
      </span>
      <span className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded transition-all text-[10px] uppercase font-mono tracking-wider font-bold">
        Code: WINDER10
        {copied ? (
          <Check className="h-3 w-3 text-green-300 stroke-[3]" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </span>
      
      {copied && (
        <span className="absolute bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded shadow-lg -bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          Copied coupon code!
        </span>
      )}

      <button 
        onClick={handleDismiss}
        className="absolute right-3 p-1 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
        aria-label="Dismiss banner"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
