import Link from "next/link"
import { GoldButton } from "@/components/ui/GoldButton"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-deep-black)] flex flex-col items-center justify-center px-4 py-32 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618220179428-22790b461013?w=1400')] bg-cover bg-center opacity-10" />
      
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-serif text-[120px] md:text-[180px] leading-none text-[var(--color-gold)] opacity-20 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center flex-col -translate-y-4">
          <h2 className="font-serif text-3xl md:text-5xl text-[var(--color-off-white)] mb-4">
            Page Not Found
          </h2>
          <p className="text-[var(--color-muted-foreground)] max-w-md mb-8">
            The collection you are looking for has been moved or no longer exists.
          </p>
          <GoldButton asChild>
            <Link href="/">Return Home</Link>
          </GoldButton>
        </div>
      </div>
    </div>
  )
}
