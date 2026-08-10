import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

// Direct service role client - no cookies, no middleware interference
function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const adminMode = searchParams.get('admin') === 'true'
    const targetUserId = searchParams.get('userId')

    const supabaseAdmin = getServiceClient()

    if (adminMode) {
      if (targetUserId) {
        const { data, error } = await supabaseAdmin
          .from('chat_messages')
          .select('*')
          .eq('user_id', targetUserId)
          .order('created_at', { ascending: true })

        if (error) throw error
        return NextResponse.json({ messages: data })
      } else {
        const { data: messages, error: msgError } = await supabaseAdmin
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: false })

        if (msgError) throw msgError

        const { data: profiles, error: pError } = await supabaseAdmin
          .from('profiles')
          .select('id, name, phone')

        if (pError) throw pError

        const threads = new Map()
        messages?.forEach((msg: { user_id: string; message: string; created_at: string; is_read: boolean; sender_type: string }) => {
          if (!threads.has(msg.user_id)) {
            const profile = profiles?.find((p: { id: string; name: string; phone: string | null }) => p.id === msg.user_id)
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
      // Customer mode - need their user identity from Supabase Auth cookie
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

      const { data, error } = await supabaseAdmin
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })

      if (error) throw error
      return NextResponse.json({ messages: data })
    }
  } catch (error: unknown) {
    console.error('Messages GET error:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, senderType, targetUserId } = body

    const supabaseAdmin = getServiceClient()

    if (senderType === 'admin') {
      if (!targetUserId) {
        return NextResponse.json({ error: 'Target user ID required for admin replies' }, { status: 400 })
      }
      if (!message || !message.trim()) {
        return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 })
      }

      const { data, error } = await supabaseAdmin
        .from('chat_messages')
        .insert({
          user_id: targetUserId,
          sender_type: 'admin',
          message: message.trim(),
          is_read: false
        })
        .select()
        .single()

      if (error) {
        console.error('Admin insert error:', JSON.stringify(error))
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ message: data })

    } else {
      // Customer message
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

      // Save phone if provided
      if (body.phone) {
        await supabaseAdmin
          .from('profiles')
          .upsert({ 
            id: user.id, 
            phone: body.phone, 
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'Customer'
          }, { onConflict: 'id' })
      }

      // Phone-only save (no message)
      if (!message || !message.trim()) {
        return NextResponse.json({ success: true, phoneSaved: true })
      }

      const { data, error } = await supabaseAdmin
        .from('chat_messages')
        .insert({
          user_id: user.id,
          sender_type: 'customer',
          message: message.trim(),
          is_read: false
        })
        .select()
        .single()

      if (error) {
        console.error('Customer insert error:', JSON.stringify(error))
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ message: data })
    }
  } catch (error: unknown) {
    console.error('Messages POST error:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const readerType = searchParams.get('readerType')

    if (!userId) return NextResponse.json({ error: 'User ID required' }, { status: 400 })

    const supabaseAdmin = getServiceClient()
    const targetSenderType = readerType === 'admin' ? 'customer' : 'admin'

    const { error } = await supabaseAdmin
      .from('chat_messages')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('sender_type', targetSenderType)
      .eq('is_read', false)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Messages PATCH error:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
