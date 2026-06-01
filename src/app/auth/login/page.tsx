"use client"

import { useState } from "react"
import { login } from "@/app/actions/auth"
import { GoldButton } from "@/components/ui/GoldButton"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    const res = await login(formData)
    setLoading(false)

    if (res.error) {
      toast.error("Login Failed", { description: res.error })
    } else {
      toast.success("Welcome Back", { description: "You have successfully logged in." })
      router.push('/account')
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-deep-black)] flex flex-col items-center justify-center py-32 px-4">
      <div className="w-full max-w-md bg-[var(--color-charcoal)] p-8 rounded-sm border border-[var(--color-gold)]/10 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-[var(--color-off-white)] mb-2">Welcome Back</h1>
          <p className="text-[var(--color-muted-foreground)]">Sign in to manage your orders.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <label className="text-sm text-[var(--color-muted-foreground)] flex justify-between">
              Password
              <a href="#" className="text-[var(--color-gold)] hover:underline">Forgot?</a>
            </label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full bg-[var(--color-deep-black)] border border-[var(--color-gold)]/20 text-[var(--color-off-white)] px-4 py-3 rounded-sm focus:outline-none focus:border-[var(--color-gold)]/60" 
            />
          </div>

          <GoldButton type="submit" className="w-full h-12" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </GoldButton>
        </form>

        <p className="mt-8 text-center text-[var(--color-muted-foreground)]">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-[var(--color-gold)] hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}
