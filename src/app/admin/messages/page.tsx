'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, Search, Send, User, Phone, MapPin, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ChatThread = {
  userId: string
  customerName: string
  phone: string | null
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}

type Message = {
  id: string
  message: string
  sender_type: 'customer' | 'admin'
  created_at: string
}

export default function AdminMessagesPage() {
  const [threads, setThreads] = useState<ChatThread[]>([])
  const [activeUserId, setActiveUserId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const fetchThreads = async () => {
    try {
      const res = await fetch(`/api/messages?admin=true&_t=${Date.now()}`)
      if (res.ok) {
        const data = await res.json()
        setThreads(data.threads || [])
      }
    } catch (e) {
      console.error(e)
    }
  }

  const fetchMessages = async (userId: string) => {
    try {
      const res = await fetch(`/api/messages?admin=true&userId=${userId}&_t=${Date.now()}`)
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages || [])
        // Mark as read
        fetch(`/api/messages?userId=${userId}&readerType=admin`, { method: 'PATCH' })
        
        // Optimistically update local thread unread count
        setThreads(prev => prev.map(t => t.userId === userId ? { ...t, unreadCount: 0 } : t))
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchThreads()
    const interval = setInterval(fetchThreads, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (activeUserId) {
      fetchMessages(activeUserId)
      const interval = setInterval(() => fetchMessages(activeUserId), 5000)
      return () => clearInterval(interval)
    }
  }, [activeUserId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || !activeUserId) return

    const tempMsg: Message = {
      id: Math.random().toString(),
      message: input.trim(),
      sender_type: 'admin',
      created_at: new Date().toISOString()
    }

    setMessages(prev => [...prev, tempMsg])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: tempMsg.message, senderType: 'admin', targetUserId: activeUserId })
      })
      if (!res.ok) {
        const text = await res.text()
        alert('Failed to send message: ' + text)
        // Remove optimistic update if failed
        setMessages(prev => prev.filter(m => m.id !== tempMsg.id))
      }
      fetchMessages(activeUserId)
      fetchThreads()
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const activeThread = threads.find(t => t.userId === activeUserId)
  
  const filteredThreads = threads.filter(t => 
    t.customerName.toLowerCase().includes(search.toLowerCase()) || 
    (t.phone && t.phone.includes(search))
  )

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-6rem)] gap-4">
      
      {/* Left Pane: Thread List */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-card border border-border/50 rounded-2xl flex flex-col overflow-hidden shadow-xs">
        <div className="p-4 border-b border-border/40 shrink-0">
          <h2 className="text-lg font-black text-foreground mb-3 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" /> Active Chats
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-border/30">
          {filteredThreads.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-sm">No conversations found.</p>
            </div>
          ) : (
            filteredThreads.map(thread => (
              <button
                key={thread.userId}
                onClick={() => setActiveUserId(thread.userId)}
                className={`w-full p-4 text-left hover:bg-muted/30 transition-colors flex items-start gap-3 ${activeUserId === thread.userId ? 'bg-primary/5 border-l-2 border-l-primary' : ''}`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-bold text-primary">{thread.customerName.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-foreground truncate pr-2">{thread.customerName}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {new Date(thread.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{thread.lastMessage}</p>
                </div>
                {thread.unreadCount > 0 && (
                  <div className="bg-primary text-primary-foreground text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shrink-0">
                    {thread.unreadCount}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right Pane: Chat Thread */}
      <div className="flex-1 min-w-0 bg-card border border-border/50 rounded-2xl flex flex-col overflow-hidden shadow-xs relative">
        {!activeUserId ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 opacity-50" />
            </div>
            <p className="font-medium text-foreground">Select a conversation</p>
            <p className="text-sm mt-1">Choose a customer from the left to start chatting.</p>
          </div>
        ) : (
          <>
            {/* Thread Header */}
            <div className="p-4 border-b border-border/40 flex items-center justify-between bg-muted/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-bold text-primary">{activeThread?.customerName.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{activeThread?.customerName}</h3>
                  {activeThread?.phone && (
                    <a href={`https://wa.me/91${activeThread.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-xs text-emerald-600 hover:underline flex items-center gap-1 mt-0.5 font-medium">
                      <Phone className="h-3 w-3" /> {activeThread.phone} (WhatsApp)
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground mt-10">No messages found.</div>
              ) : (
                messages.map(msg => {
                  const isAdmin = msg.sender_type === 'admin'
                  return (
                    <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        isAdmin 
                          ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                          : 'bg-card border border-border/50 text-foreground rounded-tl-sm'
                      }`}>
                        <p className="text-[14px] leading-relaxed">{msg.message}</p>
                        <span className={`text-[10px] mt-1 flex items-center gap-1 ${isAdmin ? 'justify-end text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {isAdmin && <CheckCircle2 className="h-3 w-3" />}
                        </span>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 bg-card border-t border-border/40 shrink-0">
              <div className="flex gap-2 mb-3">
                <button onClick={() => setInput("Hi! How can we help you today?")} className="text-xs bg-muted/50 border border-border/50 px-3 py-1.5 rounded-full hover:bg-muted font-medium transition-colors">
                  Greeting
                </button>
                <button onClick={() => setInput("Your order is being processed and will be shipped soon.")} className="text-xs bg-muted/50 border border-border/50 px-3 py-1.5 rounded-full hover:bg-muted font-medium transition-colors">
                  Processing update
                </button>
                <button onClick={() => setInput("Could you please share your order number?")} className="text-xs bg-muted/50 border border-border/50 px-3 py-1.5 rounded-full hover:bg-muted font-medium transition-colors">
                  Ask Order No.
                </button>
              </div>
              <form onSubmit={handleSend} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-muted/30 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <Button type="submit" className="rounded-xl h-12 px-6 font-bold" disabled={isLoading || !input.trim()}>
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5 mr-2" />}
                  Send
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
