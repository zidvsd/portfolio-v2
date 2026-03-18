import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getNowPlaying, getSpotifyProfile } from "@/lib/services/spotify"
import SpotifyIcon from "@/components/icons/SpotifyIcon"
import Link from "next/link"

export default async function SpotifyPlayingCard() {
  const [nowPlayingData, profileData] = await Promise.all([
    getNowPlaying(),
    getSpotifyProfile(),
  ])

  const isPlaying = nowPlayingData?.is_playing ?? false
  const title = isPlaying ? nowPlayingData.item.name : "Not Playing"
  const artist = isPlaying
    ? nowPlayingData.item.artists.map((a: any) => a.name).join(", ")
    : "Idle"
  const albumImageUrl = isPlaying
    ? nowPlayingData.item.album.images[0]?.url
    : null

  const profileUrl = profileData?.external_urls.spotify || "#"
  const profileImage = profileData?.images[0]?.url
  const profileName = profileData?.display_name || "User"
  const followersCount = profileData?.followers.total.toLocaleString() || "0"

  return (
    <Link href={profileUrl} target="_blank" className="block w-full">
      <Card className="group transition- relative overflow-hidden border py-0 shadow-md backdrop-blur-md">
        <CardContent className="p-0">
          {/* Main Layout: Horizontal for shorter height */}
          <div className="flex items-stretch">
            {/* Left Section: Profile Avatar - Full Height */}
            <div className="relative flex w-24 shrink-0 overflow-hidden border-r border-white/5 sm:w-30 md:w-32 lg:w-34">
              {profileImage && (
                <Image
                  src={profileImage}
                  alt={profileName}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Right Section: Content */}
            <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 sm:py-6 lg:py-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="truncate text-lg font-bold transition-colors group-hover:text-green-500">
                  {profileName}
                </h2>
                <div className="flex items-center gap-1 text-sm font-semibold tracking-tighter text-green-500">
                  <span>{followersCount}</span>
                  <span>Followers</span>
                </div>
              </div>

              {/* Dynamic Bottom Section */}
              <div className="mt-2 border-t pt-2">
                {isPlaying ? (
                  <div className="flex items-center gap-2">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-md border border-white/10">
                      {albumImageUrl && (
                        <Image
                          src={albumImageUrl}
                          alt={title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold">{title}</p>
                      <p className="text-[10px truncate">{artist}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-zinc-500">
                    <SpotifyIcon className="size-8" />
                    <span className="text-md font-medium italic">
                      Take a break...
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Progress/Glow Line */}
          <div
            className={`h-px w-full transition-colors ${isPlaying ? "animate-pulse bg-green-500" : "bg-white/5"}`}
          />
        </CardContent>
      </Card>
    </Link>
  )
}
