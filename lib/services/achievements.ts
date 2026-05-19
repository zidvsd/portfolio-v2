"use server"

import { connectDb } from "@/lib/db"
import { Achievements } from "@/models/Achievements"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export async function deleteAchievementAction(id: string) {
  try {
    await connectDb()

    const achievement = await Achievements.findById(id)
    if (!achievement)
      return { success: false, message: "Achievement entry not found." }

    const fileName = achievement.supabaseUrl.split("/").pop()
    if (fileName) {
      const { error: storageError } = await supabaseAdmin.storage
        .from("achievements")
        .remove([fileName])

      if (storageError)
        console.error("Supabase Storage Error:", storageError.message)
    }

    await Achievements.findByIdAndDelete(id)

    revalidatePath("/achievements")
    revalidatePath("/studio/achievements")

    return { success: true }
  } catch (error: any) {
    console.error("Delete Error:", error.message)
    return { success: false, message: "Server error during deletion." }
  }
}
