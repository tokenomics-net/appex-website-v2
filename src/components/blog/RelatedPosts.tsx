/**
 * RelatedPosts.tsx
 *
 * Server Component  --  static.
 * Justification: no client interactivity; pure presentational.
 *
 * Design source: blog-design.md §S3 Related posts
 */

import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog/posts";
import type React from "react";

interface RelatedPostsProps {
  posts: Post[];
  category: string;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toISOString().split("T")[0];
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

export function RelatedPosts({ posts, category }: RelatedPostsProps): React.JSX.Element {
  if (posts.length === 0) return <></>;

  const catLabel = categoryLabel(category);

  return (
    <>
      <style>{`
        /* ── Related posts section ──────────────────────────────────── */
        .related {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 48px;
        }
        @media (max-width: 767px) {
          .related { padding: 64px 24px; }
        }

        .related__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
          opacity: 0.18;
        }

        .related__overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(10,15,31,0.90) 0%, rgba(10,15,31,0.94) 100%);
        }

        .related__inner {
          position: relative;
          z-index: 2;
          max-width: var(--section-max-width, 1280px);
          margin: 0 auto;
        }

        .related__eyebrow {
          font-family: var(--font-display-family, system-ui);
          font-size: 11px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 8px;
        }

        .related__heading {
          font-family: var(--font-display-family, system-ui);
          font-size: clamp(28px, 3vw, 36px);
          font-weight: 400;
          line-height: 1.2;
          color: rgba(255,255,255,0.92);
          margin-bottom: 48px;
        }

        .related__grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 32px;
        }
        @media (max-width: 1023px) {
          .related__grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
        @media (max-width: 640px) {
          .related__grid { grid-template-columns: 1fr; gap: 20px; }
        }

        /* Card reuse  --  same spec as post-grid cards */
        .related-card__link {
          display: flex;
          flex-direction: column;
          height: 100%;
          text-decoration: none;
          background: rgba(10,15,31,0.70);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(90,28,203,0.20);
          border-radius: var(--radius-md, 12px);
          overflow: hidden;
          transition: transform 240ms ease-out, border-color 240ms ease-out;
          min-height: 380px;
        }
        .related-card__link:hover {
          transform: translateY(-4px);
          border-color: rgba(90,28,203,0.42);
        }
        .related-card__link:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .related-card__link { transition: none; }
        }

        .related-card__image-zone {
          position: relative;
          height: 200px;
          flex-shrink: 0;
          overflow: hidden;
        }

        .related-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 400ms ease-out;
        }
        .related-card__link:hover .related-card__image {
          transform: scale(1.04);
        }

        .related-card__image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 70%, rgba(10,15,31,0.28) 100%);
          pointer-events: none;
        }

        .related-card__cat-chip {
          position: absolute;
          top: 12px;
          left: 12px;
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

        .related-card__content {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 24px;
          gap: 12px;
        }

        .related-card__title {
          font-family: var(--font-display-family, system-ui);
          font-size: 20px;
          font-weight: 500;
          line-height: 1.25;
          color: rgba(255,255,255,0.92);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 200ms ease-out;
        }
        .related-card__link:hover .related-card__title {
          color: var(--ax-capital-yellow, #FED607);
        }

        .related-card__excerpt {
          font-family: var(--font-body-family, system-ui);
          font-size: 14px;
          line-height: 1.55;
          color: var(--ax-text-secondary, rgba(185,160,204,0.78));
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        .related-card__meta-text {
          font-family: var(--font-body-family, system-ui);
          font-size: 13px;
          color: var(--ax-text-tertiary, rgba(185,160,204,0.50));
          letter-spacing: 0.02em;
          margin-top: auto;
        }
      `}</style>

      <section id="related" className="related">
        <Image
          src="/images/r17-texture-rhythm.png"
          alt="" aria-hidden="true"
          fill
          className="related__texture"
        />
        <div className="related__overlay" aria-hidden="true" />

        <div className="related__inner">
          <p className="related__eyebrow">Read next</p>
          <h2 className="related__heading">More from {catLabel}</h2>

          <div className="related__grid" aria-label="Related posts">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="related-card__link"
                  aria-label={`Read: ${post.frontmatter.title}`}
                >
                  <div className="related-card__image-zone">
                    <Image
                      src={post.frontmatter.cover}
                      alt={post.frontmatter.coverAlt}
                      width={640}
                      height={400}
                      loading="lazy"
                      className="related-card__image"
                      sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    />
                    <div className="related-card__image-overlay" aria-hidden="true" />
                    <span className="related-card__cat-chip">
                      {categoryLabel(post.frontmatter.category)}
                    </span>
                  </div>
                  <div className="related-card__content">
                    <h3 className="related-card__title">{post.frontmatter.title}</h3>
                    <p className="related-card__excerpt">{post.frontmatter.excerpt}</p>
                    <dl>
                      <dt className="sr-only">Published</dt>
                      <dd className="related-card__meta-text">
                        {formatDate(post.frontmatter.date)} · {post.frontmatter.readTime} min read
                      </dd>
                    </dl>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
