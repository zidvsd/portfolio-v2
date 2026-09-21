import http from "http"

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1:3333")

  console.log("\nSpotify callback received:")
  console.log("Path:", url.pathname)

  const error = url.searchParams.get("error")
  const code = url.searchParams.get("code")

  if (error) {
    console.error("Spotify OAuth error:", error)

    console.log("Full query:", Object.fromEntries(url.searchParams.entries()))

    res.writeHead(400, {
      "Content-Type": "text/html",
    })

    res.end(`
      <h1>Spotify Authorization Failed</h1>
      <p>Error: ${error}</p>
      <p>Check your terminal for details.</p>
    `)

    return
  }

  if (code) {
    console.log("\n================================")
    console.log("NEW SPOTIFY AUTHORIZATION CODE:")
    console.log("================================\n")
    console.log(code)
    console.log("\n================================\n")

    res.writeHead(200, {
      "Content-Type": "text/html",
    })

    res.end(`
      <h1>Spotify Authorization Successful</h1>
      <p>Check your terminal for the authorization code.</p>
      <p>You can close this tab.</p>
    `)

    return
  }

  res.writeHead(400, {
    "Content-Type": "text/plain",
  })

  res.end("Missing Spotify authorization code.")
})

server.listen(3333, "127.0.0.1", () => {
  console.log("Spotify callback server running at:")
  console.log("http://127.0.0.1:3333/spotify-callback")
})
