import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getNowPlaying } from "@/lib/services/spotify"
import SpotifyIcon from "@/components/icons/SpotifyIcon"
import Link from "next/link"

export default async function SpotifyPlayingCard() {
  const data = await getNowPlaying()
  console.log(data)
  const isPlaying = data?.is_playing ?? false
  const title = isPlaying ? data.item.name : "Nothing Playing"
  const artist = isPlaying
    ? data.item.artists.map((a: any) => a.name).join(", ")
    : "Take a break and launch Spotify"
  const albumImageUrl = isPlaying ? data.item.album.images[0]?.url : null
  const songUrl = isPlaying
    ? data.item.external_urls.spotify
    : "https://spotify.com"

  return (
    <Card className="group transition-all hover:border-[#1DB954]/30">
      <Link href={songUrl} target="_blank">
        <CardContent className="flex items-center gap-4 p-4">
          {/* Album */}
          <div className="relative h-16 w-16 shrink-0">
            {albumImageUrl ? (
              <img
                src={albumImageUrl}
                alt={title}
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
                <SpotifyIcon className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{title}</p>
            <p className="truncate text-xs text-muted-foreground">{artist}</p>
          </div>

          {/* Status */}
          <div className="text-xs font-medium">
            {isPlaying ? (
              <span className="text-green-500">Playing</span>
            ) : (
              <span className="text-muted-foreground">Offline</span>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
