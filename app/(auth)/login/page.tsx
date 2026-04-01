import { LoginForm } from "@/components/forms/LoginForm"
import { isAuthenticated } from "@/lib/auth/auth-util"
import { redirect } from "next/navigation"
export default async function LoginPage() {
  const session = await isAuthenticated()
  if (session) {
    redirect("/")
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
