import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/site-config"

export const runtime = "edge"
export const alt = siteConfig.name
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
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
          fontFamily: "sans-serif",
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
        <h1
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: "#2c2018",
            lineHeight: 1.25,
            margin: "0 0 20px",
            maxWidth: 860,
            textAlign: "right",
          }}
        >
          كتابات في الفلسفة واللغة والثقافة العربية
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: 22,
            color: "#7a6550",
            margin: "0 0 40px",
            maxWidth: 700,
            textAlign: "right",
            lineHeight: 1.5,
          }}
        >
          أفكار تشكّل طريقة تفكيرنا في العالم، بأسلوب يجمع بين العمق والوضوح.
        </p>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
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
    { ...size }
  )
}
