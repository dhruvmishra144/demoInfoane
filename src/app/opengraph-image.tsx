import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/**
 * Generated social share card, served at /opengraph-image.
 *
 * Built at request/build time rather than shipped as a design file, so it can
 * never drift out of sync with the brand config. Also used as the Twitter image
 * fallback for the summary_large_image card.
 *
 * Swap in a designed 1200×630 asset later if marketing prefers one — replace
 * this file with `opengraph-image.png` and delete the component.
 */
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #120b21 0%, #2c1c4e 55%, #5b3aa0 100%)",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <svg width="64" height="64" viewBox="0 0 84 84">
            <rect width="84" height="84" rx="20" fill="#5b3aa0" />
            <path
              d="M28 52c-8 0-14-6-14-13s6-13 14-13c9 0 12 8 14 13s5 13 14 13c8 0 14-6 14-13s-6-13-14-13"
              stroke="white"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div style={{ color: "white", fontSize: 40, fontWeight: 700 }}>
            {site.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            IT consulting and custom software development
          </div>
          <div style={{ color: "#dde1e6", fontSize: 30, maxWidth: 860 }}>
            Cloud migration · Legacy modernization · Data & AI · Dedicated teams
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#c9adeb",
            fontSize: 26,
          }}
        >
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size,
  );
}
