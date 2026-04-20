/**
 * app/blog/[slug]/page.tsx
 *
 * Individual post page  --  Server Component assembly.
 * Statically generated via generateStaticParams.
 *
 * Section order (blog-ia.md DRAFT-v2, blog-design.md DRAFT-v1):
 *   1. PostHero    (server)  --  image-below-title, texture: r17-texture-calm 12%
 *   2. PostBody    (server)  --  MDX prose + sticky TOC sidebar (client island)
 *   3. AuthorBlock (server)  --  attribution: appeX Protocol, decentralized-protocol framing, links to /about
 *   4. RelatedPosts (server)  --  3-card row, texture: r17-texture-rhythm 18%
 *   5. PostCTA     (server)  --  category-routed CTA, texture: r18-texture-horizon 16%
 *
 * SEO: generateMetadata  --  OpenGraph + Twitter + JSON-LD BlogPosting schema
 * Copy: PRESENT TENSE. Zero em dashes. Published by the appeX Protocol. On the record.
 * Sources: blog-ia.md, blog-design.md, copy/blog.md, decisions.md
 */

import type { Metadata } from "next";
import { notFound }      from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog/posts";
import { extractH2Headings } from "@/lib/blog/extract-headings";
import { PostHero }      from "@/components/blog/PostHero";
import { PostBody }      from "@/components/blog/PostBody";
import { AuthorBlock }   from "@/components/blog/AuthorBlock";
import { RelatedPosts }  from "@/components/blog/RelatedPosts";
import { PostCTA }       from "@/components/blog/PostCTA";
import { BASE_URL }      from "@/lib/site-config";

// ── Static params ─────────────────────────────────────────────────────────

export function generateStaticParams(): { slug: string }[] {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found | appeX Blog" };

  const { frontmatter } = post;
  const title = frontmatter.seoTitle ?? `${frontmatter.title} | appeX Blog`;
  const description =
    frontmatter.seoDescription ?? frontmatter.excerpt.slice(0, 155);
  const ogImage = frontmatter.ogImage ?? frontmatter.cover;
  const absoluteOg = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;
  const postUrl = `${BASE_URL}/blog/${frontmatter.slug}`;

  // og-cards.md: title = "[Post title] | appeX Blog", desc = first ~140 chars lede-style
  return {
    title,
    description,
    openGraph: {
      title:             title,
      description:       description,
      type:              "article",
      url:               postUrl,
      images:            [{ url: absoluteOg }],
      publishedTime:     frontmatter.date,
      authors:           [frontmatter.author],
      section:           frontmatter.category,
      tags:              frontmatter.tags,
    },
    twitter: {
      card:        "summary_large_image",
      site:        "@appexprotocol",
      title,
      description,
      images:      [absoluteOg],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const headings = extractH2Headings(content);
  const related  = getRelatedPosts(slug, frontmatter.category);

  const postUrl    = `${BASE_URL}/blog/${frontmatter.slug}`;
  const absoluteOg = frontmatter.cover.startsWith("http")
    ? frontmatter.cover
    : `${BASE_URL}${frontmatter.cover}`;

  // JSON-LD BlogPosting schema
  const jsonLd = {
    "@context":        "https://schema.org",
    "@type":           "BlogPosting",
    headline:          frontmatter.title,
    description:       frontmatter.excerpt,
    image:             absoluteOg,
    datePublished:     frontmatter.date,
    url:               postUrl,
    author: {
      "@type": "Organization",
      name:    frontmatter.author,
      url:     `${BASE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name:    "appeX Protocol",
      url:     BASE_URL,
      logo: {
        "@type": "ImageObject",
        url:     `${BASE_URL}/brand/appex-wordmark.svg`,
      },
    },
    keywords: frontmatter.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        #post-hero,
        #body,
        #author,
        #related,
        #cta {
          scroll-margin-top: 72px;
        }
      `}</style>

      <PostHero frontmatter={frontmatter} />
      <PostBody content={content} headings={headings} />
      <AuthorBlock />
      <RelatedPosts posts={related} category={frontmatter.category} />
      <PostCTA frontmatter={frontmatter} />
    </>
  );
}
