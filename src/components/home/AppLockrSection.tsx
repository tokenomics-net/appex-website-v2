/**
 * AppLockrSection.tsx
 *
 * Server Component  --  no "use client" needed. Static 3-column glass card grid.
 * Design source: home-design.md Rev 6 Section 6 + r22 rebuild prompt
 * Layout: 3-column CSS grid, glass cards, large per-step transparent PNGs as heroes.
 * NO progress bar. NO auto-advance. NO stepper. NO useState. NO useEffect.
 * Hourglass DELETED per Tony (r21-asset-instant-payout-transparent.webp removed entirely).
 * Assets:
 *   Card 1 "The revenue gap":    r22-step-gap-transparent.webp     (NEW)
 *   Card 2 "The vault closes it": r22-step-bridge-transparent.webp  (NEW)
 *   Card 3 "The repayment cycle": r21-step-repayment-cycle-transparent.webp (KEPT per Tony)
 * Eyebrow: "Anchor Borrower" per home.md
 * Body: expanded ~97 word copy from home.md, PRESENT TENSE (exception: appLockr future framing)
 * Background: r17-texture-rhythm.png at 20% opacity + directional gradient overlay
 * Padding: 80px top/bottom (48px mobile)
 * NO CTA, NO logo, NO link per decisions.md 10a.
 */

import Image from "next/image";

interface CardData {
  number: string;
  graphic: string;
  graphicAlt: string;
  headline: string;
  body: string;
}

const CARDS: CardData[] = [
  {
    number: "01",
    graphic: "/images/r22-step-gap-transparent.webp",
    graphicAlt: "Split blocks with luminous gap representing the revenue timing gap",
    headline: "The revenue gap",
    body: "App developers earn revenue the moment an ad runs but wait weeks or months to get paid. That is a working capital problem.",
  },
  {
    number: "02",
    graphic: "/images/r22-step-bridge-transparent.webp",
    graphicAlt: "Bridge form closing the capital gap between earned and received cash",
    headline: "The vault closes it",
    body: "appLockr draws from the vault and pays app developers same-day in $APPEX or USDC.",
  },
  {
    number: "03",
    graphic: "/images/r21-step-repayment-cycle-transparent.webp",
    graphicAlt: "Torus with directional flow channel representing capital returning to LPs",
    headline: "The repayment cycle",
    body: "When advertiser revenue arrives on commercial terms, appLockr repays the vault with fees. LPs earn from those fees.",
  },
];

