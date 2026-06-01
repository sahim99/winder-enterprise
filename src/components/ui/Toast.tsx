"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--color-charcoal)] group-[.toaster]:text-[var(--color-off-white)] group-[.toaster]:border-[var(--color-gold)] group-[.toaster]:shadow-lg rounded-none border border-opacity-30",
          description: "group-[.toast]:text-[var(--color-muted-foreground)] font-sans",
          actionButton:
            "group-[.toast]:bg-[var(--color-gold)] group-[.toast]:text-deep-black font-sans rounded-none",
          cancelButton:
            "group-[.toast]:bg-transparent group-[.toast]:text-[var(--color-muted-foreground)] font-sans rounded-none",
          title: "font-serif text-lg text-[var(--color-gold)]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
