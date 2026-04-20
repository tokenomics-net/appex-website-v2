/**
 * src/components/blog/mdx-components.tsx
 *
 * MDX component overrides for the blog post body.
 * Typography spec: outputs/appex-website-build/design/blog-design.md §S2 Article body
 *
 * Server Component: no "use client" needed  --  pure styling overrides.
 * All styles are inline to ensure they don't conflict with Tailwind purge.
 */

import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// ── Helpers ───────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

// ── Heading anchor helper ─────────────────────────────────────────────────

function HeadingAnchor({ id }: { id: string }) {
  return (
    <a
      href={`#${id}`}
      aria-label="Link to this section"
      style={{
        display: "inline-block",
        marginLeft: "8px",
        color: "var(--ax-capital-yellow)",
        opacity: 0,
        fontSize: "0.75em",
        textDecoration: "none",
        transition: "opacity 150ms ease-out",
        verticalAlign: "middle",
      }}
      className="heading-anchor"
    >
      #
    </a>
  );
}

// ── MDX component map ─────────────────────────────────────────────────────

export function getMDXComponents(): MDXComponents {
  return {
    // ── Headings ──────────────────────────────────────────────────────────

    // h1 in body maps to h2 (H1 lives in post hero only)
    h1: ({ children }) => {
      const text = typeof children === "string" ? children : String(children ?? "");
      const id = slugify(text);
      return (
        <h2
          id={id}
          style={{
            fontFamily: "var(--font-display-family, system-ui)",
            fontSize: "clamp(28px, 3.2vw, 36px)",
            fontWeight: 400,
            lineHeight: 1.25,
            color: "var(--ax-text-primary)",
            margin: "64px 0 24px",
            scrollMarginTop: "96px",
          }}
          className="mdx-h2-group"
        >
          {children}
          <HeadingAnchor id={id} />
        </h2>
      );
    },

    h2: ({ children }) => {
      const text = typeof children === "string" ? children : String(children ?? "");
      const id = slugify(text);
      return (
        <h2
          id={id}
          style={{
            fontFamily: "var(--font-display-family, system-ui)",
            fontSize: "clamp(28px, 3.2vw, 36px)",
            fontWeight: 400,
            lineHeight: 1.25,
            color: "var(--ax-text-primary)",
            margin: "64px 0 24px",
            scrollMarginTop: "96px",
          }}
          className="mdx-h2-group"
        >
          {children}
          <HeadingAnchor id={id} />
        </h2>
      );
    },

    h3: ({ children }) => {
      const text = typeof children === "string" ? children : String(children ?? "");
      const id = slugify(text);
      return (
        <h3
          id={id}
          style={{
            fontFamily: "var(--font-display-family, system-ui)",
            fontSize: "clamp(22px, 2.2vw, 26px)",
            fontWeight: 500,
            lineHeight: 1.3,
            color: "var(--ax-text-primary)",
            margin: "48px 0 16px",
            scrollMarginTop: "96px",
          }}
        >
          {children}
        </h3>
      );
    },

    h4: ({ children }) => (
      <h4
        style={{
          fontFamily: "var(--font-display-family, system-ui)",
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: 1.4,
          color: "var(--ax-text-primary)",
          margin: "32px 0 12px",
        }}
      >
        {children}
      </h4>
    ),

    // ── Body text ─────────────────────────────────────────────────────────

    p: ({ children }) => (
      <p
        style={{
          fontFamily: "var(--font-body-family, system-ui)",
          fontSize: "18px",
          fontWeight: 400,
          lineHeight: 1.7,
          color: "var(--ax-text-primary)",
          margin: "0 0 24px",
        }}
      >
        {children}
      </p>
    ),

    // ── Links ─────────────────────────────────────────────────────────────

    a: ({ href = "#", children }) => {
      const isExternal = href.startsWith("http") || href.startsWith("//");
      const isAnchor = href.startsWith("#");
      const isMailto = href.startsWith("mailto:");

      const baseStyle: React.CSSProperties = {
        color: "var(--ax-capital-yellow)",
        textDecoration: "underline",
        textDecorationThickness: "1px",
        textUnderlineOffset: "3px",
        textDecorationColor: "rgba(254,214,7,0.42)",
        transition: "text-decoration-color 180ms ease-out",
      };

      if (isExternal || isMailto) {
        return (
          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            style={baseStyle}
          >
            {children}
            {isExternal && (
              <span aria-hidden="true" style={{ opacity: 0.65 }}>
                {" "}&#8599;
              </span>
            )}
          </a>
        );
      }

      if (isAnchor) {
        return (
          <a href={href} style={baseStyle}>
            {children}
          </a>
        );
      }

      return (
        <Link href={href} style={baseStyle}>
          {children}
        </Link>
      );
    },

    // ── Lists ─────────────────────────────────────────────────────────────

    ul: ({ children }) => (
      <ul
        style={{
          margin: "0 0 24px",
          paddingLeft: "28px",
          listStyle: "none",
        }}
      >
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol
        style={{
          margin: "0 0 24px",
          paddingLeft: "36px",
          listStyleType: "decimal",
          listStylePosition: "outside",
        }}
      >
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li
        style={{
          marginBottom: "12px",
          lineHeight: 1.65,
          fontFamily: "var(--font-body-family, system-ui)",
          fontSize: "18px",
          color: "var(--ax-text-primary)",
          position: "relative",
        }}
        className="mdx-li"
      >
        {children}
      </li>
    ),

    // ── Blockquote ────────────────────────────────────────────────────────

    blockquote: ({ children }) => (
      <blockquote
        style={{
          margin: "32px 0",
          padding: "16px 0 16px 24px",
          borderLeft: "2px solid rgba(90,28,203,0.4)",
          fontFamily: "var(--font-body-family, system-ui)",
          fontSize: "18px",
          fontStyle: "italic",
          lineHeight: 1.65,
          color: "var(--ax-text-secondary)",
        }}
      >
        {children}
      </blockquote>
    ),

    // ── Code ──────────────────────────────────────────────────────────────

    code: ({ children, className }) => {
      // Block code (inside <pre>) has a className from rehype; inline does not
      const isBlock = className?.startsWith("language-");
      if (isBlock) {
        return (
          <code
            className={className}
            style={{
              fontFamily: "'JetBrains Mono', 'Courier New', monospace",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "var(--ax-text-primary)",
            }}
          >
            {children}
          </code>
        );
      }
      // Inline code
      return (
        <code
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: "0.9em",
            background: "rgba(90,28,203,0.14)",
            padding: "2px 6px",
            borderRadius: "4px",
            color: "var(--ax-capital-yellow)",
            border: "1px solid rgba(90,28,203,0.20)",
          }}
        >
          {children}
        </code>
      );
    },

    pre: ({ children }) => (
      <pre
        style={{
          maxWidth: "880px",
          margin: "32px auto",
          padding: "24px 32px",
          background: "rgba(10,15,31,0.70)",
          border: "1px solid rgba(90,28,203,0.22)",
          borderRadius: "var(--radius-md, 12px)",
          overflowX: "auto",
          position: "relative",
        }}
      >
        {children}
      </pre>
    ),

    // ── HR divider ────────────────────────────────────────────────────────

    hr: () => (
      <hr
        style={{
          margin: "48px auto",
          maxWidth: "480px",
          border: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(90,28,203,0.4) 50%, transparent 100%)",
        }}
      />
    ),

    // ── Tables ────────────────────────────────────────────────────────────

    table: ({ children }) => (
      <div style={{ overflowX: "auto", maxWidth: "1040px", margin: "32px auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "var(--font-body-family, system-ui)",
            fontSize: "15px",
          }}
        >
          {children}
        </table>
      </div>
    ),

    th: ({ children }) => (
      <th
        style={{
          textAlign: "left",
          padding: "12px 16px",
          borderBottom: "1px solid rgba(90,28,203,0.4)",
          color: "var(--ax-capital-yellow)",
          fontFamily: "var(--font-display-family, system-ui)",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontWeight: 400,
        }}
      >
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          color: "var(--ax-text-primary)",
          lineHeight: 1.5,
        }}
      >
        {children}
      </td>
    ),

    // ── Images + figures ──────────────────────────────────────────────────

    img: ({ src, alt, width, height }) => {
      if (!src) return null;
      const w = typeof width === "number" ? width : 1040;
      const h = typeof height === "number" ? height : 650;
      return (
        <figure
          style={{
            maxWidth: "1040px",
            margin: "48px auto",
          }}
        >
          <Image
            src={src}
            alt={alt ?? ""}
            width={w}
            height={h}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "var(--radius-md, 12px)",
              objectFit: "cover",
            }}
          />
        </figure>
      );
    },

    // ── Strong + em ───────────────────────────────────────────────────────

    strong: ({ children }) => (
      <strong
        style={{
          fontWeight: 600,
          color: "var(--ax-text-primary)",
        }}
      >
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em style={{ fontStyle: "italic" }}>{children}</em>
    ),
  };
}

// CSS to inject for heading anchor hover state and list bullets
// Applied via a <style> tag in the PostBody component
export const mdxBodyStyles = `
  .mdx-h2-group:hover .heading-anchor,
  .mdx-h2-group:focus-within .heading-anchor {
    opacity: 1;
  }
  .mdx-li > .mdx-li { margin-bottom: 8px; }
  ul .mdx-li::before {
    content: "·";
    color: var(--ax-capital-yellow);
    font-size: 1.4em;
    line-height: 1;
    position: absolute;
    left: -20px;
    top: 0;
  }
  ol .mdx-li::marker {
    color: var(--ax-capital-yellow);
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 0.9em;
  }
  a:hover {
    text-decoration-color: var(--ax-capital-yellow) !important;
  }
  @media (prefers-reduced-motion: reduce) {
    a { transition: none !important; }
  }
`;
