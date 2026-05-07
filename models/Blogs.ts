import mongoose, { model, models } from "mongoose"

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }], // Your hashtags: ["NextJS", "Gaming", "ToneHunt"]
  isFeatured: {
    type: Boolean,
    default: false,
  },

  coverImageUrl: { type: String, required: true },

  category: {
    type: String,
    required: true,
    enum: ["Development", "Gaming", "Music", "General"],
  },

  datePublished: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
})

export const Blog = models.Blog || model("Blog", BlogSchema, "blogs")
