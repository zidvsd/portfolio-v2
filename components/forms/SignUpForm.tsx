"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GithubLogoIcon } from "@phosphor-icons/react"
import Link from "next/link"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignupInput, signupSchema } from "@/lib/schemas/auth.schema"
import { toast } from "sonner"
import { authClient } from "@/lib/auth/auth-client"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupInput) => {
    const { error } = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.email.split("@")[0],
      callbackURL: "/",
    })

    if (error) {
      console.error("Signup Error:", error)
      const errorMessage =
        error.message || "Something went wrong. Please try again."

      toast.error(errorMessage)
    } else {
      toast.success("Account created successfully!")
      reset()
    }
  }

  const handleSocialAuth = async (provider: "github" | "google") => {
    await authClient.signIn.social(
      {
        provider,
        callbackURL: "/dashboard",
      },
      {
        // In newer versions, the second argument IS the fetchOptions object
        onRequest: () => {
          toast.loading("Connecting to account...", { id: "auth-toast" })
        },
        onSuccess: () => {
          toast.success("Redirecting...", { id: "auth-toast" })
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Authentication failed", {
            id: "auth-toast",
          })
        },
      }
    )
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  autoComplete="off"
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-[10px] text-red-500">
                    {errors.email.message}
                  </p>
                )}
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
              </Field>
              <Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      autoComplete="off"
                      {...register("password")}
                      id="password"
                      type="password"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...register("confirmPassword")}
                      id="confirm-password"
                      type="password"
                    />
                  </Field>
                </div>
                {/* Show password errors if they exist */}
                {(errors.password || errors.confirmPassword) && (
                  <p className="mt-1 text-[10px] text-red-500">
                    {errors.password?.message ||
                      errors.confirmPassword?.message}
                  </p>
                )}
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleSocialAuth("github")}
                  variant="outline"
                  type="button"
                >
                  <GithubLogoIcon className="size-5" />
                  <span className="sr-only">Sign up with Github</span>
                </Button>
                <Button
                  onClick={() => handleSocialAuth("google")}
                  variant="outline"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Sign up with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/login">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  )
}
