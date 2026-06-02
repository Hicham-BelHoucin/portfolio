import OpenAI from 'openai';
import { SYSTEM_PROMPT } from '@/lib/system-prompt';
import { rateLimit, getClientIp } from '@/lib/rate-limiter';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  // ── Origin Verification (CSRF Protection) ───────────────────────
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (origin && host) {
    try {
      const originUrl = new URL(origin);
      if (
        originUrl.host !== host &&
        !originUrl.hostname.endsWith('localhost') &&
        originUrl.hostname !== '127.0.0.1'
      ) {
        return new Response(JSON.stringify({ error: 'Unauthorized origin' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid origin header' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // ── Rate Limiting Check ──────────────────────────────────────────
  const ip = getClientIp(req);
  const limitRes = await rateLimit(ip);

  if (!limitRes.success) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((limitRes.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  // ── Safe JSON Body Parsing ───────────────────────────────────────
  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rawMessages = body?.messages;
  if (!Array.isArray(rawMessages)) {
    return new Response(JSON.stringify({ error: 'Missing or invalid messages array' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ── Input Sanitization & History Bounds ─────────────────────────
  const sanitizedMessages = rawMessages
    .slice(-10) // Limit memory/context size to the last 10 messages
    .filter((msg: any) => msg && typeof msg === 'object' && (msg.role === 'user' || msg.role === 'assistant'))
    .map((msg: any) => ({
      role: msg.role as 'user' | 'assistant',
      content: typeof msg.content === 'string' ? msg.content.slice(0, 1000) : '', // Cap message content length
    }));

  if (sanitizedMessages.length === 0) {
    return new Response(JSON.stringify({ error: 'No valid messages provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const lastUserMessage: string =
    [...sanitizedMessages].reverse().find((m: { role: string }) => m.role === 'user')?.content ?? '';

  const stream = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...sanitizedMessages,
    ],
    stream: true,
    max_tokens: 800,
    temperature: 0.7,
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      let fullText = '';

      // ── Stream main text ──────────────────────────────────────────
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? '';
        if (text) {
          fullText += text;
          controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
        }
      }

      // ── Generate contextual follow-up suggestions ─────────────────
      try {
        const suggestionsCompletion = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'Generate exactly 3 short follow-up question chips (max 7 words each) a recruiter would ask next. ' +
                'ALL chips must be about Hicham Bel Houcin only — his projects, experience, skills, or availability. ' +
                'Return ONLY a valid JSON array of 3 strings.',
            },
            {
              role: 'user',
              content: `User asked: "${lastUserMessage}"\nAssistant replied: "${fullText.slice(0, 500)}"`,
            },
          ],
          max_tokens: 100,
          temperature: 0.5,
        });

        const raw = suggestionsCompletion.choices[0]?.message?.content ?? '[]';
        const match = raw.match(/\[.*\]/s);
        const suggestions = match ? JSON.parse(match[0]) : [];
        if (Array.isArray(suggestions) && suggestions.length > 0) {
          controller.enqueue(encoder.encode(`s:${JSON.stringify(suggestions)}\n`));
        } else throw new Error('bad suggestions');
      } catch {
        controller.enqueue(
          encoder.encode(`s:${JSON.stringify(["What's your tech stack?", 'Show me your projects', 'How can I contact you?'])}\n`)
        );
      }

      controller.close();
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
