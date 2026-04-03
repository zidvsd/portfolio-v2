import { NextResponse, NextRequest } from "next/server"
import blogsApi from "@/lib/services/blogs"
import { supabaseAdmin } from "@/lib/supabase/admin"
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const file = formData.get("image") as File
    const blogJson = formData.get("document") as string
    const blogData = JSON.parse(blogJson)

    const slug = blogData.slug || "blog-post"
    const fileExt = file.name.split(".").pop()
    const fileName = `${slug}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabaseAdmin.storage
      .from("blog")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError) throw uploadError

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("your-bucket-name").getPublicUrl(filePath)

    // 4. Combine URL with MongoDB data
    const finalBlogBody = {
      ...blogData,
      coverImageUrl: publicUrl, // Ensure your MongoDB schema has this field
    }

    const { data } = await blogsApi.post("/blogs", finalBlogBody)
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    const status = error.response?.status || 500
    const message = error.response?.data?.message || "Internal Server Error"

    return NextResponse.json({ success: false, message }, { status })
  }
}
