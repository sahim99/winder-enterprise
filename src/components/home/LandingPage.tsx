'use client'

import { useEffect, useState } from 'react'
import type { Product } from '@/types/supabase'
import dynamic from 'next/dynamic'
import MobileShowroom from './MobileShowroom'

// Lazy load the 3D desktop experience (it's heavy, so SSR is false)
const ScrollShowroom = dynamic(() => import('./ScrollShowroom'), { ssr: false })

interface LandingPageProps {
  fashion?: Product[]
  furniture?: Product[]
  electronics?: Product[]
  essentials?: Product[]
}

export function LandingPage({ 
  fashion = [], 
  furniture = [], 
  electronics = [], 
  essentials = [] 
}: LandingPageProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    // Check screen width to decide between 3D vs 2D
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Avoid hydration mismatch by waiting for client-side evaluation
  if (isMobile === null) {
    return <div className="min-h-screen bg-gray-950" />
  }

  // Dual render path
  if (isMobile) {
    return (
      <MobileShowroom 
        fashion={fashion} 
        furniture={furniture} 
        electronics={electronics} 
        essentials={essentials} 
      />
    )
  }

  return (
    <ScrollShowroom 
      fashion={fashion} 
      furniture={furniture} 
      electronics={electronics} 
      essentials={essentials} 
    />
  )
}
