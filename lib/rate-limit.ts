import { NextRequest } from "next/server"

type RateLimitOptions = {
  limit: number
  windowMs: number
}

type RateLimitEntry = {
  count: number
  expiresAt: number
}

const store = new Map<string, RateLimitEntry>()

function getIP(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "anonymous"
  )
}

export async function checkRateLimit(
  req: NextRequest,
  options: RateLimitOptions
): Promise<{ rateLimited: boolean }> {
  const ip = getIP(req)
  const now = Date.now()

  const key = `${ip}`

  const entry = store.get(key)

  // reset window if expired or missing
  if (!entry || now > entry.expiresAt) {
    store.set(key, {
      count: 1,
      expiresAt: now + options.windowMs,
    })

    return { rateLimited: false }
  }

  // block if exceeded
  if (entry.count >= options.limit) {
    return { rateLimited: true }
  }

  // increment
  entry.count += 1
  store.set(key, entry)

  return { rateLimited: false }
}
