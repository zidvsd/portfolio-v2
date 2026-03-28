import { z } from "zod"

export const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be atleast 5 characters"),
  message: z.string().min(10, "Subject must atleast be 10 characters").max(300),
})

export type ContactInput = z.infer<typeof ContactSchema>
