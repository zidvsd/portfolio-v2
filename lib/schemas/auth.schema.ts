import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const signupSchema = z.object({
  name: z.string().min(2, "Name is required."),
  confirmPassword: z.string().min(2, "Name is required."),
})

export type loginInput = z.infer<typeof loginSchema>
export type signupInput = z.infer<typeof signupSchema>
