/**
 * components/legal/LegalLayout.tsx
 *
 * Shared layout wrapper for all legal/policy pages: /privacy, /terms, /cookies.
 * Server Component  --  no interactivity needed.
 *
 * Design: 720px max-width column, Hubot Sans body text, Tektur headings,
 * brand token colors only. Back-to-home link at top. Pending-highlight
 * pattern renders [TO CONFIRM] spans as <mark class="pending"> with yellow
 * highlight so Tony can see what needs client confirmation.
 *
 * Usage: wrap the page content in <LegalLayout title="..." backLabel="...">
 *   {children}
 * </LegalLayout>
 */

import Link from "next/link";
import type { ReactNode } from "react";

interface LegalLayoutProps {
  title:    string;
  children: ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps): React.JSX.Element {
  return (
    <>
      <style>{`
        /* ---- Legal page layout ---- */
        .legal-page {
          min-height: 100vh;
          background: var(--ax-fortress);
          padding: 80px 24px 120px;
        }

        .legal-page__inner {
          max-width: 720px;
          margin: 0 auto;
        }

        /* Back link */
        .legal-page__back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body-family);
          font-size: 13px;
          font-weight: 500;
          color: var(--ax-ether-mist);
          text-decoration: none;
          opacity: 0.75;
          margin-bottom: 40px;
          transition: opacity 180ms ease, color 180ms ease;
        }

        .legal-page__back:hover {
          opacity: 1;
          color: var(--ax-capital-yellow);
        }

        .legal-page__back:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 3px;
          border-radius: 3px;
        }

        /* Page title */
        .legal-page__title {
          font-family: var(--font-display-family);
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 400;
          line-height: 1.1;
          color: var(--ax-text-primary);
          margin: 0 0 8px;
        }

        .legal-page__effective {
          font-family: var(--font-body-family);
          font-size: 13px;
          color: var(--ax-text-tertiary);
          margin: 0 0 48px;
        }

        /* Divider under title */
        .legal-page__divider {
          height: 1px;
          background: var(--ax-fortress-border);
          margin-bottom: 48px;
        }

        /* --- Prose typography --- */
        .legal-prose {
          font-family: var(--font-body-family);
          font-size: 16px;
          line-height: 1.75;
          color: var(--ax-text-secondary);
        }

        .legal-prose h2 {
          font-family: var(--font-display-family);
          font-size: clamp(18px, 2.5vw, 22px);
          font-weight: 500;
          color: var(--ax-text-primary);
          margin: 48px 0 16px;
          line-height: 1.25;
          border-bottom: 1px solid var(--ax-fortress-border);
          padding-bottom: 10px;
        }

        .legal-prose h2:first-child {
          margin-top: 0;
        }

        .legal-prose p {
          margin: 0 0 18px;
        }

        .legal-prose ul,
        .legal-prose ol {
          margin: 0 0 18px;
          padding-left: 22px;
        }

        .legal-prose li {
          margin-bottom: 6px;
        }

        .legal-prose a {
          color: var(--ax-capital-yellow);
          text-decoration: underline;
          text-decoration-color: rgba(254,214,7,0.40);
          text-underline-offset: 3px;
          transition: text-decoration-color 180ms ease;
        }

        .legal-prose a:hover {
          text-decoration-color: var(--ax-capital-yellow);
        }

        .legal-prose a:focus-visible {
          outline: 2px solid var(--ax-capital-yellow);
          outline-offset: 2px;
          border-radius: 2px;
        }

        .legal-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 0 0 24px;
          font-size: 14px;
        }

        .legal-prose th {
          text-align: left;
          font-family: var(--font-display-family);
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ax-text-tertiary);
          padding: 10px 12px;
          border-bottom: 1px solid var(--ax-fortress-border);
        }

        .legal-prose td {
          padding: 12px 12px;
          border-bottom: 1px solid rgba(26,34,64,0.6);
          vertical-align: top;
        }

        .legal-prose code {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 13px;
          background: rgba(90,28,203,0.12);
          color: var(--ax-glint-yellow);
          padding: 2px 6px;
          border-radius: 4px;
        }

        /* ---- Pending-highlight: [TO CONFIRM] items ---- */
        /*
         * Renders [TO CONFIRM: some text] as a yellow-highlighted inline span.
         * Tony sees what needs client confirmation. When confirmed, swap the string.
         */
        .legal-prose .pending {
          display: inline-block;
          background: rgba(254,214,7,0.18);
          border: 1px solid rgba(254,214,7,0.45);
          border-radius: 3px;
          padding: 1px 6px;
          font-family: var(--font-body-family);
          font-size: 0.9em;
          font-style: italic;
          color: var(--ax-capital-yellow);
          white-space: nowrap;
        }

        /* Footer note at bottom of legal page */
        .legal-page__footer-note {
          margin-top: 64px;
          padding-top: 24px;
          border-top: 1px solid var(--ax-fortress-border);
          font-family: var(--font-body-family);
          font-size: 13px;
          color: var(--ax-text-tertiary);
        }

        @media (max-width: 640px) {
          .legal-page {
            padding: 60px 20px 80px;
          }

          .legal-prose table {
            font-size: 13px;
          }

          .legal-prose th,
          .legal-prose td {
            padding: 8px 8px;
          }
        }
      `}</style>

      <article className="legal-page">
        <div className="legal-page__inner">
          {/* Back to home */}
          <Link href="/" className="legal-page__back" aria-label="Back to appeX homepage">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            appeX Protocol
          </Link>

          <h1 className="legal-page__title">{title}</h1>
          <p className="legal-page__effective">Effective date: April 17, 2026</p>
          <div className="legal-page__divider" aria-hidden="true" />

          <div className="legal-prose">
            {children}
          </div>

          <div className="legal-page__footer-note">
            Questions: <a href="mailto:support@appex.finance">support@appex.finance</a>
          </div>
        </div>
      </article>
    </>
  );
}
