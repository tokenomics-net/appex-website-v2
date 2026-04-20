/**
 * FeaturedPost.tsx
 *
 * Server Component  --  static glass card.
 * Justification: no client interactivity, hover handled via CSS.
 *
 * Design source: blog-design.md §S2 Featured post
 * Copy source: copy/blog.md §Section 2
 */

import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog/posts";
import type React from "react";

interface FeaturedPostProps {
  post: Post;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toISOString().split("T")[0]; // YYYY-MM-DD per copy spec
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

export function FeaturedPost({ post }: FeaturedPostProps): React.JSX.Element {
  const { frontmatter, slug } = post;

  return (
    <>
      <style>{`
        /* ── Featured Post section ──────────────────────────────────── */
        .featured-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }
        @media (max-width: 767px) {
          .featured-section { padding: 64px 0; }
        }

        .featured-section__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
          opacity: 0.18;
        }

        .featured-section__overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 1400px 500px at 50% 50%, rgba(90,28,203,0.10) 0%, transparent 70%),
            linear-gradient(180deg, rgba(10,15,31,0.88) 0%, rgba(10,15,31,0.82) 50%, rgba(10,15,31,0.90) 100%);
        }

        .featured-section__inner {
          position: relative;
          z-index: 2;
          max-width: var(--section-max-width, 1280px);
          margin: 0 auto;
          padding: 0 48px;
        }
        @media (max-width: 1279px) { .featured-section__inner { padding: 0 32px; } }
        @media (max-width: 767px)  { .featured-section__inner { padding: 0 16px; } }

        .featured-eyebrow {
          font-family: var(--font-display-family, system-ui);
          font-size: 11px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 24px;
        }

        /* Card */
        .featured-card {
          display: grid;
          grid-template-columns: 55fr 45fr;
          min-height: 440px;
          background: rgba(10,15,31,0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(90,28,203,0.22);
          border-radius: var(--radius-md, 12px);
          overflow: hidden;
          text-decoration: none;
          transition: transform 240ms ease-out, border-color 240ms ease-out;
        }
        .featured-card:hover {
          transform: translateY(-4px);
          border-color: rgba(90,28,203,0.42);
        }
        .featured-card:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 2px;
        }
        @media (max-width: 900px) {
          .featured-card {
            grid-template-columns: 1fr;
            min-height: auto;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .featured-card { transition: none; }
        }

        /* Image zone */
        .featured-card__image-zone {
          position: relative;
          overflow: hidden;
          min-height: 440px;
          aspect-ratio: 4/3;
        }
        @media (max-width: 900px) {
          .featured-card__image-zone {
            min-height: 260px;
            aspect-ratio: 16/9;
          }
        }

        .featured-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 600ms ease-out;
        }
        .featured-card:hover .featured-card__image {
          transform: scale(1.03);
        }

        .featured-card__image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 60%, rgba(10,15,31,0.20) 100%);
          pointer-events: none;
        }

        /* Copy zone */
        .featured-card__copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 16px;
          padding: 40px 48px;
        }
        @media (max-width: 900px) {
          .featured-card__copy { padding: 32px 24px; }
        }

        .featured-card__meta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .featured-card__category-chip {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-display-family, system-ui);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 4px 10px;
          border-radius: 4px;
          background: rgba(90,28,203,0.22);
          color: var(--ax-capital-yellow, #FED607);
          line-height: 1;
        }

        .featured-card__eyebrow-label {
          font-family: var(--font-display-family, system-ui);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
        }

        .featured-card__title {
          font-family: var(--font-display-family, system-ui);
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 400;
          line-height: 1.2;
          color: rgba(255,255,255,0.92);
          margin: 0;
        }

        .featured-card__deck {
          font-family: var(--font-body-family, system-ui);
          font-size: 16px;
          line-height: 1.6;
          color: var(--ax-text-secondary, rgba(185,160,204,0.78));
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin: 0;
        }

        .featured-card__meta {
          font-family: var(--font-body-family, system-ui);
          font-size: 13px;
          color: var(--ax-text-tertiary, rgba(185,160,204,0.50));
          letter-spacing: 0.02em;
        }

        .featured-card__cta {
          display: inline-flex;
          align-items: center;
          margin-top: 8px;
          align-self: flex-end;
          font-family: var(--font-display-family, system-ui);
          font-size: 13px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 10px 20px;
          border-radius: 9999px;
          border: 1px solid rgba(254,214,7,0.35);
          color: var(--ax-capital-yellow, #FED607);
          background: transparent;
          transition: border-color 180ms ease-out, background 180ms ease-out;
          white-space: nowrap;
        }
        .featured-card:hover .featured-card__cta {
          border-color: var(--ax-capital-yellow, #FED607);
          background: rgba(254,214,7,0.08);
        }
      `}</style>

      <section id="featured" className="featured-section">
        {/* Texture */}
        <Image
          src="/images/r17-texture-calm.png"
          alt="" aria-hidden="true"
          fill
          className="featured-section__texture"
        />
        <div className="featured-section__overlay" aria-hidden="true" />

        <div className="featured-section__inner">
          <p className="featured-eyebrow">Featured</p>

          <Link href={`/blog/${slug}`} className="featured-card" aria-label={`Read: ${frontmatter.title}`}>
            {/* Left: cover image */}
            <div className="featured-card__image-zone">
              <Image
                src={frontmatter.cover}
                alt={frontmatter.coverAlt}
                fill
                className="featured-card__image"
                priority
                sizes="(max-width: 900px) 100vw, 55vw"
              />
              <div className="featured-card__image-overlay" aria-hidden="true" />
            </div>

            {/* Right: copy */}
            <article className="featured-card__copy">
              <div className="featured-card__meta-row">
                <span className="featured-card__eyebrow-label">Featured</span>
                <span className="featured-card__category-chip">
                  {categoryLabel(frontmatter.category)}
                </span>
              </div>

              <h2 className="featured-card__title">{frontmatter.title}</h2>

              <p className="featured-card__deck">{frontmatter.excerpt}</p>

              <dl>
                <dt className="sr-only">Meta</dt>
                <dd className="featured-card__meta">
                  {frontmatter.author} · {formatDate(frontmatter.date)} · {frontmatter.readTime} min read
                </dd>
              </dl>

              <span className="featured-card__cta" aria-hidden="true">
                Read the post
              </span>
            </article>
          </Link>
        </div>
      </section>
    </>
  );
}
