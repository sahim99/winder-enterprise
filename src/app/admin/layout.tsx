import Link from 'next/link'
import { cookies } from 'next/headers'
import { LayoutDashboard, Package, ShoppingBag, LogOut, Upload, Users, MessageSquare, CreditCard, ShieldCheck } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Bulk Uploader', href: '/admin/products/bulk', icon: Upload },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Billing & Invoices', href: '/admin/billing', icon: CreditCard },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Support Tickets', href: '/admin/tickets', icon: MessageSquare },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  const adminPassword = process.env.ADMIN_PASSWORD || 'Sahim@7001'
  const isAuthenticated = token === adminPassword

  // If unauthenticated (such as on /admin/login), render clean page without sidebar
  if (!isAuthenticated) {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="w-64 flex-shrink-0 border-r border-border/50 bg-card flex flex-col shadow-xs">
        <div className="h-16 flex items-center px-6 border-b border-border/40 gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-foreground text-sm leading-tight block">Winder Enterprise</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground active:scale-[0.98] transition-all"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border/40">
          <form action="/api/admin/logout" method="POST">
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
      <main className="flex-1 overflow-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  )
}
