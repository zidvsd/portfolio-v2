import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { SpotifyProfile } from "@/lib/types/spotify"

interface SpotifyProfileCardProps {
  data: SpotifyProfile | null
}

export default function SpotifyProfileCard({ data }: SpotifyProfileCardProps) {
  if (!data) return null
  const { external_urls, images, display_name, followers } = data
  const profileUrl = external_urls.spotify
  const profileImage = images[0]?.url
  const name = display_name
  const followersCount = followers.total.toLocaleString()

  return (
    <Card className="group relative flex flex-col overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-[#1DB954] hover:shadow-lg">
      <Link
        href={profileUrl}
        target="_blank"
        className="flex flex-col items-center gap-4 p-6"
      >
        {/* Avatar with subtle glow */}
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/10 p-1 transition-transform group-hover:scale-105">
          {profileImage && (
            <Image
              src={profileImage}
              alt={name}
              fill
              className="rounded-full object-cover"
            />
          )}
          <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_20px_#1DB954] transition-opacity group-hover:opacity-30"></span>
        </div>

        {/* Info */}
        <div className="text-center">
          <h3 className="max-w-45 truncate text-lg font-bold text-zinc-100 transition-colors group-hover:text-[#1DB954]">
            {name}
          </h3>
          <p className="mt-1 text-xs font-medium tracking-wider text-zinc-500 uppercase">
            {followersCount} followers
          </p>
        </div>

        {/* Footer */}
        <CardFooter className="mt-auto flex w-full justify-center border-t border-white/5 bg-white/1 py-2">
          <span className="text-[10px] font-black tracking-widest text-zinc-500 transition-colors group-hover:text-zinc-100">
            View Profile →
          </span>
        </CardFooter>
      </Link>
    </Card>
  )
}
