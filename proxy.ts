import { NextRequest, NextResponse } from "next/server"
import { getUserSession } from "./lib/auth/auth-util"

export const config = {
  // 1. Keep the matcher broad so we can handle logic in the function
  matcher: ["/api/:path*", "/studio/:path*", "/contact/:path*"],
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 2. Define PUBLIC ROUTES (Pages and APIs)
  // We want anyone to see the contact page and use the contact/chat APIs
  const isPublic =
    pathname === "/contact" ||
    pathname.startsWith("/api/contact") ||
    pathname.startsWith("/api/chat") ||
    pathname.startsWith("/api/auth")

  if (isPublic) {
    return NextResponse.next()
  }

  // 3. Define SECRET ROUTES (Studio and Blog Admin)
  const isStudio = pathname.startsWith("/studio")
  const isBlogApi = pathname.startsWith("/api/blog")
  const isProtected = isStudio || isBlogApi

  // If it's not a secret route and not explicitly public (like /profile),
  // you can decide to let it pass or protect it.
  // For a portfolio, we usually let other pages pass.
  if (!isProtected) {
    return NextResponse.next()
  }

  const session = await getUserSession()

  // 4. GUEST CHECK: Trying to access Studio/Blog API without login
  if (!session) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ message: "unauthenticated" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // 5. ROLE CHECK: Logged in but not Rashid (Admin)
  if (session.role !== "admin") {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ message: "forbidden" }, { status: 403 })
    }

    const url = new URL("/", request.url)
    url.searchParams.set("error", "unauthorized")
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
