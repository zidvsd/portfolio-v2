"use server"

import { connectDb } from "@/lib/db"
import { Blog } from "@/models/Blogs"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export async function deleteBlogAction(id: string) {
  try {
    await connectDb()

    const blog = await Blog.findById(id)
    if (!blog) return { success: false, message: "Blog entry not found." }

    const fileName = blog.coverImageUrl.split("/").pop()
    if (fileName) {
      const { error: storageError } = await supabaseAdmin.storage
        .from("blog")
        .remove([fileName])

      if (storageError)
        console.error("Supabase Storage Error:", storageError.message)
    }

    await Blog.findByIdAndDelete(id)

    revalidatePath("/blog")
    revalidatePath("/studio/blogs")

    return { success: true }
  } catch (error: any) {
    console.error("Delete Error:", error.message)
    return { success: false, message: "Server error during deletion." }
  }
}
