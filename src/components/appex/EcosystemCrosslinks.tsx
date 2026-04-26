/**
 * EcosystemCrosslinks.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout, CSS hover transitions only, no hooks.
 *
 * Design source: appex-revision-round-2.md §4  --  image-on-top hero-image tiles
 * Background: r17-texture-energy.png at 20% opacity
 * Three tiles: LPs / Borrowers / Protocol
 * Tile anatomy: image zone 280px tall (top) + text zone below, min-height 480px
 * Assets (hero-scale, 220px, matching destination page heroes):
 *   Card 1 (LPs)       -> r54-asset-lp-yield-r5n-bright-transparent.webp
 *   Card 2 (Borrowers) -> r59-asset-borrower-forward-bright-transparent.webp
 *   Card 3 (Protocol)  -> r19-asset-architecture-core-ziggurat-transparent.webp
 * Float animation: 8s ease-in-out, staggered 0s / 0.5s / 1.0s
 * Hover: translateY(-4px) + shadow deepen + border brighten
 * Arrow affordance: bottom-right, yellow 0.6 opacity -> 1.0 on hover
 * Opacity rule: assets always opacity 1  --  never animated below 1.
 * Copy: appex.md Section 8. Present tense. No em dashes.
 */

import Image from "next/image";
import Link  from "next/link";

interface CrossCard {
  id:       string;
  asset:    string;
  assetAlt: string;
  headline: string;
  blurb:    string;
  href:     string;
}

const CARDS: CrossCard[] = [
  {
    id:       "lps",
    asset:    "/images/r54-asset-lp-yield-r5n-bright-transparent.webp",
    assetAlt: "LP yield dimensional form representing committed capital earning real yield",
    headline: "For LPs.",
    blurb:    "Yield on committed capital, paid from real borrower fees, redeemable on the terms you set.",
    href:     "/lps",
  },
  {
    id:       "borrowers",
    asset:    "/images/r59-asset-borrower-forward-bright-transparent.webp",
    assetAlt: "Borrower forward-motion form representing draw against verified revenue",
    headline: "For Borrowers.",
    blurb:    "Draw against verified revenue. Pay protocol fees in $APPEX for a 25% discount.",
    href:     "/borrowers",
  },
  {
    id:       "protocol",
    asset:    "/images/r75-asset-protocol-core-bright-transparent.webp",
    assetAlt: "The protocol core  --  connected to every surface of the protocol",
    headline: "Protocol.",
    blurb:    "Read the vault mechanism end to end: deposit, fund, earn, redeem.",
    href:     "/protocol",
  },
];

