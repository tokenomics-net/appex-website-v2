"use client";
/**
 * RiskCarousel.tsx
 *
 * Client island  --  featured slideshow, image-left/copy-right split.
 * Justification for "use client": useState for activeSlide, useEffect for
 *   auto-advance interval + keyboard listener, useCallback for prev/next/swipe handlers.
 *
 * Design source: protocol-design.md Section 7 + user spec (image-left, copy-right slideshow)
 * Layout: ONE slide visible at a time  --  left column 3D asset, right column heading + body.
 *   Prev/next arrows. Dot indicators. Auto-advance 6s, pauses on hover/interaction.
 *   Keyboard: left/right arrows. Swipe: touch left/right on mobile.
 *   Mobile: single column stack (image top, copy below).
 * Background: r23-scene-trust.webp at 100% opacity + tint overlay
 * Glass panel: wraps image+copy split for legibility against the scene
 * Image animation: translateY float only. No rotation, no spin.
 * Copy: protocol.md Section 7 card content. PRESENT TENSE. No em dashes.
 */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import Link from "next/link";

interface RiskSlide {
  id:       string;
  asset:    string;
  assetAlt: string;
  heading:  string;
  body:     string;
}

// Card content from protocol.md Section 7 + brief image mapping.
// Images: -transparent.webp variants per user spec.
const RISK_SLIDES: RiskSlide[] = [
  {
    id:       "vault-isolated",
    asset:    "/images/r23-card-isolated.png",
    assetAlt: "Three separated vault chamber forms showing physical isolation",
    heading:  "Vaults are isolated.",
    body:     "Losses in one vault do not affect others. Borrower relationship is with the vault, not downstream customers. LP complexity is minimized to a single decision: deposit and earn.",
  },
  {
    id:       "borrower-risk",
    asset:    "/images/r23-card-risk-transfer.png",
    assetAlt: "Scale and balance form showing risk transfer to the borrower",
    heading:  "Borrowers carry the risk.",
    body:     "The borrower repays even if their own customer fails to pay. That is the risk transfer that protects LPs. The vault never chases downstream counterparties.",
  },
  {
    id:       "capital-recycles",
    asset:    "/images/r23-card-capital-cycle.png",
    assetAlt: "Torus loop form showing circular capital flow",
    heading:  "Capital recycles.",
    body:     "At 90-day average payment terms, capital turns approximately 4 times per year. Higher utilization means compounding returns without requiring new deposits.",
  },
  {
    id:       "transparent-design",
    asset:    "/images/r23-card-transparent.webp",
    assetAlt: "Open vault form with visible internals representing on-chain transparency",
    heading:  "Transparent by design.",
    body:     "Every vault operates independently with its own liquidity pool, fee structure, and market. The protocol does not take custody of user funds beyond the vault contract.",
  },
  {
    id:       "permissionless",
    asset:    "/images/r19-asset-security-seal-obelisk-transparent.webp",
    assetAlt: "Security seal obelisk form representing contract-level permissionless access",
    heading:  "Permissionless at the contract level.",
    body:     "Borrower onboarding follows the published risk framework. The vault does not take custody beyond the contract.",
  },
];

const AUTO_ADVANCE_MS   = 6000;
const TRANSITION_MS     = 350;
const MIN_SWIPE_PX      = 40;

