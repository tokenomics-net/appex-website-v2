/**
 * Mission.tsx
 *
 * Server Component  --  no client interactivity.
 * Justification: static layout with CSS hover states  --  no hooks required.
 *
 * Design source: revision-pass-4.md §5.1 Section B + website-layout-standards.md
 * Copy source: outputs/appex-website-build/copy/about.md Section B (TONY-APPROVED)
 *
 * Layout: 3-col grid desktop / stacked mobile.
 * Each tenet: glass card + icon asset + H3 + body + .cta-link cross-link.
 * Glass card spec: backdrop-filter blur(20px), bg rgba(10,15,31,0.75),
 *   border 1px solid rgba(90,28,203,0.2).
 *
 * Background:
 *   Layer 0: r17-texture-grounding.png at 20%
 *   Layer 1: directional overlay
 *   Layer 2: ambient purple wash (top-left)
 *
 * Icon assets:
 *   Tenet 1 (Real fees): r44-asset-yield-curve-wedge-bright-transparent.webp
 *   Tenet 2 (Underwriting): r45-asset-governance-quorum-ring-bright-transparent.webp
 *   Tenet 3 (Protocol-owned liquidity): r19-asset-architecture-core-ziggurat-transparent.webp
 */

import Image from "next/image";
import Link  from "next/link";

interface Tenet {
  id:        string;
  asset:     string;
  assetAlt:  string;
  heading:   string;
  lead:      string;
  bullets:   string[];
  tail:      string;
  ctaLabel:  string;
  ctaHref:   string;
}

const TENETS: Tenet[] = [
  {
    id:       "real-fees",
    asset:    "/images/r87-asset-real-fees-ledger-bright-transparent.webp",
    assetAlt: "Real fees form  --  yield sourced from borrower activity",
    heading:  "Real fees over emissions.",
    lead:     "LP yield is sourced from borrower fees on real advances, paid in the same asset LPs deposit.",
    bullets:  [
      "No token issuance into the pool.",
      "No reward-token sweetener.",
      "No subsidized APY.",
    ],
    tail:     "The yield number matches the mechanics. Every dollar traces back to a borrower who paid for capital.",
    ctaLabel: "Read the principle",
    ctaHref:  "/blog/real-fees-not-emissions",
  },
  {
    id:       "structured-underwriting",
    asset:    "/images/r85-asset-structured-rigor-bright-transparent.webp",
    assetAlt: "Structured rigor form  --  underwriting before every facility",
    heading:  "Structured underwriting over rate.",
    lead:     "Every borrower passes financial review, background checks, receivables verification, and concentration limits before a facility opens.",
    bullets:  [
      "Underwriting keeps LP capital safe.",
      "Underwriting sorts long-term partners from one-time counterparties.",
      "Every applicant clears the same bar.",
    ],
    tail:     "Diligence is the feature, not the gate.",
    ctaLabel: "See the borrower path",
    ctaHref:  "/borrowers",
  },
  {
    id:       "protocol-owned-liquidity",
    asset:    "/images/r84-asset-protocol-liquidity-bright-transparent.webp",
    assetAlt: "Protocol liquidity form  --  capital that stays because it earns",
    heading:  "Protocol-owned liquidity over rented TVL.",
    lead:     "Liquidity stays put because it is earning real yield from real borrower activity.",
    bullets:  [
      "No emissions schedule keeping TVL on rails.",
      "No mercenary capital racing to the next farm.",
      "Yield is the reason to stay, not a temporary bribe.",
    ],
    tail:     "The pool deepens because it works.",
    ctaLabel: "Read the architecture",
    ctaHref:  "/protocol",
  },
];

