import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServiceClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ isDeveloper: false }, { status: 401 })
    }

    const isDeveloper = user.email === process.env.DEVELOPER_EMAIL

    if (isDeveloper) {
      await supabase
        .from('profiles')
        .update({ role: 'customer', name: 'Sahim' })
        .eq('id', user.id)
    }

    return NextResponse.json({ isDeveloper })
  } catch {
    return NextResponse.json({ isDeveloper: false }, { status: 500 })
  }
}
