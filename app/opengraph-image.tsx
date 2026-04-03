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
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#a07850" }} />
          <span style={{ fontSize: 22, fontWeight: 700, color: "#5a4a3a", letterSpacing: "-0.5px" }}>
            {siteConfig.name}
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#2c2018",
            lineHeight: 1.2,
            margin: 0,
            maxWidth: 800,
            textAlign: "right",
          }}
        >
          {siteConfig.description}
        </h1>

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
