"use client";
/**
 * LPLifecycle.tsx
 *
 * Client island  --  needs useState + keyboard navigation for the 4-step tab/accordion.
 * Justification for "use client": useState for activeStep, useEffect for keyboard handlers,
 *   useRef for focus management.
 *
 * Design source: lps-design.md Section 4  --  "Deposit to redemption" (4-step stepper)
 * Background: r17-texture-rhythm.png at 20% (canonical structured-mechanism texture)
 * Interaction:
 *   Desktop: horizontal 4-tab nav + panel crossfade (500ms). Keyboard: arrow keys + Home/End.
 *   Mobile: vertical accordion (tap-to-expand), first step expanded by default.
 *   WAI-ARIA: role="tablist" / role="tab" / aria-selected / aria-controls on desktop.
 *   Mobile: <button aria-expanded> pattern.
 * Stepper glass panel: background rgba(10,15,31,0.78), backdrop-filter blur(12px),
 *   border rgba(255,255,255,0.08), border-radius var(--radius-md), padding 48px.
 * Per-step floating assets (ALL REUSE):
 *   Step 1 Deposit:      r21-asset-deposit-pour-transparent.webp
 *   Step 2 Accrue:       r19-asset-yield-curve-wedge-transparent.webp
 *   Step 3 Idle deploys: r19-asset-momentum-wave-transparent.webp
 *   Step 4 Redeem:       r19-asset-redemption-gate-arch-transparent.webp
 * Floating assets: translateY 6-10px / 4-6s ease-in-out. NO rotation. opacity: 1 always.
 * Copy: copy/lps.md Section 4. Present tense. No em dashes.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface LifecycleStep {
  number:   string;
  label:    string;
  tabLabel: string;
  heading:  string;
  body:     string;
  bullet:   string;
  asset:    string;
  floatDur: string;
  glowStyle: React.CSSProperties;
}

const STEPS: LifecycleStep[] = [
  {
    number:   "1",
    label:    "Deposit",
    tabLabel: "Deposit",
    heading:  "USDC in, LP tokens out.",
    body:     "Connect a wallet and specify a USDC amount. The vault refreshes NAV, calculates the current share price, and mints LP tokens to your wallet. The minimum is one USDC. Access is permissionless at the contract level.",
    bullet:   "ERC-20 LP tokens, transferable and redeemable against vault NAV.",
    asset:    "/images/r21-asset-deposit-pour-transparent.webp",
    floatDur: "4.5s",
    glowStyle: {
      background: "radial-gradient(ellipse 900px 500px at 55% 50%, rgba(90,28,203,0.20) 0%, rgba(254,214,7,0.10) 45%, transparent 65%)",
    },
  },
  {
    number:   "2",
    label:    "Accrue",
    tabLabel: "Accrue",
    heading:  "Yield accrues daily, not quarterly.",
    body:     "The LP yield fee accrues to NAV every day the advance is outstanding, not in a lump sum at repayment. LP token value rises continuously. No claim, no harvest, no gas. Staking rewards distribute monthly, aligned with typical borrower repayment cycles.",
    bullet:   "Monthly staking cadence is qualitative. Specific timing is not committed.",
    asset:    "/images/r19-asset-yield-curve-wedge-transparent.webp",
    floatDur: "5s",
    glowStyle: {
      background: "radial-gradient(ellipse 900px 500px at 55% 50%, rgba(90,28,203,0.20) 0%, rgba(254,214,7,0.10) 45%, transparent 65%)",
    },
  },
  {
    number:   "3",
    label:    "Idle deploys",
    tabLabel: "Idle deploys",
    heading:  "Undrawn capital still earns.",
    body:     "USDC not in an active advance goes to Aave for continuous DeFi yield. The position is fully liquid and withdrawable instantly. Borrower demand and DeFi allocation are managed together to keep redemption capacity intact.",
    bullet:   "Deployment protocols are governance-approved and can be rotated.",
    asset:    "/images/r19-asset-momentum-wave-transparent.webp",
    floatDur: "5.5s",
    glowStyle: {
      background: "radial-gradient(ellipse 900px 500px at 55% 50%, rgba(90,28,203,0.20) 0%, rgba(254,214,7,0.10) 45%, transparent 65%)",
    },
  },
  {
    number:   "4",
    label:    "Redeem",
    tabLabel: "Redeem",
    heading:  "Exit through the redemption gates.",
    body:     "Submit a withdrawal request. If the liquid DeFi position covers the amount, the request settles promptly once the gate releases. If not, the request queues FIFO until repayments land. Daily caps and per-request limits apply. The vault never recalls outstanding advances.",
    bullet:   "Settlement timing is qualitative. Wiki phrasing is preserved.",
    asset:    "/images/r19-asset-redemption-gate-arch-transparent.webp",
    floatDur: "6s",
    glowStyle: {
      background: "radial-gradient(ellipse 900px 500px at 55% 50%, rgba(90,28,203,0.20) 0%, rgba(254,214,7,0.10) 45%, transparent 65%)",
    },
  },
];

export function LPLifecycle(): React.JSX.Element {
  const [activeStep, setActiveStep]         = useState<number>(0);
  const [expandedMobile, setExpandedMobile] = useState<number>(0);
  const navRef    = useRef<HTMLDivElement>(null);
  const btnRefs   = useRef<Array<HTMLButtonElement | null>>([]);

  const activateStep = useCallback((idx: number): void => {
    setActiveStep(idx);
  }, []);

  // Keyboard navigation on desktop tablist
  useEffect((): (() => void) => {
    const nav = navRef.current;
    if (!nav) return (): void => {};
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
    return (): void => nav.removeEventListener("keydown", handleKey);
  }, [activateStep]);

  const toggleMobile = useCallback((idx: number): void => {
    setExpandedMobile((prev) => (prev === idx ? -1 : idx));
  }, []);

  return (
    <>
      <style>{`
        /* ---- LP lifecycle  --  4-step stepper ---- */
        .lp-lifecycle {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 80px 0;
        }

        .lp-lifecycle__texture {
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

        .lp-lifecycle__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.88) 0%,
            rgba(10,15,31,0.80) 50%,
            rgba(10,15,31,0.88) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .lp-lifecycle__content {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 1023px) { .lp-lifecycle__content { padding: 0 32px; } }
        @media (max-width: 767px)  { .lp-lifecycle__content { padding: 0 24px; } }

        /* Section header */
        .lp-lifecycle__header {
          max-width: 720px;
          margin-bottom: 48px;
        }

        .lp-lifecycle__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 16px;
        }

        .lp-lifecycle__h2 {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .lp-lifecycle__subhead {
          font-family: var(--font-body-family);
          font-size: 17px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 640px;
          margin: 0;
        }

        /* Glassmorphism stepper panel */
        .lp-lifecycle__glass {
          background: rgba(10,15,31,0.78);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-md, 16px);
          padding: 48px;
          position: relative;
          overflow: hidden;
        }

        /* Nested texture inside the glass panel */
        .lp-lifecycle__glass-texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          z-index: 0;
          opacity: 0.12;
        }

        .lp-lifecycle__glass-inner {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 767px) {
          .lp-lifecycle__glass { padding: 24px; }
        }

        /* Desktop: tab nav row */
        .lp-lifecycle__tab-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0;
          margin-bottom: 40px;
        }

        @media (max-width: 767px) {
          .lp-lifecycle__tab-nav { display: none; }
        }

        /* Tab button */
        .lp-lifecycle__tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .lp-lifecycle__tab-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display-family);
          font-size: 16px;
          font-weight: 600;
          transition: all 300ms cubic-bezier(0.4,0,0.2,1);
          background: rgba(10,15,31,0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .lp-lifecycle__tab-circle--active {
          background: rgba(10,15,31,0.80);
          border: 1px solid rgba(254,214,7,0.5);
          color: var(--ax-capital-yellow, #FED607);
          box-shadow: 0 2px 16px rgba(254,214,7,0.25);
        }

        .lp-lifecycle__tab-circle--inactive {
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--text-secondary);
        }

        .lp-lifecycle__tab-label {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          white-space: nowrap;
          transition: color 300ms;
        }

        .lp-lifecycle__tab-label--active   { color: var(--ax-capital-yellow, #FED607); }
        .lp-lifecycle__tab-label--inactive { color: var(--text-secondary); }

        /* Connector line */
        .lp-lifecycle__connector {
          flex: 0 0 32px;
          height: 2px;
          background: rgba(255,255,255,0.15);
        }

        /* Desktop panel */
        .lp-lifecycle__panel {
          animation: lcFade 500ms ease;
        }

        @keyframes lcFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-lifecycle__panel { animation: none; }
        }

        .lp-lifecycle__panel-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 1023px) {
          .lp-lifecycle__panel-grid { gap: 32px; }
        }

        /* Asset column */
        .lp-lifecycle__asset-col {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .lp-lifecycle__asset-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: var(--radius-md, 16px);
          transition: background 600ms linear;
        }

        .lp-lifecycle__asset {
          position: relative;
          z-index: 1;
          width: 75%;
          max-width: 360px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 40px 80px rgba(90,28,203,0.40));
          opacity: 1;
          /* Static per Pass 5 site-wide rule  --  only hero assets float. */
        }

        /* Copy column */
        .lp-lifecycle__step-label {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 12px;
        }

        .lp-lifecycle__step-h3 {
          font-family: var(--font-display-family);
          font-size: clamp(20px, 2.8vw, 28px);
          font-weight: 400;
          line-height: 1.2;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .lp-lifecycle__step-body {
          font-family: var(--font-body-family);
          font-size: 15px;
          line-height: 1.65;
          color: var(--text-secondary);
          margin: 0 0 20px 0;
        }

        .lp-lifecycle__step-bullet {
          font-family: var(--font-body-family);
          font-size: 13px;
          line-height: 1.5;
          color: var(--text-secondary);
          padding: 10px 14px;
          background: rgba(254,214,7,0.04);
          border-left: 2px solid rgba(254,214,7,0.4);
          border-radius: 0 var(--radius-sm, 8px) var(--radius-sm, 8px) 0;
        }

        /* Mobile: accordion (hidden on desktop) */
        .lp-lifecycle__accordion {
          display: none;
        }

        @media (max-width: 767px) {
          .lp-lifecycle__accordion { display: block; }
          .lp-lifecycle__desktop-panels { display: none; }
        }

        .lp-lifecycle__accordion-item {
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .lp-lifecycle__accordion-item:last-child {
          border-bottom: none;
        }

        .lp-lifecycle__accordion-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        .lp-lifecycle__accordion-num {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display-family);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          flex-shrink: 0;
          transition: all 250ms;
        }

        .lp-lifecycle__accordion-num--expanded {
          border-color: rgba(254,214,7,0.5);
          color: var(--ax-capital-yellow, #FED607);
          background: rgba(10,15,31,0.80);
        }

        .lp-lifecycle__accordion-title {
          font-family: var(--font-display-family);
          font-size: 15px;
          font-weight: 500;
          color: var(--text-primary);
          flex: 1;
          letter-spacing: 0.5px;
        }

        .lp-lifecycle__accordion-chevron {
          color: var(--text-secondary);
          transition: transform 250ms ease;
          flex-shrink: 0;
        }

        .lp-lifecycle__accordion-chevron--open {
          transform: rotate(180deg);
        }

        .lp-lifecycle__accordion-body {
          padding-bottom: 24px;
          padding-left: 52px;
        }

        .lp-lifecycle__accordion-asset {
          width: 180px;
          height: 180px;
          object-fit: contain;
          display: block;
          margin: 0 auto 20px;
          filter: drop-shadow(0 20px 40px rgba(90,28,203,0.38));
          opacity: 1;
        }
      `}</style>

      <section
        className="lp-lifecycle"
        id="lifecycle"
        aria-labelledby="lp-lifecycle-heading"
      >
        <Image
          src="/images/r17-texture-rhythm.png"
          alt="" aria-hidden="true"
          fill
          sizes="(max-width: 767px) 50vw, 540px"
          quality={60}
          className="lp-lifecycle__texture"
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
        <div className="lp-lifecycle__overlay" aria-hidden="true" />

        <div className="lp-lifecycle__content">

          <div className="lp-lifecycle__header">
            <div className="lp-lifecycle__eyebrow">The lifecycle</div>
            <h2 id="lp-lifecycle-heading" className="lp-lifecycle__h2">
              From deposit{" "}
              <span className="text-gold-gradient">to redemption.</span>
            </h2>
            <p className="lp-lifecycle__subhead">
              Four steps, one continuous flow. Capital earns the whole time it is in the vault, whether it is drawn by a borrower or deployed to DeFi. Redemption passes through gates that protect the remaining LPs.
            </p>
          </div>

          {/* Glassmorphism stepper panel */}
          <div className="lp-lifecycle__glass">
            <Image
              src="/images/r17-texture-rhythm.png"
              alt="" aria-hidden="true"
              fill
              sizes="1280px"
              quality={60}
              className="lp-lifecycle__glass-texture"
              style={{ objectFit: "cover" }}
            />
            <div className="lp-lifecycle__glass-inner">

              {/* Desktop: tab nav */}
              <div
                className="lp-lifecycle__tab-nav"
                ref={navRef}
                role="tablist"
                aria-label="LP lifecycle steps"
              >
                {STEPS.map((step, i) => (
                  <React.Fragment key={step.number}>
                    <button
                      ref={(el): void => { btnRefs.current[i] = el; }}
                      className="lp-lifecycle__tab"
                      role="tab"
                      aria-selected={activeStep === i ? "true" : "false"}
                      aria-controls={`lc-panel-${i}`}
                      id={`lc-tab-${i}`}
                      onClick={(): void => { activateStep(i); }}
                      type="button"
                    >
                      <span
                        className={`lp-lifecycle__tab-circle ${
                          activeStep === i
                            ? "lp-lifecycle__tab-circle--active"
                            : "lp-lifecycle__tab-circle--inactive"
                        }`}
                      >
                        {step.number}
                      </span>
                      <span
                        className={`lp-lifecycle__tab-label ${
                          activeStep === i
                            ? "lp-lifecycle__tab-label--active"
                            : "lp-lifecycle__tab-label--inactive"
                        }`}
                      >
                        {step.tabLabel}
                      </span>
                    </button>
                    {i < STEPS.length - 1 && (
                      <div className="lp-lifecycle__connector" aria-hidden="true" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Desktop: active panel */}
              <div className="lp-lifecycle__desktop-panels">
                {STEPS.map((step, i) => (
                  <div
                    key={step.number}
                    className="lp-lifecycle__panel"
                    id={`lc-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`lc-tab-${i}`}
                    hidden={activeStep !== i}
                  >
                    <div className="lp-lifecycle__panel-grid">
                      <div className="lp-lifecycle__asset-col">
                        <div
                          className="lp-lifecycle__asset-glow"
                          style={step.glowStyle}
                          aria-hidden="true"
                        />
                        <Image
                          src={step.asset}
                          alt="" aria-hidden="true"
                          width={360}
                          height={360}
                          className="lp-lifecycle__asset"
                          style={{ "--lc-float-dur": step.floatDur } as React.CSSProperties}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div>
                        <div className="lp-lifecycle__step-label">
                          Step 0{step.number} &middot; {step.label}
                        </div>
                        <h3 className="lp-lifecycle__step-h3">{step.heading}</h3>
                        <p className="lp-lifecycle__step-body">{step.body}</p>
                        <div className="lp-lifecycle__step-bullet">{step.bullet}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile: accordion */}
              <div
                className="lp-lifecycle__accordion"
                aria-label="LP lifecycle steps"
              >
                {STEPS.map((step, i) => {
                  const isOpen = expandedMobile === i;
                  return (
                    <div key={step.number} className="lp-lifecycle__accordion-item">
                      <button
                        className="lp-lifecycle__accordion-trigger"
                        type="button"
                        aria-expanded={isOpen ? "true" : "false"}
                        aria-controls={`lc-accordion-${i}`}
                        onClick={(): void => { toggleMobile(i); }}
                      >
                        <span
                          className={`lp-lifecycle__accordion-num ${
                            isOpen ? "lp-lifecycle__accordion-num--expanded" : ""
                          }`}
                        >
                          {step.number}
                        </span>
                        <span className="lp-lifecycle__accordion-title">
                          {step.tabLabel}
                        </span>
                        <svg
                          className={`lp-lifecycle__accordion-chevron ${
                            isOpen ? "lp-lifecycle__accordion-chevron--open" : ""
                          }`}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <div
                          id={`lc-accordion-${i}`}
                          className="lp-lifecycle__accordion-body"
                        >
                          <Image
                            src={step.asset}
                            alt="" aria-hidden="true"
                            width={180}
                            height={180}
                            className="lp-lifecycle__accordion-asset"
                            loading="lazy"
                            decoding="async"
                          />
                          <p className="lp-lifecycle__step-body">{step.body}</p>
                          <div className="lp-lifecycle__step-bullet">{step.bullet}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

      </section>
    </>
  );
}
