/**
 * data/services.ts
 *
 * Service registry. appeX Protocol has no /services route  -- 
 * this array is intentionally empty to prevent phantom sitemap entries.
 *
 * If a services page is added in a future phase, populate this array
 * and the sitemap will include it automatically.
 */

export interface Service {
  slug: string;
  urlPath: string;
  name: string;
  headline: string;
  description: string;
  image?: string;
}

export const services: Service[] = [];
