/**
 * app/blog/page.tsx
 *
 * Blog index page  --  Server Component assembly.
 * Server Component: no client interactivity at page level.
 * Client islands: CategoryFilter (URL state), PostGrid (filter + pagination).
 *
 * Section order (blog-ia.md DRAFT-v2, blog-design.md DRAFT-v1):
 *   1. BlogHero         (server)  --  compact 50-60vh
 *   2. CategoryFilter   (client)  --  sticky chip row, URL ?category= backed
 *   3. FeaturedPost     (server)  --  glass card
 *   4. PostGrid         (client)  --  3-col grid, load-more
 *   5. FollowBand       (server)  --  RSS band
 *
 * Copy: PRESENT TENSE per decisions.md §2. Zero em dashes.
 * Sources: blog-ia.md, blog-design.md, copy/blog.md
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { OG_IMAGE } from "@/lib/og";
import { BASE_URL } from "@/lib/site-config";
import { getAllPosts, getFeaturedPost, getActiveCategories } from "@/lib/blog/posts";
import { BlogHero }      from "@/components/blog/BlogHero";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { FeaturedPost }  from "@/components/blog/FeaturedPost";
import { PostGrid }      from "@/components/blog/PostGrid";
import { FollowBand }    from "@/components/blog/FollowBand";

export const metadata: Metadata = {
  title:       "Protocol research and analysis",
  description: "Protocol-level writing from the appeX team on real yield, credit underwriting onchain, and the architecture behind the vault.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title:       "Protocol research and analysis | appeX Protocol",
    description: "Protocol-level writing from the appeX team on real yield, credit underwriting onchain, and the architecture behind the vault.",
    type:        "website",
    url:         `${BASE_URL}/blog`,
    images: [OG_IMAGE],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@appexprotocol",
    title:       "Protocol research and analysis | appeX Protocol",
    description: "Protocol-level writing from the appeX team on real yield, credit underwriting onchain, and the architecture behind the vault.",
    images:      [OG_IMAGE.url],
  },
};

export default function BlogPage(): React.JSX.Element {
  const allPosts    = getAllPosts();
  const featuredPost = getFeaturedPost();
  const activeCategorySlugs = getActiveCategories();

  // Grid posts: exclude the featured post to prevent duplication
  const gridPosts = featuredPost
    ? allPosts.filter((p) => p.slug !== featuredPost.slug)
    : allPosts;

  return (
    <>
      <style>{`
        #blog-hero,
        #featured,
        #filter,
        #posts,
        #follow {
          scroll-margin-top: 72px;
        }
      `}</style>

      <BlogHero />

      {/* CategoryFilter is "use client"  --  wrapped in Suspense per Next.js useSearchParams requirement */}
      <Suspense fallback={null}>
        <CategoryFilter activeCategorySlugs={activeCategorySlugs} />
      </Suspense>

      {featuredPost && <FeaturedPost post={featuredPost} />}

      {/* PostGrid is "use client"  --  wrapped in Suspense */}
      <Suspense fallback={
        <div style={{ minHeight: "400px", background: "var(--ax-fortress, #0A0F1F)" }} />
      }>
        <PostGrid posts={gridPosts} />
      </Suspense>

      <FollowBand />
    </>
  );
}
