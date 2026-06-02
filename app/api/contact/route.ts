import { rateLimit, getClientIp } from '@/lib/rate-limiter';

export const runtime = 'edge';

export async function POST(req: Request) {
  // ── Rate Limiting (Max 3 messages per hour per IP) ────────────────
  const ip = getClientIp(req);
  const limitRes = await rateLimit(ip, 3, 3600); // 3 requests per 3600 seconds (1 hour)

  if (!limitRes.success) {
    return new Response(
      JSON.stringify({ error: 'Too many messages. Please try again in an hour.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((limitRes.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // ── Input Verification & Sanitization ───────────────────────────
  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, contactInfo, message } = body;
  if (!name?.trim() || !contactInfo?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ error: 'All fields are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cleanName = name.trim().slice(0, 100);
  const cleanContactInfo = contactInfo.trim().slice(0, 150);
  const cleanMessage = message.trim().slice(0, 2000);

  // ── Server-Side Notification Logging ────────────────────────────
  console.log(`[CONTACT FORM SUBMISSION]
Name: ${cleanName}
Contact: ${cleanContactInfo}
IP: ${ip}
Message: ${cleanMessage}
`);

  const resendKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  let sent = false;

  // ── 1. Resend Email Dispatch (if configured) ──────────────────────
  if (resendKey) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Lead <onboarding@resend.dev>',
          to: 'belhoucin.hicham@gmail.com',
          subject: `💼 New Lead from Portfolio: ${cleanName}`,
          html: `<h3>New Lead Captured from Chatbot Form</h3>
                 <p><strong>Name:</strong> ${cleanName}</p>
                 <p><strong>Contact Info:</strong> ${cleanContactInfo}</p>
                 <p><strong>Message:</strong></p>
                 <p style="white-space: pre-wrap; background: #f4f4f5; padding: 12px; border-radius: 8px;">${cleanMessage}</p>`,
        }),
      });
      if (emailRes.ok) {
        sent = true;
        console.log('Notification email successfully sent via Resend API.');
      } else {
        console.warn('Resend API returned error status:', emailRes.status);
      }
    } catch (e) {
      console.error('Failed to send email notification:', e);
    }
  }

  // ── 2. Webhook Dispatch (if configured and email failed/skipped) ──
  if (!sent && webhookUrl) {
    try {
      const webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [
            {
              title: `💼 New Chatbot Contact Lead`,
              description: `A user left their details directly inside the chat.`,
              fields: [
                { name: 'Name', value: cleanName, inline: true },
                { name: 'Contact Info', value: cleanContactInfo, inline: true },
                { name: 'Message', value: cleanMessage },
              ],
              color: 9062390, // Soft violet/purple accent
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
      if (webhookRes.ok) {
        sent = true;
        console.log('Notification successfully pushed via Webhook.');
      } else {
        console.warn('Webhook dispatch failed status:', webhookRes.status);
      }
    } catch (e) {
      console.error('Failed to send webhook notification:', e);
    }
  }

  return new Response(JSON.stringify({ success: true, sent }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
