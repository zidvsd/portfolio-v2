"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import AchievementForm from "@/components/forms/AchievementForm"
import { Spinner } from "@/components/ui/spinner"
import { fetchAchievementForEdit } from "./actions"
import { Achievement } from "@/lib/types/achievement"
import { revalidateAchievements } from "./actions"
export default function EditAchievementPage() {
  const { id } = useParams()
  const router = useRouter()
  const [achievement, setAchievement] = useState<Achievement | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAchievement = async () => {
      try {
        const data = await fetchAchievementForEdit(id as string)
        if (!data) {
          toast.error("Achievement not found")
          router.push("/studio/achievements")
          return
        }
        setAchievement(data)
      } catch (error) {
        toast.error("Failed to load achievement data")
        router.push("/studio/achievements")
      } finally {
        setLoading(false)
      }
    }

    if (id) loadAchievement()
  }, [id, router])

  const handleUpdate = async (formData: FormData) => {
    const toastId = toast.loading("Updating achievement...")

    try {
      const response = await axios.patch(`/api/achievement/${id}`, formData)

      if (response.status === 200) {
        toast.success("Achievement updated successfully!", { id: toastId })
        await revalidateAchievements()
        setTimeout(() => {
          router.push("/studio/achievements")
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
        <h1 className="text-3xl font-bold tracking-tight">Edit Achievement</h1>
        <p className="text-lg text-muted-foreground italic">
          Editing:{" "}
          <span className="font-medium text-foreground">
            {achievement?.name}
          </span>
        </p>
      </div>

      <div className="mt-8">
        <AchievementForm
          onSubmit={handleUpdate}
          initialData={achievement ?? undefined}
        />
      </div>
    </div>
  )
}
