import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const adminMode = searchParams.get('admin') === 'true'
    const targetUserId = searchParams.get('userId')
    
    // Check authentication
    const cookieStore = await cookies()
    const supabaseClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {}
          }
        }
      }
    )

    const supabaseAdmin = await createServiceClient()
    const { data: { user } } = await supabaseClient.auth.getUser()
    
    if (adminMode) {
      if (targetUserId) {
        const { data, error } = await supabaseAdmin
          .from('chat_messages' as any)
          .select('*')
          .eq('user_id', targetUserId)
          .order('created_at', { ascending: true })
          
        if (error) throw error
        return NextResponse.json({ messages: data })
      } else {
        const { data: messages, error: msgError } = await supabaseAdmin
          .from('chat_messages' as any)
          .select('*')
          .order('created_at', { ascending: false })
          
        if (msgError) throw msgError
        
        const { data: profiles, error: pError } = await supabaseAdmin
          .from('profiles')
          .select('id, name, phone')
          
        if (pError) throw pError
        
        const threads = new Map()
        messages?.forEach((msg: any) => {
          if (!threads.has(msg.user_id)) {
            const profile = profiles?.find(p => p.id === msg.user_id)
            threads.set(msg.user_id, {
              userId: msg.user_id,
              customerName: profile?.name || 'Unknown',
              phone: profile?.phone,
              lastMessage: msg.message,
              lastMessageTime: msg.created_at,
              unreadCount: (!msg.is_read && msg.sender_type === 'customer') ? 1 : 0
            })
          } else {
            const t = threads.get(msg.user_id)
            if (!msg.is_read && msg.sender_type === 'customer') t.unreadCount++
          }
        })
        
        return NextResponse.json({ threads: Array.from(threads.values()) })
      }
    } else {
      if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      
      const { data, error } = await supabaseAdmin
        .from('chat_messages' as any)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        
      if (error) throw error
      return NextResponse.json({ messages: data })
    }
  } catch (error: any) {
    console.error('Messages GET error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, senderType, targetUserId } = body
    
    const supabaseAdmin = await createServiceClient()
    
    if (senderType === 'admin') {
      if (!targetUserId) throw new Error('Target user ID required for admin replies')
      
      const { data, error } = await supabaseAdmin
        .from('chat_messages' as any)
        .insert({
          user_id: targetUserId,
          sender_type: 'admin',
          message,
          is_read: false
        })
        .select()
        .single()
        
      if (error) throw error
      return NextResponse.json({ message: data })
    } else {
      const cookieStore = await cookies()
      const supabaseClient = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() { return cookieStore.getAll() },
            setAll(cookiesToSet) {
              try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
            }
          }
        }
      )
      
      const { data: { user } } = await supabaseClient.auth.getUser()
      if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      
      if (body.phone) {
        await supabaseAdmin
          .from('profiles')
          .update({ phone: body.phone })
          .eq('id', user.id)
      }
      
      // If there's no message (e.g. just saving the phone number), return early
      if (!message) {
        return NextResponse.json({ success: true, phoneSaved: true })
      }
      
      const { data, error } = await supabaseAdmin
        .from('chat_messages' as any)
        .insert({
          user_id: user.id,
          sender_type: 'customer',
          message,
          is_read: false
        })
        .select()
        .single()
        
      if (error) throw error
      return NextResponse.json({ message: data })
    }
  } catch (error: any) {
    console.error('Messages POST error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const readerType = searchParams.get('readerType')
    
    if (!userId) return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    
    const supabaseAdmin = await createServiceClient()
    const targetSenderType = readerType === 'admin' ? 'customer' : 'admin'
    
    const { error } = await supabaseAdmin
      .from('chat_messages' as any)
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('sender_type', targetSenderType)
      .eq('is_read', false)
      
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
