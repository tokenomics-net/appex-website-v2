/**
 * app/blog/[slug]/opengraph-image.tsx
 *
 * Dynamic OG image for individual blog posts  --  1200x630.
 * Uses the post's cover image as background (if it is a local path).
 * Falls back to branded purple gradient if cover is remote or unavailable.
 *
 * Text: post title + excerpt (first 140 chars).
 * Pattern from og-cards.md: "[Post title] | appeX Blog"
 */

import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";
import { getPostBySlug, getAllPosts } from "@/lib/blog/posts";

export const runtime     = "nodejs";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

// Required by Next.js for dynamic routes with static generation
export function generateStaticParams(): { slug: string }[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateAlt({ params }: { params: { slug: string } }): string {
  const post = getPostBySlug(params.slug);
  if (!post) return "appeX Blog";
  return `${post.frontmatter.title} | appeX Blog`;
}

export default function Image({
  params,
}: {
  params: { slug: string };
}): ImageResponse {
  const fontsDir = path.join(process.cwd(), "public", "fonts");
  const tekturBold    = readFileSync(path.join(fontsDir, "tektur",     "Tektur-Bold.ttf"      )) as unknown as ArrayBuffer;
  const tekturRegular = readFileSync(path.join(fontsDir, "tektur",     "Tektur-Regular.ttf"   )) as unknown as ArrayBuffer;
  const hubotRegular  = readFileSync(path.join(fontsDir, "hubot-sans", "HubotSans-Regular.ttf")) as unknown as ArrayBuffer;

  let title    = "appeX Blog";
  let excerpt  = "Protocol-level writing from the appeX team.";
  const post = getPostBySlug(params.slug);
  if (post) {
    const fm = post.frontmatter;
    title   = fm.seoTitle ?? `${fm.title} | appeX Blog`;
    excerpt = (fm.seoDescription ?? fm.excerpt).slice(0, 155);
  }

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
        {/* Background  --  branded gradient (consistent, no external image fetch needed) */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #050A18 0%, #0A0F1F 30%, #1A0A3A 70%, #0A0F1F 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -80, top: -80,
            width: 500, height: 500,
            background: "radial-gradient(ellipse at center, rgba(90,28,203,0.30) 0%, transparent 70%)",
          }}
        />

        {/* Text overlay gradient */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, rgba(10,15,31,0.94) 0%, rgba(10,15,31,0.80) 55%, rgba(10,15,31,0.20) 100%)",
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
            appeX Blog
          </div>

          {/* Post title */}
          <div
            style={{
              fontFamily: "Tektur",
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "rgba(255,255,255,0.94)",
              marginBottom: 20,
              // Clamp long titles visually
              overflow: "hidden",
              display: "-webkit-box",
            }}
          >
            {title.length > 55 ? title.slice(0, 55) + "…" : title}
          </div>

          {/* Excerpt */}
          <div
            style={{
              fontFamily: "Hubot Sans",
              fontSize: 20,
              fontWeight: 400,
              lineHeight: 1.6,
              color: "rgba(185,160,204,0.85)",
              maxWidth: 580,
            }}
          >
            {excerpt}
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
