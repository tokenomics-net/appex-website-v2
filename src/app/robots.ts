/**
 * app/robots.ts
 *
 * Three-tier AI crawler access policy.
 * BASE_URL imported from site-config  --  zero hardcoded domain strings here.
 *
 * Tier 1 ALLOW   --  direct AI search surfaces (OpenAI, Google AI, ChatGPT)
 * Tier 2 ALLOW   --  high-quality LLM research crawlers (Anthropic, Perplexity, Amazon)
 * Tier 3 BLOCK   --  aggressive crawlers with no direct referral value (CCBot, Bytespider)
 * Standard       --  Googlebot, Bingbot unrestricted
 * Default        --  all other bots allowed
 *
 * Reference: wiki/standards/website-infrastructure-checklist.md §1
 */

import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Standard search engines ──────────────────────────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },

      // ── Tier 1: Direct AI search surfaces ────────────────────────────────────
      // These crawlers power AI-generated answers that surface the business directly.
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },

      // ── Tier 2: High-quality LLM research crawlers ──────────────────────────
      // Perplexity and Claude surface citations. Amazon Alexa/Lex AI answers.
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Amazonbot",
        allow: "/",
      },

      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },

      // ── Tier 3: Block aggressive crawlers with no direct referral value ───────
      // CCBot feeds Common Crawl training sets without attribution.
      // Bytespider (ByteDance) is high-volume with no demonstrated referral.
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },

      // ── Default: allow all other bots ────────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
