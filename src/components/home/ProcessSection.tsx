"use client"

import { useScrollReveal } from "@/hooks/useScrollReveal"
import { SectionHeading } from "../ui/SectionHeading"
import { cn } from "@/lib/utils"

const STEPS = [
  { num: '01', title: 'Browse Collection', desc: 'Explore our curated catalog of premium furniture.' },
  { num: '02', title: 'Select Your Piece', desc: 'Choose the perfect addition to your home or office.' },
  { num: '03', title: 'COD Checkout', desc: 'Seamlessly place your order with Cash on Delivery.' },
  { num: '04', title: 'White-glove Delivery', desc: 'Delivered securely to your doorstep across West Bengal.' },
]

export function ProcessSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-32 bg-[var(--color-deep-black)]" ref={ref as any}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="From Showroom to Your Home" 
          subtitle="Our streamlined process ensures you get the luxury you deserve without the wait."
          className={cn("reveal-up", isVisible && "visible")}
        />

        <div className="relative mt-20">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)]/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {STEPS.map((step, i) => (
              <div 
                key={step.num}
                className={cn("flex flex-col items-center text-center reveal-up", isVisible && "visible")}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-24 h-24 rounded-full bg-[var(--color-charcoal)] border border-[var(--color-gold)]/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(201,168,76,0.05)] transition-transform duration-500 hover:scale-110 hover:border-[var(--color-gold)]">
                  <span className="font-serif text-3xl text-[var(--color-gold)]">{step.num}</span>
                </div>
                <h3 className="font-serif text-xl text-[var(--color-off-white)] mb-3">{step.title}</h3>
                <p className="text-[var(--color-muted-foreground)] text-sm leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
