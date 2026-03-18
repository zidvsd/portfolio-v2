import SpotifyIcon from "../icons/SpotifyIcon"
import SpotifyPlayingCard from "./SpotifyPlayingCard"
import SpotifyProfileCard from "./SpotifyProfileCard"
import { getSpotifyProfile } from "@/lib/services/spotify"

export default async function SpotifyCard() {
  const spotifyProfileData = await getSpotifyProfile()

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-[#1DB954]/10 p-2">
            <SpotifyIcon className="size-5 text-[#1DB954]" />
          </div>
          <a
            href="https://spotify.com/zidvsd"
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-opacity hover:opacity-80"
          >
            <h2 className="text-xl font-bold tracking-tight text-zinc-100">
              Listening Activity
            </h2>
          </a>
        </div>

        <p className="text-sm leading-relaxed text-zinc-400">
          Real-time music & coding vibes from the past week
        </p>

        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
          <div className="h-1 w-1 rounded-full bg-[#1DB954]" />
          <span>Updates continuously</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        <SpotifyPlayingCard />
        <SpotifyProfileCard data={spotifyProfileData} />
      </div>
    </div>
  )
}
