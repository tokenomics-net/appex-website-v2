/**
 * StakingMechanics.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout, CSS keyframe float animation only.
 * Reveal stagger via CSS nth-child + animation-delay (no inline script).
 *
 * Design source: appex-design.md Section 3  --  "reward scales with commitment"
 * Background: r21-scene-solution-chamber.webp at 100% opacity (library reuse)
 *   + gradient overlay protecting right 45-55% for glass panel
 * Left column: r22-util-staking-transparent.webp floating asset + pull-stat "up to 3x"
 * Right column: glass panel (heavier spec: blur(22px)) with 3 mechanism modules
 *   inner texture: r17-texture-rhythm at 10% inside the panel
 * Below: glass callout disclaimer (Rev 4 lesson 3)
 * Text-shadow stack on header copy (sits on scene, above glass panel).
 * Copy: appex.md Section 3. Present tense. No em dashes.
 */

import Image from "next/image";

export function StakingMechanics(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Staking mechanics  --  "reward scales with commitment" ---- */
        .staking {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        /* Layer 0: r21-scene-solution-chamber at 100% */
        .staking__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          z-index: 0;
        }

        /* Layer 1: gradient overlay (Option B)  --  darkens right 45-55% for glass panel */
        .staking__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            rgba(10,15,31,0.55) 0%,
            rgba(10,15,31,0.25) 35%,
            rgba(10,15,31,0.60) 65%,
            rgba(10,15,31,0.82) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Hairlines */
        .staking__hairline-top,
        .staking__hairline-bottom {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(254,214,7,0.14);
          pointer-events: none;
          z-index: 2;
        }

        .staking__hairline-top    { top: 0; }
        .staking__hairline-bottom { bottom: 0; }

        /* Content wrapper */
        .staking__content {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .staking__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .staking__content { padding: 0 24px; } }

        /* Section header  --  sits on scene, text-shadow applies */
        .staking__header {
          max-width: 680px;
          margin: 0 auto 56px;
          text-align: center;
        }

        .staking__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 14px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .staking__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .staking__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        /* Two-column grid */
        .staking__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          max-width: 1200px;
          margin: 0 auto;
          align-items: start;
        }

        @media (max-width: 960px) {
          .staking__grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        /* Left column: floating asset + pull-stat */
        .staking__left {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }

        /* Ambient backing behind pull-stat cluster  --  subtle radial, not a glass card */
        .staking__left::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 360px;
          height: 200px;
          background: radial-gradient(ellipse 360px 180px at 50% 85%,
            rgba(10,15,31,0.55) 0%,
            rgba(10,15,31,0.35) 45%,
            transparent 75%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* Floating asset sits above the ambient backing */
        .staking__asset {
          position: relative;
          z-index: 1;
          width: clamp(200px, 32vw, 380px);
          height: auto;
          filter: drop-shadow(0 40px 80px rgba(90,28,203,0.40));
          /* Static per Pass 5 site-wide rule  --  only hero assets float. */
        }

        /* Opacity rule: floating assets always opacity 1  --  never animated below 1 */
        .staking__asset { opacity: 1 !important; }

        @media (prefers-reduced-motion: reduce) {
          .staking__asset {
            transform: none;
            filter: drop-shadow(0 40px 80px rgba(90,28,203,0.40));
          }
        }

        /* Pull-stat and caption sit above the ambient backing */
        .staking__pull-stat,
        .staking__pull-caption {
          position: relative;
          z-index: 1;
        }

        .staking__pull-stat {
          margin-top: 48px;
          font-family: var(--font-display-family);
          font-size: clamp(2.25rem, 4.5vw, 3.5rem);
          font-weight: 400;
          line-height: 1.0;
          margin-bottom: 8px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .staking__pull-caption {
          font-family: var(--font-body-family);
          font-size: 14px;
          color: var(--text-primary);
          text-shadow:
            0 1px 2px  rgba(0,0,0,0.80),
            0 2px 8px  rgba(0,0,0,0.60),
            0 4px 24px rgba(0,0,0,0.40);
          position: relative;
          padding: 6px 16px;
          border-radius: 6px;
        }

        .staking__pull-caption::before {
          content: '';
          position: absolute;
          inset: -4px -12px;
          background: radial-gradient(ellipse 280px 80px at 50% 50%,
            rgba(10,15,31,0.55) 0%,
            transparent 75%
          );
          pointer-events: none;
          z-index: -1;
        }

        /* Right column: glass panel */
        .staking__panel {
          position: relative;
          background: rgba(10,15,31,0.78);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(90,28,203,0.24);
          border-radius: var(--radius-md, 16px);
          padding: 40px;
          overflow: hidden;
        }

        /* Inner rhythm texture at 10% */
        .staking__panel-texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          opacity: 0.10;
          border-radius: inherit;
        }

        /* Module sub-heading */
        .staking__module-label {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.75;
          margin-bottom: 12px;
        }

        /* Module A bullets */
        .staking__req-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .staking__req-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .staking__req-dot {
          flex-shrink: 0;
          width: 8px;
          height: 8px;
          margin-top: 5px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--ax-capital-yellow), var(--ax-node-purple, #5A1CCB));
        }

        /* Hairline divider between modules */
        .staking__divider {
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(254,214,7,0.30) 50%,
            transparent 100%
          );
          margin: 24px 0;
        }

        /* Module B: framing copy */
        .staking__cap-framing {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 12px;
          max-width: 100%;
        }

        /* Formula code block */
        .staking__formula {
          display: block;
          background: rgba(10,15,31,0.65);
          border: 1px solid rgba(254,214,7,0.22);
          border-radius: 6px;
          padding: 12px 20px;
          font-family: var(--font-mono-family, 'JetBrains Mono', monospace);
          font-size: 14px;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.88;
          margin-bottom: 8px;
          white-space: nowrap;
          overflow-x: auto;
        }

        .staking__cap-caveat {
          font-family: var(--font-body-family);
          font-size: 12px;
          font-style: italic;
          color: var(--text-tertiary, rgba(255,255,255,0.35));
        }

        /* Module C: duration table */
        .staking__table-wrapper {
          overflow-x: auto;
        }

        .staking__table {
          width: 100%;
          border-collapse: collapse;
        }

        .staking__table caption {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
        }

        .staking__table th {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-tertiary, rgba(255,255,255,0.35));
          text-align: left;
          padding: 0 16px 10px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .staking__table td {
          font-family: var(--font-body-family);
          font-size: 14px;
          color: var(--text-secondary);
          padding: 10px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .staking__table td:last-child {
          font-family: var(--font-display-family);
          font-variant-numeric: tabular-nums;
        }

        /* Module reveal stagger (CSS, no inline script) */
        .staking__module-a { animation: stakeFadeUp 500ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 80ms both; }
        .staking__module-b { animation: stakeFadeUp 500ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 160ms both; }
        .staking__module-c { animation: stakeFadeUp 500ms var(--ease-enter, cubic-bezier(0.16,1,0.3,1)) 240ms both; }

        @keyframes stakeFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .staking__module-a,
          .staking__module-b,
          .staking__module-c { animation: none; opacity: 1; transform: none; }
        }

        /* Glass callout: lock-implications disclaimer (nested inside panel per Rev 4 Lesson 3) */
        .staking__disclaimer {
          background: rgba(10,15,31,0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(90,28,203,0.20);
          border-radius: var(--radius-md, 16px);
          padding: 18px 24px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-top: 20px;
        }

        .staking__disclaimer-icon {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          color: var(--ax-capital-yellow);
          opacity: 0.7;
          margin-top: 2px;
        }

        .staking__disclaimer-text {
          font-family: var(--font-body-family);
          font-size: 15px;
          font-style: italic;
          line-height: 1.6;
          color: var(--text-primary);
        }

        .staking__cadence {
          display: block;
          font-size: 13px;
          font-style: italic;
          color: var(--text-secondary);
          margin-top: 8px;
          opacity: 0.75;
        }
      `}</style>

      <section className="staking" id="staking" aria-labelledby="staking-heading">

        {/* Scene */}
        <Image
          src="/images/r21-scene-solution-chamber.webp"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={85}
          className="staking__scene"
          style={{ objectFit: "cover", objectPosition: "center center" }}
          loading="lazy"
        />

        <div className="staking__overlay" aria-hidden="true" />
        <div className="staking__hairline-top"    aria-hidden="true" />
        <div className="staking__hairline-bottom" aria-hidden="true" />

        <div className="staking__content">

          {/* Section header */}
          <div className="staking__header">
            <div className="staking__eyebrow">Staking mechanics</div>
            <h2 id="staking-heading" className="staking__h2">
              Reward scales with{" "}
              <span className="text-gold-gradient">commitment.</span>
            </h2>
            <p className="staking__subhead">
              Two multipliers decide what a staker earns. The vault multiplier ties capacity to locked LP tokens. The duration multiplier rewards longer locks.
            </p>
          </div>

          {/* Two-column grid */}
          <div className="staking__grid">

            {/* Left column: floating asset + pull-stat */}
            <div className="staking__left">
              <Image
                src="/images/r36-asset-3x-multiplier-transparent.webp"
                alt="3x multiplier form  --  reward weight scales with lock duration"
                width={380}
                height={380}
                quality={85}
                className="staking__asset"
                loading="lazy"
                decoding="async"
              />
              <div className="staking__pull-stat">
                <span className="text-gold-gradient">up to 3x</span>
              </div>
              <div className="staking__pull-caption">reward weight at a 6-month lock</div>
            </div>

            {/* Right column: glass panel with 3 modules */}
            <div className="staking__panel">
              {/* Inner rhythm texture at 10% */}
              <Image
                src="/images/r17-texture-rhythm.png"
                alt="" aria-hidden="true"
                fill
                sizes="50vw"
                quality={50}
                className="staking__panel-texture"
                style={{ objectFit: "cover" }}
              />

              {/* Module A: Requirements */}
              <div className="staking__module-a">
                <div className="staking__module-label">Requirements</div>
                <ul className="staking__req-list">
                  <li className="staking__req-item">
                    <span className="staking__req-dot" aria-hidden="true" />
                    Hold LP tokens from one or more vaults
                  </li>
                  <li className="staking__req-item">
                    <span className="staking__req-dot" aria-hidden="true" />
                    Lock LP tokens against a vault
                  </li>
                  <li className="staking__req-item">
                    <span className="staking__req-dot" aria-hidden="true" />
                    Stake $APPEX and pick a duration
                  </li>
                </ul>
              </div>

              <div className="staking__divider" aria-hidden="true" />

              {/* Module B: Cap system */}
              <div className="staking__module-b">
                <div className="staking__module-label">Cap system</div>
                <p className="staking__cap-framing">
                  Staking rewards are capped per vault. The cap grows with the LP position locked against that vault, so capacity follows real liquidity.
                </p>
                <code
                  className="staking__formula"
                  aria-label="cap equals LP tokens locked times vault multiplier"
                >
                  APPEX cap = LP tokens locked &times; vault multiplier
                </code>
                <div className="staking__cap-caveat">Caps grow with LP positions.</div>
              </div>

              <div className="staking__divider" aria-hidden="true" />

              {/* Module C: Duration multipliers */}
              <div className="staking__module-c">
                <div className="staking__module-label">Duration multipliers</div>
                <div className="staking__table-wrapper">
                  <table className="staking__table">
                    <caption>Reward weight multipliers by lock duration</caption>
                    <thead>
                      <tr>
                        <th scope="col">Duration</th>
                        <th scope="col">Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>No lock</td>
                        <td><span className="text-gold-gradient">1&times;</span></td>
                      </tr>
                      <tr>
                        <td>3 months</td>
                        <td><span className="text-gold-gradient">2&times;</span></td>
                      </tr>
                      <tr>
                        <td>6 months</td>
                        <td><span className="text-gold-gradient">3&times;</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Glass callout: lock-implications disclaimer nested inside panel (Rev 4 Lesson 3) */}
              <aside
                className="staking__disclaimer"
                role="note"
                aria-label="Lock disclaimer"
              >
                {/* Lock icon (inline SVG) */}
                <svg
                  className="staking__disclaimer-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div>
                  <span className="staking__disclaimer-text">
                    Locked LP tokens cannot be redeemed while $APPEX is staked against them.
                  </span>
                  <span className="staking__cadence">
                    Monthly reward cadence, aligned with borrower repayment cycles.
                  </span>
                </div>
              </aside>

            </div>{/* /staking__panel */}
          </div>{/* /staking__grid */}

        </div>
      </section>
    </>
  );
}
