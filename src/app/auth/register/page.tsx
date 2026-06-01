"use client"

import { useState } from "react"
import { register } from "@/app/actions/auth"
import { GoldButton } from "@/components/ui/GoldButton"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    const res = await register(formData)
    setLoading(false)

    if (res.error) {
      toast.error("Registration Failed", { description: res.error })
    } else {
      toast.success("Account Created", { description: "Welcome to Winder Enterprise." })
      router.push('/account')
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-deep-black)] flex flex-col items-center justify-center py-32 px-4">
      <div className="w-full max-w-md bg-[var(--color-charcoal)] p-8 rounded-sm border border-[var(--color-gold)]/10 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-[var(--color-off-white)] mb-2">Create Account</h1>
          <p className="text-[var(--color-muted-foreground)]">Join the Winder Circle.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-[var(--color-muted-foreground)]">Full Name</label>
            <input 
              name="fullName" 
              type="text" 
              required 
              className="w-full bg-[var(--color-deep-black)] border border-[var(--color-gold)]/20 text-[var(--color-off-white)] px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--color-gold)]/60" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[var(--color-muted-foreground)]">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full bg-[var(--color-deep-black)] border border-[var(--color-gold)]/20 text-[var(--color-off-white)] px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--color-gold)]/60" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[var(--color-muted-foreground)]">Phone Number</label>
            <input 
              name="phone" 
              type="tel"
              pattern="[0-9]{10}"
              required 
              className="w-full bg-[var(--color-deep-black)] border border-[var(--color-gold)]/20 text-[var(--color-off-white)] px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--color-gold)]/60" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-[var(--color-muted-foreground)]">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              minLength={6}
              className="w-full bg-[var(--color-deep-black)] border border-[var(--color-gold)]/20 text-[var(--color-off-white)] px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--color-gold)]/60" 
            />
          </div>

          <GoldButton type="submit" className="w-full h-12" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </GoldButton>
        </form>

        <p className="mt-8 text-center text-[var(--color-muted-foreground)]">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[var(--color-gold)] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
