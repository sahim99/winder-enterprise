'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Phone, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Message = {
  id: string
  message: string
  sender_type: 'customer' | 'admin'
  created_at: string
}

export function LiveChatWidget({ profile, userId }: { profile: any, userId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [phone, setPhone] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const fetchMessages = async (markRead: boolean) => {
    try {
      const res = await fetch(`/api/messages?_t=${Date.now()}`)
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages || [])
        // Only mark as read if the chat is actually open
        if (markRead && profile?.id) {
          fetch(`/api/messages?userId=${profile.id}&readerType=customer&_t=${Date.now()}`, { method: 'PATCH' })
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (profile?.phone) {
      setPhone(profile.phone)
    } else {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('winder_customer_phone') : null
      if (stored) setPhone(stored)
    }
  }, [profile])

  // Open phone modal if they click chat but haven't provided phone
  useEffect(() => {
    if (isOpen && !phone) {
      setShowPhoneModal(true)
    }
  }, [isOpen, phone])

  // Poll for messages whether open or closed so we can show the unread badge
  useEffect(() => {
    if (phone) {
      fetchMessages(isOpen)
      const interval = setInterval(() => fetchMessages(isOpen), 5000)
      return () => clearInterval(interval)
    }
  }, [isOpen, phone])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim()) return

    const tempMsg: Message = {
      id: Math.random().toString(),
      message: input.trim(),
      sender_type: 'customer',
      created_at: new Date().toISOString()
    }

    setMessages(prev => [...prev, tempMsg])
    setInput('')
    setIsLoading(true)

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: tempMsg.message, senderType: 'customer', phone })
      })
      fetchMessages()
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const submitPhone = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length >= 10) {
      setShowPhoneModal(false)
      if (typeof window !== 'undefined') {
        localStorage.setItem('winder_customer_phone', phone)
      }
      
      // Save phone to backend immediately
      try {
        await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ senderType: 'customer', phone })
        })
      } catch (e) {
        console.error('Failed to save phone', e)
      }
      
      fetchMessages()
    }
  }

  const unreadCount = messages.filter(m => m.sender_type === 'admin' && !m.is_read).length

  return (
    <>
      {/* Contact Seller Button */}
      <div className="relative inline-block">
        <Button 
          onClick={() => setIsOpen(true)}
          className="mt-4 sm:mt-0 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 shadow-none font-bold rounded-xl"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Seller
        </Button>
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse z-10">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </div>

      {/* Phone Modal */}
      {isOpen && showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-md rounded-2xl p-6 shadow-xl border border-border/50 relative">
            <button onClick={() => setIsOpen(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
            <div className="text-center space-y-2 mb-6">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Verify Mobile Number</h3>
              <p className="text-sm text-muted-foreground">Please enter your 10-digit mobile number to start chatting with Winder Support.</p>
            </div>
            <form onSubmit={submitPhone} className="space-y-4">
              <input
                type="tel"
                required
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-3 rounded-xl border border-border/50 bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
              <Button type="submit" className="w-full rounded-xl py-6 font-bold text-base">
                Start Chat <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Chat Drawer/Window */}
      {isOpen && !showPhoneModal && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[60] w-full sm:w-[380px] h-[100dvh] sm:h-[600px] max-h-[calc(100dvh-5rem)] sm:max-h-[calc(100vh-6rem)] flex flex-col bg-card sm:rounded-2xl shadow-2xl border-t sm:border border-border/50 overflow-hidden animate-in slide-in-from-bottom-10">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-white/10 flex items-center justify-center">
                  <span className="font-bold text-primary-foreground">WE</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Winder Support</h3>
                <p className="text-[10px] text-gray-300 flex items-center gap-1">
                  Usually replies in minutes
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground mt-10">
                <MessageCircle className="h-10 w-10 mx-auto mb-3 opacity-20" />
                <p className="text-sm font-medium">No messages yet.</p>
                <p className="text-xs mt-1">Send a message to start the conversation.</p>
                
                <div className="mt-6 space-y-2">
                  <button onClick={() => setInput("When will my order arrive?")} className="text-xs bg-card border border-border/50 px-3 py-1.5 rounded-full hover:bg-muted transition-colors w-full text-left">
                    "When will my order arrive?"
                  </button>
                  <button onClick={() => setInput("Do you do custom sizes?")} className="text-xs bg-card border border-border/50 px-3 py-1.5 rounded-full hover:bg-muted transition-colors w-full text-left">
                    "Do you do custom sizes?"
                  </button>
                </div>
              </div>
            ) : (
              messages.map(msg => {
                const isCustomer = msg.sender_type === 'customer'
                return (
                  <div key={msg.id} className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      isCustomer 
                        ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                        : 'bg-muted border border-border/50 text-foreground rounded-tl-sm'
                    }`}>
                      <p className="text-[13px] leading-relaxed">{msg.message}</p>
                      <span className={`text-[9px] mt-1 block ${isCustomer ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground'}`}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-card border-t border-border/50 shrink-0">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-muted/50 border border-border/50 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <Button type="submit" size="icon" className="rounded-full h-10 w-10 shrink-0" disabled={isLoading || !input.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </div>
          
        </div>
      )}
    </>
  )
}
