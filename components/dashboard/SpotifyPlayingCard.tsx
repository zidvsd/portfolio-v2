import { getNowPlaying } from "@/lib/services/spotify"
import SpotifyIcon from "@/components/icons/SpotifyIcon"

interface SpotifyTrack {
  name: string
  artists: Array<{ name: string }>
  album: {
    images: Array<{ url: string }>
  }
  external_urls: {
    spotify: string
  }
}

interface SpotifyNowPlaying {
  is_playing: boolean
  item: SpotifyTrack
}

export default async function SpotifyPlayingCard() {
  const data = (await getNowPlaying()) as SpotifyNowPlaying | null

  const isPlaying = data?.is_playing ?? false
  const title = isPlaying ? data!.item.name : "Nothing Playing"
  const artist = isPlaying
    ? data!.item.artists.map((a: any) => a.name).join(", ")
    : "Take a break and launch Spotify"
  const albumImageUrl = isPlaying ? data!.item.album.images[0]?.url : null
  const songUrl = isPlaying
    ? data!.item.external_urls.spotify
    : "https://spotify.com"

  return (
    <a
      href={songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full items-center gap-4 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5 transition-all duration-300 hover:border-[#1DB954]/30 hover:bg-gradient-to-br hover:from-white/[0.08] hover:to-white/[0.03]"
    >
      {/* Album Art */}
      <div className="relative h-20 w-20 flex-shrink-0">
        {albumImageUrl ? (
          <img
            src={albumImageUrl}
            alt={title}
            className="h-full w-full rounded-xl object-cover shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#1DB954]/20"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900">
            <SpotifyIcon className="h-8 w-8 text-[#1DB954]/60" />
          </div>
        )}

        {/* Animated Audio Equalizer */}
        {isPlaying && (
          <div className="absolute right-2 bottom-2 flex h-4 items-end gap-1">
            <div
              className="w-[3px] animate-[bounce_0.8s_ease-in-out_infinite] rounded-full bg-[#1DB954]"
              style={{ "--tw-animate-duration": "0.8s" } as any}
            />
            <div
              className="w-[3px] animate-[bounce_0.6s_ease-in-out_infinite] rounded-full bg-[#1DB954]"
              style={{ "--tw-animate-duration": "0.6s" } as any}
            />
            <div
              className="w-[3px] animate-[bounce_1s_ease-in-out_infinite] rounded-full bg-[#1DB954]"
              style={{ "--tw-animate-duration": "1s" } as any}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-col justify-center gap-2">
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <div
            className={`relative flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-widest uppercase ${
              isPlaying
                ? "bg-[#1DB954]/15 text-[#1DB954]"
                : "bg-zinc-800/40 text-zinc-500"
            }`}
          >
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                isPlaying ? "animate-pulse bg-[#1DB954]" : "bg-zinc-600"
              }`}
            />
            {isPlaying ? "Now Playing" : "Offline"}
          </div>
        </div>

        {/* Track Title */}
        <p className="truncate text-sm leading-snug font-bold text-zinc-50 transition-colors group-hover:text-white">
          {title}
        </p>

        {/* Artist Name */}
        <p className="truncate text-xs text-zinc-400 transition-colors group-hover:text-zinc-300">
          {artist}
        </p>
      </div>

      {/* External Link Icon */}
      <div className="ml-auto flex-shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-[#1DB954] transition-transform group-hover:translate-x-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.5 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-7.5M19 4l-7.5 7.5M19 4v6m0-6h-6"
          />
        </svg>
      </div>
    </a>
  )
}
