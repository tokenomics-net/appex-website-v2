/**
 * WhyAppex.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static alternating-row layout, CSS animations only, no hooks.
 *
 * Design source: borrowers-design.md Section 4  --  "Why appeX beats traditional finance"
 * Background: r17-texture-grounding.png at 20% + r23-scene-trust.webp at 10% overlay blend
 *   Purple wash upper-left + warm wash lower-right (diagonal temperature gradient).
 * Layout: 4 alternating image-dominant rows, 45/55 asset-copy splits.
 *   Row 1: asset LEFT  (r19-asset-momentum-wave)
 *   Row 2: asset RIGHT (r19-asset-fee-split-disc)
 *   Row 3: asset LEFT  (r21-step-repayment-cycle)
 *   Row 4: asset RIGHT (r19-asset-security-seal-obelisk)
 * Each row shows traditional column + appeX column side-by-side per copy spec.
 * Hover lift: translateY -2px / 200ms on each row. Reduced motion: disabled.
 * Row hairline dividers: rgba(254,214,7,0.08).
 * Copy: copy/borrowers.md Section 4. Present tense. No em dashes.
 */

import Image from "next/image";

interface WhyRow {
  id:          string;
  concept:     string;
  h3:          string;
  asset:       string;
  assetReverse: boolean;
  traditional: string;
  appex:       string;
  floatDur:    string;
}

const ROWS: WhyRow[] = [
  {
    id:          "speed",
    concept:     "Row 1",
    h3:          "Structured evaluation, not relationship-gated underwriting.",
    asset:       "/images/r36-asset-evaluation-frame-transparent.webp",
    assetReverse: false,
    traditional: "Factoring and bank lines move at the speed of the loan officer's calendar. Access depends on an existing relationship. Timelines are opaque and negotiation happens by phone.",
    appex:       "A documented application runs a credit review, compliance checks, and term negotiation on the same track for every applicant. Timeline responds to application quality, not to who you know.",
    floatDur:    "5.2s",
  },
  {
    id:          "pricing",
    concept:     "Row 2",
    h3:          "One fee curve per facility. No invoice-level haggling.",
    asset:       "/images/r36-asset-single-curve-transparent.webp",
    assetReverse: true,
    traditional: "Factoring rates vary invoice to invoice. Discount spreads float with advance rates, concentration limits, and renegotiated decks each quarter. Borrowers carry pricing uncertainty into every receivable.",
    appex:       "Fee parameters are fixed during onboarding and apply to every draw inside the facility. The borrower knows the fee curve before the first draw and for every draw after.",
    floatDur:    "5.6s",
  },
  {
    id:          "obligation",
    concept:     "Row 3",
    h3:          "Stakers share the fees borrowers pay.",
    asset:       "/images/r36-asset-divided-share-transparent.webp",
    assetReverse: false,
    traditional: "Factoring desks collect spreads and move on. Bank lines add covenants every renewal cycle. No counterparty has a structural reason to want the borrower to succeed long term.",
    appex:       "Fifty percent of every protocol fee flows to $APPEX stakers. Borrowers who grow drive rewards to the same capital providers who underwrote their facility. Incentives point the same way.",
    floatDur:    "6s",
  },
  {
    id:          "covenants",
    concept:     "Row 4",
    h3:          "The facility is a clean two-party agreement.",
    asset:       "/images/r36-asset-two-parties-transparent.webp",
    assetReverse: true,
    traditional: "Bank lines carry financial covenants, negative pledge clauses, operating restrictions, and reporting obligations. A breach of any covenant can trigger a draw-stop regardless of the underlying credit.",
    appex:       "No financial covenants. No operating restrictions. No negative pledge outside the advance itself. The borrower runs the business. appeX holds a contractual claim against the draw.",
    floatDur:    "6.4s",
  },
];

