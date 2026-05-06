import { SignupForm } from "@/components/forms/SignUpForm"
import { isAuthenticated } from "@/lib/auth/auth-util"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up | Rashid Visda",

  description: "Create an account to access the platform.",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Sign Up",
    description: "Create a new account.",
    url: "https://zidvsd.site/signup",
    type: "website",
  },
}

export default async function SignupPage() {
  const session = await isAuthenticated()
  if (session) {
    redirect("/")
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <SignupForm />
    </div>
  )
}
