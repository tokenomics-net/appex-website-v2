/**
 * FollowBand.tsx
 *
 * Server Component  --  static.
 * Justification: pure presentational, no interactivity needed.
 *
 * Design source: blog-design.md §S5 Follow for updates
 * Copy source: copy/blog.md §Section 5
 */

import Image from "next/image";
import type React from "react";

export function FollowBand(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ── Follow for updates band ────────────────────────────────── */
        .follow-band {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 64px 0;
        }
        @media (max-width: 767px) {
          .follow-band { padding: 64px 0; }
        }

        .follow-band__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
          opacity: 0.16;
        }

        .follow-band__overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 1600px 80px at 50% 100%, rgba(254,214,7,0.06) 0%, transparent 70%),
            linear-gradient(180deg, rgba(10,15,31,0.94) 0%, rgba(10,15,31,0.90) 50%, rgba(10,15,31,0.98) 100%);
        }

        .follow-band__inner {
          position: relative;
          z-index: 2;
          max-width: 720px;
          margin: 0 auto;
          padding: 0 48px;
          text-align: center;
        }
        @media (max-width: 1279px) { .follow-band__inner { padding: 0 32px; } }
        @media (max-width: 767px)  { .follow-band__inner { padding: 0 16px; } }

        .follow-band__eyebrow {
          font-family: var(--font-display-family, system-ui);
          font-size: 11px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .follow-band__heading {
          font-family: var(--font-display-family, system-ui);
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 400;
          line-height: 1.2;
          color: rgba(255,255,255,0.92);
          margin-bottom: 16px;
        }

        .follow-band__subhead {
          font-family: var(--font-body-family, system-ui);
          font-size: 16px;
          line-height: 1.55;
          color: var(--ax-text-secondary, rgba(185,160,204,0.78));
          max-width: 560px;
          margin: 0 auto 24px;
        }

        .follow-band__links {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
        }

        .follow-band__rss-link {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-display-family, system-ui);
          font-size: 13px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 12px 24px;
          border-radius: 9999px;
          border: 1px solid rgba(254,214,7,0.35);
          color: var(--ax-capital-yellow, #FED607);
          text-decoration: none;
          transition: border-color 180ms ease-out, background 180ms ease-out;
        }
        .follow-band__rss-link:hover {
          border-color: var(--ax-capital-yellow, #FED607);
          background: rgba(254,214,7,0.08);
        }
        .follow-band__rss-link:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 2px;
        }


        @media (prefers-reduced-motion: reduce) {
          .follow-band__rss-link { transition: none; }
        }
      `}</style>

      <section id="follow" className="follow-band">
        <Image
          src="/images/r18-texture-horizon.png"
          alt="" aria-hidden="true"
          fill
          className="follow-band__texture"
        />
        <div className="follow-band__overlay" aria-hidden="true" />

        <div className="follow-band__inner">
          <p className="follow-band__eyebrow">Stay close</p>
          <h2 className="follow-band__heading">Subscribe to new posts.</h2>
          <p className="follow-band__subhead">
            Every post lands in RSS the moment it publishes. Email list is on the roadmap.
          </p>

          <nav aria-label="Follow the publication" className="follow-band__links">
            <a
              href="/blog/rss.xml"
              className="follow-band__rss-link"
            >
              Subscribe via RSS
            </a>

          </nav>
        </div>
      </section>
    </>
  );
}
