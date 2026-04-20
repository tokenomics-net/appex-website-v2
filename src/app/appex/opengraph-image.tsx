/**
 * app/appex/opengraph-image.tsx
 *
 * OG image for /appex  --  1200x630.
 * Branded gradient background with brand palette.
 * Text: og-cards.md /appex entry.
 */

import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const runtime     = "nodejs";
export const alt         = "$APPEX | Fixed Supply, Real Utility";
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
        {/* Base gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #050A18 0%, #0A0F1F 30%, #1A1400 70%, #050A18 100%)" }} />

        {/* Radial glow  --  top right */}
        <div
          style={{
            position: "absolute", right: -120, top: -80,
            width: 700, height: 700,
            background: `radial-gradient(ellipse at center, rgba(254,214,7,0.18) 0%, transparent 65%)`,
          }}
        />

        {/* Yellow accent glow  --  bottom right */}
        <div
          style={{
            position: "absolute", right: 80, bottom: -40,
            width: 400, height: 400,
            background: "radial-gradient(ellipse at center, rgba(254,214,7,0.07) 0%, transparent 65%)",
          }}
        />

        {/* Left text overlay  --  subtle darkening for readability */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, rgba(5,10,24,0.70) 0%, rgba(5,10,24,0.30) 55%, transparent 100%)",
          }}
        />

        {/* Text block */}
        <div
          style={{
            position: "absolute",
            left: 72, top: 0, bottom: 0,
            width: 660,
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
            Fixed Supply, Real Utility
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: "Tektur",
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "rgba(255,255,255,0.95)",
              marginBottom: 20,
            }}
          >
            $APPEX Token
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
            1,000,000,000 supply. No minting. No emissions. Pay fees in $APPEX for a 25% discount. Stake for rewards. Vote on protocol changes.
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

        {/* Right accent band */}
        <div
          style={{
            position: "absolute",
            right: 0, top: 0, bottom: 0,
            width: 4,
            background: "linear-gradient(180deg, transparent 0%, #FED607 50%, transparent 100%)",
            opacity: 0.5,
          }}
        />
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
