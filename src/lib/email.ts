// lib/email.ts
export async function sendOrderConfirmation(email: string, orderId: string) {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: 'YOUR_SERVICE_ID',
      template_id: 'YOUR_TEMPLATE_ID',
      user_id: 'YOUR_USER_ID',
      template_params: {
        to_email: email,
        order_id: orderId,
      },
    }),
  });

  if (!res.ok) throw new Error('Failed to send email');
}