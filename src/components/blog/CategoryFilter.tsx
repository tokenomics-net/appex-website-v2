"use client";
/**
 * CategoryFilter.tsx
 *
 * "use client" justification: URL search param state, sticky scroll behavior,
 * chip active state, keyboard navigation  --  all require browser APIs.
 *
 * Design source: blog-design.md §S3 Sticky filter row
 * Copy source: copy/blog.md §Section 3
 *
 * Renders a sticky chip bar below the nav (top: 72px) on desktop.
 * Not sticky on mobile per spec.
 * Writes ?category= to URL on chip click; smooth-scrolls to #posts.
 */

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import type React from "react";

const ALL_CATEGORIES = [
  { label: "All",        slug: "" },
  { label: "Protocol",   slug: "protocol" },
  { label: "LPs",        slug: "lps" },
  { label: "Borrowers",  slug: "borrowers" },
  { label: "Markets",    slug: "markets" },
  { label: "Security",   slug: "security" },
  { label: "Governance", slug: "governance" },
];

interface CategoryFilterProps {
  activeCategorySlugs: string[];
}

export function CategoryFilter({ activeCategorySlugs }: CategoryFilterProps): React.JSX.Element {
  // Always keep "All" (slug: ""); filter rest to only those with existing posts
  const CATEGORIES = ALL_CATEGORIES.filter(
    (cat) => cat.slug === "" || activeCategorySlugs.includes(cat.slug)
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeCategory = searchParams.get("category") ?? "";

  const handleChipClick = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set("category", slug);
      } else {
        params.delete("category");
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      // Smooth scroll to the post grid
      setTimeout(() => {
        const el = document.getElementById("posts");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    },
    [searchParams, router, pathname]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (currentIndex + 1) % CATEGORIES.length;
        const buttons = document.querySelectorAll<HTMLButtonElement>(".cat-filter__chip");
        buttons[next]?.focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (currentIndex - 1 + CATEGORIES.length) % CATEGORIES.length;
        const buttons = document.querySelectorAll<HTMLButtonElement>(".cat-filter__chip");
        buttons[prev]?.focus();
      }
    },
    []
  );

  return (
    <>
      <style>{`
        /* ── Category filter sticky row ─────────────────────────────── */
        .cat-filter {
          position: sticky;
          top: 72px;
          z-index: 40;
          width: 100%;
          background: rgba(10,15,31,0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(90,28,203,0.18);
          padding: 16px 0;
        }
        @media (max-width: 767px) {
          .cat-filter { position: static; }
        }

        .cat-filter__inner {
          max-width: var(--section-max-width, 1280px);
          margin: 0 auto;
          padding: 0 48px;
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        @media (max-width: 1279px) { .cat-filter__inner { padding: 0 32px; } }
        @media (max-width: 767px)  { .cat-filter__inner { padding: 0 16px; } }
        .cat-filter__inner::-webkit-scrollbar { display: none; }

        /* Mobile audit exception: 11px retained -- category filter pill chip.
         * Uppercase + letter-spacing + 6px padding provides adequate legibility.
         * Not body content; a UI affordance control. */
        .cat-filter__chip {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          font-family: var(--font-display-family, system-ui);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid rgba(90,28,203,0.28);
          background: rgba(90,28,203,0.18);
          color: var(--ax-text-secondary, rgba(185,160,204,0.78));
          cursor: pointer;
          transition: transform 180ms ease-out, border-color 180ms ease-out;
          line-height: 1;
        }
        .cat-filter__chip:hover {
          border-color: rgba(90,28,203,0.55);
          transform: translateY(-1px);
        }
        .cat-filter__chip[aria-selected="true"] {
          background: var(--ax-capital-yellow, #FED607);
          border-color: transparent;
          color: #0A0F1F;
        }
        .cat-filter__chip:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .cat-filter__chip { transition: none; }
        }
      `}</style>

      <nav id="filter" className="cat-filter" aria-label="Filter posts by category">
        <div
          role="tablist"
          aria-label="Post category filters"
          className="cat-filter__inner"
        >
          {CATEGORIES.map((cat, index) => (
            <button
              key={cat.slug}
              role="tab"
              aria-selected={activeCategory === cat.slug}
              aria-controls="post-grid"
              className="cat-filter__chip"
              onClick={() => handleChipClick(cat.slug)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
