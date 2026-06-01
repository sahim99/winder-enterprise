"use client"

import { useScrollReveal } from "@/hooks/useScrollReveal"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Aarti S.",
    city: "Durgapur",
    text: "The quality of the sofa I received is unmatched. It transformed my living room instantly. True luxury at an honest price.",
    rating: 5,
  },
  {
    name: "Vikram R.",
    city: "Asansol",
    text: "Winder Enterprise has the most elegant dining sets. The finish is impeccable and the delivery was incredibly smooth with COD.",
    rating: 5,
  },
  {
    name: "Priya M.",
    city: "Kolkata",
    text: "I was skeptical about buying premium furniture online, but their service and the actual product exceeded all my expectations.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-32 bg-[var(--color-off-white)] text-[var(--color-deep-black)]" ref={ref as any}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className={cn("text-center mb-20 max-w-4xl mx-auto reveal-up", isVisible && "visible")}>
          <span className="text-[var(--color-gold-dark)] font-serif text-8xl leading-[0] block h-10">"</span>
          <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-warm-gray)] italic leading-tight">
            Living with Winder furniture is an everyday luxury. The craftsmanship speaks for itself.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <div 
              key={testimonial.name}
              className={cn(
                "bg-white p-8 rounded-sm shadow-sm border border-[var(--color-gold)]/10 reveal-up",
                isVisible && "visible"
              )}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex text-[var(--color-gold)] mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-[var(--color-warm-gray)] mb-8 flex-1 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-serif text-lg font-bold">{testimonial.name}</p>
                <p className="text-sm text-[var(--color-muted-foreground)] uppercase tracking-widest">{testimonial.city}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
