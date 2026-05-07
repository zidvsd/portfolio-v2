import { auth } from "./auth"
import { headers } from "next/headers"
import { cache } from "react"
const getSession = cache(async () => {
  try {
    return await auth.api.getSession({ headers: await headers() })
  } catch {
    return null
  }
})

export const checkSession = async (): Promise<boolean> => {
  const session = await getSession()
  return !!session
}

export const getUserSession = async () => {
  const session = await getSession()
  return session?.user || null
}

export const isAuthenticated = async () => {
  const session = await getSession()
  return !!session && session.user.role === "admin"
}
