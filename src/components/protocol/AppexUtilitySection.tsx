/**
 * AppexUtilitySection.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static content, no event handlers, no hooks, no browser APIs.
 *
 * Design source: protocol-design.md + protocol.md Section 5b "$APPEX in the vault"
 * Inspiration: home page TokenSection.tsx (Tony's favorite section)
 * Background: r23-scene-token-utility.png at 100% opacity (Option B glassmorphism)
 * Tint overlay: linear-gradient(180deg, rgba(10,15,31,0.45) 0%, rgba(10,15,31,0.30) 50%, rgba(10,15,31,0.45) 100%)
 * Processing chamber with bilateral purple/yellow lighting  --  distinct from adjacent fee-curve scene
 * Floating token accent: r22-appex-token-edited-transparent.webp (translateY ONLY, no rotation)
 * 3 utility cards in a row desktop, stacked mobile:
 *   1. Payment demand    --  r82-asset-util-liquidity-bright-transparent.webp
 *   2. Protocol fees     --  r62-asset-util-lower-fees-bright-transparent.webp
 *   3. Staking           --  r22-util-staking-transparent.webp
 * Copy: protocol.md Section 5b. PRESENT TENSE. No em dashes.
 */

import Image from "next/image";

interface UtilCard {
  icon:    string;
  iconAlt: string;
  title:   string;
  body:    string;
}

const UTIL_CARDS: UtilCard[] = [
  {
    icon:    "/images/r82-asset-util-liquidity-bright-transparent.webp",
    iconAlt: "Liquidity utility  --  structural buying pressure from real transactions",
    title:   "Payment demand",
    body:    "When users request payment in $APPEX, the vault purchases it on the open market. Real transactions create structural buying pressure.",
  },
  {
    icon:    "/images/r62-asset-util-lower-fees-bright-transparent.webp",
    iconAlt: "Lower fees utility  --  25% discount on protocol fees paid in $APPEX",
    title:   "Protocol fees",
    body:    "Borrowers who pay protocol fees in $APPEX get 25% lower fees. The discount drives accumulation.",
  },
  {
    icon:    "/images/r79-asset-staking-lock-bright-transparent.webp",
    iconAlt: "Literal lock  --  staking rewards",
    title:   "Staking",
    body:    "Lock LP tokens and $APPEX together to stake. Stakers receive protocol fees and boost their yield.",
  },
];

