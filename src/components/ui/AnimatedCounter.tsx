"use client"

import { useAnimatedCounter } from "@/hooks/useAnimatedCounter"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({ end, prefix = "", suffix = "", duration = 2000, className }: AnimatedCounterProps) {
  const { count, ref } = useAnimatedCounter(end, duration)

  return (
    <span ref={ref as any} className={cn("inline-block", className)}>
      {prefix}{count}{suffix}
    </span>
  )
}
