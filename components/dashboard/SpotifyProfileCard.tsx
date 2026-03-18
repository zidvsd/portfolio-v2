import SpotifyIcon from "@/components/icons/SpotifyIcon"

interface SpotifyProfile {
  display_name: string
  external_urls: {
    spotify: string
  }
  followers: {
    total: number
  }
  images: Array<{
    url: string
  }>
  type: string
}

export default function SpotifyProfileCard({
  data,
}: {
  data: SpotifyProfile | null
}) {
  if (!data) return null

  const profileUrl = data.external_urls.spotify
  const profileImage = data.images[0]?.url
  const name = data.display_name
  const followers = data.followers.total.toLocaleString()

  // Format followers with context
  const getFollowerContext = (count: number) => {
    if (count > 50000) return "Influencer"
    if (count > 10000) return "Popular"
    if (count > 1000) return "Established"
    return "Growing"
  }

  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/5 bg-gradient-to-br from-[#1DB954]/5 via-white/[0.02] to-white/[0.01] p-6 transition-all duration-300 hover:border-[#1DB954]/30 hover:bg-gradient-to-br hover:from-[#1DB954]/10 hover:via-white/[0.05] hover:to-white/[0.02]"
    >
      {/* Header Badge */}
      <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-lg bg-[#1DB954]/15 px-3 py-1.5">
        <div className="h-2 w-2 rounded-full bg-[#1DB954]" />
        <span className="text-[11px] font-bold tracking-widest text-[#1DB954] uppercase">
          Profile
        </span>
      </div>

      {/* Main Content - Centered */}
      <div className="flex flex-1 flex-col space-y-6">
        {/* Profile Image with Glow */}
        <div className="flex justify-center">
          <div className="relative h-24 w-24">
            {profileImage && (
              <>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1DB954]/40 to-transparent blur-lg transition-all duration-500 group-hover:blur-xl" />
                <img
                  src={profileImage}
                  alt={name}
                  className="relative h-full w-full rounded-full border-3 border-[#1DB954]/30 object-cover shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:border-[#1DB954]/60"
                />
              </>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-3 text-center">
          <h3 className="line-clamp-2 text-lg font-bold text-zinc-50 transition-colors group-hover:text-white">
            {name}
          </h3>

          {/* Followers Stats */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-bold text-[#1DB954]">{followers}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-400">
                Followers
              </span>
              <span className="h-1 w-1 rounded-full bg-[#1DB954]/40" />
              <span className="text-xs font-semibold text-[#1DB954]/70">
                {getFollowerContext(data.followers.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-[#1DB954] opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span>View Profile</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:translate-x-0.5"
        >
          <path d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
      </div>
    </a>
  )
}
