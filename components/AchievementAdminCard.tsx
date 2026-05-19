"use client"

import Link from "next/link"
import AchievementCard from "./AchievementCard"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { TrashIcon, PencilSimpleIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Achievement } from "@/lib/types/achievement"
import { deleteAchievementAction } from "@/lib/services/achievements"
export default function AchievementAdminCard({
  achievement,
}: {
  achievement: Achievement
}) {
  const router = useRouter()

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting achievement...")

    try {
      const res = await deleteAchievementAction(achievement._id)

      if (res.success) {
        toast.success("Achievement deleted successfully", { id: toastId })
        router.refresh()
      } else {
        toast.error(res.message || "Delete failed", { id: toastId })
      }
    } catch (error) {
      toast.error("An unexpected error occurred", { id: toastId })
    }
  }

  return (
    <div className="group relative w-full">
      <AchievementCard data={achievement} />

      <div className="pointer-events-auto visible absolute top-3 right-3 z-20 flex gap-2 opacity-100 transition-opacity duration-200 lg:pointer-events-none lg:opacity-0 lg:group-hover:pointer-events-auto lg:group-hover:opacity-100">
        <Link href={`/studio/achievements/edit/${achievement._id}`}>
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 border border-border/50 bg-background/80 shadow-xl backdrop-blur-sm"
          >
            <PencilSimpleIcon size={18} weight="bold" />
          </Button>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger className="hover-utility flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 text-destructive shadow-xl backdrop-blur-sm transition-all hover:bg-destructive hover:text-white">
            <TrashIcon size={18} weight="bold" />
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this achievement?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-semibold text-foreground italic">
                  "{achievement.name}"
                </span>
                ? This action cannot be undone and will remove the credential
                image from storage.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="text-destructive-foreground rounded-md bg-destructive px-4 py-2 text-sm font-medium hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
