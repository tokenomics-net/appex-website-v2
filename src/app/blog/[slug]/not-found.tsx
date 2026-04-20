/**
 * app/blog/[slug]/not-found.tsx
 *
 * 404 state for /blog/[slug]  --  unknown slug.
 * Copy source: copy/blog.md §Empty states §Slug-not-found
 */

import Link from "next/link";

export default function PostNotFound() {
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
        gap: "16px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display-family, system-ui)",
          fontSize: "11px",
          fontWeight: 400,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "var(--ax-capital-yellow, #FED607)",
          opacity: 0.55,
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display-family, system-ui)",
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 400,
          lineHeight: 1.1,
          color: "rgba(255, 255, 255, 0.92)",
          margin: 0,
        }}
      >
        This post is not in the archive.
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body-family, system-ui)",
          fontSize: "17px",
          lineHeight: 1.6,
          color: "rgba(185, 160, 204, 0.78)",
          maxWidth: "480px",
        }}
      >
        The URL did not match a published post. Either the slug changed or the piece has not been written yet.
      </p>
      <Link
        href="/blog"
        style={{
          display: "inline-flex",
          alignItems: "center",
          marginTop: "16px",
          fontFamily: "var(--font-display-family, system-ui)",
          fontSize: "13px",
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: "2px",
          padding: "12px 28px",
          borderRadius: "9999px",
          border: "1px solid rgba(254, 214, 7, 0.35)",
          color: "var(--ax-capital-yellow, #FED607)",
          textDecoration: "none",
        }}
      >
        Back to all posts
      </Link>
    </div>
  );
}
