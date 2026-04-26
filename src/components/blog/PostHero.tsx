/**
 * PostHero.tsx
 *
 * Server Component  --  static.
 * Justification: no interactive behavior needed; CSS only.
 *
 * Design source: blog-design.md §S1 Post hero
 * Image-below-title layout: breadcrumb → eyebrow chip → H1 → deck → meta → cover image.
 * Prose corridor max-width 720px. Cover image max-width 1040px.
 */

import Image from "next/image";
import Link from "next/link";
import type { PostFrontmatter } from "@/lib/blog/posts";
import { formatDateLong } from "@/lib/formatters";
import type React from "react";

interface PostHeroProps {
  frontmatter: PostFrontmatter;
}

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    lps: "LPs",
    protocol: "Protocol",
    borrowers: "Borrowers",
    markets: "Markets",
    security: "Security",
    governance: "Governance",
  };
  return map[cat] ?? cat;
}

export function PostHero({ frontmatter }: PostHeroProps): React.JSX.Element {
  const catLabel = categoryLabel(frontmatter.category);
  const titleTruncated =
    frontmatter.title.length > 60
      ? frontmatter.title.slice(0, 57) + "..."
      : frontmatter.title;

  return (
    <>
      <style>{`
        /* ── Post Hero ─────────────────────────────────────────────── */
        .post-hero {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 96px 48px 64px;
        }
        @media (max-width: 767px) {
          .post-hero { padding: 80px 24px 48px; }
        }

        .post-hero__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
          opacity: 0.12;
        }

        .post-hero__overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 900px 240px at 50% 10%, rgba(90,28,203,0.12) 0%, transparent 70%),
            linear-gradient(180deg, rgba(10,15,31,0.92) 0%, rgba(10,15,31,0.90) 100%);
        }

        .post-hero__inner {
          position: relative;
          z-index: 2;
          max-width: var(--section-max-width, 1280px);
          margin: 0 auto;
        }

        /* Back link. Mobile audit: bumped from 13px to 14px minimum. */
        .post-hero__back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body-family, system-ui);
          font-size: 14px;
          color: var(--ax-text-tertiary, rgba(185,160,204,0.50));
          text-decoration: none;
          margin-bottom: 24px;
          transition: color 180ms ease-out;
        }
        .post-hero__back:hover { color: var(--ax-text-secondary, rgba(185,160,204,0.78)); }
        @media (prefers-reduced-motion: reduce) {
          .post-hero__back { transition: none; }
        }

        /* Prose corridor */
        .post-hero__copy {
          max-width: 720px;
          margin: 0 auto;
        }

        /* Breadcrumb */
        /* Mobile audit: bumped from 13px to 14px minimum. */
        .post-hero__breadcrumb ol {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
          font-family: var(--font-body-family, system-ui);
          font-size: 14px;
          color: var(--ax-text-tertiary, rgba(185,160,204,0.50));
          flex-wrap: wrap;
        }
        .post-hero__breadcrumb li { display: flex; align-items: center; gap: 8px; }
        .post-hero__breadcrumb a {
          color: var(--ax-text-tertiary, rgba(185,160,204,0.50));
          text-decoration: none;
          transition: color 150ms ease-out;
        }
        .post-hero__breadcrumb a:hover {
          color: var(--ax-text-secondary, rgba(185,160,204,0.78));
        }
        .post-hero__breadcrumb__sep { opacity: 0.4; }

        /* Category chip */
        .post-hero__cat-chip {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-display-family, system-ui);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 4px 10px;
          border-radius: 4px;
          background: rgba(90,28,203,0.22);
          color: var(--ax-capital-yellow, #FED607);
          margin-bottom: 20px;
          line-height: 1;
        }

        /* H1 */
        .post-hero__h1 {
          font-family: var(--font-display-family, system-ui);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: rgba(255,255,255,0.92);
          margin-bottom: 24px;
        }

        /* Deck */
        .post-hero__deck {
          font-family: var(--font-body-family, system-ui);
          font-size: 20px;
          line-height: 1.55;
          color: rgba(255,255,255,0.92);
          margin-bottom: 24px;
        }

        /* Meta bar. Mobile audit: bumped from 13px to 14px minimum. */
        .post-hero__meta {
          font-family: var(--font-body-family, system-ui);
          font-size: 14px;
          color: var(--ax-text-tertiary, rgba(185,160,204,0.50));
          letter-spacing: 0.02em;
          margin-bottom: 16px;
        }
        .post-hero__meta a {
          color: inherit;
          text-decoration: none;
          transition: color 150ms ease-out;
        }
        .post-hero__meta a:hover {
          color: var(--ax-text-secondary, rgba(185,160,204,0.78));
        }

        /* Divider under meta */
        .post-hero__divider {
          width: 100%;
          height: 1px;
          background: rgba(90,28,203,0.22);
          margin-bottom: 48px;
        }

        /* Cover image  --  1040px bound */
        .post-hero__cover {
          max-width: 1040px;
          margin: 0 auto;
        }
        .post-hero__cover img {
          width: 100%;
          height: auto;
          aspect-ratio: 16/10;
          object-fit: cover;
          border-radius: var(--radius-md, 12px);
          box-shadow: inset 0 0 0 1px rgba(90,28,203,0.18);
          display: block;
        }
      `}</style>

      <section id="post-hero" className="post-hero">
        <Image
          src="/images/r17-texture-calm.webp"
          alt="" aria-hidden="true"
          fill
          className="post-hero__texture"
        />
        <div className="post-hero__overlay" aria-hidden="true" />

        <div className="post-hero__inner">
          {/* Back link */}
          <Link href="/blog" className="post-hero__back">
            ← Back to all posts
          </Link>

          <div className="post-hero__copy">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="post-hero__breadcrumb">
              <ol>
                <li>
                  <Link href="/blog">Blog</Link>
                  <span className="post-hero__breadcrumb__sep" aria-hidden="true">·</span>
                </li>
                <li>
                  <Link href={`/blog?category=${frontmatter.category}`}>{catLabel}</Link>
                  <span className="post-hero__breadcrumb__sep" aria-hidden="true">·</span>
                </li>
                <li aria-current="page">{titleTruncated}</li>
              </ol>
            </nav>

            {/* Category chip */}
            <span className="post-hero__cat-chip">{catLabel}</span>

            {/* H1 */}
            <h1 className="post-hero__h1">{frontmatter.title}</h1>

            {/* Deck */}
            <p className="post-hero__deck">{frontmatter.excerpt}</p>

            {/* Meta bar */}
            <dl>
              <dt className="sr-only">Author</dt>
              <dd className="post-hero__meta">
                <Link href="/about" style={{color: "inherit", textDecoration: "none"}}>
                  {frontmatter.author}
                </Link>{" "}
                · {formatDateLong(frontmatter.date)} · {frontmatter.readTime} min read
              </dd>
            </dl>

            <div className="post-hero__divider" role="separator" aria-hidden="true" />
          </div>

          {/* Cover image */}
          <figure className="post-hero__cover">
            <Image
              src={frontmatter.cover}
              alt={frontmatter.coverAlt}
              width={1040}
              height={650}
              priority
              sizes="(max-width: 767px) 100vw, 1040px"
            />
          </figure>
        </div>
      </section>
    </>
  );
}