export function Mission(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Mission  --  Three tenets ---- */
        .about-mission {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        /* Layer 0: r17-texture-grounding at 20% */
        .about-mission__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          z-index: 0;
          opacity: 0.20;
        }

        /* Layer 1: directional overlay */
        .about-mission__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.90) 0%,
            rgba(10,15,31,0.78) 50%,
            rgba(10,15,31,0.88) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 2: ambient purple wash (top-left) */
        .about-mission__ambient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 1200px 800px at 15% 30%,
            rgba(90,28,203,0.12) 0%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Content wrapper */
        .about-mission__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .about-mission__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .about-mission__content { padding: 0 24px; } }

        /* Section header */
        .about-mission__header {
          max-width: 720px;
          margin-bottom: 56px;
        }

        .about-mission__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .about-mission__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .about-mission__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0;
        }

        /* 3-col tenet grid */
        .about-mission__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 1023px) {
          .about-mission__grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        /* Tenet card  --  glass treatment + machined edge per Pass 5 §5.4 */
        .about-mission__card {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 32px;
          background: rgba(10,15,31,0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(254,214,7,0.08);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
          border-radius: var(--radius-lg, 16px);
          transition: border-color 250ms ease;
        }

        .about-mission__card:hover {
          border-color: rgba(90,28,203,0.38);
        }

        /* Icon asset container  --  consistent 200px across all 3 tenets */
        .about-mission__icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
        }

        .about-mission__icon {
          width: 180px;
          height: 180px;
          object-fit: contain;
          filter:
            drop-shadow(0 20px 50px rgba(90,28,203,0.35))
            drop-shadow(0 8px 24px rgba(254,214,7,0.15));
          /* Static per Pass 5 site-wide rule  --  only hero assets float. */
        }

        @media (prefers-reduced-motion: reduce) {
          .about-mission__icon { transform: none; }
        }

        /* Tenet copy */
        .about-mission__card-copy {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .about-mission__card-h3 {
          font-family: var(--font-display-family);
          font-size: 22px;
          font-weight: 500;
          line-height: 1.2;
          color: var(--text-primary);
          margin: 0;
        }

        .about-mission__card-body {
          font-family: var(--font-body-family);
          font-size: 15px;
          line-height: 1.65;
          color: var(--text-secondary);
          margin: 0;
        }

        .about-mission__card-bullets {
          list-style: none;
          padding: 0;
          margin: 4px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .about-mission__card-bullets li {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.55;
          color: var(--text-secondary);
          padding-left: 16px;
          position: relative;
        }

        .about-mission__card-bullets li::before {
          content: '◦';
          position: absolute;
          left: 0;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.7;
        }

        .about-mission__card-tail {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0;
          flex: 1;
        }

        /* .cta-link  --  per R1.7 and existing site pattern */
        .about-mission__cta-link {
          display: inline-flex;
          align-self: flex-start;
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
          margin-top: auto;
        }

        .about-mission__cta-link:hover {
          border-color: rgba(254,214,7,0.80);
          background: rgba(254,214,7,0.06);
        }

        .about-mission__cta-link:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-mission__cta-link { transition: none; }
        }
      `}</style>

      <section className="about-mission" id="mission" aria-labelledby="about-mission-heading">

        {/* Layer 0: r17-texture-grounding at 20% */}
        <Image
          src="/images/r17-texture-grounding.webp"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="about-mission__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />

        <div className="about-mission__overlay"  aria-hidden="true" />
        <div className="about-mission__ambient"  aria-hidden="true" />

        <div className="about-mission__content">

          <div className="about-mission__header">
            <div className="about-mission__eyebrow" aria-hidden="true">Mission</div>
            <h2 id="about-mission-heading" className="about-mission__h2">The thesis.</h2>
            <p className="about-mission__subhead">
              Three tenets shape every design decision. Each one maps to a specific mechanism in
              the protocol, not to marketing positioning.
            </p>
          </div>

          <div className="about-mission__grid">
            {TENETS.map((tenet) => (
              <article key={tenet.id} className="about-mission__card">
                <div className="about-mission__icon-wrap">
                  <Image
                    src={tenet.asset}
                    alt={tenet.assetAlt}
                    width={220}
                    height={220}
                    quality={85}
                    className="about-mission__icon"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="about-mission__card-copy">
                  <h3 className="about-mission__card-h3">{tenet.heading}</h3>
                  <p className="about-mission__card-body">{tenet.lead}</p>
                  <ul className="about-mission__card-bullets">
                    {tenet.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <p className="about-mission__card-tail">{tenet.tail}</p>
                  <Link href={tenet.ctaHref} className="about-mission__cta-link">
                    {tenet.ctaLabel}
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>

      </section>
    </>
  );
}
