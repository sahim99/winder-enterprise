'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { MessageSquare, ArrowRight, Loader2, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function LiveChatsWidget() {
  const [unreadCount, setUnreadCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch('/api/messages?admin=true')
        if (res.ok) {
          const data = await res.json()
          let count = 0
          data.threads?.forEach((t: any) => { count += t.unreadCount || 0 })
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
    <Card className="border border-border/50 bg-card rounded-xl sm:rounded-2xl shadow-xs overflow-hidden flex flex-col h-full">
      <CardHeader className="px-4 py-3 border-b border-border/40 flex flex-row items-center justify-between">
        <div className="flex items-center gap-1.5">
          <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground">Live Chats</CardTitle>
        </div>
        <Link href="/admin/messages" className="text-[11px] font-bold text-primary hover:underline flex items-center gap-0.5">
          Open <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col items-center justify-center bg-muted/10 min-h-[160px] relative">
        {unreadCount === null ? (
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/30" />
        ) : unreadCount > 0 ? (
          <>
            <div className="relative mb-3">
              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center relative">
                <MessageCircle className="h-6 w-6 text-red-500" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-bold border-2 border-card">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              </div>
            </div>
            <p className="text-sm font-bold text-foreground">New Messages!</p>
            <p className="text-[10px] text-muted-foreground mt-1 text-center px-4">
              You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''} waiting.
            </p>
            <Link href="/admin/messages">
              <Button size="sm" className="mt-4 text-[10px] font-bold rounded-full px-4 h-7 bg-red-500 hover:bg-red-600 text-white">
                View Messages
              </Button>
            </Link>
          </>
        ) : (
          <>
            <MessageSquare className="h-8 w-8 text-muted-foreground/30 mb-2" />
            <p className="text-xs font-medium text-foreground">Live Customer Chat Active</p>
            <p className="text-[10px] text-muted-foreground mt-1 text-center px-4">
              All caught up! No unread messages at the moment.
            </p>
            <Link href="/admin/messages">
              <Button size="sm" variant="secondary" className="mt-4 text-[10px] font-bold rounded-full px-4 h-7">
                Go to Messages
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  )
}
