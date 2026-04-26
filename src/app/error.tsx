"use client";
// "use client" is required  --  error boundaries must be Client Components.
// Justification: Next.js Error Boundary API requires client-side state and
// event handlers (useEffect for logging, unstable_retry() for recovery).

/**
 * app/error.tsx
 *
 * Root error boundary  --  catches runtime errors in any route segment.
 *
 * In Next.js 16, the recovery function is `unstable_retry` (not `reset`).
 * Replace placeholder styles with actual brand design from DESIGN.md.
 */

import { useEffect } from "react";
import { BUSINESS_NAME } from "@/lib/site-config";

interface ErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function Error({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "96px 24px",
        textAlign: "center",
        background: "var(--ax-fortress, #0A0F1F)",
        fontFamily: "var(--font-body-family, system-ui, sans-serif)",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display-family, system-ui)",
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ax-capital-yellow, #FED607)",
          marginBottom: "1rem",
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body-family, system-ui)",
          color: "var(--ax-ether-mist, #B9A0CC)",
          maxWidth: "480px",
          lineHeight: "1.6",
          marginBottom: "2rem",
        }}
      >
        An unexpected error occurred on the {BUSINESS_NAME} website. Please try
        again. If the problem persists, contact us directly.
      </p>
      <button
        onClick={unstable_retry}
        style={{
          padding: "12px 24px",
          background: "transparent",
          border: "1px solid rgba(254, 214, 7, 0.3)",
          borderRadius: "6px",
          color: "var(--ax-capital-yellow, #FED607)",
          fontFamily: "var(--font-display-family, system-ui)",
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
