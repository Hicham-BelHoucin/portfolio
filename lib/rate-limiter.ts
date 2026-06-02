const WINDOW_SIZE_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

// Global in-memory cache for IP rate limiting
const ipCache = new Map<string, number[]>();

/**
 * Extracts the client IP address from the request headers.
 */
export function getClientIp(req: Request): string {
  const xForwardedFor = req.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    const ips = xForwardedFor.split(',');
    return ips[0].trim();
  }
  const xRealIp = req.headers.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();

  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp.trim();

  return '127.0.0.1'; // local fallback
}

/**
 * In-memory sliding window rate limiter.
 */
export function checkRateLimitInMemory(
  ip: string,
  limit = MAX_REQUESTS,
  windowMs = WINDOW_SIZE_MS
): { success: boolean; limit: number; remaining: number; reset: number } {
  const now = Date.now();
  let timestamps = ipCache.get(ip) || [];

  // Filter out timestamps older than the window
  timestamps = timestamps.filter(time => now - time < windowMs);

  if (timestamps.length >= limit) {
    const oldestTimestamp = timestamps[0];
    const reset = oldestTimestamp + windowMs;
    return {
      success: false,
      limit,
      remaining: 0,
      reset,
    };
  }

  timestamps.push(now);
  ipCache.set(ip, timestamps);

  return {
    success: true,
    limit,
    remaining: limit - timestamps.length,
    reset: now + windowMs,
  };
}

/**
 * Redis-based fixed window rate limiter using Upstash REST API.
 */
async function checkRateLimitRedis(
  ip: string,
  limit = MAX_REQUESTS,
  windowSeconds = 60
): Promise<{ success: boolean; limit: number; remaining: number; reset: number } | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const now = Math.floor(Date.now() / 1000);
  const currentWindow = Math.floor(now / windowSeconds);
  const key = `rate_limit:${ip}:${currentWindow}`;

  try {
    const response = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, windowSeconds * 2],
      ]),
    });

    if (!response.ok) {
      console.warn('Upstash Redis pipeline failed with status:', response.status);
      return null;
    }

    const data = await response.json();
    const count = data[0]?.[1];
    if (typeof count !== 'number') {
      return null;
    }

    const remaining = Math.max(0, limit - count);
    const reset = (currentWindow + 1) * windowSeconds * 1000;

    return {
      success: count <= limit,
      limit,
      remaining,
      reset,
    };
  } catch (error) {
    console.error('Failed to query Upstash Redis:', error);
    return null;
  }
}

/**
 * Main rate limit checker. Automatically uses Upstash Redis if available, or falls back to in-memory.
 */
export async function rateLimit(
  ip: string,
  limit = MAX_REQUESTS,
  windowSeconds = 60
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const redisResult = await checkRateLimitRedis(ip, limit, windowSeconds);
  if (redisResult !== null) {
    return redisResult;
  }
  return checkRateLimitInMemory(ip, limit, windowSeconds * 1000);
}
