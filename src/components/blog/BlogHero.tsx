/**
 * BlogHero.tsx
 *
 * Server Component  --  no client interactivity.
 * Justification: static layout, CSS keyframe animations only.
 *
 * Design source: blog-design.md §S1 Blog hero
 * Copy source: copy/blog.md §Section 1
 *
 * Compact 50-60vh statement hero. Scene background (r21-scene-solution-chamber.webp at 35%).
 * Single-column hero: eyebrow + H1 + subhead. CategoryFilter sticky band handles filtering.
 */

import Image from "next/image";
import type React from "react";

export function BlogHero(): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ── Blog Hero ─────────────────────────────────────────────── */
        .blog-hero {
          position: relative;
          width: 100%;
          min-height: 480px;
          max-height: 560px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          background: var(--ax-fortress, #0A0F1F);
          padding: 96px 0 64px;
        }
        @media (max-width: 767px) {
          .blog-hero {
            padding: 80px 0 48px;
            min-height: 400px;
            max-height: none;
            align-items: flex-start;
          }
        }

        .blog-hero__scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          pointer-events: none;
          z-index: 0;
          opacity: 0.35;
        }

        /* Gradient layers */
        .blog-hero__overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            radial-gradient(ellipse 1800px 120px at 50% 100%, rgba(254,214,7,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 1200px 400px at 50% 0%, rgba(90,28,203,0.18) 0%, transparent 70%),
            linear-gradient(180deg, rgba(10,15,31,0.90) 0%, rgba(10,15,31,0.78) 40%, rgba(10,15,31,0.94) 100%);
          pointer-events: none;
        }

        .blog-hero__inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: var(--section-max-width, 1280px);
          margin: 0 auto;
          padding: 0 48px;
        }
        @media (max-width: 1279px) { .blog-hero__inner { padding: 0 32px; } }
        @media (max-width: 767px)  { .blog-hero__inner { padding: 0 16px; } }

        /* Left column */
        .blog-hero__eyebrow {
          font-family: var(--font-display-family, system-ui);
          font-size: 14px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--ax-capital-yellow, #FED607);
          opacity: 0.55;
          margin-bottom: 20px;
        }

        .blog-hero__h1 {
          font-family: var(--font-display-family, system-ui);
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 400;
          line-height: 1.05;
          color: rgba(255,255,255,0.92);
          margin-bottom: 24px;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5), 0 2px 24px rgba(0,0,0,0.3);
        }

        .blog-hero__subhead {
          font-family: var(--font-body-family, system-ui);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.55;
          color: var(--ax-text-secondary, rgba(185,160,204,0.78));
          max-width: 540px;
        }


      `}</style>

      <section id="blog-hero" className="blog-hero" aria-label="Blog publication header">
        {/* Layer 0: texture */}
        <Image
          src="/images/r21-scene-solution-chamber.webp"
          alt="" aria-hidden="true"
          fill
          className="blog-hero__scene"
          priority
        />

        {/* Gradient overlay */}
        <div className="blog-hero__overlay" aria-hidden="true" />

        <div className="blog-hero__inner">
          {/* Left: copy */}
          <div>
            <p className="blog-hero__eyebrow">Publication</p>
            <h1 className="blog-hero__h1">
              Research.{" "}
              <br />
              Protocol.{" "}
              <br />
              <span className="text-gold-gradient">Markets.</span>
            </h1>
            <p className="blog-hero__subhead">
Protocol research, LP and borrower guides, market writing, and security notes published by the appeX Protocol. On the record.
            </p>
          </div>


        </div>
      </section>
    </>
  );
}
