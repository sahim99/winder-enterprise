import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  asChild?: boolean
}

export const GoldButton = React.forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
          {
            // Primary: Gold background, dark text, shimmer hover
            'bg-[var(--color-gold)] text-deep-black hover:bg-[var(--color-gold-light)] shadow-sm':
              variant === 'primary',
            // Outline: Gold border, transparent bg, gold text
            'border border-[var(--color-gold)] bg-transparent text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-deep-black':
              variant === 'outline',
            // Ghost: No border, golden text
            'bg-transparent text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10':
              variant === 'ghost',

            // Sizes
            'h-9 px-4 py-2': size === 'sm',
            'h-11 px-8 py-2 text-base': size === 'md',
            'h-14 px-10 py-3 text-lg': size === 'lg',
            'h-11 w-11': size === 'icon',
          },
          className
        )}
        {...props}
      >
        {/* If asChild is true, Slot will merge children. We should be careful about the shimmer div. */}
        {asChild ? (
          props.children
        ) : (
          <>
            <span className="relative z-10 flex items-center gap-2">{props.children}</span>
            {variant === 'primary' && (
              <div className="absolute inset-0 z-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1.5s]" />
            )}
          </>
        )}
      </Comp>
    )
  }
)
GoldButton.displayName = "GoldButton"
