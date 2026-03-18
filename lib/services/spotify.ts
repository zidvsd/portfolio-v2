// src/lib/queries.ts
import { unstable_cache } from "next/cache"

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token!,
    }),
  })

  return response.json()
}

export const getSpotifyProfile = async () => {
  const { access_token } = await getAccessToken()

  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  if (!res.ok) return null
  return res.json()
}

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken()
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  )
  if (res.status === 204 || res.status > 400) return null
  return res.json()
}
