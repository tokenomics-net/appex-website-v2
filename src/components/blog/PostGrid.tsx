"use client";
/**
 * PostGrid.tsx
 *
 * "use client" justification: URL query param state (?category=), load-more
 * pagination, and card entrance animations require client-side interactivity.
 *
 * Design source: blog-design.md §S4 Post grid
 * Copy source: copy/blog.md §Section 4
 */

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/blog/posts";
import type React from "react";

interface PostGridProps {
  /** All posts, featured post already excluded */
  posts: Post[];
}

const PAGE_SIZE = 9;

const CATEGORIES = [
  { label: "All", slug: "" },
  { label: "Protocol", slug: "protocol" },
  { label: "LPs", slug: "lps" },
  { label: "Borrowers", slug: "borrowers" },
  { label: "Markets", slug: "markets" },
  { label: "Security", slug: "security" },
  { label: "Governance", slug: "governance" },
];

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    lps: "LPs",
    protocol: "Protocol",
    borrowers: "Borrowers",
    markets: "Markets",
    security: "Security",
    governance: "Governance",
  };
  return map[cat] ?? "All";
}

export function PostGrid({ posts }: PostGridProps): React.JSX.Element {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";

  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [announcement, setAnnouncement] = useState<string>("");

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory]);

  // Filter posts by active category
  const filtered = activeCategory
    ? posts.filter((p) => p.frontmatter.category === activeCategory)
    : posts;

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = useCallback(() => {
    const next = visibleCount + PAGE_SIZE;
    setVisibleCount(next);
    setAnnouncement("Nine more posts loaded.");
  }, [visibleCount]);

  const headingText = activeCategory ? categoryLabel(activeCategory) : "All posts";

  return (
    <>
      <style>{`
        /* ── Post Grid section ───────────────────────────────────────── */
        .post-grid-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }
        @media (max-width: 767px) {
          .post-grid-section { padding: 64px 0; }
        }

        .post-grid-section__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
          opacity: 0.18;
        }

        .post-grid-section__overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(10,15,31,0.88) 0%, rgba(10,15,31,0.92) 100%);
        }

        .post-grid-section__inner {
          position: relative;
          z-index: 2;
          max-width: var(--section-max-width, 1280px);
          margin: 0 auto;
          padding: 0 48px;
        }
        @media (max-width: 1279px) { .post-grid-section__inner { padding: 0 32px; } }
        @media (max-width: 767px)  { .post-grid-section__inner { padding: 0 16px; } }

        .post-grid-section__header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .post-grid-section__eyebrow {
          font-family: var(--font-display-family, system-ui);
          font-size: 14px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 8px;
        }

        .post-grid-section__heading {
          font-family: var(--font-display-family, system-ui);
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 400;
          line-height: 1.2;
          color: rgba(255,255,255,0.92);
          margin: 0;
        }

        .post-grid-section__count {
          font-family: var(--font-body-family, system-ui);
          font-size: 14px;
          color: var(--ax-text-tertiary, rgba(185,160,204,0.50));
          white-space: nowrap;
        }

        /* Card grid */
        .post-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 32px;
        }
        @media (max-width: 1023px) {
          .post-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
        @media (max-width: 640px) {
          .post-grid { grid-template-columns: 1fr; gap: 20px; }
        }

        /* Individual card styles (used by PostCard) */
        .post-card {
          min-height: 420px;
        }
        @media (max-width: 1023px) {
          .post-card { min-height: 380px; }
        }

        .post-card__link {
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
        }
        .post-card__link:hover {
          transform: translateY(-4px);
          border-color: rgba(90,28,203,0.42);
        }
        .post-card__link:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .post-card__link { transition: none; }
        }

        .post-card__image-zone {
          position: relative;
          height: 200px;
          overflow: hidden;
          flex-shrink: 0;
        }
        @media (max-width: 1023px) {
          .post-card__image-zone { height: 180px; }
        }

        .post-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 400ms ease-out;
        }
        .post-card__link:hover .post-card__image {
          transform: scale(1.04);
        }

        .post-card__image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 70%, rgba(10,15,31,0.28) 100%);
          pointer-events: none;
        }

        .post-card__cat-chip {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: var(--font-display-family, system-ui);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 4px 10px;
          border-radius: 4px;
          background: rgba(90,28,203,0.22);
          color: var(--ax-capital-yellow, #FED607);
          line-height: 1;
        }

        .post-card__content {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 24px;
          gap: 12px;
        }
        @media (max-width: 767px) {
          .post-card__content { padding: 20px; }
        }

        .post-card__title {
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
        .post-card__link:hover .post-card__title {
          color: var(--ax-capital-yellow, #FED607);
        }

        .post-card__excerpt {
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

        .post-card__meta {
          margin-top: auto;
        }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .post-card__meta-text {
          font-family: var(--font-body-family, system-ui);
          font-size: 14px;
          color: var(--ax-text-tertiary, rgba(185,160,204,0.50));
          letter-spacing: 0.02em;
        }

        /* Empty state */
        .post-grid__empty {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 64px 24px;
          text-align: center;
          background: rgba(10,15,31,0.70);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(90,28,203,0.20);
          border-radius: var(--radius-md, 12px);
        }

        .post-grid__empty-text {
          font-family: var(--font-body-family, system-ui);
          font-size: 16px;
          color: var(--ax-text-secondary, rgba(185,160,204,0.78));
          line-height: 1.55;
        }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .post-grid__empty-link {
          font-family: var(--font-display-family, system-ui);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 10px 20px;
          border-radius: 9999px;
          border: 1px solid rgba(254,214,7,0.35);
          color: var(--ax-capital-yellow, #FED607);
          text-decoration: none;
          transition: border-color 180ms ease-out;
        }
        .post-grid__empty-link:hover { border-color: var(--ax-capital-yellow, #FED607); }

        /* Load more */
        .post-grid__load-more-row {
          display: flex;
          justify-content: center;
          margin-top: 48px;
        }

        /* Mobile audit: bumped from 13px to 14px minimum. */
        .post-grid__load-more {
          font-family: var(--font-display-family, system-ui);
          font-size: 14px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 12px 28px;
          border-radius: 9999px;
          border: 1px solid rgba(254,214,7,0.35);
          color: var(--ax-capital-yellow, #FED607);
          background: transparent;
          cursor: pointer;
          transition: border-color 180ms ease-out, background 180ms ease-out;
        }
        .post-grid__load-more:hover {
          border-color: var(--ax-capital-yellow, #FED607);
          background: rgba(254,214,7,0.08);
        }
        @media (prefers-reduced-motion: reduce) {
          .post-grid__load-more { transition: none; }
          .post-grid__empty-link { transition: none; }
        }

        .post-grid__archive-end {
          font-family: var(--font-body-family, system-ui);
          font-size: 14px;
          color: var(--ax-text-tertiary, rgba(185,160,204,0.50));
          text-align: center;
          margin-top: 48px;
        }
      `}</style>

      {/* Texture background as a div (not Image fill to avoid Next.js layout issues with client component) */}
      <section id="posts" className="post-grid-section">
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/r17-texture-calm.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
            zIndex: 0,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        <div className="post-grid-section__overlay" aria-hidden="true" />

        <div className="post-grid-section__inner">
          <div className="post-grid-section__header">
            <div>
              <p className="post-grid-section__eyebrow">Latest</p>
              <h2 className="post-grid-section__heading">{headingText}</h2>
            </div>
            <span className="post-grid-section__count">{filtered.length} post{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {/* Screen-reader live region for load-more announcements */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {announcement}
          </div>

          <div
            role="tabpanel"
            id="post-grid"
            aria-live="polite"
            aria-label={`Posts, filtered by ${activeCategory || "all categories"}`}
            className="post-grid"
          >
            {visible.length === 0 ? (
              <div className="post-grid__empty">
                <p className="post-grid__empty-text">
                  Nothing in this category yet. Pick another filter above, or read the full archive.
                </p>
                <a href="/blog" className="post-grid__empty-link">
                  Show all posts
                </a>
              </div>
            ) : (
              visible.map((post, index) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  priority={index < 3}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {hasMore && (
            <div className="post-grid__load-more-row">
              <button
                className="post-grid__load-more"
                onClick={loadMore}
                aria-label={`Load more posts, currently showing ${visibleCount} of ${filtered.length}`}
              >
                Load more
              </button>
            </div>
          )}
          {!hasMore && filtered.length > PAGE_SIZE && (
            <p className="post-grid__archive-end">That is the full archive.</p>
          )}
        </div>
      </section>
    </>
  );
}
