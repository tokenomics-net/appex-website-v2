/**
 * CapitalGapSection.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Design source: home-design.md Rev 5 Section 2
 * Spec: THIN STATS BAR. No scene image. Horizontal row of 3 stat callouts.
 * Background: r18-texture-weight.png at 22% opacity + directional gradient overlay.
 * Padding: 48-64px top/bottom MAX per Rev 5. Total section ~200-250px.
 * Copy: Updated  --  120 to 180 days (NOT 60 days).
 */

import Image from "next/image";

export function CapitalGapSection(): React.JSX.Element {
  return (
    <>
      <style>{`
        .capital-gap {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress);
        }

        /* Texture underlay only  --  no scene image per Rev 5 */
        .capital-gap__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.22;
          pointer-events: none;
          z-index: 0;
        }

        /* Directional gradient overlay for legibility */
        .capital-gap__gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(10,15,31,0.80) 0%,
            rgba(10,15,31,0.55) 50%,
            rgba(10,15,31,0.72) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Top hairline separator */
        .capital-gap__hairline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(254,214,7,0.18) 40%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }

        /* Bottom hairline separator */
        .capital-gap__hairline-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }

        /* Content: thin bar layout */
        .capital-gap__content {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin: 0 auto;
          padding: 56px 48px;
        }

        @media (max-width: 1023px) {
          .capital-gap__content { padding: 48px 32px; }
        }
        @media (max-width: 767px) {
          .capital-gap__content { padding: 40px 24px; }
        }

        /* Eyebrow above the stat row.
         * Mobile audit: opacity bumped from 0.55 to 0.80 -- 14px at 55% opacity
         * reads as ~9px effective visual contrast on small screens. */
        .capital-gap__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.80;
          margin-bottom: 24px;
          text-align: center;
        }

        /* Stat bar: horizontal row of 3 callouts */
        .capital-gap__stats {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border-radius: var(--radius-sm, 6px);
          overflow: hidden;
        }

        @media (max-width: 767px) {
          .capital-gap__stats {
            grid-template-columns: 1fr;
          }
        }

        .capital-gap__stat {
          background: rgba(10,15,31,0.60);
          padding: 28px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
          opacity: 0;
          transform: translateY(16px);
          animation: capitalGapStatReveal 0.5s var(--ease-enter) forwards;
        }
        .capital-gap__stats > .capital-gap__stat:nth-child(1) { animation-delay: 0ms; }
        .capital-gap__stats > .capital-gap__stat:nth-child(2) { animation-delay: 80ms; }
        .capital-gap__stats > .capital-gap__stat:nth-child(3) { animation-delay: 160ms; }

        @keyframes capitalGapStatReveal {
          to { opacity: 1; transform: none; }
        }

        @media (max-width: 1023px) {
          .capital-gap__stat { padding: 24px 20px; }
        }

        .capital-gap__stat-number {
          font-family: var(--font-display-family);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          line-height: 1;
          color: var(--text-primary);
        }

        .capital-gap__stat-number--gold {
          background: var(--ax-gradient-gold, linear-gradient(135deg, #fed607 0%, #faf28b 100%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .capital-gap__stat-label {
          font-size: 14px;
          line-height: 1.45;
          color: var(--text-secondary);
          max-width: 180px;
        }

        /* Source attribution  --  de-emphasized, for AI citability (GEO audit).
         * Mobile audit: bumped from 10px to 14px minimum floor. */
        .capital-gap__stat-source {
          font-size: 14px;
          line-height: 1.4;
          color: var(--ax-text-tertiary);
          opacity: 0.65;
          max-width: 200px;
          margin-top: 6px;
          font-family: var(--font-body-family);
        }

        /* Pending-highlight  --  shared with legal pages */
        .capital-gap__stat-source .pending {
          display: inline;
          background: rgba(254,214,7,0.18);
          border: 1px solid rgba(254,214,7,0.40);
          border-radius: 3px;
          padding: 0px 4px;
          font-size: 0.9em;
          font-style: italic;
          color: var(--ax-capital-yellow);
        }

        @media (prefers-reduced-motion: reduce) {
          .capital-gap__stat {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <section className="capital-gap" aria-labelledby="capital-gap-heading">
        <Image
          src="/images/r18-texture-weight.webp"
          alt="" aria-hidden="true"
          fill
          className="capital-gap__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
          decoding="async"
        />
        <div className="capital-gap__gradient" aria-hidden="true" />
        <div className="capital-gap__hairline" aria-hidden="true" />
        <div className="capital-gap__hairline-bottom" aria-hidden="true" />

        <div className="capital-gap__content">
          <div id="capital-gap-heading" className="capital-gap__eyebrow">
            The Capital Gap
          </div>

          {/* Three stat callouts  --  horizontal bar */}
          <div className="capital-gap__stats" role="list" aria-label="Capital gap statistics">
            <div className="capital-gap__stat" role="listitem">
              <div className="capital-gap__stat-number capital-gap__stat-number--gold">$4T+</div>
              <p className="capital-gap__stat-label">locked in global working capital pipelines</p>
            </div>
            <div className="capital-gap__stat" role="listitem">
              <div className="capital-gap__stat-number capital-gap__stat-number--gold">120&ndash;180</div>
              <p className="capital-gap__stat-label">days average wait for payment after revenue is earned</p>
            </div>
            <div className="capital-gap__stat" role="listitem">
              <div className="capital-gap__stat-number capital-gap__stat-number--gold">10&ndash;30%</div>
              <p className="capital-gap__stat-label">cost of traditional receivables financing</p>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
