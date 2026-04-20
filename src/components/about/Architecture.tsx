/**
 * Architecture.tsx
 *
 * Server Component  --  no client interactivity.
 * Justification: static numbered list layout  --  no hooks required.
 *
 * Design source: revision-pass-4.md §5.1 Section C + website-layout-standards.md
 * Copy source: outputs/appex-website-build/copy/about.md Section C (TONY-APPROVED)
 *
 * Layout: numbered 3-step ordered list. Summary only  --  full detail lives on /protocol.
 * Single .cta-link to /protocol.
 * No floating assets.
 *
 * Background:
 *   Layer 0: r17-texture-rhythm.png at 18%
 *   Layer 1: directional overlay
 *   Layer 2: ambient warm wash (bottom-right)
 */

import Link from "next/link";
import Image from "next/image";

interface Step {
  num:  string;
  body: string;
}

const STEPS: Step[] = [
  {
    num:  "01",
    body: "Isolated vaults hold USDC from LPs and release advances to approved borrowers. Each vault carries its own NAV, borrower pool, and fee curve. Losses in one vault do not reach another.",
  },
  {
    num:  "02",
    body: "$APPEX stakes against locked LP tokens for a share of protocol fees, weighted by lock duration. Stakers earn half of every protocol fee converted to $APPEX. Governance rights activate through the same staking position.",
  },
  {
    num:  "03",
    body: "Undrawn USDC sits in Aave, earning a DeFi lending rate until the next draw. Aave is also the primary source of LP redemption liquidity. The vault never liquidates outstanding advances early.",
  },
];

export function Architecture(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Architecture summary  --  3 numbered steps ---- */
        .about-arch {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        /* Layer 0: r17-texture-rhythm at 18% */
        .about-arch__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          z-index: 0;
          opacity: 0.18;
        }

        /* Layer 1: directional overlay */
        .about-arch__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.88) 0%,
            rgba(10,15,31,0.80) 50%,
            rgba(10,15,31,0.90) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 2: ambient warm wash (bottom-right) */
        .about-arch__ambient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 1000px 600px at 80% 80%,
            rgba(254,214,7,0.07) 0%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Content wrapper */
        .about-arch__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .about-arch__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .about-arch__content { padding: 0 24px; } }

        /* Two-column layout: header left, steps right */
        .about-arch__inner {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 80px;
          align-items: start;
        }

        @media (max-width: 1023px) {
          .about-arch__inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        /* Section header */
        .about-arch__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .about-arch__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .about-arch__subhead {
          font-family: var(--font-body-family);
          font-size: 16px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Steps ordered list */
        .about-arch__steps {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .about-arch__step {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 24px;
          align-items: start;
          padding: 32px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .about-arch__step:first-child {
          padding-top: 0;
        }

        .about-arch__step:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        /* Step number */
        .about-arch__step-num {
          font-family: var(--font-display-family);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.60;
          padding-top: 3px;
        }

        /* Step body */
        .about-arch__step-body {
          font-family: var(--font-body-family);
          font-size: 16px;
          line-height: 1.65;
          color: var(--text-secondary);
          margin: 0;
        }

        /* CTA row  --  below steps */
        .about-arch__cta-row {
          display: flex;
          margin-top: 40px;
        }

        /* .cta-link  --  per R1.7 */
        .about-arch__cta-link {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-body-family);
          font-size: 14px;
          font-weight: 600;
          color: var(--ax-capital-yellow, #FED607);
          text-decoration: none;
          border: 1px solid rgba(254,214,7,0.40);
          border-radius: 999px;
          padding: 10px 20px;
          transition: border-color 200ms ease, background 200ms ease;
          white-space: nowrap;
        }

        .about-arch__cta-link:hover {
          border-color: rgba(254,214,7,0.80);
          background: rgba(254,214,7,0.06);
        }

        .about-arch__cta-link:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-arch__cta-link { transition: none; }
        }
      `}</style>

      <section className="about-arch" id="architecture" aria-labelledby="about-arch-heading">

        {/* Layer 0: r17-texture-rhythm at 18% */}
        <Image
          src="/images/r17-texture-rhythm.png"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="about-arch__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />

        <div className="about-arch__overlay" aria-hidden="true" />
        <div className="about-arch__ambient" aria-hidden="true" />

        <div className="about-arch__content">
          <div className="about-arch__inner">

            {/* Left: section header */}
            <div>
              <div className="about-arch__eyebrow" aria-hidden="true">Architecture</div>
              <h2 id="about-arch-heading" className="about-arch__h2">
                How the protocol is organized.
              </h2>
              <p className="about-arch__subhead">
                Full detail lives on the Protocol page. The summary below is the shape, not
                the walkthrough.
              </p>
            </div>

            {/* Right: numbered steps + CTA */}
            <div>
              <ol className="about-arch__steps" aria-label="Protocol architecture overview">
                {STEPS.map((step) => (
                  <li key={step.num} className="about-arch__step">
                    <span className="about-arch__step-num" aria-hidden="true">{step.num}</span>
                    <p className="about-arch__step-body">{step.body}</p>
                  </li>
                ))}
              </ol>

              <div className="about-arch__cta-row">
                <Link href="/protocol" className="about-arch__cta-link">
                  Full architecture
                </Link>
              </div>
            </div>

          </div>
        </div>

      </section>
    </>
  );
}
