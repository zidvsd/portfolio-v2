import { Suspense } from "react"
import dynamic from "next/dynamic"
import ProfileSection from "@/components/sections/home/ProfileSection"
import { SkeletonLoader } from "@/components/skeleton/SkeletonLoader"

const ProjectsSection = dynamic(
  () => import("@/components/sections/home/ProjectsSection"),
  {
    loading: () => <SkeletonLoader variant="projects-carousel" />,
    ssr: true,
  }
)

export default function Page() {
  return (
    <div className="space-y-8">
      <Suspense fallback={<SkeletonLoader variant="profile" />}>
        <ProfileSection />
      </Suspense>

      <hr className="border-border" />

      <ProjectsSection />
    </div>
  )
}
