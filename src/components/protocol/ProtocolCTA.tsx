/**
 * ProtocolCTA.tsx
 *
 * Server Component  --  no client interactivity needed.
 * Design source: protocol-design.md Rev 3 Section 7
 * Background: r18-texture-horizon.png at 22% (matches Home S8 pattern)
 * Layout: left-aligned content cluster (not two-column like home CTA)
 * CTAs: Contact (Tier 1 Primary), For LPs + For Borrowers (Secondary Ghost Gold Pill)
 * Copy: protocol.md Section 8. PRESENT TENSE. No em dashes.
 */

import Image from "next/image";
import Link from "next/link";

export function ProtocolCTA(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Protocol CTA ---- */
        .proto-cta {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress);
          padding: 80px 0;
        }

        @media (max-width: 767px) {
          .proto-cta { padding: 48px 0; }
        }

        /* Layer 0: r18-texture-horizon at 22% */
        .proto-cta__texture {
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
        .proto-cta__gradient {
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

        /* Layer 2: top hairline  --  stronger gold, signals culmination */
        .proto-cta__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.22);
          pointer-events: none;
          z-index: 2;
        }

        /* Layer 3: bottom vignette */
        .proto-cta__vignette {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 25%;
          background: linear-gradient(0deg, rgba(10,15,31,0.30) 0%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }

        /* Content wrapper */
        .proto-cta__content {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 8%;
        }

        @media (max-width: 1023px) {
          .proto-cta__content { padding: 0 32px; }
        }
        @media (max-width: 767px) {
          .proto-cta__content { padding: 0 24px; }
        }

        /* Content cluster: left-aligned, max-width 560px */
        .proto-cta__cluster {
          max-width: 560px;
          padding: 24px;
          animation: axFadeUp 700ms var(--ease-enter) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .proto-cta__cluster { animation: none; opacity: 1; transform: none; }
        }

        .proto-cta__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .proto-cta__heading {
          font-family: var(--font-display-family);
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 16px;
        }

        .proto-cta__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          font-weight: 400;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 36px;
        }

        /* CTA row */
        .proto-cta__row {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: flex-start;
          animation: axFadeUp 700ms var(--ease-enter) 120ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .proto-cta__row { animation: none; opacity: 1; transform: none; }
        }

        @media (max-width: 480px) {
          .proto-cta__row {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>

      <section className="proto-cta" aria-labelledby="proto-cta-heading">
        {/* Texture */}
        <Image
          src="/images/r18-texture-horizon.png"
          alt="" aria-hidden="true"
          fill
          className="proto-cta__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
          decoding="async"
        />
        <div className="proto-cta__gradient" aria-hidden="true" />
        <div className="proto-cta__hairline" aria-hidden="true" />
        <div className="proto-cta__vignette" aria-hidden="true" />

        <div className="proto-cta__content">
          <div className="proto-cta__cluster">
            <div className="proto-cta__eyebrow">Next steps</div>
            <h2 id="proto-cta-heading" className="proto-cta__heading">
              Pick a{" "}
              <span className="text-gold-gradient">side.</span>
            </h2>
            <p className="proto-cta__subhead">
              Deposit into the vault or draw from it.
              The protocol operator answers questions before either happens.
            </p>

            <div className="proto-cta__row">
              {/* Contact  --  Tier 1 Primary Capital Yellow */}
              <a href="mailto:support@appex.finance" className="ax-btn--primary">
                Contact
              </a>
              {/* For LPs  --  Secondary Ghost Gold Pill */}
              <Link href="/lps" className="ax-btn--secondary">
                For LPs
              </Link>
              {/* For Borrowers  --  Secondary Ghost Gold Pill */}
              <Link href="/borrowers" className="ax-btn--secondary">
                For Borrowers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
