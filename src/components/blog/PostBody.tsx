/**
 * PostBody.tsx
 *
 * Server Component  --  MDX rendering with layout grid (prose + TOC sidebar).
 * Justification: MDX content compiled server-side via next-mdx-remote/rsc.
 * The TableOfContents inside is "use client" but is a child component.
 *
 * Design source: blog-design.md §S2 Article body + §S2.5 TOC
 */

import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getMDXComponents, mdxBodyStyles } from "./mdx-components";
import { TableOfContents } from "./TableOfContents";
import type { TocEntry } from "./TableOfContents";
import type React from "react";

interface PostBodyProps {
  content: string;
  headings: TocEntry[];
}

export function PostBody({ content, headings }: PostBodyProps): React.JSX.Element {
  const components = getMDXComponents();

  return (
    <>
      <style>{`
        /* ── Post body layout ───────────────────────────────────────── */
        .post-body-section {
          background: var(--ax-fortress, #0A0F1F);
          padding: 64px 48px 80px;
          position: relative;
        }
        @media (max-width: 767px) {
          .post-body-section { padding: 48px 24px 64px; }
        }

        .post-body-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 1200px 1200px at 50% 0%, rgba(90,28,203,0.04) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .post-body-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 720px) minmax(240px, 280px);
          gap: 80px;
          max-width: 1120px;
          margin: 0 auto;
        }
        @media (max-width: 1199px) {
          .post-body-grid {
            grid-template-columns: 1fr;
            gap: 0;
            max-width: 760px;
          }
        }

        /* Prose corridor */
        .post-body-prose {
          min-width: 0;
        }

        /* Mobile audit: constrain blog body line-length on mobile.
         * Pixel 5 (393px) rendered prose near-edge-to-edge within the grid.
         * max-width + horizontal padding on the prose column keeps line-length
         * in the 50-75ch readable range on narrow viewports. */
        @media (max-width: 767px) {
          .post-body-prose {
            max-width: 65ch;
            padding: 0 4px;
          }
        }
      `}</style>
      <style>{mdxBodyStyles}</style>

      <section id="body" className="post-body-section">
        <div className="post-body-grid">
          {/* Main prose column */}
          <div className="post-body-prose">
            <MDXRemote
              source={content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>

          {/* TOC sidebar  --  desktop only, client component handles visibility */}
          <aside>
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </section>
    </>
  );
}
