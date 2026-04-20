/**
 * data/faqs.ts
 *
 * FAQ registry. Fed to faqSchema() for JSON-LD structured data.
 * Source: faq-seed.md (2026-04-17)  --  final copywriter delivery.
 * Reconciliation: copywriter's 10-entry set used in full; strictly superior
 * to the 6-entry Wave 1 draft in named entity density and LLM extractability.
 *
 * Each answer: 2-4 sentences, concrete numbers, named mechanics, named entities.
 * Optimized for FAQPage structured data and AI citability.
 *
 * Schema injected on /protocol via faqSchema(faqs) in protocol/page.tsx.
 */

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "What is appeX Protocol?",
    answer:
      "appeX is a decentralized protocol for onchain working capital financing. Liquidity providers deposit USDC into a permissionless vault. Credit-reviewed borrowers draw capital against verified receivables and pay a negotiated fee. Those fees accrue to net asset value per advance, which increases the value of each LP token.",
  },
  {
    question: "How is appeX different from traditional DeFi lending?",
    answer:
      "Traditional DeFi lending is overcollateralized: a borrower locks crypto worth more than the loan. appeX lends working capital to credit-reviewed businesses against verified receivables, not crypto collateral. Borrowers pay a one-time origination fee negotiated to their margin profile and revenue velocity. There are no variable rates, no liquidations triggered by crypto price movement, and no ongoing covenants.",
  },
  {
    question: "How do liquidity providers earn on appeX?",
    answer:
      "LPs earn from real fees charged on real advances. When an approved borrower draws capital from the vault, they pay a negotiated fee. That fee accrues directly to the vault's net asset value, so each LP token is worth slightly more after each advance. There are no token emissions, no temporary incentive programs, and no fixed APR.",
  },
  {
    question: "What is the minimum deposit for an LP?",
    answer:
      "One USDC. Deposits are permissionless. There is no lock-up period. There are no sign-up forms, no KYC on the LP side at launch, and no hidden spreads on deposit or withdrawal.",
  },
  {
    question: "Who can borrow from appeX?",
    answer:
      "Borrowing is not permissionless. Every borrower completes a structured underwriting process that reviews revenue verification, creditworthiness, and margin profile. Only approved entities can draw from the vault. At launch, the anchor borrower is appLockr, a mobile advertising platform that pays app developers same-day for revenue that advertisers would otherwise settle on 60 to 180 day terms.",
  },
  {
    question: "What is the $APPEX token?",
    answer:
      "$APPEX is the protocol's utility and governance token. Total supply is fixed at 1,000,000,000 tokens. There is no minting. There are no emissions. Holders can pay protocol fees in $APPEX for a 25% discount versus USDC, stake for rewards, and vote on governance.",
  },
  {
    question: "How does appeX charge fees to borrowers?",
    answer:
      "appeX charges a one-time origination fee per advance, negotiated individually for each borrower based on revenue velocity, margin profile, and creditworthiness. The fee is set when a facility is established and does not change afterward. There are no variable rates, no sweeps, and no ongoing covenants after the facility is in place.",
  },
  {
    question: "Is appeX audited?",
    answer:
      "Third-party audits of all smart contracts are required before launch. Internal testing covers core financial logic. Audit reports will be published in full with no redactions, including auditor names, scope, and findings summaries. A bug bounty program covers ongoing vulnerability discovery. The current audit status and reports are published on the /about page as they complete.",
  },
  {
    question: "What are the main risks of using appeX?",
    answer:
      "The material risks are documented in full on the /about page and include: smart contract risk (audits reduce but do not eliminate vulnerability risk), borrower default risk (losses are socialized across LP shares proportionally), vault utilization risk (LP withdrawals may be delayed during extreme stress), regulatory risk (the legal environment for DeFi varies by jurisdiction and is evolving), and market risk on $APPEX (the token's price is determined by market forces). Participants should not deposit more than they can afford to lose.",
  },
  {
    question: "Why 'real fees, not emissions'?",
    answer:
      "Emissions yield pays LPs in newly minted tokens on a fixed schedule. When the schedule ends, or the token price falls, the yield disappears. appeX pays LPs from fees that borrowers pay on real advances. The yield is tied to real economic activity in the vault, which means it can be smaller, but it is also durable beyond any launch period. Fee revenue accrues to NAV, so every advance compounds LP token value directly.",
  },
];
