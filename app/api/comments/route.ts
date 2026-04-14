import { NextResponse, NextRequest } from "next/server"
import { connectDb } from "@/lib/db"
import { Comment } from "@/models/Comments"
import User from "@/models/User"
import mongoose from "mongoose"
import { auth } from "@/lib/auth/auth"
export async function GET(req: NextRequest) {
  try {
    await connectDb()
    const UserModel = mongoose.models.User || User
    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type")
    const blogId = searchParams.get("blogId")

    let query: any = {}

    if (type === "global") {
      query = { type: "global" }
    } else if (blogId) {
      query = { blogPost: blogId }
    }

    const messages = await Comment.find(query)
      .populate({
        path: "author",
        model: UserModel, // <--- EXPLICITLY PASS THE MODEL OBJECT HERE
        select: "name image",
      })
      .sort({ createdAt: 1 })
      .limit(50)

    return NextResponse.json(messages, { status: 200 })
  } catch (error: any) {
    console.error("Comments GET error:", error.message)
    return NextResponse.json(
      { error: error.message || "Failed to fetch comments" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb()
    const session = await auth.api.getSession({
      headers: req.headers,
    })

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await User.findOne({
      email: session.user.email,
    })

    if (!user) {
      console.log("Looking for email:", session.user.email) // Debugging
      return NextResponse.json(
        { error: "User record not found in DB" },
        { status: 404 }
      )
    }
    const body = await req.json()
    const { content, blogId, type } = body

    const newComment = await Comment.create({
      content,
      author: user._id, // ✅ ALWAYS correct
      type: type || (blogId ? "blog" : "global"),
      blogPost: blogId || undefined,
    })

    const populatedComment = await Comment.findById(newComment._id).populate(
      "author",
      "name image"
    )

    return NextResponse.json(populatedComment, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
