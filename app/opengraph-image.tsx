import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/site-config"

export const runtime = "edge"
export const alt = siteConfig.name
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

async function loadArabicFont() {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@700;800&display=swap"
  ).then((r) => r.text())

  const url = css.match(/src: url\(([^)]+)\) format\('woff2'\)/)?.[1]
  if (!url) return null

  return fetch(url).then((r) => r.arrayBuffer())
}

export default async function OgImage() {
  const fontData = await loadArabicFont()

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          background: "#e3dacd",
          padding: "60px 72px",
          fontFamily: fontData ? "IBM Plex Sans Arabic" : "sans-serif",
          direction: "rtl",
        }}
      >
        {/* Brand dot + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#a07850" }} />
          <span style={{ fontSize: 20, fontWeight: 700, color: "#7a6550" }}>
            {siteConfig.name}
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: "#2c2018",
            lineHeight: 1.25,
            marginBottom: 20,
            maxWidth: 860,
            textAlign: "right",
          }}
        >
          كتابات في الفلسفة واللغة والثقافة العربية
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "#7a6550",
            marginBottom: 40,
            maxWidth: 700,
            textAlign: "right",
            lineHeight: 1.5,
          }}
        >
          أفكار تشكّل طريقة تفكيرنا في العالم، بأسلوب يجمع بين العمق والوضوح.
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#a07850",
            color: "#fff",
            fontSize: 18,
            fontWeight: 700,
            padding: "12px 28px",
            borderRadius: 999,
          }}
        >
          اقرأ المقالات ←
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#a07850",
          }}
        />
      </div>
    ),
    {
      ...size,
      ...(fontData && {
        fonts: [
          { name: "IBM Plex Sans Arabic", data: fontData, style: "normal", weight: 700 },
        ],
      }),
    }
  )
}
