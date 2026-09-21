// src/lib/queries.ts
import { unstable_cache } from "next/cache"

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    console.error("Missing Spotify environment variables")
    return { access_token: null }
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    console.error("Spotify token error:", response.status, data)
    return { access_token: null }
  }

  return data
}
export const getSpotifyProfile = async () => {
  const { access_token } = await getAccessToken()

  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  console.log("Spotify profile:", res.status, await res.clone().text())

  if (!res.ok) return null

  return res.json()
}

export const getNowPlaying = async () => {
  return unstable_cache(
    async () => {
      const { access_token } = await getAccessToken()

      const res = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )

      console.log("Spotify now playing status:", res.status)
      console.log("Spotify now playing response:", await res.clone().text())

      if (res.status === 204) return null

      if (!res.ok) return null

      return res.json()
    },
    ["spotify-now-playing"],
    { tags: ["spotify"], revalidate: 60 }
  )()
}

export const getLastPlayed = async () => {
  return unstable_cache(
    async () => {
      const { access_token } = await getAccessToken()
      const res = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      if (res.status === 204 || res.status > 400) return null
      return res.json()
    },
    ["spotify-last-played"],
    { tags: ["spotify"], revalidate: 60 }
  )()
}

export const getUserPlaylist = async () => {
  return unstable_cache(
    async () => {
      const { access_token } = await getAccessToken()
      const res = await fetch(`https://api.spotify.com/v1/me/playlists`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })

      return res.json()
    },
    ["spotify-user-playlists"],
    { tags: ["spotify"], revalidate: 60 }
  )()
}

export const getPublicPlaylist = async () => {
  return unstable_cache(
    async () => {
      const { access_token } = await getAccessToken()
      const res = await fetch(
        `https://api.spotify.com/v1/users/21cck5t67dmuwihcv3jvlgwtq/playlists`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )

      return res.json()
    },
    ["spotify-public-playlists"],
    { tags: ["spotify"], revalidate: 60 }
  )()
}
