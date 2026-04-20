/**
 * HowSafe.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Justification: static layout with CSS hover states  --  no hooks required.
 * Scroll-in animation uses a tiny inline script for progressive enhancement.
 * Note: inline script is acceptable in a Server Component here because it runs
 *   after hydration as a client-side enhancement, not as SSR-blocking logic.
 *   If this causes hydration warnings, migrate the observer to a separate
 *   "use client" island component.
 *
 * Design source: lps-revision-round-1.md Revision 3  --  image-dominant alternating rows
 *
 * Layout: 4 image-dominant rows (alternating left/right), each row: asset 45% + copy 55%.
 *   Row 1 (Vault isolation):        asset LEFT,  copy RIGHT
 *   Row 2 (Borrower remains liable): asset RIGHT, copy LEFT
 *   Row 3 (Rigorous onboarding):    asset LEFT,  copy RIGHT
 *   Row 4 (No idle USDC):           asset RIGHT, copy LEFT
 *
 * Assets (r35 velvet cleanup  --  all r29 retired to library equivalents):
 *   Card 1 Vault isolation:         r19-asset-architecture-core-ziggurat-transparent.webp
 *   Card 2 Borrower remains liable: r19-asset-redemption-gate-arch-transparent.webp
 *   Card 3 Rigorous onboarding:     r19-asset-security-seal-obelisk-transparent.webp
 *   Card 4 No idle USDC:            r19-asset-momentum-wave-transparent.webp
 *
 * Background stack (upgraded per AD Rev 3):
 *   Layer 0: r17-texture-grounding.png at 20%
 *   Layer 1 NEW: r23-scene-trust.webp at 12% mix-blend-mode:overlay (vault depth)
 *   Layer 2: linear-gradient overlay
 *   Layer 3 NEW: radial purple wash top-left (behind rows 1-2)
 *   Layer 4 NEW: radial warm wash bottom-right (behind rows 3-4)
 *
 * Copy panel: no glass card  --  text on composited background.
 *   H3: Tektur 28px (up from 22px). Body: Hubot 16px (up from 14px).
 * Row dividers: 1px rgba(254,214,7,0.08) hairline between rows.
 * Copy: copy/lps.md Section 3. Present tense. No em dashes.
 */

import Image from "next/image";

interface SafetyRow {
  id:       string;
  asset:    string;
  heading:  string;
  body:     string;
  floatDur: string;
  reverse:  boolean;
}

const SAFETY_ROWS: SafetyRow[] = [
  {
    id:       "vault-isolation",
    asset:    "/images/r36-asset-three-vaults-isolation-transparent.webp",
    heading:  "Vault isolation.",
    body:     "Each vault is its own smart contract with its own NAV, borrower pool, and fee curve. Losses in one vault do not reach another. LPs pick their exposure by picking their vault.",
    floatDur: "5s",
    reverse:  false,
  },
  {
    id:       "borrower-liable",
    asset:    "/images/r36-asset-borrower-liability-transparent.webp",
    heading:  "Borrower remains liable.",
    body:     "The vault's counterparty is the borrowing company, not their downstream customer. If a customer pays late or fails to pay, the borrower still owes the vault on the original term. Repayment is contractual, not conditional.",
    floatDur: "5.5s",
    reverse:  true,
  },
  {
    id:       "rigorous-onboarding",
    asset:    "/images/r36-asset-shield-onboarding-transparent.webp",
    heading:  "Rigorous onboarding.",
    body:     "Every borrower passes credit evaluation, financial review, and background checks before drawing. Concentration guidelines cap exposure per borrower and per industry. Insurance applies where available. Default permanently removes a borrower from the approved pool.",
    floatDur: "6s",
    reverse:  false,
  },
  {
    id:       "no-idle-usdc",
    asset:    "/images/r19-asset-momentum-wave-transparent.webp",
    heading:  "No idle USDC.",
    body:     "Capital outside an active advance sits in Aave earning continuous yield, and redemptions draw from that liquid position first. Idle capital still works, and exit liquidity is backed by it.",
    floatDur: "6.5s",
    reverse:  true,
  },
  {
    id:       "audits-bounty",
    asset:    "/images/r22-util-governance-transparent.webp",
    heading:  "Audits plus bug bounty.",
    body:     "Smart contracts ship after third-party audits, and a standing bug-bounty program invites ongoing review. The security surface is documented, not assumed.",
    floatDur: "6s",
    reverse:  false,
  },
];

