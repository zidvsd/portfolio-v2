import { NextRequest, NextResponse } from "next/server"

const SESSION_COOKIE = "better-auth.session_token"

export const config = {
  // 1. Keep the matcher broad so we can handle logic in the function
  matcher: [
    "/api/:path*",
    "/studio/:path*",
    "/contact/:path*",
    "/login",
    "/signup",
  ],
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAuthPage = pathname === "/login" || pathname === "/signup"
  if (isAuthPage) {
    return NextResponse.next()
  }

  const isPublic =
    pathname === "/contact" ||
    pathname.startsWith("/api/contact") ||
    pathname.startsWith("/api/chat") ||
    pathname.startsWith("/api/auth")

  if (isPublic) {
    return NextResponse.next()
  }

  const isStudio = pathname.startsWith("/studio")
  const isBlogApi = pathname.startsWith("/api/blog")
  const isProtected = isStudio || isBlogApi

  if (!isProtected) {
    return NextResponse.next()
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE)

  if (!sessionCookie) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ message: "unauthenticated" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}
