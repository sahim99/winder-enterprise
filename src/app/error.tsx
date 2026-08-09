'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RotateCcw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-card border border-border/50 p-8 rounded-3xl shadow-lg">
        <div className="h-16 w-16 mx-auto rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
          <span className="text-2xl font-bold">!</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
          <p className="text-sm text-muted-foreground">
            We encountered an unexpected issue. Please try refreshing the page or head back to the home page.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button onClick={() => reset()} className="rounded-full gap-2">
            <RotateCcw className="h-4 w-4" /> Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full rounded-full gap-2">
              <Home className="h-4 w-4" /> Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
