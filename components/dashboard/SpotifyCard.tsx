import SpotifyIcon from "../icons/SpotifyIcon"
import SpotifyPlayingCard from "./SpotifyPlayingCard"
import { getUserPlaylist } from "@/lib/services/spotify"
import { SpotifyPlaylistCarousel } from "./SpotifyPlaylistCarousel"
import { getSpotifyProfile } from "@/lib/services/spotify"
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "../ui/button"
import InView from "../motion/InView"
export default async function SpotifyCard() {
  const playlistsRes = await getUserPlaylist()
  const spotifyPlaylists =
    playlistsRes?.items?.filter((p: any) => p.public === true) || []

  return (
    <InView className="space-y-6">
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
          <a href="https://open.spotify.com" target="_blank">
            <Button variant="ghost">
              <ArrowSquareOutIcon />
            </Button>
          </a>
        </div>
        <p className="text-muted-foreground">
          Playlists & real-time listening stats via Last.fm
        </p>
      </header>

      <SpotifyPlaylistCarousel playlists={spotifyPlaylists} />
    </InView>
  )
}
