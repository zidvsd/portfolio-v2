export interface SpotifyProfile {
  display_name: string
  external_urls: {
    spotify: string
  }
  images: {
    url: string
    height?: number
    width?: number
  }[]
}
export interface SpotifyRecentlyPlayed {
  track: {
    id: string
    name: string
    url: string
    durationMs: number
    artists: { id?: string; name: string; url?: string }[]
    album: { id?: string; name: string; images: { url: string }[] }
  }
  playedAt: string
}
export interface SpotifyPlayingNow {
  isPlaying: boolean
  progressMs: number
  track: {
    id: string
    name: string
    url: string
    durationMs: number
    explicit: boolean
    artists: {
      id: string
      name: string
      url: string
    }[]
    album: {
      id: string
      name: string
      url: string
      images: {
        url: string
        width: number
        height: number
      }[]
      releaseDate: string
    }
  }
}
export interface SpotifyStats {
  totalPlayTimeMs?: number
  totalTracksPlayed?: number
  topArtists?: { name: string; playCount: number }[]
  topTracks?: { name: string; playCount: number }[]
}

export interface SpotifyPlaylist {
  name: string
  uri: string
  images: { url: string }[]
  external_urls: {
    spotify: string
  }
  items: {
    total: number
  }
}
