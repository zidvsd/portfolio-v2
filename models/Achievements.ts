import mongoose, { Schema, model, models } from "mongoose"

const AchievementsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateIssued: { type: String, required: false },
  issuer: { type: String, required: false },
  alt: { type: String, required: true },
  type: { type: String, required: true },
  supabaseUrl: { type: String, required: true },
})

export const Achievements =
  models.Achievements ||
  model("Achievements", AchievementsSchema, "achievements")
