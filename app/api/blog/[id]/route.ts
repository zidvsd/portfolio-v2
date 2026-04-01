import { NextResponse, NextRequest } from "next/server"
import { Blog } from "@/lib/types/blog"
import blogsApi from "@/lib/services/blogs"
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const id = resolvedParams.id
    if (!id)
      return NextResponse.json({ message: "Blog Id not found", status: 401 })

    const body: Blog = await req.json()
    const { data } = await blogsApi.patch(`/blogs/${id}`, body)
    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    const status = error.response?.status || 500
    const message = error.response?.data?.message || "Internal Server Error"

    return NextResponse.json({ success: false, message }, { status })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!id)
      return NextResponse.json({ message: "Blog ID not found", status: 400 })

    const { data } = await blogsApi.delete(`/blogs/${id}`)
    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    // 2. Handle the "Not Found" case from your actual Database
    if (error.response?.status === 404) {
      return NextResponse.json(
        { success: false, message: "Blog post not found in database" },
        { status: 404 }
      )
    }

    const status = error.response?.status || 500
    const message = error.response?.data?.message || "Internal Server Error"

    return NextResponse.json({ success: false, message }, { status })
  }
}
