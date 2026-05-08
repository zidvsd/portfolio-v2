import { NextResponse, NextRequest } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { connectDb } from "@/lib/db"
import { Blog } from "@/models/Blogs"
export async function GET(req: NextRequest) {
  try {
    await connectDb()

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category") as
      | "Development"
      | "Gaming"
      | "Music"
      | "General"
      | null
    const tag = searchParams.get("tag")
    const featured = searchParams.get("featured")
    const skip = (page - 1) * limit

    const filter: Record<string, any> = { isPublished: true }

    if (category) filter.category = category
    if (tag) filter.tags = { $in: [tag] }
    if (featured === "true") filter.isFeatured = true

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .select(
          "title slug description coverImageUrl tags category isFeatured datePublished"
        )
        .sort({ datePublished: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(filter),
    ])

    return NextResponse.json(
      {
        blogs,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("GET BLOGS ERROR:", error.message)
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
export async function POST(req: NextRequest) {
  try {
    await connectDb()
    const formData = await req.formData()

    const file = formData.get("image") as File
    const blogJson = formData.get("document") as string

    if (!file || !blogJson) {
      return NextResponse.json(
        { message: "Missing file or data" },
        { status: 400 }
      )
    }

    const blogData = JSON.parse(blogJson)

    const slug = blogData.slug || "blog-post"
    const fileExt = file.name.split(".").pop()
    const fileName = `${slug}.${fileExt}`
    const filePath = `${fileName}`

    const arrayBuffer = await file.arrayBuffer()

    const { error: uploadError } = await supabaseAdmin.storage
      .from("blog")
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError) throw uploadError

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("blog").getPublicUrl(filePath)

    // 4. Combine URL with MongoDB data
    const finalBlogBody = {
      ...blogData,
      coverImageUrl: publicUrl, // Ensure your MongoDB schema has this field
    }

    const newBlog = await Blog.create({
      title: blogData.title,
      slug: blogData.slug,
      content: blogData.content,
      description: blogData.description,
      tags: blogData.tags,
      category: blogData.category,
      isFeatured: blogData.isFeatured,
      isPublished: blogData.isPublished,
      coverImageUrl: publicUrl,
    })
    return NextResponse.json(newBlog, { status: 201 })
  } catch (error: any) {
    console.error("MONGODB ERROR:", error.message)
    const status = error.response?.status || 500
    const message = error.response?.data?.message || "Internal Server Error"

    return NextResponse.json({ success: false, message }, { status })
  }
}
