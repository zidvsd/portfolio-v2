import { NextResponse, NextRequest } from "next/server"
import { connectDb } from "@/lib/db"
import { Comment } from "@/models/Comments"

export async function DELETE(req: NextRequest) {
  try {
    await connectDb()

    const { commentId, userId, userRole } = await req.json()

    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      )
    }

    const comment = await Comment.findById(commentId)

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 })
    }

    const isAdmin = userRole === "admin"

    if (!isAdmin) {
      return NextResponse.json(
        { error: "You do not have permission to delete this comment" },
        { status: 403 }
      )
    }

    await Comment.findByIdAndDelete(commentId)

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
