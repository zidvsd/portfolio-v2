"use server"

import { getAdminAchievementById } from "@/lib/services/queries"
import { revalidateTag } from "next/cache"

export async function fetchAchievementForEdit(achievementId: string) {
  return await getAdminAchievementById(achievementId)
}

export async function revalidateAchievements() {
  revalidateTag("achievements", "max")
}
