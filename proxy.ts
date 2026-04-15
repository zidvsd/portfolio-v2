import { NextRequest, NextResponse } from "next/server"
import { getUserSession } from "./lib/auth/auth-util"

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
    const session = await getUserSession()
    if (session) {
      return NextResponse.redirect(new URL("/chatroom", request.url))
    }
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

  const session = await getUserSession()

  if (!session) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ message: "unauthenticated" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/login", request.url))
  }

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
