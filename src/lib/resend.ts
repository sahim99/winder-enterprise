import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewOrderEmail(order: any) {
  const adminEmail = process.env.ADMIN_EMAIL || 'winderenterprise.admin@gmail.com';
  
  return resend.emails.send({
    from: 'Winder Enterprise <orders@winderenterprise.com>',
    to: adminEmail,
    subject: `New Order Received - #${order.id?.slice(0, 8) || 'Unknown'}`,
    html: `
      <div style="font-family: serif; color: #1a1a1a;">
        <h1 style="color: #C9A84C;">New Order Received</h1>
        <p>A new order has been placed by <strong>${order.customer_name}</strong>.</p>
        <p><strong>Total Amount:</strong> ₹${order.total}</p>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <hr style="border: none; border-top: 1px solid #C9A84C; margin: 20px 0;" />
        <p>Please check the admin dashboard for full details.</p>
      </div>
    `
  });
}
