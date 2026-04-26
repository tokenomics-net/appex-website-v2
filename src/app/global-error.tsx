"use client";
// "use client" required -- global-error.tsx replaces the root layout on crash,
// so it must be a Client Component and must render its own <html>/<body>.
// Justification: useEffect for logging, unstable_retry() for recovery (Next.js 16 API).

/**
 * app/global-error.tsx
 *
 * Catches errors that escape the root layout itself (font load failures,
 * schema generation errors, anything thrown before <main> renders).
 *
 * This replaces the entire document on crash -- it must include <html> and <body>.
 * Brand colors are inlined as literals because CSS variables from globals.css
 * are not available when the root layout has crashed.
 *
 * appeX brand: navy #0A0F1F background, gold #FED607 accent, mist #B9A0CC body text.
 */

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function GlobalError({ error, unstable_retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: "96px 24px",
          background: "#0A0F1F",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          gap: "24px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#FED607",
          }}
        >
          Something went wrong
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "15px",
            lineHeight: 1.6,
            color: "#B9A0CC",
            maxWidth: "480px",
          }}
        >
          An unexpected error occurred. Refresh the page -- if the problem persists,
          reach out at support@appex.finance.
        </p>
        <button
          onClick={unstable_retry}
          style={{
            padding: "12px 28px",
            background: "transparent",
            border: "1px solid rgba(254, 214, 7, 0.35)",
            borderRadius: "6px",
            color: "#FED607",
            fontSize: "13px",
            cursor: "pointer",
            letterSpacing: "0.04em",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
