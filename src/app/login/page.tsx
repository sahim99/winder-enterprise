'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

function LoginFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/account'
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginForm) {
    setLoading(true)
    setAuthError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
    if (error) {
      setAuthError(error.message)
      setLoading(false)
      return
    }
    
    // Call mark-developer after login
    await fetch('/api/auth/mark-developer', { method: 'POST' })
    
    window.location.href = redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <Card className="w-full max-w-sm border border-border/60 shadow-lg">
        <CardHeader className="text-center pb-2">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-foreground mb-4 block">
            Winder <span className="font-light text-muted-foreground">Enterprise</span>
          </Link>
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {authError && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                {authError}
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} placeholder="you@example.com" />
              {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} placeholder="••••••••" />
              {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full h-11 rounded-full font-medium" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-foreground font-medium hover:underline">Register</Link>
          </p>
          <div className="mt-6 border-t border-border/40 pt-4 text-center">
            <button 
              onClick={async () => {
                setLoading(true)
                setAuthError('')
                try {
                  const res = await fetch('/api/auth/dev-login', { method: 'POST' })
                  if (!res.ok) {
                    const data = await res.json()
                    throw new Error(data.error || 'Failed to login as demo customer')
                  }
                  await fetch('/api/auth/mark-developer', { method: 'POST' })
                  window.location.href = redirect
                } catch (err: any) {
                  setAuthError(err.message)
                  setLoading(false)
                }
              }}
              disabled={loading}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer"
            >
              Demo Customer Login (Bypass)
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  )
}
