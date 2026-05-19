import { z } from "zod"

export const AchievementSchema = z.object({
  name: z.string().min(1, "Name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  alt: z.string().min(1, "Alt text is required"),
  type: z.enum(["certificate", "badge"]),
  dateIssued: z.string().min(1, "Date issued is required"),
  image: z.any().optional(),
})

export type AchievementFormData = z.infer<typeof AchievementSchema>