export function WhyAppex(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Why appeX  --  4-row alternating composition ---- */
        .why-appex {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        .why-appex__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
          opacity: 0.20;
        }

        /* Trust scene as texture underlayer at 10% overlay */
        .why-appex__scene-under {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 1;
          opacity: 0.10;
          mix-blend-mode: overlay;
        }

        /* Directional overlay */
        .why-appex__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.88) 0%,
            rgba(10,15,31,0.80) 50%,
            rgba(10,15,31,0.90) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Purple wash upper-left */
        .why-appex__wash-purple {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 1000px 700px at 18% 22%,
            rgba(90,28,203,0.14) 0%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Warm wash lower-right */
        .why-appex__wash-warm {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 1100px 800px at 80% 78%,
            rgba(254,214,7,0.08) 0%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 2;
        }

        .why-appex__content {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .why-appex__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .why-appex__content { padding: 0 24px; } }

        /* Section header */
        .why-appex__header {
          max-width: 720px;
          margin-bottom: 64px;
        }

        .why-appex__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .why-appex__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .why-appex__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 640px;
          margin: 0;
        }

        /* Rows container */
        .why-appex__rows {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Individual row */
        .why-appex__row {
          display: grid;
          grid-template-columns: 45fr 55fr;
          gap: 56px;
          align-items: center;
          padding: 56px 0;
          transition: transform 200ms ease;
        }

        .why-appex__row:not(:first-child) {
          border-top: 1px solid rgba(254,214,7,0.08);
        }

        .why-appex__row:hover {
          transform: translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .why-appex__row:hover { transform: none; }
        }

        /* Reverse row: copy left, asset right */
        .why-appex__row--reverse {
          grid-template-columns: 55fr 45fr;
        }

        .why-appex__row--reverse .why-appex__row-asset { order: 2; }
        .why-appex__row--reverse .why-appex__row-copy  { order: 1; }

        @media (max-width: 1023px) {
          .why-appex__row,
          .why-appex__row--reverse {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .why-appex__row--reverse .why-appex__row-asset { order: 1; }
          .why-appex__row--reverse .why-appex__row-copy  { order: 2; }
        }

        /* Asset column */
        .why-appex__row-asset {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .why-appex__asset-img {
          width: clamp(240px, 36vw, 400px);
          height: auto;
          opacity: 1;
          filter:
            drop-shadow(0 40px 80px rgba(90,28,203,0.38))
            drop-shadow(0 20px 40px rgba(254,214,7,0.14));
        }

        @media (max-width: 1023px) {
          .why-appex__asset-img { width: 220px; }
        }

        /* Copy column  --  NO glass card (text on composited background) */
        .why-appex__row-copy {}

        .why-appex__row-h3 {
          font-family: var(--font-display-family);
          font-size: 28px;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0 0 24px 0;
          line-height: 1.2;
        }

        @media (max-width: 767px) {
          .why-appex__row-h3 { font-size: 22px; }
        }

        /* Two-column comparison grid within copy */
        .why-appex__compare {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        @media (max-width: 767px) {
          .why-appex__compare { grid-template-columns: 1fr; gap: 16px; }
        }

        .why-appex__col-label {
          font-family: var(--font-display-family);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .why-appex__col-label--trad { color: var(--text-secondary); opacity: 0.55; }
        .why-appex__col-label--appex { color: var(--ax-capital-yellow, #FED607); opacity: 0.75; }

        .why-appex__col-body {
          font-family: var(--font-body-family);
          font-size: 15px;
          line-height: 1.6;
          margin: 0;
        }

        .why-appex__col-body--trad { color: var(--text-secondary); opacity: 0.65; }
        .why-appex__col-body--appex { color: var(--text-primary); }

        /* .why-appex__row-wiki removed Pass 5  --  wiki citations scrubbed from user-facing copy. */
      `}</style>

      <section className="why-appex" id="why">
        {/* Texture underlayer */}
        <Image
          src="/images/r17-texture-grounding.png"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="why-appex__texture"
          style={{ objectFit: "cover" }}
        />
        {/* Trust scene at 10% overlay blend */}
        <Image
          src="/images/r23-scene-trust.webp"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={50}
          className="why-appex__scene-under"
          style={{ objectFit: "cover" }}
        />
        <div className="why-appex__overlay"      aria-hidden="true" />
        <div className="why-appex__wash-purple"  aria-hidden="true" />
        <div className="why-appex__wash-warm"    aria-hidden="true" />

        <div className="why-appex__content">
          {/* Section header */}
          <header className="why-appex__header">
            <div className="why-appex__eyebrow">Why appeX</div>
            <h2 className="why-appex__h2">
              Four advantages over{" "}
              <span className="text-gold-gradient">traditional finance.</span>
            </h2>
            <p className="why-appex__subhead">
              The contrast is structural, not rhetorical. Each advantage maps to a concrete mechanism, and every mechanism is written into the facility agreement.
            </p>
          </header>

          {/* Alternating rows */}
          <div className="why-appex__rows">
            {ROWS.map((row) => (
              <article
                key={row.id}
                className={`why-appex__row${row.assetReverse ? " why-appex__row--reverse" : ""}`}
              >
                {/* Asset */}
                <div className="why-appex__row-asset">
                  <Image
                    src={row.asset}
                    alt="" aria-hidden="true"
                    role="presentation"
                    width={400}
                    height={400}
                    quality={80}
                    className="why-appex__asset-img"
                    style={{
                      objectFit: "contain",
                      /* Static per Pass 5 site-wide rule  --  only hero assets float. */
                    }}
                  />
                </div>

                {/* Copy */}
                <div className="why-appex__row-copy">
                  <h3 className="why-appex__row-h3">{row.h3}</h3>
                  <div className="why-appex__compare">
                    <div>
                      <div className="why-appex__col-label why-appex__col-label--trad">Traditional</div>
                      <p className="why-appex__col-body why-appex__col-body--trad">{row.traditional}</p>
                    </div>
                    <div>
                      <div className="why-appex__col-label why-appex__col-label--appex">appeX</div>
                      <p className="why-appex__col-body why-appex__col-body--appex">{row.appex}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
