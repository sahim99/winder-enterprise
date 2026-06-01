import Link from "next/link"
import { Package, LayoutDashboard, ShoppingCart, LogOut } from "lucide-react"
import { logout } from "@/app/actions/auth"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-deep-black)] pt-20">
      <div className="flex h-[calc(100vh-80px)]">
        
        {/* Sidebar */}
        <aside className="w-64 border-r border-[var(--color-gold)]/10 bg-[var(--color-charcoal)] hidden md:flex flex-col">
          <div className="p-6">
            <h2 className="font-serif text-2xl text-[var(--color-gold)]">Admin Panel</h2>
          </div>
          
          <nav className="flex-1 px-4 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-[var(--color-off-white)] bg-[var(--color-gold)]/10 rounded-sm border border-[var(--color-gold)]/20">
              <LayoutDashboard className="w-5 h-5 text-[var(--color-gold)]" />
              Dashboard
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] hover:bg-[var(--color-deep-black)] transition-colors rounded-sm">
              <Package className="w-5 h-5" />
              Products
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-[var(--color-muted-foreground)] hover:text-[var(--color-gold)] hover:bg-[var(--color-deep-black)] transition-colors rounded-sm">
              <ShoppingCart className="w-5 h-5" />
              Orders
            </Link>
          </nav>

          <div className="p-4 border-t border-[var(--color-gold)]/10">
            <form action={logout}>
              <button type="submit" className="flex items-center gap-3 px-4 py-3 w-full text-[var(--color-muted-foreground)] hover:text-[var(--color-destructive)] transition-colors rounded-sm">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
        
      </div>
    </div>
  )
}