export function EcosystemCrosslinks(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Ecosystem cross-links (Rev 2: image-on-top hero tiles) ---- */
        .ecosystem {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        /* r17-texture-energy at 20% */
        .ecosystem__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
          opacity: 0.20;
        }

        /* Dark overlay */
        .ecosystem__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.82) 0%,
            rgba(10,15,31,0.78) 50%,
            rgba(10,15,31,0.86) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Forward-motion yellow sweep from left */
        .ecosystem__sweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            rgba(254,214,7,0.04) 0%,
            transparent 30%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Content wrapper */
        .ecosystem__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .ecosystem__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .ecosystem__content { padding: 0 24px; } }

        /* Section header */
        .ecosystem__header {
          margin-bottom: 56px;
          text-align: center;
        }

        .ecosystem__eyebrow {
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 14px;
        }

        .ecosystem__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .ecosystem__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 680px;
          margin: 0 auto;
        }

        /* Three-column card grid */
        .ecosystem__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 960px) {
          .ecosystem__grid {
            grid-template-columns: 1fr;
          }
        }

        /* Card  --  full card is the <a>; image-on-top hero tile */
        .ecosystem__card {
          display: flex;
          flex-direction: column;
          position: relative;
          background: rgba(10,15,31,0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(90,28,203,0.22);
          border-radius: var(--radius-md, 16px);
          min-height: 480px;
          text-decoration: none;
          overflow: hidden;
          transition: transform 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms ease, border-color 300ms ease;
        }

        .ecosystem__card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(90,28,203,0.28), 0 4px 16px rgba(0,0,0,0.40);
          border-color: rgba(90,28,203,0.45);
        }

        .ecosystem__card:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
        }

        /* Image zone: top 280px */
        .ecosystem__image-zone {
          position: relative;
          width: 100%;
          height: 280px;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: var(--radius-md, 16px) var(--radius-md, 16px) 0 0;
        }

        /* Ambient glow behind the asset */
        .ecosystem__ambient-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 380px 260px at 50% 50%,
            rgba(254,214,7,0.10) 0%,
            rgba(90,28,203,0.08) 40%,
            transparent 75%
          );
          pointer-events: none;
          z-index: 0;
          transition: opacity 300ms ease;
        }

        .ecosystem__card:hover .ecosystem__ambient-glow {
          opacity: 1.8; /* CSS won't go above 1, this triggers a rerender  --  use background change */
        }

        /* Asset: centered 220px, opacity always 1 */
        .ecosystem__asset {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 220px;
          height: 220px;
          object-fit: contain;
          filter: drop-shadow(0 30px 48px rgba(90,28,203,0.38));
          /* Static per Pass 5 site-wide rule  --  only hero assets float. */
          opacity: 1;
          z-index: 1;
        }

        .ecosystem__card:hover .ecosystem__asset {
          filter: drop-shadow(0 36px 60px rgba(90,28,203,0.52));
        }

        @media (prefers-reduced-motion: reduce) {
          .ecosystem__asset { transform: none; }
        }

        @media (max-width: 960px) {
          .ecosystem__asset {
            width: 180px;
            height: 180px;
          }
        }

        /* Text zone: below image */
        .ecosystem__text-zone {
          flex: 1;
          padding: 28px 32px 64px;
          display: flex;
          flex-direction: column;
        }

        /* Card: headline */
        .ecosystem__card-headline {
          font-family: var(--font-display-family);
          font-size: 20px;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0 0 12px 0;
          line-height: 1.2;
        }

        /* Card: blurb */
        .ecosystem__card-blurb {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
          flex: 1;
        }

        /* Arrow affordance (bottom-right) */
        .ecosystem__arrow {
          position: absolute;
          bottom: 24px;
          right: 24px;
          font-size: 16px;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.6;
          transition: opacity 200ms ease, transform 200ms ease;
        }

        .ecosystem__card:hover .ecosystem__arrow {
          opacity: 1;
          transform: translateX(4px);
        }
      `}</style>

      <section className="ecosystem" id="ecosystem" aria-labelledby="ecosystem-heading">

        {/* r17-texture-energy at 20% */}
        <Image
          src="/images/r17-texture-energy.webp"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="ecosystem__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
        <div className="ecosystem__overlay" aria-hidden="true" />
        <div className="ecosystem__sweep"   aria-hidden="true" />

        <div className="ecosystem__content">

          <div className="ecosystem__header">
            <div className="ecosystem__eyebrow">In the ecosystem</div>
            <h2 id="ecosystem-heading" className="ecosystem__h2">
              Connected to{" "}
              <span className="text-gold-gradient">every surface.</span>
            </h2>
            <p className="ecosystem__subhead">
              $APPEX is not a standalone product. It is the settlement layer tying LP yield, borrower economics, and protocol steering into one loop.
            </p>
          </div>

          <div className="ecosystem__grid">
            {CARDS.map((card) => (
              <Link key={card.id} href={card.href} className="ecosystem__card">
                {/* Image zone: top 280px with floating hero asset */}
                <div className="ecosystem__image-zone">
                  <div className="ecosystem__ambient-glow" aria-hidden="true" />
                  <Image
                    src={card.asset}
                    alt={card.assetAlt}
                    width={card.id === "protocol" ? 260 : 220}
                    height={card.id === "protocol" ? 160 : 220}
                    quality={85}
                    className="ecosystem__asset"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {/* Text zone: below image */}
                <div className="ecosystem__text-zone">
                  <h3 className="ecosystem__card-headline">{card.headline}</h3>
                  <p className="ecosystem__card-blurb">{card.blurb}</p>
                </div>
                <span className="ecosystem__arrow" aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
