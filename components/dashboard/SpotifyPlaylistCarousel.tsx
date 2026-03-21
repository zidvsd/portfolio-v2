"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SpotifyPlaylist } from "@/lib/types/spotify"
import SpotifyIcon from "@/components/icons/SpotifyIcon"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
interface SpotifyPlaylistCarouselProps {
  playlists: SpotifyPlaylist[]
}

export function SpotifyPlaylistCarousel({
  playlists,
}: SpotifyPlaylistCarouselProps) {
  if (!playlists || playlists.length === 0) return null

  return (
    <div className="w-full max-w-full overflow-visible px-2">
      <Carousel
        opts={{ align: "start", loop: true, dragFree: true }}
        plugins={[Autoplay({ delay: 3000 })]}
        className="scrollbar-none w-full"
      >
        <CarouselContent className="-ml-4 py-4">
          {playlists.map((playlist) => (
            <CarouselItem
              key={playlist.uri || playlist.name}
              // Mobile: 1.5 cards (shows a peek of the next one)
              // Tablet: 3 cards
              // Desktop: 4 cards
              // Large Screens: 5 cards
              className="basis-[70%] pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              {/* Vertical Playlist Card */}
              <a
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white/3 shadow-md transition-all duration-300 hover:border-white/10 hover:bg-white/[0.07] dark:border-white/5"
              >
                {/* Top Image Section - Takes full width, fixed aspect ratio */}
                <div className="relative w-full overflow-hidden after:block after:pb-[100%]">
                  <Image
                    fill
                    src={playlist.images[0]?.url}
                    alt={playlist.name}
                    className="absolute inset-0 h-full w-full transform-gpu object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <SpotifyIcon className="size-8 text-[#1DB954]" />
                  </div>
                </div>

                {/* Bottom Content Section */}
                <div className="flex flex-col space-y-1 p-4">
                  <p className="truncate text-sm font-bold text-accent-foreground transition-colors group-hover:text-green-500">
                    {playlist.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-zinc-500">
                      {playlist.items?.total || 0} tracks
                    </p>
                    <span className="text-[10px] font-bold tracking-wider text-zinc-600 uppercase opacity-0 transition-opacity group-hover:opacity-100">
                      Play
                    </span>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 hidden border-white/10 backdrop-blur-sm hover:text-[#1DB954] md:flex dark:bg-zinc-900/80" />
        <CarouselNext className="-right-4 hidden border-white/10 backdrop-blur-sm hover:text-[#1DB954] md:flex dark:bg-zinc-900/80" />
      </Carousel>
    </div>
  )
}