export function RiskCarousel(): React.JSX.Element {
  const [activeSlide, setActiveSlide]   = useState<number>(0);
  const [isExiting, setIsExiting]       = useState<boolean>(false);
  const [exitDir, setExitDir]           = useState<"left" | "right">("left");

  const isHoveredRef  = useRef<boolean>(false);
  const autoRef       = useRef<ReturnType<typeof setInterval> | null>(null);
  const restartRef    = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const touchStartX   = useRef<number>(0);
  const touchStartY   = useRef<number>(0);
  const hasInteracted = useRef<boolean>(false);

  // --- Navigation helpers ---

  const clearAuto = useCallback((): void => {
    if (autoRef.current)    clearInterval(autoRef.current);
    if (restartRef.current) clearTimeout(restartRef.current);
  }, []);

  const startAuto = useCallback((): void => {
    autoRef.current = setInterval((): void => {
      if (!isHoveredRef.current && !hasInteracted.current) {
        setExitDir("left");
        setIsExiting(true);
        setTimeout((): void => {
          setActiveSlide((prev) => (prev + 1) % RISK_SLIDES.length);
          setIsExiting(false);
        }, TRANSITION_MS);
      }
    }, AUTO_ADVANCE_MS);
  }, []);

  const goTo = useCallback((idx: number, direction: "left" | "right"): void => {
    clearAuto();
    hasInteracted.current = true;
    setExitDir(direction);
    setIsExiting(true);
    setTimeout((): void => {
      setActiveSlide(idx);
      setIsExiting(false);
    }, TRANSITION_MS);
    // Resume auto-advance after 6s of inactivity
    restartRef.current = setTimeout((): void => {
      hasInteracted.current = false;
      startAuto();
    }, AUTO_ADVANCE_MS);
  }, [clearAuto, startAuto]);

  const prev = useCallback((): void => {
    const idx = (activeSlide - 1 + RISK_SLIDES.length) % RISK_SLIDES.length;
    goTo(idx, "right");
  }, [activeSlide, goTo]);

  const next = useCallback((): void => {
    const idx = (activeSlide + 1) % RISK_SLIDES.length;
    goTo(idx, "left");
  }, [activeSlide, goTo]);

  // Auto-advance on mount
  useEffect((): (() => void) => {
    startAuto();
    return clearAuto;
  }, [startAuto, clearAuto]);

  // Keyboard navigation
  useEffect((): (() => void) => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return (): void => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Touch swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent): void => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent): void => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    if (Math.abs(dx) < MIN_SWIPE_PX || dy > Math.abs(dx)) return;
    if (dx > 0) next();
    else        prev();
  }, [next, prev]);

  const handleMouseEnter = useCallback((): void => {
    isHoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback((): void => {
    isHoveredRef.current = false;
  }, []);

  const slide = RISK_SLIDES[activeSlide];

  return (
    <>
      <style>{`
        /* ---- Risk carousel  --  image-left / copy-right slideshow ---- */
        .risk-slideshow {
          position: relative;
          overflow: hidden;
          background: var(--ax-fortress);
          padding: 96px 0;
        }

        @media (max-width: 767px) {
          .risk-slideshow { padding: 56px 0; }
        }

        /* Layer 0: r23-scene-trust.webp at 100% opacity */
        .risk-slideshow__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          pointer-events: none;
          z-index: 0;
        }

        /* Layer 1: tint overlay */
        .risk-slideshow__tint {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg,
            rgba(10,15,31,0.50) 0%,
            rgba(10,15,31,0.35) 50%,
            rgba(10,15,31,0.55) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Layer 2: top hairline */
        .risk-slideshow__hairline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(254,214,7,0.14);
          pointer-events: none;
          z-index: 2;
        }

        /* Content wrapper */
        .risk-slideshow__content {
          position: relative;
          z-index: 3;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }

        @media (max-width: 767px) {
          .risk-slideshow__content { padding: 0 24px; }
        }

        /* Section header */
        .risk-slideshow__header {
          text-align: center;
          margin-bottom: 56px;
        }

        .risk-slideshow__eyebrow {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--ax-capital-yellow);
          opacity: 0.55;
          margin-bottom: 14px;
        }

        .risk-slideshow__heading {
          font-family: var(--font-display-family);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 14px;
        }

        .risk-slideshow__subhead {
          font-family: var(--font-body-family);
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 520px;
          margin: 0 auto;
        }

        /* --- Slideshow stage: arrow + panel + arrow --- */
        .risk-slideshow__stage {
          display: grid;
          grid-template-columns: 48px 1fr 48px;
          align-items: center;
          gap: 16px;
        }

        @media (max-width: 767px) {
          .risk-slideshow__stage {
            grid-template-columns: 36px 1fr 36px;
            gap: 8px;
          }
        }

        /* Arrow buttons */
        .risk-slideshow__arrow {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(10,15,31,0.60);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 250ms ease, border-color 250ms ease, transform 200ms ease;
          flex-shrink: 0;
        }

        .risk-slideshow__arrow:hover {
          background: rgba(90,28,203,0.30);
          border-color: rgba(90,28,203,0.50);
          transform: scale(1.08);
        }

        .risk-slideshow__arrow:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
        }

        .risk-slideshow__arrow:active {
          transform: scale(0.96);
        }

        @media (max-width: 767px) {
          .risk-slideshow__arrow {
            width: 36px;
            height: 36px;
          }
        }

        .risk-slideshow__arrow svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        @media (max-width: 767px) {
          .risk-slideshow__arrow svg {
            width: 14px;
            height: 14px;
          }
        }

        /* Glass panel */
        .risk-slideshow__panel {
          background: rgba(10,15,31,0.68);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: var(--radius-lg, 20px);
          overflow: hidden;
          display: grid;
          grid-template-columns: 380px 1fr;
          min-height: 380px;
          position: relative;
        }

        @media (max-width: 1023px) {
          .risk-slideshow__panel {
            grid-template-columns: 300px 1fr;
          }
        }

        @media (max-width: 767px) {
          .risk-slideshow__panel {
            grid-template-columns: 1fr;
            min-height: auto;
          }
        }

        /* Panel: slide transition */
        .risk-slideshow__panel--exiting-left {
          animation: slideExitLeft var(--transition-ms, 350ms) ease forwards;
        }

        .risk-slideshow__panel--exiting-right {
          animation: slideExitRight var(--transition-ms, 350ms) ease forwards;
        }

        .risk-slideshow__panel--entering {
          animation: slideEnter var(--transition-ms, 350ms) ease forwards;
        }

        @keyframes slideExitLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-32px); }
        }

        @keyframes slideExitRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(32px); }
        }

        @keyframes slideEnter {
          from { opacity: 0; transform: translateX(0) scale(0.98); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .risk-slideshow__panel--exiting-left,
          .risk-slideshow__panel--exiting-right,
          .risk-slideshow__panel--entering {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }

        /* Left column: image zone */
        .risk-slideshow__image-col {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
          border-right: 1px solid rgba(255,255,255,0.07);
          background: rgba(90,28,203,0.06);
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 767px) {
          .risk-slideshow__image-col {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            padding: 36px 24px;
          }
        }

        /* Ambient glow behind the asset */
        .risk-slideshow__image-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 70% at 50% 50%,
            rgba(90,28,203,0.18) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        /* Float animation: translateY only, no rotation */
        .risk-slideshow__asset {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 320px;
          height: auto;
          filter:
            drop-shadow(0 8px 32px rgba(90,28,203,0.22))
            drop-shadow(0 16px 48px rgba(0,0,0,0.35));
          /* STATIC per Pass 6 site-wide float rule  --  only hero assets float */
        }

        @media (max-width: 767px) {
          .risk-slideshow__asset { max-width: 200px; }
        }

        /* Right column: copy zone */
        .risk-slideshow__copy-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 52px 48px;
          gap: 20px;
        }

        @media (max-width: 1023px) {
          .risk-slideshow__copy-col { padding: 40px 32px; }
        }

        @media (max-width: 767px) {
          .risk-slideshow__copy-col { padding: 32px 28px; }
        }

        .risk-slideshow__slide-count {
          font-family: var(--font-display-family);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          color: var(--ax-capital-yellow);
          opacity: 0.50;
          text-transform: uppercase;
        }

        .risk-slideshow__slide-heading {
          font-family: var(--font-display-family);
          font-size: clamp(24px, 3.5vw, 38px);
          font-weight: 400;
          line-height: 1.15;
          color: var(--text-primary);
          margin: 0;
        }

        .risk-slideshow__slide-body {
          font-family: var(--font-body-family);
          font-size: 16px;
          line-height: 1.7;
          color: var(--text-secondary);
          margin: 0;
          max-width: 480px;
        }

        /* --- Dot indicators --- */
        .risk-slideshow__dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 28px;
        }

        .risk-slideshow__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.22);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 300ms ease, transform 300ms ease, width 300ms ease;
        }

        .risk-slideshow__dot--active {
          background: var(--ax-capital-yellow);
          transform: scale(1.35);
          width: 20px;
          border-radius: 4px;
        }

        .risk-slideshow__dot:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
        }

        /* Closing link */
        .risk-slideshow__cta {
          text-align: center;
          margin-top: 32px;
        }

        .risk-slideshow__cta-link {
          font-family: var(--font-body-family);
          font-size: 14px;
          color: var(--ax-capital-yellow);
          opacity: 0.70;
          text-decoration: none;
          transition: opacity 200ms ease;
        }

        .risk-slideshow__cta-link:hover {
          opacity: 1;
          text-decoration: underline;
        }

        .risk-slideshow__cta-link:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
        }
      `}</style>

      <section
        className="risk-slideshow"
        id="risk-velocity"
        aria-labelledby="risk-slideshow-heading"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Scene: r23-scene-trust.webp at 100% */}
        <Image
          src="/images/r23-scene-trust.webp"
          alt="" aria-hidden="true"
          fill
          className="risk-slideshow__scene"
          style={{ objectFit: "cover" }}
          loading="lazy"
          decoding="async"
        />
        <div className="risk-slideshow__tint"    aria-hidden="true" />
        <div className="risk-slideshow__hairline" aria-hidden="true" />

        <div className="risk-slideshow__content">
          {/* Section header */}
          <div className="risk-slideshow__header">
            <div className="risk-slideshow__eyebrow">Risk framework</div>
            <h2 id="risk-slideshow-heading" className="risk-slideshow__heading">
              Risk &amp;{" "}
              <span className="text-gold-gradient">Transparency.</span>
            </h2>
          </div>

          {/* Slideshow stage */}
          <div
            className="risk-slideshow__stage"
            aria-label="Risk framework slideshow"
          >
            {/* Prev arrow */}
            <button
              className="risk-slideshow__arrow"
              type="button"
              onClick={prev}
              aria-label="Previous slide"
            >
              <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Glass panel */}
            <div
              className={`risk-slideshow__panel${isExiting ? ` risk-slideshow__panel--exiting-${exitDir}` : " risk-slideshow__panel--entering"}`}
              role="region"
              aria-label={`Slide ${activeSlide + 1} of ${RISK_SLIDES.length}: ${slide.heading}`}
              aria-live="polite"
              aria-atomic="true"
            >
              {/* Left: image */}
              <div className="risk-slideshow__image-col">
                <div className="risk-slideshow__image-glow" aria-hidden="true" />
                <Image
                  src={slide.asset}
                  alt={slide.assetAlt}
                  width={320}
                  height={320}
                  className="risk-slideshow__asset"
                  loading={activeSlide === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>

              {/* Right: copy */}
              <div className="risk-slideshow__copy-col">
                <div className="risk-slideshow__slide-count" aria-hidden="true">
                  {String(activeSlide + 1).padStart(2, "0")} / {String(RISK_SLIDES.length).padStart(2, "0")}
                </div>
                <h3 className="risk-slideshow__slide-heading">
                  {slide.heading}
                </h3>
                <p className="risk-slideshow__slide-body">
                  {slide.body}
                </p>
              </div>
            </div>

            {/* Next arrow */}
            <button
              className="risk-slideshow__arrow"
              type="button"
              onClick={next}
              aria-label="Next slide"
            >
              <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          <div
            className="risk-slideshow__dots"
            role="tablist"
            aria-label="Navigate risk slides"
          >
            {RISK_SLIDES.map((s, i) => (
              <button
                key={s.id}
                className={`risk-slideshow__dot${activeSlide === i ? " risk-slideshow__dot--active" : ""}`}
                type="button"
                role="tab"
                aria-selected={activeSlide === i ? "true" : "false"}
                aria-label={`Slide ${i + 1}: ${s.heading}`}
                onClick={(): void => {
                  const dir = i > activeSlide ? "left" : "right";
                  goTo(i, dir);
                }}
              />
            ))}
          </div>

          {/* Closing link */}
          <div className="risk-slideshow__cta">
            <Link
              href="https://docs.appex.finance"
              className="risk-slideshow__cta-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the risk framework &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
