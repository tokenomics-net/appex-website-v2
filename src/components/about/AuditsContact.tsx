/**
 * AuditsContact.tsx
 *
 * Server Component  --  no client interactivity.
 * Justification: static layout  --  no hooks required.
 *
 * Design source: revision-pass-4.md §5.1 Section E + website-layout-standards.md
 * Copy source: outputs/appex-website-build/copy/about.md Section E (TONY-APPROVED)
 *
 * Layout: 2-col desktop (audits left, contact right) / stacked mobile.
 * Background: solid navy, no texture (quiet density per copy spec).
 * No fabricated firm names or dates  --  copy stays qualitative per wiki.
 * mailto: CTA is appropriate here (per copy spec: explicit inquiry, not "contact the team").
 *
 * Note: copy.md Section E specifies solid navy background (no texture). Adjacent
 * Section D uses r18-texture-horizon, so this section is intentionally texture-free
 *  --  no collision risk.
 *
 * H2 gradient accent on "Contactable." per microcopy table.
 */

export function AuditsContact(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Audits + Contact  --  type-dominant trust section ---- */
        .about-security {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        /* Subtle ambient glow  --  purple top-right, no texture */
        .about-security::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 800px 500px at 85% 15%,
            rgba(90,28,203,0.09) 0%,
            transparent 60%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* Content wrapper */
        .about-security__content {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .about-security__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .about-security__content { padding: 0 24px; } }

        /* Section header */
        .about-security__header {
          max-width: 720px;
          margin-bottom: 64px;
        }

        .about-security__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .about-security__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0;
        }

        /* H2 gradient accent on "Contactable." */
        .about-security__h2-gradient {
          display: inline-block;
          background-image: linear-gradient(
            90deg,
            var(--ax-capital-yellow, #FED607)      0%,
            var(--ax-glint-yellow, #FAF28B)        30%,
            var(--ax-ether-mist, #B9A0CC)          60%,
            var(--ax-node-purple-light, #9B59D5)   80%,
            var(--ax-capital-yellow, #FED607)      100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: axShimmer 8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-security__h2-gradient {
            animation: none;
            background-position: 0% 50%;
          }
        }

        /* 2-col grid: audits left / contact right */
        .about-security__cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
        }

        @media (max-width: 767px) {
          .about-security__cols {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        /* Column shared */
        .about-security__col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Column heading (H3) */
        .about-security__col-h3 {
          font-family: var(--font-display-family);
          font-size: 20px;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(90,28,203,0.25);
        }

        /* Divider bar between h3 and body */
        .about-security__col-body {
          font-family: var(--font-body-family);
          font-size: 15px;
          line-height: 1.65;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Audit bullets */
        .about-security__bullets {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .about-security__bullet {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-family: var(--font-body-family);
          font-size: 15px;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        /* Bullet marker */
        .about-security__bullet::before {
          content: '';
          flex-shrink: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-top: 8px;
        }

        /* .cta-link for mailto  --  per R1.7 */
        .about-security__cta-link {
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
          margin-top: 4px;
        }

        .about-security__cta-link:hover {
          border-color: rgba(254,214,7,0.80);
          background: rgba(254,214,7,0.06);
        }

        .about-security__cta-link:focus-visible {
          outline: 2px solid var(--ax-capital-yellow, #FED607);
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-security__cta-link { transition: none; }
        }
      `}</style>

      <section className="about-security" id="security" aria-labelledby="about-security-heading">

        <div className="about-security__content">

          <div className="about-security__header">
            <div className="about-security__eyebrow" aria-hidden="true">Security</div>
            <h2 id="about-security-heading" className="about-security__h2">
              Audited. Documented.{" "}
              <span className="about-security__h2-gradient">Contactable.</span>
            </h2>
          </div>

          <div className="about-security__cols">

            {/* Left: Audits and security */}
            <div className="about-security__col">
              <h3 className="about-security__col-h3">Audits and security</h3>
              <p className="about-security__col-body">
                Audit reports publish on completion, with no redactions, across the vault
                contract, staking contract, $APPEX token contract, fee distribution contract,
                and NAV calculation logic. A tiered bug bounty runs continuously after launch.
                Multi-sig administration follows published procedures. Price-feed guardrails
                flag variance exceeding five to ten percent for manual review.
              </p>
              <ul className="about-security__bullets" aria-label="Security commitments">
                <li className="about-security__bullet">
                  Third-party audits on every core contract, pre-deployment
                </li>
                <li className="about-security__bullet">
                  Tiered bug bounty, severity-priced rewards
                </li>
                <li className="about-security__bullet">
                  Published multi-sig administration procedures
                </li>
              </ul>
            </div>

            {/* Right: Inquiry path */}
            <div className="about-security__col">
              <h3 className="about-security__col-h3">Inquiry path</h3>
              <p className="about-security__col-body">
                LPs considering a deposit, borrowers considering an application, and researchers
                reviewing the protocol can reach the operator through a single email path. No
                form sits on this page. No relationship-gated routing exists. Every inquiry
                lands in the same queue, and response times reflect load, not leverage.
              </p>
              <a
                href="mailto:support@appex.finance"
                className="about-security__cta-link"
                aria-label="Contact the protocol via email"
              >
                Contact the protocol
              </a>
            </div>

          </div>

        </div>

      </section>
    </>
  );
}
