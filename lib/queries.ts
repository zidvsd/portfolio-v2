// src/lib/queries.ts
import { Profile } from "@/models/Profile"
import { Experiences } from "@/models/Experiences"
import { connectDb } from "./db"
export async function getProfile() {
  await connectDb()
  const data = await Profile.findOne({}).lean()
  return JSON.parse(JSON.stringify(data))
}
export async function getExperience() {
  await connectDb()
  const data = await Experiences.find({}).sort({ start: -1 }).lean()
  return JSON.parse(JSON.stringify(data))
}
