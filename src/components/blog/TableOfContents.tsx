"use client";
/**
 * TableOfContents.tsx
 *
 * "use client" justification: IntersectionObserver (browser API),
 * active-section state tracking, smooth-scroll anchor clicks.
 *
 * Design source: blog-design.md §S2.5 Sticky TOC
 * Desktop only (>=1200px). Below that returns null.
 */

import { useState, useEffect, useCallback } from "react";
import type React from "react";

export interface TocEntry {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: TocEntry[];
}

export function TableOfContents({ headings }: TableOfContentsProps): React.JSX.Element | null {
  const [activeId, setActiveId] = useState<string>("");
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  // Desktop detection
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1200px)");
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver on all H2 elements
  useEffect(() => {
    if (!isDesktop || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-96px 0px -66% 0px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings, isDesktop]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });

      // Update URL hash
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    },
    []
  );

  if (!isDesktop || headings.length === 0) return null;

  return (
    <>
      <style>{`
        /* ── Table of Contents (sticky, desktop only) ───────────────── */
        .toc {
          position: sticky;
          top: 96px;
          align-self: start;
          padding: 0 0 0 24px;
          border-left: 1px solid rgba(90,28,203,0.22);
        }

        .toc__eyebrow {
          font-family: var(--font-display-family, system-ui);
          font-size: 11px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
          display: block;
        }

        .toc__list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .toc__item {
          margin-bottom: 10px;
        }

        .toc__link {
          display: block;
          font-family: var(--font-body-family, system-ui);
          font-size: 14px;
          line-height: 1.4;
          color: var(--ax-text-secondary, rgba(185,160,204,0.78));
          padding: 4px 0 4px 12px;
          border-left: 2px solid transparent;
          text-decoration: none;
          transition: color 200ms ease-out, border-color 200ms ease-out;
        }
        .toc__link:hover {
          color: var(--ax-text-primary, rgba(255,255,255,0.92));
          border-left-color: rgba(254,214,7,0.5);
        }
        .toc__link[aria-current="location"] {
          color: var(--ax-capital-yellow, #FED607);
          font-weight: 500;
          border-left-color: var(--ax-capital-yellow, #FED607);
        }
        @media (prefers-reduced-motion: reduce) {
          .toc__link { transition: none; }
        }
      `}</style>

      <nav className="toc" aria-label="Post sections">
        <span className="toc__eyebrow">On this page</span>
        <ol className="toc__list">
          {headings.map(({ id, text }) => (
            <li key={id} className="toc__item">
              <a
                href={`#${id}`}
                className="toc__link"
                aria-current={activeId === id ? "location" : undefined}
                onClick={(e) => handleClick(e, id)}
              >
                {text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
