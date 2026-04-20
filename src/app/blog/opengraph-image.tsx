/**
 * app/blog/opengraph-image.tsx
 *
 * OG image for /blog index  --  1200x630.
 * No hero scene available  --  uses branded purple/dark gradient.
 * Text: og-cards.md /blog entry.
 */

import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const runtime     = "nodejs";
export const alt         = "appeX Blog | Protocol research and analysis";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image(): ImageResponse {
  const fontsDir = path.join(process.cwd(), "public", "fonts");
  const tekturBold    = readFileSync(path.join(fontsDir, "tektur",     "Tektur-Bold.ttf"      )) as unknown as ArrayBuffer;
  const tekturRegular = readFileSync(path.join(fontsDir, "tektur",     "Tektur-Regular.ttf"   )) as unknown as ArrayBuffer;
  const hubotRegular  = readFileSync(path.join(fontsDir, "hubot-sans", "HubotSans-Regular.ttf")) as unknown as ArrayBuffer;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630,
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#0A0F1F",
        }}
      >
        {/* Branded gradient background  --  no scene for blog index */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #050A18 0%, #0A0F1F 30%, #1A0A3A 70%, #0A0F1F 100%)",
          }}
        />

        {/* Purple radial glow */}
        <div
          style={{
            position: "absolute",
            right: -100, top: -100,
            width: 600, height: 600,
            background: "radial-gradient(ellipse at center, rgba(90,28,203,0.35) 0%, transparent 70%)",
          }}
        />

        {/* Yellow accent glow  --  bottom left */}
        <div
          style={{
            position: "absolute",
            left: -60, bottom: -80,
            width: 400, height: 400,
            background: "radial-gradient(ellipse at center, rgba(254,214,7,0.10) 0%, transparent 65%)",
          }}
        />

        {/* Dark left overlay for text */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, rgba(10,15,31,0.85) 0%, rgba(10,15,31,0.50) 60%, transparent 100%)",
          }}
        />

        {/* Text block */}
        <div
          style={{
            position: "absolute",
            left: 72, top: 0, bottom: 0,
            width: 640,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: "Tektur",
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(254,214,7,0.65)",
              marginBottom: 20,
            }}
          >
            Protocol research and analysis
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: "Tektur",
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "rgba(255,255,255,0.94)",
              marginBottom: 20,
            }}
          >
            appeX Blog
          </div>

          {/* Description */}
          <div
            style={{
              fontFamily: "Hubot Sans",
              fontSize: 22,
              fontWeight: 400,
              lineHeight: 1.55,
              color: "rgba(185,160,204,0.85)",
              maxWidth: 580,
            }}
          >
            Protocol-level writing from the appeX team on real yield, credit underwriting onchain, and the architecture behind the vault.
          </div>
        </div>

        {/* appeX wordmark  --  bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 40, left: 72,
            fontFamily: "Tektur",
            fontSize: 18,
            fontWeight: 700,
            color: "#FED607",
            letterSpacing: "0.06em",
          }}
        >
          appeX Protocol
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Tektur",     data: tekturBold,    weight: 700, style: "normal" },
        { name: "Tektur",     data: tekturRegular, weight: 400, style: "normal" },
        { name: "Hubot Sans", data: hubotRegular,  weight: 400, style: "normal" },
      ],
    }
  );
}
