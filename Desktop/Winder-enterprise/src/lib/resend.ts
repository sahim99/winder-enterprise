import { Resend } from 'resend'
import type { Order } from '@/types/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

interface OrderItem {
  name: string
  quantity: number
  price: number
}

export async function sendNewOrderEmail(order: Order): Promise<void> {
  const itemsList = (order.items as unknown as OrderItem[])
    .map(item => `${item.name} x${item.quantity} — ₹${item.price * item.quantity}`)
    .join('\n')

  await resend.emails.send({
    from: process.env.ADMIN_EMAIL!,
    to: process.env.ADMIN_EMAIL!,
    subject: `New Order #${order.id.slice(0, 8).toUpperCase()} — Winder Enterprise`,
    text: `
New order received!

Customer: ${order.customer_name}
Phone: ${order.phone}
Address: ${order.address}, ${order.city}, ${order.state} — ${order.pin_code}

Items:
${itemsList}

Total: ₹${order.total}

View in admin: ${process.env.NEXT_PUBLIC_SITE_URL}/admin/orders

Winder Enterprise Admin Panel
    `.trim(),
  })
}
