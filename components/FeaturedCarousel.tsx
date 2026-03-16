import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function FeaturedCarousel({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null

  return (
    <div className="mt-4 px-2">
      <Carousel
        opts={{ align: "start", loop: true }}
        /* 1. Added overflow-visible to prevent clipping during hover/scaling */
        className="w-full overflow-visible"
      >
        {/* 2. Added py-4 (vertical padding) to create room for the pins and shadows */}
        {/* 3. Kept -ml-4 for horizontal spacing */}
        <CarouselContent className="-ml-2 py-2">
          {projects.map((project) => (
            <CarouselItem
              key={project.slug}
              className="basis-full pl-4 md:basis-1/2"
            >
              <Link href={`/projects/${project.slug}`}>
                <Card className="group overflow-hidden border-border bg-card pt-0 shadow transition-all hover:border-primary/50">
                  <CardContent className="p-0">
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={
                          project.image || "/images/projects/placeholder.png"
                        }
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="bg-linear-t absolute inset-0 from-black/60 to-transparent opacity-60" />
                    </div>

                    <div className="p-4">
                      <h2 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                        {project.name}
                      </h2>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 hidden md:flex" />
        <CarouselNext className="-right-4 hidden md:flex" />
      </Carousel>
    </div>
  )
}
