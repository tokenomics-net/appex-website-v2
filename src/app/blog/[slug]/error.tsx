"use client";
// "use client" required -- Next.js Error Boundary API requires client-side state.
// Justification: useEffect for logging, unstable_retry() for recovery (Next.js 16 API).

import { useEffect } from "react";
import Link from "next/link";

// Next.js 16 uses unstable_retry, not reset.
// reset existed in Next.js 13-15. Using reset here causes a TypeError in production
// because the prop is undefined -- the "Try again" button silently does nothing
// (or crashes the error boundary itself).
interface ErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function PostError({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "96px 24px",
        background: "var(--ax-fortress, #0A0F1F)",
        textAlign: "center",
        gap: "24px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display-family, system-ui)",
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ax-capital-yellow, #FED607)",
          opacity: 0.9,
        }}
      >
        Something went wrong
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
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
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "12px 24px",
            background: "transparent",
            border: "1px solid rgba(254, 214, 7, 0.3)",
            borderRadius: "6px",
            color: "var(--ax-capital-yellow, #FED607)",
            fontFamily: "var(--font-display-family, system-ui)",
            fontSize: "13px",
            textDecoration: "none",
          }}
        >
          Back to all posts
        </Link>
      </div>
    </div>
  );
}
