import { NextResponse, NextRequest } from "next/server"
import { connectDb } from "@/lib/db"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { Achievements } from "@/models/Achievements"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb()
    const { id } = await params

    if (!id)
      return NextResponse.json(
        { message: "Achievement ID not found" },
        { status: 400 }
      )

    const formData = await req.formData()
    const file = formData.get("image") as File | null
    const achievementJson = formData.get("document") as string

    if (!achievementJson)
      return NextResponse.json({ message: "Missing data" }, { status: 400 })

    const updateData = JSON.parse(achievementJson)

    if (file && file.size > 0) {
      const existing = await Achievements.findById(id)

      if (existing?.supabaseUrl) {
        const oldFileName = existing.supabaseUrl.split("/").pop()
        if (oldFileName) {
          await supabaseAdmin.storage.from("achievements").remove([oldFileName])
        }
      }

      const fileExt = file.name.split(".").pop()
      const fileName = `${updateData.alt || id}-${Date.now()}.${fileExt}`
      const arrayBuffer = await file.arrayBuffer()

      const { error: uploadError } = await supabaseAdmin.storage
        .from("achievements")
        .upload(fileName, arrayBuffer, {
          contentType: file.type,
          upsert: true,
        })

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabaseAdmin.storage.from("achievements").getPublicUrl(fileName)

      updateData.supabaseUrl = publicUrl
    }

    const updated = await Achievements.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!updated)
      return NextResponse.json(
        { message: "Achievement not found" },
        { status: 404 }
      )

    return NextResponse.json(updated, { status: 200 })
  } catch (error: any) {
    console.error("PATCH ACHIEVEMENT ERROR:", error)
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

    if (!id)
      return NextResponse.json(
        { message: "Achievement ID is required" },
        { status: 400 }
      )

    const achievement = await Achievements.findById(id)

    if (!achievement)
      return NextResponse.json(
        { message: "Achievement not found" },
        { status: 404 }
      )

    if (achievement.supabaseUrl) {
      const fileName = achievement.supabaseUrl.split("/").pop()
      if (fileName) {
        const { error: storageError } = await supabaseAdmin.storage
          .from("achievements")
          .remove([fileName])

        if (storageError)
          console.error("Supabase Storage Delete Error:", storageError)
      }
    }

    await Achievements.findByIdAndDelete(id)

    return NextResponse.json(
      { success: true, message: "Achievement and image deleted successfully" },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("DELETE ACHIEVEMENT ERROR:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    )
  }
}
