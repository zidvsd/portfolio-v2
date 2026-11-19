import { ImageResponse } from "next/og"

// Default 1200x630 social preview image: /og?title=...
export function GET(req: Request) {
  const title =
    new URL(req.url).searchParams.get("title")?.slice(0, 100) ||
    "Full-Stack Web Developer"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div style={{ fontSize: 32, color: "#8b7cf6" }}>zidvsd.site</div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
          {title}
        </div>
        <div style={{ fontSize: 32, color: "#a3a3a3" }}>
          Rashid Visda · Full-Stack Developer · React & Next.js
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
