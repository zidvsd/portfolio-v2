import { Suspense } from "react"
import ProfileSection from "@/components/sections/home/ProfileSection"
import ProjectsSection from "@/components/sections/home/ProjectsSection"
import {
  ProfileSkeleton,
  ProjectsSkeleton,
} from "@/components/skeleton/HomeSkeleton"

export default function Page() {
  return (
    <div className="space-y-8">
      {/* Profile & Skills */}
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileSection />
      </Suspense>

      <hr className="border-border" />

      {/* Projects Carousel */}
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsSection />
      </Suspense>
    </div>
  )
}
