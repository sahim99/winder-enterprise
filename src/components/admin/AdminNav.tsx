'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  LogOut, 
  Upload, 
  Users, 
  MessageSquare, 
  CreditCard, 
  ShieldCheck, 
  Menu, 
  X,
  Store,
  MessageCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ThemeToggle'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Messages', href: '/admin/messages', icon: MessageCircle },
  { label: 'Inventory', href: '/admin/products', icon: Package },
  { label: 'Bulk Uploader', href: '/admin/products/bulk', icon: Upload },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Billing & Invoices', href: '/admin/billing', icon: CreditCard },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Support Tickets', href: '/admin/tickets', icon: MessageSquare },
]

export function AdminNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Poll for unread messages
  React.useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch(`/api/messages?admin=true&_t=${Date.now()}`)
        if (res.ok) {
          const data = await res.json()
          let count = 0
          data.threads?.forEach((t: any) => {
            if (t.unreadCount && t.unreadCount > 0) {
              count += 1
            }
          })
          setUnreadCount(count)
        }
      } catch (e) {
        console.error(e)
      }
    }

    fetchUnread()
    const interval = setInterval(fetchUnread, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl opacity-50" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-3xl opacity-50" />
      </div>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 flex h-14 items-center justify-between px-4 bg-background/60 backdrop-blur-2xl border-b border-border/40 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-muted/50 text-foreground hover:bg-muted active:scale-95 transition-all"
            aria-label="Toggle admin menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-1.5 font-bold text-foreground text-sm">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Admin Panel</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden animate-in fade-in-0 duration-200"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar: Desktop permanent sticky & Mobile slide-out drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-56 lg:w-60 bg-background/60 backdrop-blur-2xl border-r border-border/40 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 md:shadow-none shrink-0 hide-scrollbar",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border/40">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-foreground text-sm leading-tight block">Winder Enterprise</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Admin Panel</span>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto hide-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] relative",
                  isActive 
                    ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground font-medium"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
                {item.label === 'Messages' && unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-border/40 space-y-1">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground bg-muted/30">
            <span className="text-xs font-medium">Appearance</span>
            <ThemeToggle />
          </div>

          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Store className="h-4 w-4" />
            Back to Store
          </Link>

          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await fetch('/api/admin/logout', { method: 'POST' })
              window.location.href = '/admin/login'
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 w-full transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full min-w-0 flex flex-col min-h-screen overflow-x-hidden relative z-10">
        <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
          {children}
        </div>
      </main>
    </div>
  )
}
