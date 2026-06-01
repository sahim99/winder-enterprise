"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function Loading() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[100] bg-[var(--color-deep-black)] flex items-center justify-center pointer-events-none transition-opacity duration-1000">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-[var(--color-gold)] fill-transparent stroke-1">
          <path
            d="M 10 20 L 30 80 L 50 40 L 70 80 L 90 20"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-draw-path"
            style={{
              strokeDasharray: 300,
              strokeDashoffset: 300,
            }}
          />
        </svg>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-draw-path {
          animation: drawPath 2s ease-in-out forwards;
        }
      `}} />
    </div>
  )
}
