/**
 * ClosingCTASection.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Design source: home-design.md Rev 5 Section 8 + r22 rebuild prompt
 * Background: r18-texture-horizon.png at 22% opacity
 * Layout: TWO-COLUMN (new per r22 prompt)
 *   Column 1 "Follow the vault" (For LPs): X + LinkedIn icons with links from site-config
 *   Column 2 "Apply to borrow" (For Borrowers): support@appex.finance mailto CTA
 * Desktop: two columns side by side, stack to single column on mobile
 * Copy: PRESENT TENSE from home.md Section 8
 * Padding: 80px
 */

import Image from "next/image";

export function ClosingCTASection(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Closing CTA section (two-column) ---- */
        .closing-cta {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress);
          padding: 80px 0;
        }

        @media (max-width: 767px) {
          .closing-cta { padding: 48px 0; }
        }

        /* Layer 0: texture underlay at 22% */
        .closing-cta__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.22;
          pointer-events: none;
          z-index: 0;
        }

        /* Layer 1: copy-protection gradient */
        .closing-cta__gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,
            rgba(10,15,31,0.70) 0%,
            rgba(10,15,31,0.40) 40%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 2: top edge hairline */
        .closing-cta__hairline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(180deg, rgba(254,214,7,0.16) 0%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }

        /* Layer 3: bottom vignette */
        .closing-cta__vignette {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 25%;
          background: linear-gradient(0deg, rgba(10,15,31,0.30) 0%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }

        /* Content wrapper */
        .closing-cta__content {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) {
          .closing-cta__content { padding: 0 32px; }
        }
        @media (max-width: 767px) {
          .closing-cta__content { padding: 0 24px; }
        }

        /* Two-column grid */
        .closing-cta__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        @media (max-width: 767px) {
          .closing-cta__grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        /* Divider between columns (desktop only) */
        .closing-cta__col + .closing-cta__col {
          border-left: 1px solid rgba(255,255,255,0.08);
          padding-left: 64px;
        }

        @media (max-width: 767px) {
          .closing-cta__col + .closing-cta__col {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid rgba(255,255,255,0.08);
            padding-top: 48px;
          }
        }

        /* Column heading */
        .closing-cta__col-heading {
          font-family: var(--font-display-family);
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 400;
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        /* Column body */
        .closing-cta__col-body {
          font-size: 15px;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 28px;
        }

        /* Social icon row  --  Column 1 */
        .closing-cta__socials {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .closing-cta__social-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.72);
          text-decoration: none;
          font-family: var(--font-body-family);
          font-size: 14px; /* mobile audit: bumped from 13px */
          font-weight: 500;
          letter-spacing: 0.02em;
          transition:
            background 200ms ease,
            border-color 200ms ease,
            color 200ms ease;
        }

        .closing-cta__social-link:hover {
          background: rgba(254,214,7,0.08);
          border-color: rgba(254,214,7,0.30);
          color: var(--ax-capital-yellow);
        }

        .closing-cta__social-link:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
        }

        /* Fade-up animation */
        .closing-cta__col {
          animation: axFadeUp 700ms var(--ease-enter) both;
        }

        .closing-cta__col:nth-child(1) { animation-delay: 0ms; }
        .closing-cta__col:nth-child(2) { animation-delay: 120ms; }

        @media (prefers-reduced-motion: reduce) {
          .closing-cta__col {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <section className="closing-cta" aria-labelledby="closing-cta-lp-heading">
        {/* Texture underlay */}
        <Image
          src="/images/r18-texture-horizon.webp"
          alt="" aria-hidden="true"
          fill
          className="closing-cta__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
          decoding="async"
        />
        <div className="closing-cta__gradient" aria-hidden="true" />
        <div className="closing-cta__hairline" aria-hidden="true" />
        <div className="closing-cta__vignette" aria-hidden="true" />

        <div className="closing-cta__content">
          <div className="closing-cta__grid">

            {/* Column 1: For Liquidity Providers  --  Follow the vault */}
            <div className="closing-cta__col">
              <h2 id="closing-cta-lp-heading" className="closing-cta__col-heading">
                Follow the vault.
              </h2>
              <p className="closing-cta__col-body">
                The protocol publishes build updates, vault parameters, and LP mechanics
                on X and LinkedIn. Follow for launch details and deposit windows.
              </p>
              <div className="closing-cta__socials" aria-label="Follow appeX Protocol">
                <a
                  href="https://x.com/appexprotocol"
                  className="closing-cta__social-link"
                  aria-label="appeX on X"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  X (Twitter)
                </a>
                <a
                  href="https://www.linkedin.com/company/appex-protocol/"
                  className="closing-cta__social-link"
                  aria-label="appeX on LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Column 2: For Borrowers  --  Apply to borrow */}
            <div className="closing-cta__col">
              <h2 className="closing-cta__col-heading">
                Apply to borrow.
              </h2>
              <p className="closing-cta__col-body">
                Borrowers go through a structured approval process before drawing from the vault.
                Contact the protocol to start your application.
              </p>
              <a href="mailto:support@appex.finance" className="ax-btn--primary">
                Contact
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
