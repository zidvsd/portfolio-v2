import { LoginForm } from "@/components/forms/LoginForm"
import { isAuthenticated } from "@/lib/auth/auth-util"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | Rashid Visda",

  description: "Sign in to access your account.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Login",
    description: "Sign in to your account.",
    url: "https://zidvsd.site/login",
    type: "website",
  },
}

export default async function LoginPage() {
  const session = await isAuthenticated()
  if (session) {
    redirect("/chatroom")
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
