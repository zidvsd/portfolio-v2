"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ProjectCard } from "./ProjectCard"
import Autoplay from "embla-carousel-autoplay"
export function FeaturedCarousel({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null

  return (
    <div className="mt-4 px-2">
      <Carousel
        opts={{ align: "start", loop: true, dragFree: true }}
        className="w-full overflow-visible"
        plugins={[Autoplay({ delay: 3000 })]}
      >
        {/* py-4 provides room for the Featured Badge and shadows within the carousel */}
        <CarouselContent className="-ml-4 py-4">
          {projects.map((project) => (
            <CarouselItem
              key={project.slug}
              className="basis-full pl-4 md:basis-1/2 lg:basis-1/2"
            >
              {/* Using the shared component ensures the pins and styles match exactly */}
              <ProjectCard repo={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 hidden bg-background/80 backdrop-blur-sm md:flex" />
        <CarouselNext className="-right-4 hidden bg-background/80 backdrop-blur-sm md:flex" />
      </Carousel>
    </div>
  )
}
