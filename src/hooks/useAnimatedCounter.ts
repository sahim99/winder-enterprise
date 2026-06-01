import { useEffect, useState, useRef } from 'react'

export function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let startTimestamp: number | null = null
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / duration, 1)
            
            // easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            setCount(Math.floor(easeProgress * end))
            
            if (progress < 1) {
              window.requestAnimationFrame(step)
            } else {
              setCount(end)
            }
          }
          window.requestAnimationFrame(step)
          observer.unobserve(element)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [end, duration])

  return { count, ref }
}
