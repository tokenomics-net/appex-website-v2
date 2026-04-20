/**
 * StakingTeaser.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static horizontal card, no hooks or browser APIs.
 *
 * Design source: lps-revision-round-1.md Revision 6  --  horizontal image-left/hook-right card
 *
 * Layout: single horizontal card, 3-column grid (asset | copy | CTA pill)
 *   Asset col: 220px  --  r22-util-staking-transparent.webp at full opacity + float
 *   Copy col: eyebrow + H2 (Tektur clamp 22-28px, no gradient) + body 26w + disclaimer 11w
 *   CTA col: ghost gold pill "See staking mechanics" linking to /appex#staking
 *
 * R35 velvet cleanup: r29-asset-staking-pair-disc-transparent.webp retired.
 *   Replaced by r22-util-staking-transparent.webp (approved staking library asset).
 *
 * Background:
 *   Layer 0: r18-texture-horizon.png at 18% (up from 16%)
 *   Layer 1: linear-gradient dark overlay
 *   Layer 2: radial warm wash at 30% 50%  --  behind asset column
 *   Card internal: ::before radial warm glow at 18% 55%
 *
 * Section padding: 72px top/bottom. Card max-width: 1040px.
 * Copy: copy/lps.md Section 6 DRAFT-v2. Present tense. No em dashes.
 */

import Image from "next/image";
import Link  from "next/link";

export function StakingTeaser(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Staking teaser  --  horizontal image-left/hook-right card (Rev 6) ---- */
        .staking-teaser {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 72px 0;
        }

        /* Layer 0: r18-texture-horizon at 18% (up from 16%) */
        .staking-teaser__texture {
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

        /* Layer 1: dark overlay */
        .staking-teaser__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.88) 0%,
            rgba(10,15,31,0.92) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 2: warm wash behind asset on left */
        .staking-teaser__warm {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 900px 400px at 30% 50%,
            rgba(254,214,7,0.09) 0%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Content wrapper */
        .staking-teaser__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .staking-teaser__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .staking-teaser__content { padding: 0 24px; } }

        /* Horizontal card */
        .staking-teaser__card {
          position: relative;
          overflow: hidden;
          max-width: 1040px;
          margin: 0 auto;
          padding: 32px 40px;
          display: grid;
          grid-template-columns: 220px 1fr auto;
          align-items: center;
          gap: 32px;
          background: rgba(10,15,31,0.60);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(254,214,7,0.18);
          border-radius: var(--radius-md, 16px);
        }

        /* Internal warm glow behind asset */
        .staking-teaser__card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 600px 300px at 18% 55%,
            rgba(254,214,7,0.10) 0%,
            transparent 65%
          );
          pointer-events: none;
          border-radius: inherit;
        }

        @media (max-width: 1023px) {
          .staking-teaser__card {
            grid-template-columns: 180px 1fr;
            grid-template-areas: "asset copy" "pill pill";
            gap: 24px;
          }
          .staking-teaser__asset-col { grid-area: asset; }
          .staking-teaser__copy-col  { grid-area: copy;  }
          .staking-teaser__pill-col  { grid-area: pill;  }
        }

        @media (max-width: 640px) {
          .staking-teaser__card {
            grid-template-columns: 1fr;
            grid-template-areas: "asset" "copy" "pill";
            text-align: center;
            padding: 28px 24px;
          }
          .staking-teaser__asset-col {
            display: flex;
            justify-content: center;
          }
        }

        /* Asset column  --  new bespoke disc at full opacity */
        .staking-teaser__asset-col {
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .staking-teaser__asset {
          width: 220px;
          height: 220px;
          object-fit: contain;
          opacity: 1;
          filter:
            drop-shadow(0 30px 50px rgba(254,214,7,0.22))
            drop-shadow(0 10px 30px rgba(90,28,203,0.35));
          /* Static per Pass 5 site-wide rule  --  only hero assets float. */
        }

        @media (max-width: 1023px) {
          .staking-teaser__asset { width: 180px; height: 180px; }
        }

        @media (max-width: 640px) {
          .staking-teaser__asset { width: 160px; height: 160px; }
        }

        /* Copy column */
        .staking-teaser__copy-col {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .staking-teaser__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
        }

        /* H2  --  smaller than primary section H2s per AD Rev 6 */
        .staking-teaser__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(22px, 2.4vw, 28px);
          font-weight: 500;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0;
        }

        .staking-teaser__body {
          font-family: var(--font-body-family);
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }

        .staking-teaser__disclaimer {
          font-family: var(--font-body-family);
          font-size: 11px;
          font-style: italic;
          color: var(--text-secondary);
          opacity: 0.55;
          margin: 0;
          line-height: 1.5;
        }

        /* CTA pill column */
        .staking-teaser__pill-col {
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .staking-teaser__pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 12px 24px;
          font-family: var(--font-body-family);
          font-size: 14px;
          font-weight: 600;
          color: var(--ax-capital-yellow, #FED607);
          background: transparent;
          border: 1px solid rgba(254,214,7,0.40);
          border-radius: 999px;
          text-decoration: none;
          white-space: nowrap;
          transition: border-color 250ms ease, background 250ms ease, box-shadow 250ms ease;
        }

        .staking-teaser__pill:hover {
          border-color: rgba(254,214,7,0.75);
          background: rgba(254,214,7,0.06);
          box-shadow: 0 0 16px rgba(254,214,7,0.20);
        }

        .staking-teaser__pill:focus-visible {
          outline: 2px solid rgba(254,214,7,0.55);
          outline-offset: 3px;
        }

        @media (max-width: 1023px) {
          .staking-teaser__pill { width: 100%; max-width: 280px; }
        }

        @media (max-width: 640px) {
          .staking-teaser__pill { margin: 0 auto; display: flex; }
        }
      `}</style>

      <section
        className="staking-teaser"
        id="staking-teaser"
        aria-labelledby="staking-teaser-heading"
      >
        <Image
          src="/images/r18-texture-horizon.png"
          alt="" aria-hidden="true"
          fill
          sizes="100vw"
          quality={60}
          className="staking-teaser__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
        <div className="staking-teaser__overlay" aria-hidden="true" />
        <div className="staking-teaser__warm"    aria-hidden="true" />

        <div className="staking-teaser__content">
          <div className="staking-teaser__card">

            {/* Asset column  --  new bespoke staking-pair disc */}
            <div className="staking-teaser__asset-col">
              <Image
                src="/images/r22-appex-token-edited-transparent.webp"
                alt="The $APPEX token  --  stake to earn protocol fees and boost yield"
                width={220}
                height={220}
                className="staking-teaser__asset"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Copy column */}
            <div className="staking-teaser__copy-col">
              <div className="staking-teaser__eyebrow">Optional yield boost</div>
              <h2 id="staking-teaser-heading" className="staking-teaser__h2">
                Stake to earn more.
              </h2>
              <p className="staking-teaser__body">
                Pair LP tokens with staked $APPEX and earn a share of protocol fees on top of base yield. Lock longer, weight higher: 1x, 2x, 3x.
              </p>
              <p className="staking-teaser__disclaimer">
                Locked LP tokens cannot redeem while a staking position is active.
              </p>
            </div>

            {/* CTA pill column */}
            <div className="staking-teaser__pill-col">
              <Link href="/appex#staking" className="staking-teaser__pill">
                See staking mechanics
              </Link>
            </div>

          </div>
        </div>

      </section>
    </>
  );
}
