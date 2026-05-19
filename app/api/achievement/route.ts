import { NextResponse, NextRequest } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { connectDb } from "@/lib/db"
import { Achievements } from "@/models/Achievements"

export async function GET(req: NextRequest) {
  try {
    await connectDb()

    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type") as "certificate" | "badge" | null

    const filter: Record<string, any> = {}
    if (type) filter.type = type

    const achievements = await Achievements.find(filter)
      .sort({ dateIssued: -1 })
      .lean()

    return NextResponse.json(achievements, { status: 200 })
  } catch (error: any) {
    console.error("GET ACHIEVEMENTS ERROR:", error.message)
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
    const achievementJson = formData.get("document") as string

    if (!file || !achievementJson) {
      return NextResponse.json(
        { message: "Missing file or data" },
        { status: 400 }
      )
    }

    const achievementData = JSON.parse(achievementJson)

    const fileExt = file.name.split(".").pop()
    const fileName = `${achievementData.alt || "achievement"}.${fileExt}`

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

    const newAchievement = await Achievements.create({
      name: achievementData.name,
      issuer: achievementData.issuer,
      alt: achievementData.alt,
      type: achievementData.type,
      dateIssued: achievementData.dateIssued,
      supabaseUrl: publicUrl,
    })

    return NextResponse.json(newAchievement, { status: 201 })
  } catch (error: any) {
    console.error("POST ACHIEVEMENT ERROR:", error.message)
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
