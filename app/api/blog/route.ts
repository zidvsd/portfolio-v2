import { NextResponse, NextRequest } from "next/server"
import { Blog } from "@/lib/types/blog"
import blogsApi from "@/lib/services/blogs"
export async function POST(req: NextRequest) {
  try {
    const body: Blog = await req.json()
    const { data } = await blogsApi.post("/blogs", body)
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    const status = error.response?.status || 500
    const message = error.response?.data?.message || "Internal Server Error"

    return NextResponse.json({ success: false, message }, { status })
  }
}
