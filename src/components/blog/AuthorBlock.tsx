/**
 * AuthorBlock.tsx
 *
 * Server Component  --  static.
 * Justification: pure presentational, no interactivity.
 *
 * Design source: blog-design.md §S4 Author block
 * Copy source: copy/blog.md §Author block
 * Protocol framing rule: appeX is a decentralized protocol, not a team.
 */

import Link from "next/link";
import type React from "react";

export function AuthorBlock(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ── Author block ───────────────────────────────────────────── */
        .author-block-section {
          padding: 0 48px 48px;
          background: var(--ax-fortress, #0A0F1F);
        }
        @media (max-width: 767px) {
          .author-block-section { padding: 0 24px 48px; }
        }

        .author-block {
          max-width: 1040px;
          margin: 0 auto;
          background: rgba(10,15,31,0.62);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(90,28,203,0.18);
          border-radius: var(--radius-md, 12px);
          padding: 24px 32px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 32px;
          align-items: center;
        }
        @media (max-width: 720px) {
          .author-block {
            grid-template-columns: 1fr;
            gap: 16px;
            text-align: center;
            padding: 20px 24px;
          }
        }

        .author-block__attribution {
          font-family: var(--font-body-family, system-ui);
          font-size: 16px;
          line-height: 1.5;
          color: rgba(255,255,255,0.92);
          margin: 0 0 4px;
        }

        .author-block__about-link {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          font-family: var(--font-display-family, system-ui);
          font-size: 14px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 8px 16px;
          border-radius: 9999px;
          border: 1px solid rgba(254,214,7,0.35);
          color: var(--ax-capital-yellow, #FED607);
          text-decoration: none;
          transition: border-color 180ms ease-out, background 180ms ease-out;
        }
        .author-block__about-link:hover {
          border-color: var(--ax-capital-yellow, #FED607);
          background: rgba(254,214,7,0.08);
        }
        .author-block__about-link:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .author-block__about-link { transition: none; }
        }
      `}</style>

      <section id="author" aria-label="Authorship" className="author-block-section">
        <div className="author-block">
          {/* Left: attribution */}
          <div>
            <p className="author-block__attribution">Published by the appeX Protocol.</p>
          </div>

          {/* Right: about link */}
          <Link href="/about" className="author-block__about-link">
            About the protocol &#8594;
          </Link>
        </div>
      </section>
    </>
  );
}
