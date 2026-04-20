/**
 * PostCard.tsx
 *
 * Server Component  --  pure presentational card.
 * Justification: static layout, CSS hover only, no hooks.
 *
 * Design source: blog-design.md §S4 Post grid  --  post-card spec
 */

import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog/posts";
import type React from "react";

interface PostCardProps {
  post: Post;
  priority?: boolean;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toISOString().split("T")[0]; // YYYY-MM-DD
}

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    lps: "LPs",
    protocol: "Protocol",
    borrowers: "Borrowers",
    markets: "Markets",
    security: "Security",
    governance: "Governance",
  };
  return map[cat] ?? cat;
}

export function PostCard({ post, priority = false }: PostCardProps): React.JSX.Element {
  const { frontmatter, slug } = post;

  return (
    <article className="post-card">
      <Link href={`/blog/${slug}`} className="post-card__link" aria-label={`Read: ${frontmatter.title}`}>
        {/* Cover image zone */}
        <div className="post-card__image-zone">
          <Image
            src={frontmatter.cover}
            alt={frontmatter.coverAlt}
            width={640}
            height={400}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="post-card__image"
            sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
          <div className="post-card__image-overlay" aria-hidden="true" />
          <span className="post-card__cat-chip">{categoryLabel(frontmatter.category)}</span>
        </div>

        {/* Content zone */}
        <div className="post-card__content">
          <h3 className="post-card__title">{frontmatter.title}</h3>
          <p className="post-card__excerpt">{frontmatter.excerpt}</p>
          <dl className="post-card__meta">
            <dt className="sr-only">Published</dt>
            <dd className="post-card__meta-text">
              {formatDate(frontmatter.date)} · {frontmatter.readTime} min read
            </dd>
          </dl>
        </div>
      </Link>
    </article>
  );
}
