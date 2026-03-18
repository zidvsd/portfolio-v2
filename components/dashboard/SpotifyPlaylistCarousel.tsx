import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SpotifyPlaylist } from "@/lib/types/spotify"
import SpotifyIcon from "@/components/icons/SpotifyIcon"

interface SpotifyPlaylistCarouselProps {
  playlists: SpotifyPlaylist[]
}

export function SpotifyPlaylistCarousel({
  playlists,
}: SpotifyPlaylistCarouselProps) {
  if (!playlists || playlists.length === 0) return null

  return (
    <div className="mt-4 px-2">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full overflow-visible"
      >
        <CarouselContent className="-ml-4 py-4">
          {playlists.map((playlist) => (
            <CarouselItem
              key={playlist.uri || playlist.name}
              className="basis-full pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
            >
              {/* Vertical Playlist Card */}
              <a
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] transition-all duration-300 hover:border-white/10 hover:bg-white/[0.07]"
              >
                {/* Top Image Section - Takes full width, fixed aspect ratio */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src={playlist.images[0]?.url}
                    alt={playlist.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="translate-y-2 transform rounded-full bg-[#1DB954] shadow-xl transition-transform duration-300 group-hover:translate-y-0">
                      <SpotifyIcon className="size-12 text-[#1DB954]" />
                    </div>
                  </div>
                </div>

                {/* Bottom Content Section */}
                <div className="flex flex-col space-y-1 p-4">
                  <p className="truncate text-sm font-bold text-zinc-100 transition-colors group-hover:text-[#1DB954]">
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

                {/* Subtle border glow */}
                <div className="pointer-events-none absolute -inset-px rounded-2xl border border-[#1DB954]/0 transition-colors group-hover:border-[#1DB954]/20" />
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 hidden border-white/10 bg-zinc-900/80 backdrop-blur-sm hover:text-[#1DB954] md:flex" />
        <CarouselNext className="-right-4 hidden border-white/10 bg-zinc-900/80 backdrop-blur-sm hover:text-[#1DB954] md:flex" />
      </Carousel>
    </div>
  )
}
