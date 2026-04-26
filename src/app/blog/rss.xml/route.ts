/**
 * app/blog/rss.xml/route.ts
 *
 * RSS 2.0 feed generated at build time.
 * Served at /blog/rss.xml
 *
 * Copy source: copy/blog.md §RSS feed metadata
 * Spec source: blog-ia.md §RSS feed
 */

import { getAllPosts } from "@/lib/blog/posts";
import { BASE_URL }   from "@/lib/site-config";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRssDate(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

export async function GET(): Promise<Response> {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const { frontmatter, slug } = post;
      const postUrl = `${BASE_URL}/blog/${slug}`;
      const absoluteImage = frontmatter.cover.startsWith("http")
        ? frontmatter.cover
        : `${BASE_URL}${frontmatter.cover}`;

      return `
    <item>
      <title>${escapeXml(frontmatter.title)}</title>
      <link>${postUrl}</link>
      <description>${escapeXml(frontmatter.excerpt)}</description>
      <pubDate>${formatRssDate(frontmatter.date)}</pubDate>
      <guid isPermaLink="true">${postUrl}</guid>
      <category>${escapeXml(frontmatter.category)}</category>
      <author>${escapeXml(frontmatter.author)}</author>
      <enclosure url="${absoluteImage}" type="${absoluteImage.endsWith(".webp") ? "image/webp" : absoluteImage.endsWith(".jpg") || absoluteImage.endsWith(".jpeg") ? "image/jpeg" : "image/png"}" length="0" />
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>appeX Protocol. Research and protocol writing.</title>
    <link>${BASE_URL}/blog</link>
    <description>Protocol research, LP and borrower guides, market analysis, and security notes on the appeX Protocol, published on the record. One feed, every post, newest first.</description>
    <language>en-US</language>
    <lastBuildDate>${posts.length > 0 ? formatRssDate(posts[0].frontmatter.date) : new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/brand/appex-wordmark.svg</url>
      <title>appeX Protocol</title>
      <link>${BASE_URL}/blog</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
