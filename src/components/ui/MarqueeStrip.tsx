import { cn } from "@/lib/utils"

interface MarqueeStripProps {
  text: string
  className?: string
  speed?: number // seconds
}

export function MarqueeStrip({ text, className, speed = 20 }: MarqueeStripProps) {
  return (
    <div className={cn("relative flex overflow-hidden bg-[var(--color-charcoal)] py-4 border-y border-[var(--color-gold)]/20 w-full", className)}>
      <div 
        className="animate-marquee whitespace-nowrap flex"
        style={{ animationDuration: `${speed}s` }}
      >
        <span className="text-xl md:text-2xl font-serif italic text-[var(--color-gold)] mx-4 tracking-widest">{text}</span>
        <span className="text-xl md:text-2xl font-serif italic text-[var(--color-gold)] mx-4 tracking-widest">{text}</span>
        <span className="text-xl md:text-2xl font-serif italic text-[var(--color-gold)] mx-4 tracking-widest">{text}</span>
        <span className="text-xl md:text-2xl font-serif italic text-[var(--color-gold)] mx-4 tracking-widest">{text}</span>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}} />
    </div>
  )
}
