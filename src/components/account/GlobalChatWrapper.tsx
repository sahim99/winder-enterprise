'use client'

import { useAuth } from '@/providers/AuthProvider'
import { LiveChatWidget } from '@/components/account/LiveChatWidget'

export function GlobalChatWrapper() {
  const { user, profile } = useAuth()

  return <LiveChatWidget profile={profile} userId={user?.id} />
}
