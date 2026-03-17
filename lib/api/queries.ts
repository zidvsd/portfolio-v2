// src/lib/queries.ts
import { Profile } from "@/models/Profile"
import { Experiences } from "@/models/Experiences"
import { connectDb } from "../db"
import { Achievements } from "@/models/Achievements"
import { unstable_cache } from "next/cache"

export async function getProfile() {
  return unstable_cache(
    async function () {
      await connectDb()
      const data = await Profile.findOne({}).lean()
      return JSON.parse(JSON.stringify(data))
    },
    ["profile-data"],
    { tags: ["profile"], revalidate: 3600 }
  )()
}
export async function getExperience() {
  return unstable_cache(
    async function () {
      await connectDb()
      const data = await Experiences.find({}).sort({ start: -1 }).lean()
      return JSON.parse(JSON.stringify(data))
    },
    ["experience-data"],
    { tags: ["experience"], revalidate: 3600 }
  )()
}
export async function getAchievements() {
  return unstable_cache(
    async function () {
      await connectDb()
      const data = await Achievements.find({}).sort({ start: -1 }).lean()
      return JSON.parse(JSON.stringify(data))
    },
    ["achievements-data"],
    { tags: ["achievements"], revalidate: 3600 }
  )()
}
