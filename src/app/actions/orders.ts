"use server"

import { createClient } from "@/lib/supabase/server"
import { resend } from "@/lib/resend"

export async function createOrder(data: {
  customerName: string
  customerPhone: string
  customerEmail: string
  shippingAddress: any
  items: any[]
  total: number
}) {
  try {
    const supabase = await createClient()

    // Get current user if logged in
    const { data: { user } } = await supabase.auth.getUser()

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        user_id: user?.id || null,
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        customer_email: data.customerEmail,
        shipping_address: data.shippingAddress,
        items: data.items,
        subtotal: data.total,
        total: data.total,
        status: 'Pending',
        payment_method: 'COD'
      })
      .select()
      .single()

    if (error) throw error

    // Try sending email (don't fail order if email fails)
    if (data.customerEmail) {
      try {
        await resend.emails.send({
          from: 'Winder Enterprise <orders@winderenterprise.com>', // Ensure this domain is verified in Resend, or use onboarding email
          to: data.customerEmail,
          subject: 'Order Confirmation - Winder Enterprise',
          html: `<p>Thank you for your order, ${data.customerName}!</p><p>We will contact you shortly regarding delivery.</p>`
        })
      } catch (e) {
        console.error("Email send failed", e)
      }
    }

    return { success: true, orderId: order.id }
  } catch (error: any) {
    return { error: error.message }
  }
}
