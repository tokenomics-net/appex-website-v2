/**
 * FeeFlowRecall.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout, no event handlers, no hooks.
 *
 * Design source: appex-design.md Section 6  --  "cross-reference, not rebuild"
 * Background: NO texture  --  deliberate breather between the two data-viz sections
 *   and the governance scene. Plain rgba(10,15,31,0.95) + subtle radial.
 * Left: eyebrow + H2 + body + inline link to /protocol#fee-curve
 * Right: r22-util-liquidity-transparent.webp at 0.65 opacity (liquidity utility asset  --  market-buy semantic)
 * No interaction beyond inline-link hover.
 * Copy: appex.md Section 6. Present tense. No em dashes.
 */

import Image from "next/image";
import Link  from "next/link";

export function FeeFlowRecall(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Fee flow recall  --  deliberate breather ---- */
        .fee-flow {
          position: relative;
          overflow: hidden;
          background: rgba(10,15,31,0.95);
          padding: 48px 0;
        }

        /* Subtle radial accent (no texture per spec) */
        .fee-flow__radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 800px 300px at 75% 50%,
            rgba(90,28,203,0.08) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* Top + bottom hairlines */
        .fee-flow__hairline-top,
        .fee-flow__hairline-bottom {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(254,214,7,0.18) 50%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .fee-flow__hairline-top    { top: 0; }
        .fee-flow__hairline-bottom { bottom: 0; }

        /* Content wrapper */
        .fee-flow__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .fee-flow__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .fee-flow__content { padding: 0 24px; } }

        /* Two-column layout: copy left 60%, thumbnail right 40% */
        .fee-flow__grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 64px;
          align-items: center;
        }

        @media (max-width: 767px) {
          .fee-flow__grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        /* Copy cluster */
        .fee-flow__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 14px;
        }

        .fee-flow__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(32px, 4vw, 44px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 20px 0;
        }

        .fee-flow__body {
          font-family: var(--font-body-family);
          font-size: 16px;
          line-height: 1.7;
          color: var(--text-primary);
          margin: 0 0 20px 0;
          max-width: 560px;
        }

        .fee-flow__link {
          display: inline;
          font-family: var(--font-body-family);
          font-size: 15px;
          font-weight: 500;
          color: var(--ax-capital-yellow, #FED607);
          text-decoration: underline;
          text-decoration-color: rgba(254,214,7,0.4);
          text-underline-offset: 3px;
          transition: text-decoration-color 200ms ease, opacity 200ms ease;
        }

        .fee-flow__link:hover {
          text-decoration-color: rgba(254,214,7,0.9);
        }

        .fee-flow__link:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
        }

        /* Thumbnail */
        .fee-flow__thumb {
          width: clamp(200px, 28vw, 380px);
          height: auto;
          opacity: 0.65;
          filter: drop-shadow(0 4px 20px rgba(254,214,7,0.15))
                  drop-shadow(0 8px 40px rgba(90,28,203,0.12))
                  drop-shadow(0 16px 60px rgba(0,0,0,0.4));
          /* Static per Pass 5 site-wide rule  --  only hero assets float. */
          flex-shrink: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .fee-flow__thumb { transform: none; }
        }

        @media (max-width: 767px) {
          .fee-flow__thumb {
            width: clamp(200px, 60vw, 260px);
            margin: 0 auto;
            display: block;
          }
        }
      `}</style>

      <section className="fee-flow" id="fee-flow" aria-labelledby="fee-flow-heading">

        <div className="fee-flow__radial"        aria-hidden="true" />
        <div className="fee-flow__hairline-top"    aria-hidden="true" />
        <div className="fee-flow__hairline-bottom" aria-hidden="true" />

        <div className="fee-flow__content">
          <div className="fee-flow__grid">

            {/* Copy cluster */}
            <div>
              <div className="fee-flow__eyebrow">Where rewards come from</div>
              <h2 id="fee-flow-heading" className="fee-flow__h2">
                50% of every{" "}
                <span className="text-gold-gradient">protocol fee.</span>
              </h2>
              <p className="fee-flow__body">
                Every borrower advance carries a protocol fee negotiated at onboarding. Half flows to the Treasury. Half converts to $APPEX and distributes to stakers. When a borrower pays that fee in $APPEX, the conversion skips the DEX and moves straight into the staking contract. Either way, the staker share lands in $APPEX.
              </p>
              <Link href="/protocol#fee-curve" className="fee-flow__link">
                See the full fee curve on the Protocol page
              </Link>
            </div>

            {/* Ghost thumbnail (decorative) */}
            <Image
              src="/images/r22-step-fund-draw-transparent.webp"
              alt="Fee split  --  half to treasury, half to stakers"
              role="presentation"
              width={380}
              height={380}
              quality={80}
              className="fee-flow__thumb"
              loading="lazy"
              decoding="async"
            />

          </div>
        </div>

      </section>
    </>
  );
}
