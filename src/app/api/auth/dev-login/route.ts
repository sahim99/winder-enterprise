import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const email = process.env.DEVELOPER_EMAIL
    const password = process.env.ADMIN_PASSWORD

    if (!email || !password) {
      return NextResponse.json({ error: 'Developer credentials not configured' }, { status: 400 })
    }

    const supabase = await createClient()
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
