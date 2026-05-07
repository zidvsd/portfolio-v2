import { auth } from "./auth"
import { headers } from "next/headers"

export const checkSession = async (): Promise<boolean> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return !!session
}

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session?.user || null
}

export const isAuthenticated = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.role !== "admin") {
    return false
  }
  return !!session
}
