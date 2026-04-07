"use client"

import BlogForm from "@/components/forms/BlogForm"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
export default function page() {
  const router = useRouter()

  const handleCreateBlog = async (formData: FormData) => {
    // 1. Start a loading toast
    const toastId = toast.loading("Publishing your story...")

    try {
      const response = await axios.post("/api/blog", formData)

      if (response.status === 201 || response.status === 200) {
        toast.success("Blog published successfully!", { id: toastId })

        setTimeout(() => {
          router.push("/blog")
          router.refresh()
        }, 1500)
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      const errorMessage =
        err.response?.data?.message || "Something went wrong while saving."

      toast.error(errorMessage, { id: toastId })
      console.error("Submission Error:", err)
    }
  }

  return (
    <div className="">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Blog</h1>
        <p className="text-lg text-muted-foreground">
          Share your latest insights in development, gaming, or music.
        </p>
      </div>

      <div className="mt-8">
        <BlogForm onSubmit={handleCreateBlog} />
      </div>
    </div>
  )
}
