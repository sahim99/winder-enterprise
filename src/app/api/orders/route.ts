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

    // Call the RPC function to insert order and decrement stock atomically
    const { data, error } = await supabase.rpc('place_order_and_decrement_stock', {
      p_customer_name: parsed.data.customer_name,
      p_phone: parsed.data.phone,
      p_address: parsed.data.address,
      p_pin_code: parsed.data.pin_code,
      p_city: parsed.data.city,
      p_state: parsed.data.state,
      p_items: parsed.data.items,
      p_total: parsed.data.total,
      p_user_id: user?.id ?? null,
    })
    if (error) throw error

    const orderData = data as any
    sendNewOrderEmail(orderData).catch(err => console.error('Email send failed:', err))
    return NextResponse.json({ data: orderData }, { status: 201 })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
