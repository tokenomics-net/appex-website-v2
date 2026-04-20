/**
 * data/blog-posts.ts
 *
 * Blog post registry. Each entry:
 *   - Feeds sitemap.ts (using each post's actual date, not build time)
 *   - Feeds blog listing pages
 *   - Feeds blogPostingSchema() on detail pages
 *
 * Add entries as posts are published. Slug must match the file at
 * app/blog/[slug]/page.tsx.
 */

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO 8601: "2026-01-15"  --  use actual publish date, not build time
  description: string;
  tags?: string[];
  image?: string;
  authorName?: string;
}

export const blogPosts: BlogPost[] = [
  // Add blog posts here as they are published.
  // Example:
  // {
  //   slug: "example-post",
  //   title: "Example Blog Post Title",
  //   date: "2026-04-01",
  //   description: "140-160 character description of this post.",
  //   tags: ["example", "tag"],
  //   authorName: "Author Name",
  // },
];
