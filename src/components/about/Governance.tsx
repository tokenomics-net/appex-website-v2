/**
 * Governance.tsx
 *
 * Server Component  --  no client interactivity.
 * Justification: static timeline layout  --  no hooks required.
 *
 * Design source: revision-pass-4.md §5.1 Section D + website-layout-standards.md
 * Copy source: outputs/appex-website-build/copy/about.md Section D (TONY-APPROVED)
 *
 * Layout: 3-phase horizontal timeline (desktop) / vertical stacked (mobile).
 * Phase vocabulary: Operator (Phase 1) → Hybrid (Phase 2) → Onchain (Phase 3).
 * Zero "team" language anywhere.
 * No floating assets.
 *
 * Background:
 *   Layer 0: r18-texture-horizon.png at 18%
 *   Layer 1: directional overlay
 *   Layer 2: ambient purple wash (center)
 */

import Image from "next/image";

interface Phase {
  num:    string;
  label:  string;
  body:   string;
}

const PHASES: Phase[] = [
  {
    num:   "1",
    label: "Operator",
    body:  "The protocol launches under a designated operator. Vault onboarding, borrower approvals, fee-curve calibration, and parameter settings sit with the operator at launch. Procedures are documented; multi-sig administration applies to every contract interaction. The operator is a function, not a designation.",
  },
  {
    num:   "2",
    label: "Hybrid",
    body:  "As the staking surface activates, $APPEX stakers begin voting on parameter changes, new vault approvals, and borrower admissions. The operator continues to execute day-to-day operations while signaling votes shape the direction. Governance and operations run in parallel, with authority shifting to the staking surface.",
  },
  {
    num:   "3",
    label: "Onchain",
    body:  "Onchain governance by $APPEX holders covers every parameter proposal, protocol upgrade, and new-market decision. Multi-sig administration transitions to fully onchain execution. Contributors move to a support role. Governance lives on the staking surface, where every voter has committed capital to the decisions they make.",
  },
];

export function Governance(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Governance pathway  --  3-phase timeline ---- */
        .about-gov {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        /* Layer 0: r18-texture-horizon at 18% */
        .about-gov__texture {
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

        /* Layer 1: directional overlay */
        .about-gov__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.90) 0%,
            rgba(10,15,31,0.80) 50%,
            rgba(10,15,31,0.90) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 2: ambient purple wash (center) */
        .about-gov__ambient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 900px 500px at 50% 50%,
            rgba(90,28,203,0.10) 0%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Content wrapper */
        .about-gov__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .about-gov__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .about-gov__content { padding: 0 24px; } }

        /* Section header */
        .about-gov__header {
          max-width: 720px;
          margin-bottom: 64px;
        }

        .about-gov__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .about-gov__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        /* H2 gradient accent on "onchain." */
        .about-gov__h2-gradient {
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
          .about-gov__h2-gradient {
            animation: none;
            background-position: 0% 50%;
          }
        }

        .about-gov__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
        }

        /* Timeline connector bar (desktop) */
        .about-gov__phases {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          position: relative;
        }

        /* Horizontal connector line between phases */
        .about-gov__phases::before {
          content: '';
          position: absolute;
          top: 22px;
          left: calc(100% / 6);
          right: calc(100% / 6);
          height: 1px;
          background: linear-gradient(90deg,
            rgba(90,28,203,0.40)  0%,
            rgba(254,214,7,0.30)  50%,
            rgba(90,28,203,0.40)  100%
          );
          z-index: 0;
        }

        @media (max-width: 767px) {
          .about-gov__phases {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .about-gov__phases::before { display: none; }
        }

        /* Individual phase */
        .about-gov__phase {
          position: relative;
          z-index: 1;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .about-gov__phase:first-child { padding-left: 0; }
        .about-gov__phase:last-child  { padding-right: 0; }

        @media (max-width: 767px) {
          .about-gov__phase { padding: 0; }
        }

        /* Phase node + label */
        .about-gov__phase-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Numbered node dot */
        .about-gov__phase-node {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(10,15,31,0.90);
          border: 1px solid rgba(90,28,203,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display-family);
          font-size: 13px;
          font-weight: 600;
          color: var(--ax-capital-yellow, #FED607);
          box-shadow: 0 0 18px rgba(90,28,203,0.22);
        }

        /* Phase label */
        .about-gov__phase-label {
          font-family: var(--font-display-family);
          font-size: 20px;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0;
        }

        /* Phase body */
        .about-gov__phase-body {
          font-family: var(--font-body-family);
          font-size: 15px;
          line-height: 1.65;
          color: var(--text-secondary);
          margin: 0;
        }
      `}</style>

      <section className="about-gov" id="governance" aria-labelledby="about-gov-heading">

        {/* Layer 0: r18-texture-horizon at 18% */}
        <Image
          src="/images/r18-texture-horizon.png"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="about-gov__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />

        <div className="about-gov__overlay" aria-hidden="true" />
        <div className="about-gov__ambient" aria-hidden="true" />

        <div className="about-gov__content">

          <div className="about-gov__header">
            <div className="about-gov__eyebrow" aria-hidden="true">Governance</div>
            <h2 id="about-gov-heading" className="about-gov__h2">
              From operator-guided to{" "}
              <span className="about-gov__h2-gradient">onchain.</span>
            </h2>
            <p className="about-gov__subhead">
              Governance activates in phases. Early decisions sit with a protocol operator.
              Authority migrates onchain as the protocol matures.
            </p>
          </div>

          <div className="about-gov__phases" role="list" aria-label="Governance phases">
            {PHASES.map((phase) => (
              <article key={phase.num} className="about-gov__phase" role="listitem">
                <div className="about-gov__phase-header">
                  <div className="about-gov__phase-node" aria-hidden="true">{phase.num}</div>
                  <h3 className="about-gov__phase-label">{phase.label}</h3>
                </div>
                <p className="about-gov__phase-body">{phase.body}</p>
              </article>
            ))}
          </div>

        </div>

      </section>
    </>
  );
}
