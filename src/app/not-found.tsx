/**
 * app/not-found.tsx
 *
 * Branded 404 page  --  Server Component (no "use client" needed).
 * Returns HTTP 404 for non-streamed responses.
 *
 * Design: uses existing brand token system (no hardcoded hex).
 * Header + footer provided by root layout  --  this renders inside <main>.
 * Asset: r19-asset-redemption-gate-arch-transparent.webp  --  the right visual
 *   metaphor for "a gate that wasn't meant for this path."
 * Copy: short, on-voice, under 40 words. No em dashes.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title:       "Page not found | appeX Protocol",
  description: "This page does not exist. Head back to appeX Protocol and find what you came for.",
  robots: { index: false, follow: false },
};

export default function NotFound(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- 404 page ---- */
        .notfound {
          min-height: 80vh;
          background: var(--ax-fortress);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 24px 120px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        /* Subtle radial glow behind the asset */
        .notfound__glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(ellipse at center,
            rgba(90,28,203,0.14) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        .notfound__asset-wrap {
          position: relative;
          width: 200px;
          height: 200px;
          margin-bottom: 40px;
          opacity: 0.70;
          filter: drop-shadow(0 16px 40px rgba(90,28,203,0.25)) drop-shadow(0 4px 12px rgba(0,0,0,0.40));
        }

        .notfound__code {
          font-family: var(--font-display-family);
          font-size: 80px;
          font-weight: 400;
          line-height: 1;
          color: var(--ax-capital-yellow);
          letter-spacing: -2px;
          margin-bottom: 16px;
          opacity: 0.25;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          user-select: none;
        }

        .notfound__inner {
          position: relative;
          z-index: 2;
          max-width: 480px;
        }

        .notfound__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .notfound__heading {
          font-family: var(--font-display-family);
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 400;
          line-height: 1.15;
          color: var(--ax-text-primary);
          margin: 0 0 16px;
        }

        .notfound__body {
          font-family: var(--font-body-family);
          font-size: 16px;
          line-height: 1.7;
          color: var(--ax-text-secondary);
          margin: 0 0 40px;
        }

        /* Primary CTA */
        .notfound__cta-primary {
          display: inline-block;
          padding: 12px 28px;
          background: var(--ax-capital-yellow);
          color: var(--ax-fortress);
          font-family: var(--font-display-family);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: var(--radius-pill);
          transition: opacity 180ms ease, transform 180ms ease;
          margin-bottom: 32px;
        }

        .notfound__cta-primary:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        .notfound__cta-primary:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 4px;
        }

        /* Secondary nav links */
        .notfound__nav {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
          justify-content: center;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .notfound__nav-link {
          font-family: var(--font-body-family);
          font-size: 14px;
          color: var(--ax-ether-mist);
          text-decoration: none;
          opacity: 0.70;
          transition: opacity 180ms ease, color 180ms ease;
        }

        .notfound__nav-link:hover {
          opacity: 1;
          color: var(--ax-capital-yellow);
        }

        .notfound__nav-link:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
          border-radius: 3px;
        }

        @media (max-width: 480px) {
          .notfound__asset-wrap {
            width: 140px;
            height: 140px;
          }
          .notfound__code {
            font-size: 60px;
          }
        }
      `}</style>

      <section className="notfound" aria-labelledby="notfound-heading">
        <div className="notfound__glow" aria-hidden="true" />

        {/* Floater asset with 404 code overlaid */}
        <div className="notfound__asset-wrap" aria-hidden="true">
          <div className="notfound__code">404</div>
          <Image
            src="/images/r19-asset-redemption-gate-arch-transparent.webp"
            alt=""
            width={200}
            height={200}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
            priority
          />
        </div>

        <div className="notfound__inner">
          <div className="notfound__eyebrow">404</div>
          <h1 id="notfound-heading" className="notfound__heading">
            This gate is not on the map.
          </h1>
          <p className="notfound__body">
            The page you are looking for does not exist. The protocol is still
            running. Head back and find what you came for.
          </p>

          <Link href="/" className="notfound__cta-primary">
            Back to appeX
          </Link>

          <nav aria-label="Main sections">
            <ul className="notfound__nav">
              <li>
                <Link href="/lps" className="notfound__nav-link">For LPs</Link>
              </li>
              <li>
                <Link href="/borrowers" className="notfound__nav-link">For Borrowers</Link>
              </li>
              <li>
                <Link href="/protocol" className="notfound__nav-link">Protocol</Link>
              </li>
              <li>
                <Link href="/appex" className="notfound__nav-link">$APPEX</Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
