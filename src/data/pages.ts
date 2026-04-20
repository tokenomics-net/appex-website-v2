/**
 * data/pages.ts
 *
 * Page registry  --  every site page registered here feeds sitemap.ts automatically.
 * Add an entry here when you add a new page. The sitemap rebuilds on next deploy.
 *
 * urlPath must match the exact Next.js route (e.g., "/about" -> app/about/page.tsx)
 */

export interface PageEntry {
  urlPath: string;
  priority: number;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

/**
 * Core static pages  --  all real appeX routes.
 *
 * Priority hierarchy from Website Infrastructure Checklist:
 *   1.0   --  home
 *   0.9   --  pillar / section landing pages
 *   0.8   --  category index pages
 *   0.7   --  secondary static pages (about)
 *   0.6   --  sub-pages, blog, location pages, guides
 *   0.3   --  legal / utility pages (privacy, terms, cookies, disclosures)
 */
export const corePages: PageEntry[] = [
  { urlPath: "/",            priority: 1.0, changeFrequency: "weekly"  },
  { urlPath: "/lps",         priority: 0.9, changeFrequency: "monthly" },
  { urlPath: "/borrowers",   priority: 0.9, changeFrequency: "monthly" },
  { urlPath: "/protocol",    priority: 0.9, changeFrequency: "monthly" },
  { urlPath: "/appex",       priority: 0.9, changeFrequency: "monthly" },
  { urlPath: "/about",       priority: 0.7, changeFrequency: "monthly" },
  { urlPath: "/blog",        priority: 0.8, changeFrequency: "weekly"  },
  { urlPath: "/terms",       priority: 0.3, changeFrequency: "yearly"  },
  { urlPath: "/privacy",     priority: 0.3, changeFrequency: "yearly"  },
  { urlPath: "/cookies",     priority: 0.3, changeFrequency: "yearly"  },
];
