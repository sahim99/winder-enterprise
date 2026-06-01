import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

export function SectionHeading({ title, subtitle, align = 'center', className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 mb-12",
        {
          'items-start text-left': align === 'left',
          'items-center text-center': align === 'center',
          'items-end text-right': align === 'right',
        },
        className
      )}
    >
      <h2 className="text-4xl md:text-5xl font-serif text-[var(--color-off-white)]">
        {title}
      </h2>
      <div className="w-16 h-[1px] bg-[var(--color-gold)]" />
      {subtitle && (
        <p className="max-w-2xl text-lg text-[var(--color-muted-foreground)]">
          {subtitle}
        </p>
      )}
    </div>
  )
}
