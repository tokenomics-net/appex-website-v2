/**
 * CapitalFlowSection.tsx
 *
 * Server Component  --  no interactivity. Static layout.
 * Design source: protocol-design.md Rev 3 Section 3b (NEW)
 * Background: r17-texture-energy.png at 22% (different from adjacent sections)
 * Asset: r23-flow-capital.png (branching channel manifold, bg-removed transparent PNG)
 * Layout: two-column split (asset + 2x2 info card grid)
 * Copy source: protocol.md Section 4 "How capital flows"
 * Copy: PRESENT TENSE per decisions.md §2. No em dashes.
 */

import Image from "next/image";

export function CapitalFlowSection(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Capital flow section ---- */
        .cap-flow {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress);
          padding: 80px 0;
        }

        @media (max-width: 767px) {
          .cap-flow { padding: 48px 0; }
        }

        /* Layer 0: r17-texture-energy at 22% */
        .cap-flow__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.22;
          pointer-events: none;
          z-index: 0;
        }

        /* Layer 1: directional gradient */
        .cap-flow__gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg,
            rgba(10,15,31,0.85) 0%,
            rgba(10,15,31,0.72) 50%,
            rgba(90,28,203,0.08) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 2: top hairline */
        .cap-flow__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.14);
          pointer-events: none;
          z-index: 2;
        }

        /* Content wrapper */
        .cap-flow__content {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) {
          .cap-flow__content { padding: 0 32px; }
        }
        @media (max-width: 767px) {
          .cap-flow__content { padding: 0 24px; }
        }

        /* Two-column split */
        .cap-flow__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 767px) {
          .cap-flow__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* Left column */
        .cap-flow__left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }

        .cap-flow__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 14px;
        }

        .cap-flow__heading {
          font-family: var(--font-display-family);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 400;
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 32px;
        }

        /* Asset wrapper  --  floating */
        .cap-flow__asset-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        /* Radial glow behind asset */
        .cap-flow__asset-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, rgba(254,214,7,0.12) 0%, transparent 65%);
          pointer-events: none;
        }

        .cap-flow__asset {
          position: relative;
          width: 80%;
          max-width: 360px;
          height: auto;
          filter:
            drop-shadow(0 4px 24px rgba(254,214,7,0.12))
            drop-shadow(0 8px 48px rgba(90,28,203,0.14))
            drop-shadow(0 16px 64px rgba(0,0,0,0.40));
          /* STATIC per Pass 6 site-wide float rule  --  only hero assets float */
        }

        @media (max-width: 767px) {
          .cap-flow__asset { width: 60%; max-width: 240px; margin: 0 auto; }
        }

        /* Right column: 2x2 card grid */
        .cap-flow__cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 480px) {
          .cap-flow__cards { grid-template-columns: 1fr; }
        }

        /* Info card */
        .cap-flow__card {
          background: rgba(10,15,31,0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-md);
          padding: 20px;
          animation: axFadeUp 500ms var(--ease-enter) both;
        }

        .cap-flow__card:nth-child(1) { animation-delay: 0ms; }
        .cap-flow__card:nth-child(2) { animation-delay: 80ms; }
        .cap-flow__card:nth-child(3) { animation-delay: 160ms; }
        .cap-flow__card:nth-child(4) { animation-delay: 240ms; }

        @media (prefers-reduced-motion: reduce) {
          .cap-flow__card { animation: none; opacity: 1; transform: none; }
        }

        /* Card icon */
        .cap-flow__card-icon {
          width: 20px;
          height: 20px;
          color: var(--ax-capital-yellow);
          margin-bottom: 10px;
        }

        /* Card label */
        .cap-flow__card-label {
          font-family: var(--font-display-family);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }

        /* Card body */
        .cap-flow__card-body {
          font-family: var(--font-body-family);
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-secondary);
        }
      `}</style>

      <section className="cap-flow" id="capital-flow" aria-labelledby="cap-flow-heading">
        {/* Texture underlay */}
        <Image
          src="/images/r17-texture-energy.png"
          alt="" aria-hidden="true"
          fill
          className="cap-flow__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
          decoding="async"
        />
        <div className="cap-flow__gradient" aria-hidden="true" />
        <div className="cap-flow__hairline" aria-hidden="true" />

        <div className="cap-flow__content">
          <div className="cap-flow__grid">

            {/* Left: eyebrow + heading + floating asset */}
            <div className="cap-flow__left">
              <div className="cap-flow__eyebrow">Capital flow</div>
              <h2 id="cap-flow-heading" className="cap-flow__heading">
                No idle USDC.{" "}
                <span className="text-gold-gradient">Every dollar works.</span>
              </h2>
              <div className="cap-flow__asset-wrap">
                <div className="cap-flow__asset-glow" aria-hidden="true" />
                <Image
                  src="/images/r23-flow-capital.png"
                  alt="Branching capital flow manifold: active and idle capital paths"
                  width={360}
                  height={360}
                  className="cap-flow__asset"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Right: 2x2 info card grid */}
            <div className="cap-flow__cards">

              {/* Card 1: Payout format */}
              <div className="cap-flow__card">
                <svg className="cap-flow__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 3 L3 12 L8 21"/>
                  <path d="M16 3 L21 12 L16 21"/>
                </svg>
                <div className="cap-flow__card-label">Payout choice.</div>
                <p className="cap-flow__card-body">
                  Borrowers choose $APPEX, USDC, or fiat. $APPEX payouts create structural buy pressure from real transactions.
                </p>
              </div>

              {/* Card 2: Active fees */}
              <div className="cap-flow__card">
                <svg className="cap-flow__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
                <div className="cap-flow__card-label">Active capital earns.</div>
                <p className="cap-flow__card-body">
                  Every advance generates fees. Fees flow to NAV. LP token value rises with each repayment cycle.
                </p>
              </div>

              {/* Card 3: Idle capital */}
              <div className="cap-flow__card">
                <svg className="cap-flow__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="3" y1="22" x2="21" y2="22"/>
                  <rect x="5" y="2" width="4" height="20"/>
                  <rect x="10" y="7" width="4" height="15"/>
                  <rect x="15" y="12" width="4" height="10"/>
                </svg>
                <div className="cap-flow__card-label">Idle capital works.</div>
                <p className="cap-flow__card-body">
                  Undeployed USDC routes to Aave to earn base yield while waiting for the next advance.
                </p>
              </div>

              {/* Card 4: Redemption */}
              <div className="cap-flow__card">
                <svg className="cap-flow__card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2 L12 16"/>
                  <polyline points="6 10 12 16 18 10"/>
                  <line x1="4" y1="22" x2="20" y2="22"/>
                </svg>
                <div className="cap-flow__card-label">Redemption buffers.</div>
                <p className="cap-flow__card-body">
                  Available liquidity pays out first. Fully deployed vaults queue until the next repayment cycle lands.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
