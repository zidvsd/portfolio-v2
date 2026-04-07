import mongoose, { model, models } from "mongoose"

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true }, // Store Markdown here
  description: { type: String, required: true },
  tags: [{ type: String }], // Your hashtags: ["NextJS", "Gaming", "ToneHunt"]
  isFeatured: {
    type: Boolean,
    default: false,
  },

  // Supabase Storage
  coverImageUrl: { type: String, required: true }, // The URL from your Supabase bucket

  // Metadata
  category: {
    type: String,
    required: true,
    enum: ["Development", "Gaming", "Music", "General"], // Restricts categories
  },

  datePublished: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
})

export const Blog = models.Blog || model("Blog", BlogSchema, "blogs")
