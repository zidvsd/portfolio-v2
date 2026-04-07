import { NextResponse, NextRequest } from "next/server"
import { connectDb } from "@/lib/db"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { Blog } from "@/models/Blogs"
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb()
    const { id } = await params

    if (!id)
      return NextResponse.json(
        { message: "Blog ID not found" },
        { status: 400 }
      )

    const formData = await req.formData()
    const file = formData.get("image") as File | null
    const blogJson = formData.get("document") as string

    if (!blogJson)
      return NextResponse.json({ message: "Missing data" }, { status: 400 })

    const updateData = JSON.parse(blogJson)

    // 1. Handle Image Replacement if a new file is provided
    if (file && file.size > 0) {
      // Find the existing blog to get the old image path
      const existingBlog = await Blog.findById(id)

      if (existingBlog?.coverImageUrl) {
        const oldFileName = existingBlog.coverImageUrl.split("/").pop()
        if (oldFileName) {
          // Delete the old image from Supabase
          await supabaseAdmin.storage.from("blog").remove([oldFileName])
        }
      }

      // Upload the new image
      const fileExt = file.name.split(".").pop()
      const fileName = `${updateData.slug || id}-${Date.now()}.${fileExt}`
      const arrayBuffer = await file.arrayBuffer()

      const { error: uploadError } = await supabaseAdmin.storage
        .from("blog")
        .upload(fileName, arrayBuffer, {
          contentType: file.type,
          upsert: true,
        })

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabaseAdmin.storage.from("blog").getPublicUrl(fileName)

      // Update the URL in our data object
      updateData.coverImageUrl = publicUrl
    }

    // 2. Update MongoDB with the new data
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(updatedBlog, { status: 200 })
  } catch (error: any) {
    console.error("PATCH ERROR:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb()
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      )
    }

    const blogToDelete = await Blog.findById(id)

    if (!blogToDelete) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 })
    }

    const imageUrl = blogToDelete.coverImageUrl
    if (imageUrl) {
      const fileName = imageUrl.split("/").pop()

      if (fileName) {
        // 3. Delete from Supabase Storage
        const { error: storageError } = await supabaseAdmin.storage
          .from("blog")
          .remove([fileName])

        if (storageError) {
          console.error("Supabase Storage Delete Error:", storageError)
        }
      }
    }

    await Blog.findByIdAndDelete(id)

    return NextResponse.json(
      {
        success: true,
        message: "Blog and associated image deleted successfully",
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("DELETE ERROR:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
