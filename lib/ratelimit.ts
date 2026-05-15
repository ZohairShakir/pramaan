// Basic In-Memory Rate Limiter for Pramaan
// In a production environment, use Redis (e.g., Upstash) for distributed rate limiting.

const rateLimitMap = new Map<string, { count: number, lastReset: number }>();

export async function rateLimit(identifier: string, limit: number = 10, windowMs: number = 60000) {
  const now = Date.now();
  const current = rateLimitMap.get(identifier) || { count: 0, lastReset: now };

  if (now - current.lastReset > windowMs) {
    current.count = 0;
    current.lastReset = now;
  }

  current.count++;
  rateLimitMap.set(identifier, current);

  return {
    success: current.count <= limit,
    limit,
    remaining: Math.max(0, limit - current.count),
    reset: current.lastReset + windowMs
  };
}
