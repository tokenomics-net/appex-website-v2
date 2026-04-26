/**
 * app/sitemap.ts
 *
 * Dynamic sitemap generation from typed data registries.
 * BASE_URL imported from site-config  --  zero hardcoded domain strings here.
 *
 * Priority hierarchy (Website Infrastructure Checklist §2):
 *   1.0  home
 *   0.9  pillar / section landing pages
 *   0.8  category index pages
 *   0.7  secondary static pages (about, contact)
 *   0.6  sub-pages, blog posts, location pages, guides
 *   0.3  legal / utility pages (privacy, terms)
 *
 * To add a new page to the sitemap: add an entry to data/pages.ts (or the
 * relevant data registry). The sitemap rebuilds automatically on next deploy.
 *
 * Reference: wiki/standards/website-infrastructure-checklist.md §2
 */

import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site-config";
import { corePages } from "@/data/pages";
import { services } from "@/data/services";
import { getAllPosts } from "@/lib/blog/posts";

// Meaningful dates  --  reflect actual content freshness, not build time
const TODAY = new Date("2026-04-13");
const STATIC_PAGE_DATE = new Date("2026-04-01");

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Deduplication: ensure no duplicate urlPaths appear ─────────────────────
  const seenPaths = new Set<string>();

  // ── Core static pages ───────────────────────────────────────────────────────
  const coreUrls: MetadataRoute.Sitemap = corePages
    .filter((page) => {
      if (seenPaths.has(page.urlPath)) return false;
      seenPaths.add(page.urlPath);
      return true;
    })
    .map((page) => ({
      url: `${BASE_URL}${page.urlPath}`,
      lastModified:
        ["/terms", "/privacy", "/disclosures"].includes(page.urlPath) ? STATIC_PAGE_DATE : TODAY,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }));

  // ── Service pages ───────────────────────────────────────────────────────────
  const serviceUrls: MetadataRoute.Sitemap = services
    .filter((service) => {
      if (seenPaths.has(service.urlPath)) return false;
      seenPaths.add(service.urlPath);
      return true;
    })
    .map((service) => ({
      url: `${BASE_URL}${service.urlPath}`,
      lastModified: TODAY,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // ── Blog posts  --  derived from MDX content registry (getAllPosts) ───────────
  const mdxPosts = getAllPosts();
  const blogUrls: MetadataRoute.Sitemap = mdxPosts
    .filter((post) => {
      const path = `/blog/${post.slug}`;
      if (seenPaths.has(path)) return false;
      seenPaths.add(path);
      return true;
    })
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [
    ...coreUrls,
    ...serviceUrls,
    ...blogUrls,
    // Add additional page type arrays here (location pages, guide pages, etc.)
    // following the same filter/map pattern above.
  ];
}
