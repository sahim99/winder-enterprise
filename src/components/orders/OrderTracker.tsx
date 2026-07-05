'use client'

import { Check } from 'lucide-react'

interface OrderTrackerProps {
  status: string
}

const STEPS = ['pending', 'processing', 'shipped', 'delivered'] as const
const LABELS = ['Order Placed', 'Processing', 'In Transit', 'Delivered'] as const

export function OrderTracker({ status }: OrderTrackerProps) {
  const currentIndex = STEPS.indexOf(status as any)

  return (
    <div className="py-6 px-2">
      {/* Progress Bar Container */}
      <div className="relative flex items-center justify-between w-full">
        
        {/* Background Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-100 rounded-full z-0" />
        
        {/* Active Line Fill */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full transition-all duration-700 ease-in-out z-0"
          style={{ 
            width: `${currentIndex === -1 ? 0 : (currentIndex / (STEPS.length - 1)) * 100}%` 
          }}
        />

        {/* Steps */}
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIndex
          const isActive = idx === currentIndex
          const isVisited = idx <= currentIndex

          return (
            <div key={step} className="relative z-10 flex flex-col items-center flex-1 last:flex-initial">
              {/* Dot */}
              <div 
                className={`h-7 w-7 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  isCompleted 
                    ? 'bg-primary border-primary text-primary-foreground shadow-sm shadow-primary/20 scale-105' 
                    : isActive 
                    ? 'bg-background border-primary text-primary ring-4 ring-primary/10 scale-110' 
                    : 'bg-background border-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                ) : (
                  <span className="text-[10px] font-bold">{idx + 1}</span>
                )}
              </div>

              {/* Label */}
              <span 
                className={`absolute top-9 text-[10px] sm:text-xs font-bold tracking-tight whitespace-nowrap text-center transition-colors duration-300 ${
                  isActive 
                    ? 'text-primary' 
                    : isVisited 
                    ? 'text-gray-800' 
                    : 'text-gray-400'
                }`}
              >
                {LABELS[idx]}
              </span>
            </div>
          )
        })}

      </div>
      
      {/* Spacer for bottom labels */}
      <div className="h-6" />
    </div>
  )
}
