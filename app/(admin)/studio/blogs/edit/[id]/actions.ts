"use server"

import { getBlogById } from "@/lib/services/queries"

export async function fetchBlogForEdit(blogId: string) {
  return await getBlogById(blogId)
}
