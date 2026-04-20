/**
 * src/lib/blog/extract-headings.ts
 *
 * Build-time utility to extract H2 headings from MDX content.
 * Used to generate the TOC sidebar prop for the post template.
 *
 * Only extracts H2 (##) per spec  --  TOC shows H2 only.
 */

export interface TocEntry {
  id: string;
  text: string;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

/**
 * extractH2Headings  --  parses raw MDX content string and returns
 * an array of { id, text } for every ## heading found.
 */
export function extractH2Headings(content: string): TocEntry[] {
  const headings: TocEntry[] = [];

  // Match lines starting with ## (exactly two hashes, not more)
  const lines = content.split("\n");

  for (const line of lines) {
    const match = line.match(/^## (.+)$/);
    if (match) {
      const text = match[1]
        .replace(/\*\*/g, "")   // strip bold
        .replace(/\*/g, "")     // strip italic
        .replace(/`/g, "")      // strip inline code
        .trim();
      headings.push({ id: slugify(text), text });
    }
  }

  return headings;
}
