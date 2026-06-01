import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'
import { sendNewOrderEmail } from '@/lib/resend'

const orderSchema = z.object({
  customer_name: z.string().min(2),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  address: z.string().min(10),
  pin_code: z.string().regex(/^\d{6}$/),
  city: z.string().min(2),
  state: z.string().min(2),
  items: z.array(z.object({
    product_id: z.string().uuid(),
    name: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
    image: z.string(),
  })).min(1),
  total: z.number().positive(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = orderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid order data', details: parsed.error.flatten() }, { status: 400 })
    }
    const supabase = await createServiceClient()

    // Get user_id from auth if logged in
    const { createClient: createServerSupabase } = await import('@/lib/supabase/server')
    const authClient = await createServerSupabase()
    const { data: { user } } = await authClient.auth.getUser()

    const { data, error } = await supabase.from('orders').insert({
      ...parsed.data,
      user_id: user?.id ?? null,
    } as any).select().single()
    if (error) throw error
    sendNewOrderEmail(data).catch(err => console.error('Email send failed:', err))
    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
