import mongoose, { Schema, model, models } from "mongoose"

const ExperiencesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    isCurrent: { type: Boolean, required: false },
    mode: { type: String, required: false },
    major: { type: String, required: false },
    responsibilities: {
      type: [String],
      default: [],
    },
    logo: { type: String, required: true },
  },
  { timestamps: true }
)

export const Experiences =
  models.Experiences || model("Experiences", ExperiencesSchema, "experiences")
