/**
 * app/llms.txt/route.ts
 *
 * AI site index  --  served at /llms.txt.
 *
 * Structured markdown index for LLM crawlers. Gives AI systems a machine-readable
 * overview of all meaningful site content without requiring full site crawls.
 * Sites with llms.txt are cited more accurately in AI-generated answers.
 *
 * Note: This dynamic route takes precedence over a static public/llms.txt.
 * Content sourced from geo-audit.md draft (2026-04-17) + MDX blog posts registry.
 */

import { BASE_URL, EMAIL, SOCIALS } from "@/lib/site-config";
import { getAllPosts } from "@/lib/blog/posts";

export function GET(): Response {
  const posts = getAllPosts();

  const blogSection =
    posts.length > 0
      ? `## Blog\nURL: ${BASE_URL}/blog\nProtocol research, LP guides, borrower diligence notes, and market analysis.\n\n${posts
          .slice(0, 10)
          .map(
            (post) =>
              `### ${post.frontmatter.title}\nURL: ${BASE_URL}/blog/${post.slug}\n${post.frontmatter.seoDescription ?? post.frontmatter.title}`
          )
          .join("\n\n")}\n\n---\n\n`
      : "";

  const content = `# appeX Protocol

appeX is a decentralized protocol for onchain working capital financing. It connects liquidity providers who deposit USDC with credit-reviewed borrowers who draw capital against verified receivables. Fees are charged on real advances and accrue to net asset value, increasing LP token value per transaction. The protocol uses no token emissions, no variable rates after facility establishment, and no ongoing covenants.

---

## Key pages

- [Homepage](${BASE_URL}): Protocol overview, capital gap thesis, LP and borrower mechanics
- [Protocol](${BASE_URL}/protocol): Three-step vault mechanism, capital flow, fee curve, risk framework, $APPEX utility in the vault
- [For Liquidity Providers](${BASE_URL}/lps): USDC deposit mechanics, yield from real borrower fees, LP lifecycle, safety framework
- [For Borrowers](${BASE_URL}/borrowers): Working capital advance process, underwriting criteria, fee transparency, repayment structure
- [$APPEX Token](${BASE_URL}/appex): Fixed supply of 1,000,000,000 tokens, five utility categories, staking mechanics, supply distribution, governance
- [About](${BASE_URL}/about): Protocol mission, architecture, governance pathway, audit and security posture
- [Blog](${BASE_URL}/blog): Protocol research and analysis
- [Docs](https://docs.appex.finance): Full technical documentation, FAQ, glossary

---

## Protocol facts

- $APPEX total supply: 1,000,000,000 (fixed, no minting)
- LP deposit minimum: 1 USDC (permissionless)
- Fee discount for $APPEX payments: 25% below USDC fee rate
- Borrower obligation: single repayment per advance, no ongoing covenants
- Anchor borrower at launch: appLockr (mobile advertising platform)
- Borrower underwriting: credit-reviewed, revenue-verified, individually negotiated facilities
- Contact: ${EMAIL}
- X: ${SOCIALS.x}
- LinkedIn: ${SOCIALS.linkedin}

---

${blogSection}## About

URL: ${BASE_URL}/about
appeX is a decentralized protocol for onchain working capital. Mission, architecture, governance pathway, and security posture on the record.

---
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
