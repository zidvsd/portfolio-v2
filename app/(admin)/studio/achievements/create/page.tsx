"use client"

import AchievementForm from "@/components/forms/AchievementForm"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CreateAchievementPage() {
  const router = useRouter()

  const handleCreate = async (formData: FormData) => {
    const toastId = toast.loading("Saving achievement...")

    try {
      const response = await axios.post("/api/achievement", formData)

      if (response.status === 201 || response.status === 200) {
        toast.success("Achievement added successfully!", { id: toastId })

        setTimeout(() => {
          router.push("/studio/achievements")
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
    <div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Add Achievement</h1>
        <p className="text-lg text-muted-foreground">
          Add a new certificate or badge to your portfolio.
        </p>
      </div>

      <div className="mt-8">
        <AchievementForm onSubmit={handleCreate} />
      </div>
    </div>
  )
}
