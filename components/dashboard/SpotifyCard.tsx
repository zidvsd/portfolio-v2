import SpotifyIcon from "../icons/SpotifyIcon"
import SpotifyPlayingCard from "./SpotifyPlayingCard"
import { getUserPlaylist } from "@/lib/services/spotify"
import { SpotifyPlaylistCarousel } from "./SpotifyPlaylistCarousel"
import { getSpotifyProfile } from "@/lib/services/spotify"
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "../ui/button"
export default async function SpotifyCard() {
  const playlists = await getUserPlaylist()
  const profile = await getSpotifyProfile()
  const spotifyPlaylists =
    playlists.items.filter((p: any) => p.public === true) || []

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg p-2 dark:bg-[#1DB954]/10">
              <SpotifyIcon className="size-6 text-[#1DB954]" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Listening Activity
            </h1>
          </div>
          <a href={profile.external_urls.spotify} target="_blank">
            <Button variant="ghost">
              <ArrowSquareOutIcon />
            </Button>
          </a>
        </div>

        <p className="flex items-center leading-relaxed text-muted-foreground">
          Real-time music & coding vibes from the past week
        </p>
      </header>

      {/* Unified Card */}
      <div>
        <SpotifyPlayingCard />
      </div>

      <div className="mt-0">
        <SpotifyPlaylistCarousel playlists={spotifyPlaylists} />
      </div>
    </div>
  )
}