export function AppLockrSection(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- appLockr section (Rev 6  --  static 3-column grid) ---- */
        .applockr {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress);
          padding: 80px 0;
        }

        @media (max-width: 767px) {
          .applockr { padding: 48px 20px; }
        }

        /* Layer 0: brand texture at 20% */
        .applockr__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.20;
          pointer-events: none;
          z-index: 0;
        }

        /* Layer 1: directional gradient */
        .applockr__gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(10,15,31,0.88) 0%,
            rgba(10,15,31,0.72) 45%,
            rgba(90,28,203,0.15) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 2: top hairline */
        .applockr__hairline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            180deg,
            rgba(254,214,7,0.14) 0%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Container */
        .applockr__container {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) {
          .applockr__container { padding: 0 32px; }
        }
        @media (max-width: 767px) {
          .applockr__container { padding: 0; }
        }

        /* Section header  --  centered above grid */
        .applockr__header {
          max-width: 720px;
          margin: 0 auto 48px;
          text-align: center;
        }

        .applockr__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 12px;
        }

        .applockr__heading {
          font-family: var(--font-display-family);
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 400;
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .applockr__subhead {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* 3-column card grid */
        .applockr__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 767px) {
          .applockr__grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        /* Glass card */
        .applockr__card {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          padding: 40px 28px 32px;
          background: rgba(10,15,31,0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(90,28,203,0.25);
          box-shadow: 0 0 40px rgba(90,28,203,0.08), 0 8px 32px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 400ms cubic-bezier(0.16,1,0.3,1),
                      box-shadow 400ms cubic-bezier(0.16,1,0.3,1),
                      border-color 300ms ease;
        }

        .applockr__card:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 48px rgba(90,28,203,0.14), 0 12px 40px rgba(0,0,0,0.4);
          border-color: rgba(254,214,7,0.30);
        }

        @media (prefers-reduced-motion: reduce) {
          .applockr__card,
          .applockr__card:hover {
            transform: none;
            transition: none;
          }
        }

        /* Inner card texture */
        .applockr__card-texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.12;
          pointer-events: none;
          border-radius: inherit;
          z-index: 0;
        }

        /* Card content sits above texture */
        .applockr__card-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        /* Step number eyebrow */
        .applockr__card-number {
          font-family: var(--font-display-family);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 4px;
          color: var(--ax-capital-yellow);
          opacity: 0.45;
          margin-bottom: 16px;
          align-self: flex-start;
        }

        /* Hero graphic  --  focal point of each card */
        .applockr__card-graphic {
          width: clamp(240px, 80%, 360px);
          height: auto;
          aspect-ratio: 1;
          object-fit: contain;
          display: block;
          margin: 0 auto 24px;
          filter: drop-shadow(0 4px 20px rgba(254,214,7,0.15))
                  drop-shadow(0 8px 40px rgba(90,28,203,0.12))
                  drop-shadow(0 16px 60px rgba(0,0,0,0.4));
        }

        /* STATIC per Pass 6 site-wide float rule  --  only hero assets float */

        /* Step headline */
        .applockr__card-headline {
          font-family: var(--font-display-family);
          font-size: 18px;
          font-weight: 400;
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: 1.2;
        }

        /* Step body */
        .applockr__card-body {
          font-size: 14px;
          line-height: 1.55;
          color: var(--text-secondary);
        }

        /* Mobile card adjustments */
        @media (max-width: 767px) {
          .applockr__card { padding: 32px 24px 28px; }
          .applockr__card-graphic { width: clamp(200px, 60%, 320px); }
        }

        /* Scroll reveal  --  CSS-only, staggered animation */
        .applockr__card {
          opacity: 0;
          transform: translateY(24px);
          animation: applockrCardReveal 0.6s var(--ease-enter) forwards;
        }
        .applockr__card:nth-child(1) { animation-delay: 0.1s; }
        .applockr__card:nth-child(2) { animation-delay: 0.22s; }
        .applockr__card:nth-child(3) { animation-delay: 0.34s; }

        @keyframes applockrCardReveal {
          to { opacity: 1; transform: translateY(0); }
        }

        .applockr__card:hover {
          transform: translateY(-3px);
        }

        @media (prefers-reduced-motion: reduce) {
          .applockr__card {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <section className="applockr" aria-labelledby="applockr-heading">
        {/* Layer 0: brand texture */}
        <Image
          src="/images/r17-texture-rhythm.png"
          alt="" aria-hidden="true"
          fill
          className="applockr__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
          decoding="async"
        />
        {/* Layer 1: directional gradient */}
        <div className="applockr__gradient" aria-hidden="true" />
        {/* Layer 2: top hairline */}
        <div className="applockr__hairline" aria-hidden="true" />

        <div className="applockr__container">
          {/* Section header  --  centered */}
          <div className="applockr__header">
            <div className="applockr__eyebrow">Anchor Borrower</div>
            <h2 id="applockr-heading" className="applockr__heading">
              Same-day payouts.{" "}
              <span className="text-gold-gradient">Day one.</span>
            </h2>
            <p className="applockr__subhead">
              appLockr is a mobile advertising platform and the anchor borrower at launch. App developers earn revenue the moment an ad runs but wait 60 to 180 days before cash arrives. appLockr draws from the vault and pays them same-day, turning that wait into working capital.
            </p>
          </div>

          {/* 3-column card grid */}
          <div className="applockr__grid">
            {CARDS.map((card) => (
              <div key={card.number} className="applockr__card">
                {/* Inner card texture */}
                <Image
                  src="/images/r17-texture-rhythm.png"
                  alt="" aria-hidden="true"
                  fill
                  className="applockr__card-texture"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="applockr__card-content">
                  {/* Step number eyebrow */}
                  <div className="applockr__card-number" aria-hidden="true">
                    {card.number}
                  </div>
                  {/* Hero graphic  --  focal point, 280-360px */}
                  <Image
                    src={card.graphic}
                    alt={card.graphicAlt}
                    width={360}
                    height={360}
                    className="applockr__card-graphic"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Step headline */}
                  <h3 className="applockr__card-headline">{card.headline}</h3>
                  {/* Step body */}
                  <p className="applockr__card-body">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
          {/* NO CTA per decisions.md 10a */}
        </div>
      </section>

    </>
  );
}
