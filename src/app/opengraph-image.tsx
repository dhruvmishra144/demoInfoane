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
            "linear-gradient(135deg, #0a2540 0%, #114f80 55%, #1e97e5 100%)",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #4fb2f5, #114f80)",
            }}
          />
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
          <div style={{ color: "#c2cede", fontSize: 30, maxWidth: 860 }}>
            Cloud migration · Legacy modernization · Data & AI · Dedicated teams
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#8ccdfb",
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
