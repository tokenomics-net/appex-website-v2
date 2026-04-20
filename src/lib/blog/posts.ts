/**
 * src/lib/blog/posts.ts
 *
 * Build-time-safe post registry for the blog surface.
 * Server Components only  --  never import from client components.
 *
 * Reads src/content/posts/*.mdx, parses frontmatter via gray-matter,
 * auto-computes readTime at 225 wpm if not explicitly set in frontmatter.
 *
 * Source: outputs/appex-website-build/design/blog-ia.md
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ── Types ──────────────────────────────────────────────────────────────────

export type PostCategory =
  | "protocol"
  | "lps"
  | "borrowers"
  | "markets"
  | "security"
  | "governance";

export interface PostFrontmatter {
  // Required
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: PostCategory;
  tags: string[];
  cover: string;
  coverAlt: string;
  // Optional
  featured?: boolean;
  ctaRoute?: string;
  ctaLabel?: string;
  readTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  slug: string;
  content: string;
}

// ── Constants ─────────────────────────────────────────────────────────────

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");
const WORDS_PER_MINUTE = 225;

// Allowed category enum  --  build fails if a post uses an unlisted value
const ALLOWED_CATEGORIES: PostCategory[] = [
  "protocol",
  "lps",
  "borrowers",
  "markets",
  "security",
  "governance",
];

// ── Helpers ───────────────────────────────────────────────────────────────

/**
 * Auto-compute readTime from MDX body.
 * Strips frontmatter (already handled by gray-matter), code blocks, tables,
 * then word-counts remaining prose. Floor at 1.
 */
function computeReadTime(content: string): number {
  // Strip code blocks (fenced and indented)
  let stripped = content.replace(/```[\s\S]*?```/g, "");
  // Strip inline code
  stripped = stripped.replace(/`[^`]+`/g, "");
  // Strip table rows
  stripped = stripped.replace(/^\|.*\|$/gm, "");
  // Strip HTML/JSX tags
  stripped = stripped.replace(/<[^>]+>/g, "");
  // Strip markdown syntax
  stripped = stripped.replace(/[#*_~[\]()!]/g, " ");
  // Collapse whitespace
  const words = stripped.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * Parse a single MDX file into a Post object.
 * Throws if required frontmatter fields are missing or invalid.
 */
function parsePost(filename: string): Post {
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const slug = filename.replace(/\.mdx$/, "");

  // Required field validation
  const required: (keyof PostFrontmatter)[] = [
    "title",
    "slug",
    "excerpt",
    "date",
    "author",
    "category",
    "tags",
    "cover",
    "coverAlt",
  ];
  for (const field of required) {
    if (!data[field]) {
      throw new Error(
        `[blog/posts] Post "${filename}" is missing required field: ${field}`
      );
    }
  }

  // Category validation
  if (!ALLOWED_CATEGORIES.includes(data.category as PostCategory)) {
    throw new Error(
      `[blog/posts] Post "${filename}" has invalid category: "${data.category}". Allowed: ${ALLOWED_CATEGORIES.join(", ")}`
    );
  }

  // readTime: auto-compute if not explicitly set
  const readTime: number =
    typeof data.readTime === "number"
      ? data.readTime
      : computeReadTime(content);

  const frontmatter: PostFrontmatter = {
    title: data.title as string,
    slug: data.slug as string,
    excerpt: data.excerpt as string,
    date: data.date as string,
    author: data.author as string,
    category: data.category as PostCategory,
    tags: (data.tags as string[]) ?? [],
    cover: data.cover as string,
    coverAlt: data.coverAlt as string,
    featured: (data.featured as boolean) ?? false,
    ctaRoute: data.ctaRoute as string | undefined,
    ctaLabel: data.ctaLabel as string | undefined,
    readTime,
    seoTitle: data.seoTitle as string | undefined,
    seoDescription: data.seoDescription as string | undefined,
    ogImage: (data.ogImage as string | undefined) ?? (data.cover as string),
  };

  return { frontmatter, slug, content };
}

// ── Public API ────────────────────────────────────────────────────────────

/**
 * getAllPosts  --  reads all *.mdx files from content/posts, sorts newest-first.
 */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"));

  const posts = files.map((f) => parsePost(f));

  // Sort newest date first
  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

  return posts;
}

/**
 * getPostBySlug  --  returns a single post or null.
 */
export function getPostBySlug(slug: string): Post | null {
  const filename = `${slug}.mdx`;
  const filePath = path.join(POSTS_DIR, filename);

  if (!fs.existsSync(filePath)) return null;

  return parsePost(filename);
}

/**
 * getFeaturedPost  --  returns the post with featured: true (newest wins),
 * falling back to the newest post overall.
 */
export function getFeaturedPost(): Post | null {
  const posts = getAllPosts();
  if (posts.length === 0) return null;

  const featured = posts.filter((p) => p.frontmatter.featured === true);
  if (featured.length > 0) {
    // Newest date wins among featured
    return featured.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )[0];
  }

  // Fallback: newest post overall
  return posts[0];
}

/**
 * getPostsByCategory  --  filter posts by category.
 */
export function getPostsByCategory(category: PostCategory): Post[] {
  return getAllPosts().filter(
    (p) => p.frontmatter.category === category
  );
}

/**
 * getRelatedPosts  --  returns up to 3 posts from the same category,
 * excluding the current post. Falls back to newest overall.
 */
export function getRelatedPosts(
  currentSlug: string,
  category: PostCategory
): Post[] {
  const all = getAllPosts().filter((p) => p.slug !== currentSlug);

  const sameCat = all.filter((p) => p.frontmatter.category === category);

  if (sameCat.length >= 3) return sameCat.slice(0, 3);

  // Fill from newest overall
  const others = all.filter((p) => p.frontmatter.category !== category);
  return [...sameCat, ...others].slice(0, 3);
}

/**
 * getActiveCategories  --  returns only category slugs that appear in at least one post.
 * Used by CategoryFilter to show only chips for categories that exist.
 */
export function getActiveCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set<string>();
  for (const p of posts) {
    if (p.frontmatter.category) categories.add(p.frontmatter.category);
  }
  return Array.from(categories).sort();
}
