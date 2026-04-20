/**
 * lib/schema.ts
 *
 * Parameterized JSON-LD schema helpers. Every helper:
 *   - Imports constants from site-config.ts  --  no hardcoded strings
 *   - Accepts a typed parameter object
 *   - Returns a plain object (serialization happens at injection)
 *
 * Injection pattern in page components (Server Component):
 *
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
 *   />
 *
 * Or via the JsonLd component:
 *
 *   <JsonLd data={organizationSchema()} />
 */

import {
  BASE_URL,
  BUSINESS_NAME,
  EMAIL,
  SOCIALS,
} from "@/lib/site-config";

// ── Organization ──────────────────────────────────────────────────────────────

/**
 * Organization schema  --  inject in root layout on every page.
 * Stripped of physical address / telephone fields  --  not applicable
 * for a decentralized protocol with no physical location.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#org`,
    name: BUSINESS_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/brand/appex-wordmark.svg`,
    email: EMAIL,
    sameAs: [
      SOCIALS.x,
      SOCIALS.linkedin,
    ].filter(Boolean),
  };
}

// ── WebSite ────────────────────────────────────────────────────────────────────

/**
 * WebSite schema with SearchAction  --  inject in root layout.
 * Enables sitelinks search box in SERPs for branded queries.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: BUSINESS_NAME,
    url: BASE_URL,
    publisher: {
      "@id": `${BASE_URL}/#org`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ── WebPage ────────────────────────────────────────────────────────────────────

/**
 * WebPage schema for standard inner pages.
 */
export function webPageSchema(page: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
}) {
  const resolvedUrl = page.url.startsWith("http")
    ? page.url
    : `${BASE_URL}${page.url}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": resolvedUrl,
    name: page.title,
    description: page.description,
    url: resolvedUrl,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#org` },
    ...(page.datePublished ? { datePublished: page.datePublished } : {}),
  };
}

// ── LocalBusiness ─────────────────────────────────────────────────────────────

/**
 * LocalBusiness schema  --  kept for template compatibility.
 * Not used for appeX (no physical location).
 */
export function localBusinessSchema(location?: {
  name?: string;
  address?: { street: string; city: string; state: string; zip: string };
  phone?: string;
  geo?: { lat: number; lng: number };
}) {
  const loc = {
    name: location?.name ?? BUSINESS_NAME,
    address: location?.address ?? { street: "", city: "", state: "", zip: "" },
    phone: location?.phone ?? "",
    geo: location?.geo ?? { lat: 0, lng: 0 },
  };

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    name: loc.name,
    url: BASE_URL,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address.street,
      addressLocality: loc.address.city,
      addressRegion: loc.address.state,
      postalCode: loc.address.zip,
      addressCountry: "US",
    },
  };

  if (loc.geo && loc.geo.lat !== 0) {
    schema["geo"] = {
      "@type": "GeoCoordinates",
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    };
  }

  return schema;
}

// ── Service ───────────────────────────────────────────────────────────────────

/**
 * Service schema for individual service detail pages.
 */
export function serviceSchema(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  const resolvedUrl = service.url.startsWith("http")
    ? service.url
    : `${BASE_URL}${service.url}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: resolvedUrl,
    image: service.image ?? `${BASE_URL}/og-default.png`,
    provider: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: BASE_URL,
    },
  };
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

/**
 * FAQPage schema. Feed from data/faqs.ts.
 */
export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ── BreadcrumbList ────────────────────────────────────────────────────────────

/**
 * BreadcrumbList schema for pages below the root.
 *
 * @example
 * breadcrumbSchema([
 *   { name: "Home", url: "/" },
 *   { name: "Protocol", url: "/protocol" },
 * ])
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

// ── Article ───────────────────────────────────────────────────────────────────

/**
 * Article schema for long-form guide/resource pages.
 */
export function articleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
  keywords?: string[];
}) {
  const resolvedUrl = article.url.startsWith("http")
    ? article.url
    : `${BASE_URL}${article.url}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: resolvedUrl,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    image: article.image ?? `${BASE_URL}/og-default.png`,
    keywords: article.keywords?.join(", "),
    author: {
      "@type": "Person",
      name: article.authorName ?? BUSINESS_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/brand/appex-wordmark.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": resolvedUrl,
    },
  };
}

// ── BlogPosting ───────────────────────────────────────────────────────────────

/**
 * BlogPosting schema for blog detail pages.
 */
export function blogPostingSchema(post: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
  keywords?: string[];
}) {
  const resolvedUrl = post.url.startsWith("http")
    ? post.url
    : `${BASE_URL}${post.url}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: resolvedUrl,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    image: post.image ?? `${BASE_URL}/og-default.png`,
    keywords: post.keywords?.join(", "),
    author: {
      "@type": "Person",
      name: post.authorName ?? BUSINESS_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/brand/appex-wordmark.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": resolvedUrl,
    },
  };
}
