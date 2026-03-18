import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export default function SpotifyProfileCard({ data }) {
  if (!data) return null

  const profileUrl = data.external_urls.spotify
  const profileImage = data.images[0]?.url
  const name = data.display_name
  const followers = data.followers.total.toLocaleString()

  return (
    <Card className="group transition-all hover:border-[#1DB954]/30">
      <Link href={profileUrl} target="_blank">
        <CardHeader className="flex items-center justify-center">
          {profileImage && (
            <img
              src={profileImage}
              alt={name}
              className="h-20 w-20 rounded-full object-cover"
            />
          )}
        </CardHeader>

        <CardContent className="space-y-2 text-center">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{followers} followers</p>
        </CardContent>

        <CardFooter className="justify-center text-xs text-muted-foreground group-hover:text-green-500">
          View Profile →
        </CardFooter>
      </Link>
    </Card>
  )
}
