/**
 * components/seo/JsonLd.tsx
 *
 * Server Component  --  JSON-LD injection wrapper.
 * No "use client" needed  --  dangerouslySetInnerHTML works in Server Components.
 *
 * Usage:
 *   import { JsonLd } from "@/components/seo/JsonLd";
 *   import { faqSchema } from "@/lib/schema";
 *
 *   <JsonLd data={faqSchema(faqs)} />
 *   <JsonLd data={breadcrumbSchema(items)} />
 *   <JsonLd data={[organizationSchema(), localBusinessSchema()]} />
 */

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
