import mongoose, { Schema, model, models } from "mongoose"

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  headline: { type: String, required: true },
  location: { type: String, required: true },
  workStatus: { type: String, required: true },
  bio: { type: String, required: true },
  socials: {
    github: String,
    linkedin: String,
    email: String,
  },
  skills: [String],
})

export const Profile =
  models.Profile || model("Profile", ProfileSchema, "profile")
