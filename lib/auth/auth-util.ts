import { auth } from "./auth"
import { headers } from "next/headers"

// 1. Optimized for Server Components/Middleware
export const checkSession = async (): Promise<boolean> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return !!session
}

// 2. Get User Data directly from the database/session store
export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session?.user || null
}

// 3. Keep this as your standard "Gatekeeper" check
export const isAuthenticated = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.role !== "admin") {
    return false
  }
  return !!session
}
