import { Suspense } from "react"
import dynamic from "next/dynamic"
import ProfileSection from "@/components/sections/home/ProfileSection"
import {
  ProfileSkeleton,
  ProjectsSkeleton,
} from "@/components/skeleton/HomeSkeleton"
const ProjectsSection = dynamic(
  () => import("@/components/sections/home/ProjectsSection"),
  {
    loading: () => <ProjectsSkeleton />,
    ssr: true,
  }
)

export default function Page() {
  return (
    <div className="space-y-8">
      {/* Profile & Skills */}
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileSection />
      </Suspense>

      <hr className="border-border" />

      {/* Projects Carousel */}
      <ProjectsSection />
    </div>
  )
}
