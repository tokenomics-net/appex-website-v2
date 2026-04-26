/**
 * lib/formatters.ts
 *
 * Shared formatting utilities for public-facing display.
 * Server-safe  --  no browser APIs, no "use client" required.
 */

/**
 * Format a date string as long-form locale: "April 22, 2026".
 *
 * Long-form locale is the single standard for all public-facing blog dates
 * (PostHero, FeaturedPost, PostCard).  ISO YYYY-MM-DD was previously used in
 * FeaturedPost and PostCard  --  standardized here in Task 5 of the
 * launch-prep bundle (2026-04-22).
 *
 * @param dateStr  ISO date string, e.g. "2026-04-22"
 * @returns        Human-readable string, e.g. "April 22, 2026"
 */
export function formatDateLong(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day:   "numeric",
    year:  "numeric",
  });
}
