import { NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "./lib/auth/auth-util"
// Limit the proxy to paths starting with `/api/`
export const config = {
  matcher: ["/api/((?!auth).*)"],
}
export async function proxy(request: NextRequest) {
  const authenticated = await isAuthenticated()
  // Call our authentication function to check the request
  if (!authenticated) {
    // Force a JSON response for all /api routes
    if (request.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json(
        { success: false, message: "authentication failed" },
        { status: 401 }
      )
    }

    // Redirect to login ONLY for page requests
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}
