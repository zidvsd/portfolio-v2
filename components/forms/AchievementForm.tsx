"use client"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { CloudArrowUpIcon } from "@phosphor-icons/react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Achievement } from "@/lib/types/achievement"
import {
  AchievementFormData,
  AchievementSchema,
} from "@/lib/schemas/achievement.schema"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface AchievementFormProps {
  onSubmit: (data: FormData) => Promise<void>
  initialData?: Achievement
}

export default function AchievementForm({
  onSubmit,
  initialData,
}: AchievementFormProps) {
  const [preview, setPreview] = useState<string | null>(
    initialData?.supabaseUrl || null
  )

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AchievementFormData>({
    resolver: zodResolver(AchievementSchema),
    defaultValues: {
      name: "",
      issuer: "",
      alt: "",
      type: "certificate",
      dateIssued: "",
    },
  })

  const imageFile = watch("image")

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0]
      const url = URL.createObjectURL(file)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [imageFile])

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        issuer: initialData.issuer || "",
        alt: initialData.alt || "",
        type: initialData.type || "certificate",
        dateIssued: initialData.dateIssued || "",
      })
    }
  }, [initialData, reset])

  const handleFormSubmit = async (values: AchievementFormData) => {
    const formData = new FormData()

    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0])
    }

    const documentData = {
      name: values.name,
      issuer: values.issuer,
      alt: values.alt,
      type: values.type,
      dateIssued: values.dateIssued,
      existingImageUrl: initialData?.supabaseUrl ?? null,
    }

    formData.append("document", JSON.stringify(documentData))
    await onSubmit(formData)
  }

  const onInvalid = (errors: any) => {
    console.error("Form Validation Errors:", errors)
    toast.error("Please fix the errors in the form.")
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
      className="space-y-6 rounded-sm border bg-zinc-100 p-6 shadow-md dark:bg-card"
    >
      {/* Name + Type */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">
            Achievement Name
          </label>
          <Input
            {...register("name")}
            placeholder="Responsive Web Design"
            className={
              errors.name
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.name && (
            <p className="text-[10px] font-medium text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">
            Type
          </label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full justify-start rounded-md border border-input bg-input/20 px-4 py-1 text-left text-sm capitalize dark:bg-input/30">
                  {field.value || "Select Type"}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => field.onChange("certificate")}
                    >
                      Certificate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => field.onChange("badge")}>
                      Badge
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
          {errors.type && (
            <p className="text-[10px] font-medium text-destructive">
              {errors.type.message}
            </p>
          )}
        </div>
      </div>

      {/* Issuer + Date Issued */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">
            Issuer
          </label>
          <Input
            {...register("issuer")}
            placeholder="freeCodeCamp"
            className={
              errors.issuer
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.issuer && (
            <p className="text-[10px] font-medium text-destructive">
              {errors.issuer.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">
            Date Issued
          </label>
          <Input
            {...register("dateIssued")}
            placeholder="October 2024"
            className={
              errors.dateIssued
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.dateIssued && (
            <p className="text-[10px] font-medium text-destructive">
              {errors.dateIssued.message}
            </p>
          )}
        </div>
      </div>

      {/* Alt text + Image */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">
            Image Alt Text
          </label>
          <Input
            {...register("alt")}
            placeholder="freecodecamp-responsive-web-design-certificate"
            className={
              errors.alt
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.alt && (
            <p className="text-[10px] font-medium text-destructive">
              {errors.alt.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase">
            Credential Image
          </label>
          <div className="flex items-center gap-4">
            {preview && (
              <div className="relative aspect-video w-32 overflow-hidden rounded border bg-zinc-200">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <Input
                {...register("image")}
                type="file"
                accept="image/*"
                className="cursor-pointer"
              />
              <p className="mt-1 text-[10px] text-zinc-400">
                {initialData
                  ? "Leave empty to keep current image"
                  : "Max size 5MB"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full gap-4 py-6 md:w-max md:px-10"
      >
        {isSubmitting ? "Uploading..." : "Save Achievement"}
        <CloudArrowUpIcon className="size-5" />
      </Button>
    </form>
  )
}
