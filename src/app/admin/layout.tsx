import { cookies } from 'next/headers'
import { AdminNav } from '@/components/admin/AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  const adminPassword = process.env.ADMIN_PASSWORD || 'Sahim@7001'
  const isAuthenticated = token === adminPassword

  // If unauthenticated (such as on /admin/login), render clean full screen without sidebar
  if (!isAuthenticated) {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  return <AdminNav>{children}</AdminNav>
}
