// src/lib/queries.ts
import { Profile } from "@/models/Profile"
import { Experiences } from "@/models/Experiences"
import { connectDb } from "../db"
import { Achievements } from "@/models/Achievements"
import { Blog } from "@/models/Blogs"
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
      const data = await Achievements.find({}).sort({ dateIssued: -1 }).lean()
      return JSON.parse(JSON.stringify(data))
    },
    ["achievements-data-v2"],
    { tags: ["achievements"], revalidate: 3600 }
  )()
}
export async function getBlogs() {
  return unstable_cache(
    async function () {
      await connectDb()
      const data = await Blog.find({}).sort({ datePublished: -1 }).lean()
      return JSON.parse(JSON.stringify(data))
    },
    ["blog-data"],
    { tags: ["blogs"], revalidate: 3600 }
  )()
}
export async function getBlogBySlug(blogSlug: string) {
  return unstable_cache(
    async function () {
      await connectDb()
      const blog = await Blog.findOne({ slug: blogSlug }).lean()
      return blog ? JSON.parse(JSON.stringify(blog)) : null
    },
    ["blog-data", blogSlug],
    { tags: ["blogs", `blog-${blogSlug}`], revalidate: 3600 }
  )()
}
export async function getBlogById(blogId: string) {
  return unstable_cache(
    async function () {
      await connectDb()
      const blog = await Blog.findOne({ _id: blogId }).lean()
      return blog ? JSON.parse(JSON.stringify(blog)) : null
    },
    ["blog-data", blogId],
    { tags: ["blogs", `blog-${blogId}`], revalidate: 3600 }
  )()
}

export async function getRelatedBlogs(category: string, currentSlug: string) {
  await connectDb()

  const related = await Blog.find({
    category: category,
    slug: { $ne: currentSlug },
    isPublished: true,
  })
    .limit(2)
    .sort({ datePublished: -1 })
    .lean()

  return JSON.parse(JSON.stringify(related))
}
