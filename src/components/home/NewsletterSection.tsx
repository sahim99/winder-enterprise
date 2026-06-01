"use client"

import { useScrollReveal } from "@/hooks/useScrollReveal"
import { cn } from "@/lib/utils"
import { GoldButton } from "../ui/GoldButton"
import { useState } from "react"
import { toast } from "sonner"

export function NewsletterSection() {
  const { ref, isVisible } = useScrollReveal()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    setEmail('')
    toast.success("Welcome to the Winder Circle.", {
      description: "You've successfully subscribed to our newsletter."
    })
  }

  return (
    <section className="relative py-32 bg-[var(--color-charcoal)] overflow-hidden" ref={ref as any}>
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={cn("font-serif text-4xl md:text-6xl text-[var(--color-off-white)] mb-6 reveal-up", isVisible && "visible")}>
          Join the Winder Circle
        </h2>
        <p className={cn("text-[var(--color-muted-foreground)] text-lg mb-10 max-w-xl mx-auto reveal-up", isVisible && "visible")} style={{ transitionDelay: '100ms' }}>
          Subscribe to receive exclusive access to new collections, special offers, and interior design inspiration.
        </p>

        <form 
          onSubmit={handleSubmit}
          className={cn("flex flex-col sm:flex-row gap-4 max-w-md mx-auto reveal-up", isVisible && "visible")}
          style={{ transitionDelay: '200ms' }}
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-[var(--color-deep-black)] border border-[var(--color-gold)]/20 text-[var(--color-off-white)] px-6 py-4 rounded-sm focus:outline-none focus:border-[var(--color-gold)]/60 transition-colors placeholder:text-[var(--color-muted-foreground)]/50"
          />
          <GoldButton type="submit" disabled={loading} className="py-4">
            {loading ? 'Subscribing...' : 'Subscribe'}
          </GoldButton>
        </form>
      </div>
    </section>
  )
}
