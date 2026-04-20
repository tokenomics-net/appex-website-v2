"use client";
/**
 * ProtocolSteps.tsx
 *
 * Client island  --  useState + keyboard nav for step interactivity.
 * Justification for "use client": interactive tab panel requires useState,
 *   useEffect (keyboard nav), and onClick handlers.
 *
 * Design source: protocol-design.md Rev 3 Section 3
 * Scene: r21-scene-solution-chamber.webp at 100% (Option B glassmorphism, same as Home S3)
 * Inner texture: r17-texture-rhythm.png at 12% opacity inside glass panel
 * Assets (CORRECTED, matching Home S3):
 *   Step 1: r21-asset-deposit-pour-transparent.webp
 *   Step 2: r22-step-fund-draw-transparent.webp
 *   Step 3: r19-asset-yield-curve-wedge-transparent.webp
 *
 * Bug fix (Rev 3): Tab buttons now have glass treatment with visible borders,
 *   explicit active/inactive states, and 48px minimum hit targets.
 *   Previously invisible against scene background.
 * Copy: PRESENT TENSE per decisions.md §2. No em dashes.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface StepData {
  number: string;
  label: string;
  eyebrow: string;
  heading: string;
  bullets: string[];
  code: string;
  codeColor: string;
  asset: string;
  assetAlt: string;
  glowColor: string;
  crossLinkLabel: string;
  crossLinkHref: string;
}

const STEPS: StepData[] = [
  {
    number:        "1",
    label:         "Deposit",
    eyebrow:       "01 / Deposit",
    heading:       "LPs deposit USDC into the vault.",
    bullets: [
      "Permissionless. No KYC. 1 USDC minimum.",
      "Each LP receives tokens representing proportional vault ownership.",
      "As borrower fees accrue, NAV increases. LP token value rises with it.",
      "Full redemption optionality at the vault level.",
    ],
    code:          "vault.deposit(usdc) \u2192 mint(lpTokens)",
    codeColor:     "rgba(254,214,7,0.65)",
    asset:         "/images/r21-asset-deposit-pour-transparent.webp",
    assetAlt:      "Magma-core pour form: capital flowing into the vault",
    glowColor:     "radial-gradient(ellipse 900px 500px at 70% 50%, rgba(90,28,203,0.22) 0%, transparent 65%)",
    crossLinkLabel: "LP details",
    crossLinkHref: "/lps",
  },
  {
    number:        "2",
    label:         "Fund",
    eyebrow:       "02 / Fund",
    heading:       "Approved borrowers draw capital.",
    bullets: [
      "Every borrower passes structured evaluation before drawing.",
      "Payout format is the borrower's choice: $APPEX, USDC, or fiat.",
      "When recipients select $APPEX, the vault purchases the token on DEX. That is structural buying pressure from real transactions.",
      "The borrower is responsible for repayment regardless of what happens downstream.",
    ],
    code:          "borrower.draw(amount) \u2192 receivable.create",
    codeColor:     "rgba(185,160,204,0.65)",
    asset:         "/images/r22-step-fund-draw-transparent.webp",
    assetAlt:      "Y-shaped conduit showing dual USDC and $APPEX payout outputs",
    glowColor:     "radial-gradient(ellipse 900px 500px at 70% 50%, rgba(90,28,203,0.18) 0%, rgba(254,214,7,0.08) 45%, transparent 70%)",
    crossLinkLabel: "Borrower details",
    crossLinkHref: "/borrowers",
  },
  {
    number:        "3",
    label:         "Earn",
    eyebrow:       "03 / Earn and Repay",
    heading:       "Borrowers repay. LPs earn. Capital recycles.",
    bullets: [
      "On original terms (Net-30 to Net-180), borrowers repay principal plus LP yield fee plus protocol fee.",
      "The LP yield fee accrues directly to vault NAV. No distributions to claim, no reward harvesting.",
      "Protocol fees cost 25% less when paid in $APPEX.",
      "Repaid capital recycles into new advances. The loop restarts.",
    ],
    code:          "repay(principal + fees) \u2192 nav.increase",
    codeColor:     "rgba(254,214,7,0.65)",
    asset:         "/images/r19-asset-yield-curve-wedge-transparent.webp",
    assetAlt:      "Yield curve wedge: accruing fees rise with each repayment cycle",
    glowColor:     "radial-gradient(ellipse 900px 500px at 70% 50%, rgba(254,214,7,0.18) 0%, rgba(90,28,203,0.10) 45%, transparent 70%)",
    crossLinkLabel: "About $APPEX",
    crossLinkHref: "/appex",
  },
];

export function ProtocolSteps(): React.JSX.Element {
  const [activeStep, setActiveStep] = useState<number>(0);
  const navRef  = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activateStep = useCallback((idx: number) => {
    setActiveStep(idx);
  }, []);

  // Keyboard navigation: ArrowLeft/Right, Home, End
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const handleKey = (e: KeyboardEvent): void => {
      const btns = btnRefs.current.filter(Boolean) as HTMLButtonElement[];
      const cur  = btns.indexOf(document.activeElement as HTMLButtonElement);
      if (cur < 0) return;
      let next = cur;
      if      (e.key === "ArrowRight") next = (cur + 1) % btns.length;
      else if (e.key === "ArrowLeft")  next = (cur - 1 + btns.length) % btns.length;
      else if (e.key === "Home")       next = 0;
      else if (e.key === "End")        next = btns.length - 1;
      else return;
      e.preventDefault();
      activateStep(next);
      btns[next]?.focus();
    };
    nav.addEventListener("keydown", handleKey);
    return () => nav.removeEventListener("keydown", handleKey);
  }, [activateStep]);

  return (
    <>
      <style>{`
        /* ---- Protocol steps ---- */
        .proto-steps {
          position: relative;
          overflow: hidden;
          min-height: 720px;
          background: var(--ax-fortress);
        }

        /* Layer 1: r21-scene-solution-chamber.webp at 100% (Option B) */
        .proto-steps__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center right;
          pointer-events: none;
          z-index: 0;
          animation: axScenePulse 22s ease-in-out infinite;
        }

        /* Layer 2: full-coverage darken */
        .proto-steps__darken {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg,
            rgba(10,15,31,0.55) 0%,
            rgba(10,15,31,0.35) 50%,
            rgba(10,15,31,0.50) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 3: top edge hairline */
        .proto-steps__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.14);
          pointer-events: none;
          z-index: 2;
        }

        /* Content wrapper */
        .proto-steps__content {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 48px;
        }

        @media (max-width: 767px) {
          .proto-steps__content { padding: 48px 24px; }
        }

        /* Glassmorphism panel */
        .proto-steps__glass {
          position: relative;
          background: rgba(10,15,31,0.78);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-md);
          padding: 48px 32px 40px;
          overflow: hidden;
        }

        @media (max-width: 767px) {
          .proto-steps__glass { padding: 32px 20px 32px; }
        }

        /* Inner texture: r17-texture-rhythm at 12% */
        .proto-steps__texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.12;
          pointer-events: none;
          z-index: 0;
        }

        /* Tab-aware radial glow */
        .proto-steps__glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          transition: background 600ms linear;
        }

        /* Header */
        .proto-steps__header {
          position: relative;
          z-index: 1;
          max-width: 520px;
          margin-bottom: 36px;
        }

        .proto-steps__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 12px;
        }

        .proto-steps__heading {
          font-family: var(--font-display-family);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 400;
          line-height: 1.15;
          color: var(--text-primary);
        }

        /* ----
           Step nav tabs (REV 3 BUG FIX)
           Previously invisible against scene background.
           Now: glass container + glass-treated buttons with explicit active/inactive states.
           Min 48px hit target (WCAG 2.5.5).
        ---- */
        .proto-steps__nav {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0;
          padding: 0 0 32px 0;
          flex-wrap: wrap;
        }

        /* Each step button  --  glass treatment */
        .pstep-btn {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          cursor: pointer;
          background: none;
          border: none;
          min-width: 88px;
          min-height: 44px;
        }

        /* Circle: glass container, visible against any background */
        .pstep-btn__circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display-family);
          font-size: 17px;
          font-weight: 600;
          transition: all 300ms cubic-bezier(0.4,0,0.2,1);
          /* Default glass treatment */
          background: rgba(10,15,31,0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--text-muted);
        }

        /* Active circle: yellow border + accent */
        .pstep-btn__circle--active {
          background: rgba(10,15,31,0.80);
          border-color: rgba(254,214,7,0.50);
          color: var(--ax-capital-yellow);
          box-shadow:
            0 0 16px rgba(254,214,7,0.20),
            0 2px 8px rgba(0,0,0,0.30);
        }

        /* Label below circle */
        .pstep-btn__label {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          white-space: nowrap;
          transition: color 300ms;
        }

        .pstep-btn__label--active   { color: var(--ax-capital-yellow); }
        .pstep-btn__label--inactive { color: var(--text-muted); }

        /* Connector line between buttons */
        .pstep-connector {
          flex: 0 0 48px;
          height: 2px;
          background: rgba(255,255,255,0.15);
        }

        @media (max-width: 767px) {
          .proto-steps__nav { flex-wrap: wrap; gap: 8px; }
          .pstep-connector  { display: none; }
          .pstep-btn        { min-width: 76px; }
        }

        /* Step panel */
        .pstep-panel {
          position: relative;
          z-index: 1;
          animation: axTabFade 300ms cubic-bezier(0.4,0,0.2,1);
        }

        @keyframes axTabFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pstep-panel__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 767px) {
          .pstep-panel__grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        /* Asset column */
        .pstep-panel__asset-col {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pstep-panel__asset {
          width: 65%;
          max-width: 380px;
          min-width: 200px;
          height: auto;
          filter:
            drop-shadow(0 4px 20px rgba(254,214,7,0.15))
            drop-shadow(0 8px 40px rgba(90,28,203,0.12))
            drop-shadow(0 16px 60px rgba(0,0,0,0.40));
          /* STATIC per Pass 6 site-wide float rule  --  only hero assets float */
        }

        @media (prefers-reduced-motion: reduce) {
          .proto-steps__scene   { animation: none; }
        }

        /* Copy column */
        .pstep-panel__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          opacity: 0.55;
          margin-bottom: 12px;
        }

        .pstep-panel__heading {
          font-family: var(--font-display-family);
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 400;
          line-height: 1.2;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .pstep-panel__bullets {
          list-style: none;
          margin: 0 0 20px 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pstep-panel__bullet {
          font-family: var(--font-body-family);
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          padding-left: 16px;
          position: relative;
          animation: axFadeUp 300ms var(--ease-enter) both;
        }

        .pstep-panel__bullet:nth-child(1) { animation-delay: 0ms; }
        .pstep-panel__bullet:nth-child(2) { animation-delay: 60ms; }
        .pstep-panel__bullet:nth-child(3) { animation-delay: 120ms; }
        .pstep-panel__bullet:nth-child(4) { animation-delay: 180ms; }

        .pstep-panel__bullet::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--ax-capital-yellow);
          opacity: 0.6;
        }

        @media (prefers-reduced-motion: reduce) {
          .pstep-panel__bullet { animation: none; opacity: 1; transform: none; }
        }

        .pstep-panel__code {
          font-family: var(--font-mono-family);
          font-size: 12px;
          opacity: 0.65;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          display: inline-block;
          margin-bottom: 20px;
        }

        .pstep-panel__crosslink {
          font-family: var(--font-body-family);
          font-size: 14px;
          color: var(--ax-capital-yellow);
          opacity: 0.7;
          text-decoration: none;
          transition: opacity 200ms;
        }

        .pstep-panel__crosslink:hover {
          opacity: 1;
          text-decoration: underline;
        }

        .pstep-panel__crosslink:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
        }
      `}</style>

      <section className="proto-steps" id="three-steps" aria-labelledby="proto-steps-heading">
        {/* Scene at 100%  --  same as Home S3 */}
        <Image
          src="/images/r21-scene-solution-chamber.webp"
          alt="" aria-hidden="true"
          fill
          className="proto-steps__scene"
          style={{ objectFit: "cover", objectPosition: "center right" }}
          loading="lazy"
          decoding="async"
        />
        <div className="proto-steps__darken"  aria-hidden="true" />
        <div className="proto-steps__hairline" aria-hidden="true" />

        <div className="proto-steps__content">
          <div className="proto-steps__glass">
            {/* Inner texture */}
            <Image
              src="/images/r17-texture-rhythm.png"
              alt="" aria-hidden="true"
              fill
              className="proto-steps__texture"
              style={{ objectFit: "cover" }}
              loading="lazy"
              decoding="async"
            />

            {/* Tab-aware radial glow */}
            <div
              className="proto-steps__glow"
              aria-hidden="true"
              style={{ background: STEPS[activeStep].glowColor }}
            />

            {/* Header */}
            <div className="proto-steps__header">
              <div className="proto-steps__eyebrow">How it works</div>
              <h2 id="proto-steps-heading" className="proto-steps__heading">
                Capital in. Capital out.{" "}
                <span className="text-gold-gradient">Fees settle both sides.</span>
              </h2>
            </div>

            {/* Step nav tabs  --  REV 3 BUG FIX: now glass-treated and visible */}
            <div
              className="proto-steps__nav"
              ref={navRef}
              role="tablist"
              aria-label="Protocol steps"
            >
              {STEPS.map((step, i) => (
                <React.Fragment key={step.number}>
                  <button
                    ref={(el) => { btnRefs.current[i] = el; }}
                    className="pstep-btn"
                    role="tab"
                    aria-selected={activeStep === i ? "true" : "false"}
                    aria-controls={`pstep-panel-${i}`}
                    id={`pstep-tab-${i}`}
                    onClick={() => { activateStep(i); }}
                    type="button"
                  >
                    <span
                      className={`pstep-btn__circle ${activeStep === i ? "pstep-btn__circle--active" : ""}`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`pstep-btn__label ${activeStep === i ? "pstep-btn__label--active" : "pstep-btn__label--inactive"}`}
                    >
                      {step.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="pstep-connector" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step panels */}
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="pstep-panel"
                id={`pstep-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`pstep-tab-${i}`}
                hidden={activeStep !== i}
              >
                <div className="pstep-panel__grid">
                  {/* Asset column */}
                  <div className="pstep-panel__asset-col">
                    <Image
                      src={step.asset}
                      alt={step.assetAlt}
                      width={380}
                      height={380}
                      className="pstep-panel__asset"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Copy column */}
                  <div>
                    <div
                      className="pstep-panel__eyebrow"
                      style={{ color: step.codeColor }}
                    >
                      {step.eyebrow}
                    </div>
                    <h3 className="pstep-panel__heading">{step.heading}</h3>

                    <ul className="pstep-panel__bullets">
                      {step.bullets.map((bullet, bi) => (
                        <li key={bi} className="pstep-panel__bullet">{bullet}</li>
                      ))}
                    </ul>

                    <div
                      className="pstep-panel__code"
                      style={{
                        color: step.codeColor,
                        background: `rgba(${step.codeColor.includes("185") ? "185,160,204" : "254,214,7"},0.04)`,
                      }}
                    >
                      {step.code}
                    </div>

                    <br />
                    <Link href={step.crossLinkHref} className="pstep-panel__crosslink">
                      {step.crossLinkLabel} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