export function HowSafe(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- How capital stays safe  --  image-dominant alternating rows (Rev 3) ---- */
        .how-safe {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        /* Layer 0: r17-texture-grounding at 20% */
        .how-safe__texture {
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

        /* Layer 1 NEW (Rev 3): r23-scene-trust at 12% overlay  --  adds vault depth */
        .how-safe__scene-depth {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          z-index: 0;
          opacity: 0.12;
          mix-blend-mode: overlay;
        }

        /* Layer 2: directional overlay */
        .how-safe__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.88) 0%,
            rgba(10,15,31,0.78) 50%,
            rgba(10,15,31,0.90) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 3 NEW (Rev 3): purple wash top-left  --  behind rows 1-2 */
        .how-safe__ambient-tl {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 1000px 700px at 18% 22%,
            rgba(90,28,203,0.14) 0%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 4 NEW (Rev 3): warm wash bottom-right  --  behind rows 3-4 */
        .how-safe__ambient-br {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 1100px 800px at 80% 78%,
            rgba(254,214,7,0.09) 0%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Content wrapper */
        .how-safe__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .how-safe__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .how-safe__content { padding: 0 24px; } }

        /* Section header */
        .how-safe__header {
          max-width: 720px;
          margin-bottom: 64px;
        }

        .how-safe__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .how-safe__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .how-safe__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 640px;
          margin: 0;
        }

        /* Rows container */
        .how-safe__rows {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Individual row  --  alternating 45/55 grid */
        .how-safe__row {
          display: grid;
          grid-template-columns: 45fr 55fr;
          gap: 56px;
          align-items: center;
          padding: 32px 0;
          opacity: 1;
          transform: none;
        }

        .how-safe__row--reverse {
          grid-template-columns: 55fr 45fr;
        }

        .how-safe__row--reverse .how-safe__row-asset { order: 2; }
        .how-safe__row--reverse .how-safe__row-copy  { order: 1; }

        /* Hairline divider between rows */
        .how-safe__row + .how-safe__row {
          border-top: 1px solid rgba(254,214,7,0.08);
          padding-top: 64px;
          margin-top: 32px;
        }

        @media (max-width: 1023px) {
          .how-safe__row,
          .how-safe__row--reverse {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .how-safe__row--reverse .how-safe__row-asset { order: 1; }
          .how-safe__row--reverse .how-safe__row-copy  { order: 2; }
        }

        /* Asset column  --  large, dimensional, with floor-glow puddle */
        .how-safe__row-asset {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .how-safe__row-asset::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 400px;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
        }

        .how-safe__row--glow-purple .how-safe__row-asset::before {
          background: rgba(90,28,203,0.18);
        }

        .how-safe__row--glow-warm .how-safe__row-asset::before {
          background: rgba(254,214,7,0.12);
        }

        /* Asset image  --  large per AD Rev 3 */
        .how-safe__row-img {
          position: relative;
          z-index: 1;
          width: clamp(280px, 36vw, 400px);
          height: auto;
          object-fit: contain;
          filter:
            drop-shadow(0 40px 80px rgba(90,28,203,0.38))
            drop-shadow(0 20px 40px rgba(254,214,7,0.18));
          opacity: 1;
          /* Static per Pass 5 site-wide rule  --  only hero assets float. */
        }

        @media (max-width: 1023px) {
          .how-safe__row-img { width: 280px; }
        }

        @media (max-width: 767px) {
          .how-safe__row-img { width: 220px; }
        }

        /* Copy panel  --  no glass wrapper, text on composited background */
        .how-safe__row-copy {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* H3  --  28px per AD Rev 3 (up from 22px) */
        .how-safe__row-h3 {
          font-family: var(--font-display-family);
          font-size: 28px;
          font-weight: 500;
          line-height: 1.2;
          color: var(--text-primary);
          margin: 0;
        }

        /* Body  --  16px per AD Rev 3 (up from 14px) */
        .how-safe__row-body {
          font-family: var(--font-body-family);
          font-size: 16px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }


      `}</style>

      <section className="how-safe" id="safety" aria-labelledby="how-safe-heading">

        {/* Layer 0: r17-texture-grounding at 20% */}
        <Image
          src="/images/r17-texture-grounding.png"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="how-safe__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />

        {/* Layer 1 NEW: r23-scene-trust at 12% overlay  --  vault atmospheric depth */}
        <Image
          src="/images/r23-scene-trust.webp"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="how-safe__scene-depth"
          style={{ objectFit: "cover", objectPosition: "center center" }}
          loading="lazy"
        />

        <div className="how-safe__overlay"    aria-hidden="true" />
        <div className="how-safe__ambient-tl" aria-hidden="true" />
        <div className="how-safe__ambient-br" aria-hidden="true" />

        <div className="how-safe__content">

          <div className="how-safe__header">
            <div className="how-safe__eyebrow">How capital stays safe</div>
            <h2 id="how-safe-heading" className="how-safe__h2">
              Five protections.{" "}
              <span className="text-gold-gradient">Every deposit.</span>
            </h2>
            <p className="how-safe__subhead">
              Protection here is structural, not promised. Four specific mechanisms sit between your deposit and a loss scenario, each with a wiki-traceable explanation.
            </p>
          </div>

          <div className="how-safe__rows">
            {SAFETY_ROWS.map((row, i) => {
              const glowClass   = i < 2 ? "how-safe__row--glow-purple" : "how-safe__row--glow-warm";
              const reverseClass = row.reverse ? "how-safe__row--reverse" : "";
              return (
                <article
                  key={row.id}
                  className={`how-safe__row ${reverseClass} ${glowClass}`}
                  style={{
                    "--hs-float-dur":   row.floatDur,
                    "--hs-float-delay": `${i * 0.15}s`,
                    transitionDelay:    `${i * 100}ms`,
                  } as React.CSSProperties}
                >
                  <div className="how-safe__row-asset">
                    <Image
                      src={row.asset}
                      alt="" aria-hidden="true"
                      width={400}
                      height={400}
                      className="how-safe__row-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="how-safe__row-copy">
                    <h3 className="how-safe__row-h3">{row.heading}</h3>
                    <p className="how-safe__row-body">{row.body}</p>
                  </div>
                </article>
              );
            })}
          </div>

        </div>

      </section>
    </>
  );
}
