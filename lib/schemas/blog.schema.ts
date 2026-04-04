import { z } from "zod"

export const BlogSchema = z.object({
  title: z.string().min(5, "Title is too short"),
  slug: z.string().min(5),
  description: z.string().min(10, "Description is too short"),
  content: z.string().min(20, "Content is required"),
  category: z.enum(["Development", "Gaming", "Music", "General"]),
  tags: z.string(),
  isFeatured: z.boolean(),
  isPublished: z.boolean().default(true),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Cover image is required"),
})
export type BlogFormData = z.input<typeof BlogSchema>
export type BlogFormOutput = z.output<typeof BlogSchema>
