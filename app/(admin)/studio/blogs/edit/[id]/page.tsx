"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import BlogForm from "@/components/forms/BlogForm"
import { Spinner } from "@/components/ui/spinner"
import { fetchBlogForEdit } from "./actions"

export default function EditBlogPage() {
  const { id } = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 1. Fetch the existing blog data on mount using server action
  useEffect(() => {
    const loadBlog = async () => {
      try {
        const blogData = await fetchBlogForEdit(id as string)
        if (!blogData) {
          toast.error("Blog not found")
          router.push("/studio/blogs")
          return
        }
        setBlog(blogData)
      } catch (error) {
        toast.error("Failed to load blog data")
        router.push("/studio/blogs")
      } finally {
        setLoading(false)
      }
    }

    if (id) loadBlog()
  }, [id, router])

  const handleUpdateBlog = async (formData: FormData) => {
    const toastId = toast.loading("Updating your story...")

    try {
      // 2. Use PATCH/PUT and include the ID
      const response = await axios.patch(`/api/blog/${id}`, formData)

      if (response.status === 200) {
        toast.success("Blog updated successfully!", { id: toastId })

        setTimeout(() => {
          router.push("/blog")
          router.refresh()
        }, 1500)
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      const errorMessage =
        err.response?.data?.message || "Something went wrong while updating."

      toast.error(errorMessage, { id: toastId })
      console.error("Update Error:", err)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Blog</h1>
        <p className="text-lg text-muted-foreground italic">
          Refining:{" "}
          <span className="font-medium text-foreground">{blog?.title}</span>
        </p>
      </div>

      <div className="mt-8">
        {/* 3. Pass the existing blog data as 'initialData' to the form */}
        <BlogForm onSubmit={handleUpdateBlog} initialData={blog} />
      </div>
    </div>
  )
}