export function AppexUtilitySection(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- $APPEX utility section ---- */
        .appex-utility {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress);
          padding: 80px 0;
        }

        @media (max-width: 767px) {
          .appex-utility { padding: 48px 0; }
        }

        /* Layer 0: r23-scene-token-utility.png at 100% opacity  --  processing chamber, bilateral purple/yellow */
        .appex-utility__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          z-index: 0;
        }

        /* Layer 1: tint overlay  --  reduce opacity to let scene read at near-full intensity */
        .appex-utility__tint {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.45) 0%,
            rgba(10,15,31,0.30) 50%,
            rgba(10,15,31,0.45) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 2: purple-yellow accent radial */
        .appex-utility__radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 1000px 500px at 50% 100%, rgba(90,28,203,0.10) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 3: top hairline */
        .appex-utility__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.16);
          pointer-events: none;
          z-index: 2;
        }

        /* Content wrapper */
        .appex-utility__content {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @media (max-width: 767px) {
          .appex-utility__content { padding: 0 24px; }
        }

        /* Headline glass card  --  matches TokenSection pattern */
        .appex-utility__headline-glass {
          background: rgba(10,15,31,0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-md);
          padding: 32px 40px;
          max-width: 580px;
          text-align: center;
          margin-bottom: 40px;
        }

        @media (max-width: 767px) {
          .appex-utility__headline-glass { padding: 24px; }
        }

        .appex-utility__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 12px;
        }

        .appex-utility__heading {
          font-family: var(--font-display-family);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 400;
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 14px;
        }

        .appex-utility__subhead {
          font-family: var(--font-body-family);
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Token accent  --  static per Pass 6 site-wide float rule */
        .appex-utility__token-wrap {
          margin-bottom: 40px;
        }

        .appex-utility__token {
          filter:
            drop-shadow(0 4px 20px rgba(254,214,7,0.15))
            drop-shadow(0 8px 40px rgba(90,28,203,0.12))
            drop-shadow(0 16px 60px rgba(0,0,0,0.4));
          /* STATIC per Pass 6 site-wide float rule  --  only hero assets float */
        }

        /* 3-card grid: 3 columns desktop, 1 column mobile */
        .appex-utility__cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 1080px;
        }

        @media (max-width: 900px) {
          .appex-utility__cards { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .appex-utility__cards { grid-template-columns: 1fr; }
        }

        /* Glassmorphism card  --  matching TokenSection quality */
        .appex-util-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 32px 24px 28px;
          background: rgba(10,15,31,0.78);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-md);
          transition:
            transform 300ms cubic-bezier(0.4,0,0.2,1),
            border-color 300ms cubic-bezier(0.4,0,0.2,1);
          opacity: 0;
          transform: translateY(24px);
          animation: appexUtilReveal 0.6s var(--ease-enter) forwards;
        }

        @keyframes appexUtilReveal {
          to { opacity: 1; transform: none; }
        }

        .appex-util-card:nth-child(1) { animation-delay: 0ms; }
        .appex-util-card:nth-child(2) { animation-delay: 100ms; }
        .appex-util-card:nth-child(3) { animation-delay: 200ms; }

        .appex-util-card:hover {
          transform: translateY(-3px);
          border-color: rgba(254,214,7,0.22);
        }

        @media (prefers-reduced-motion: reduce) {
          .appex-util-card {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }

        /* Card icon */
        .appex-util-card__icon {
          margin-bottom: 20px;
          filter:
            drop-shadow(0 4px 12px rgba(0,0,0,0.3))
            drop-shadow(0 0 24px rgba(90,28,203,0.08));
        }

        /* Card title */
        .appex-util-card__title {
          font-family: var(--font-display-family);
          font-size: 17px;
          font-weight: 500;
          color: rgba(240,236,216,0.92);
          margin-bottom: 8px;
          line-height: 1.25;
        }

        /* Card body */
        .appex-util-card__body {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.6;
          color: rgba(185,160,204,0.70);
          margin: 0;
        }
      `}</style>

      <section
        className="appex-utility"
        id="appex-utility"
        aria-labelledby="appex-utility-heading"
      >
        {/* Scene image: r23-scene-token-utility.png at 100% opacity */}
        <Image
          src="/images/r23-scene-token-utility.webp"
          alt="" aria-hidden="true"
          fill
          className="appex-utility__scene"
          style={{ objectFit: "cover" }}
          loading="lazy"
          decoding="async"
        />
        <div className="appex-utility__tint"   aria-hidden="true" />
        <div className="appex-utility__radial" aria-hidden="true" />
        <div className="appex-utility__hairline" aria-hidden="true" />

        <div className="appex-utility__content">
          {/* Headline glass card */}
          <div className="appex-utility__headline-glass">
            <div className="appex-utility__eyebrow">Token utility</div>
            <h2 id="appex-utility-heading" className="appex-utility__heading">
              <span className="text-gold-gradient">$APPEX</span> in the vault.
            </h2>
            <p className="appex-utility__subhead">
              Three mechanics tie $APPEX directly to vault activity.
            </p>
          </div>

          {/* Floating token accent  --  translateY ONLY, explicitly no rotation */}
          <div className="appex-utility__token-wrap">
            <Image
              src="/images/r22-appex-token-bright-transparent.webp"
              alt="appeX token with logomark"
              width={280}
              height={280}
              className="appex-utility__token"
              style={{
                width: "clamp(200px, 22vw, 300px)",
                height: "auto",
                /* NO rotate3d  --  explicitly blocked per spec */
              }}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Three utility cards */}
          <div className="appex-utility__cards">
            {UTIL_CARDS.map((card) => (
              <div key={card.title} className="appex-util-card">
                <Image
                  src={card.icon}
                  alt={card.iconAlt}
                  width={140}
                  height={140}
                  className="appex-util-card__icon"
                  style={{ width: "clamp(120px, 11vw, 160px)", height: "auto" }}
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="appex-util-card__title">{card.title}</h3>
                <p className="appex-util-card__body">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
