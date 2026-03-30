import { authClient } from "./auth-client"
export const checkSession = async (): Promise<boolean> => {
  const { data: session } = await authClient.getSession()
  return !!session
}

export const getUserSession = async () => {
  const { data: session } = await authClient.getSession()
  return session?.user || null
}
