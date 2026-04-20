/**
 * app/terms/page.tsx
 *
 * Terms and Conditions  --  wired from outputs/appex-website-build/copy/pre-launch/terms-conditions.md
 * Stays noindex until client confirms [TO CONFIRM] items (entity legal name,
 * governing jurisdiction, blocked jurisdiction list, arbitration body + seat).
 * Those items render as yellow-highlighted .pending spans via LegalLayout.
 *
 * NOTE: Sections 7 (limitation of liability), 10 (geographic restrictions),
 * and 11 (arbitration) are flagged for legal review before publishing.
 */

import type { Metadata } from "next";
import { BASE_URL } from "@/lib/site-config";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title:       "Terms and Conditions | appeX Protocol",
  description: "Terms governing use of the appex.finance website. These terms apply to the site only, not the onchain protocol.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
};

export default function TermsPage(): React.JSX.Element {
  return (
    <LegalLayout title="Terms and Conditions">

      <h2>1. Acceptance</h2>
      <p>
        By accessing appex.finance (the &ldquo;Site&rdquo;), you agree to these Terms. If you do
        not agree, do not use the Site.
      </p>
      <p>
        These Terms apply to the Site only. They do not govern the onchain appeX
        Protocol itself. Use of the protocol is governed by its smart contracts,
        which execute autonomously on public blockchains.
      </p>
      <p>
        <mark className="pending">TO CONFIRM: governing entity legal name</mark>
      </p>

      <h2>2. What the Site is</h2>
      <p>
        The Site is a public informational resource about the appeX Protocol. It
        describes how the protocol works, who it serves, and what the $APPEX token
        does.
      </p>
      <p>
        The Site is not the protocol. The protocol is a set of smart contracts
        deployed on public blockchains. Interacting with the protocol requires a
        self-custodial wallet and happens at the contract layer, not on this Site.
      </p>
      <p>
        The Site does not hold your funds. The Site does not execute trades. The
        Site does not have user accounts. Nothing you can click on this Site moves
        money or takes custody of assets.
      </p>

      <h2>3. Not financial, legal, or tax advice</h2>
      <p>
        Nothing on this Site is financial advice, legal advice, tax advice,
        investment advice, or a solicitation. Copy on the Site describes how the
        protocol operates and what participation involves. That is information, not
        a recommendation.
      </p>
      <p>
        Using appeX, depositing USDC as a liquidity provider, borrowing against
        receivables, holding or staking $APPEX, participating in governance: all of
        these are financial activities that carry risk. Whether they are appropriate
        for you depends on facts we do not know. Consult your own licensed advisors.
      </p>

      <h2>4. No advisory or fiduciary relationship</h2>
      <p>
        Reading the Site does not create an advisory, fiduciary, agency, or client
        relationship between you and appeX, its contributors, or anyone associated
        with the protocol.
      </p>

      <h2>5. DeFi risk acknowledgment</h2>
      <p>
        By using the protocol, you accept that DeFi carries material risks. The
        canonical list lives at appex.finance/about and is maintained in the
        protocol&rsquo;s risk framework. In summary:
      </p>
      <ul>
        <li>
          <strong>Smart contract risk.</strong> Audits reduce risk; they do not
          eliminate it. Code can contain bugs or undiscovered vulnerabilities.
          Deposits can be lost.
        </li>
        <li>
          <strong>Borrower default risk.</strong> Credit review reduces risk; it does
          not eliminate it. Borrowers can fail to repay. Losses are socialized across
          LP shares.
        </li>
        <li>
          <strong>Vault utilization risk.</strong> During periods of high utilization,
          LP withdrawals may be delayed.
        </li>
        <li>
          <strong>Market risk on $APPEX.</strong> $APPEX is a utility and governance
          token with a fixed supply. Its market price is volatile and not guaranteed.
        </li>
        <li>
          <strong>Oracle and data feed risk.</strong> The protocol relies on offchain
          information about borrower receivables, which is verified through processes
          that can fail or be misreported.
        </li>
        <li>
          <strong>Regulatory risk.</strong> The legal and regulatory environment for
          DeFi is unsettled and varies by jurisdiction. Rules that apply today may
          change.
        </li>
        <li>
          <strong>DeFi composability risk.</strong> Unborrowed capital may be deployed
          to third-party DeFi protocols. Those protocols carry their own risks.
        </li>
        <li>
          <strong>Concentration risk.</strong> Early in the protocol&rsquo;s life,
          exposure to specific borrowers or sectors may be concentrated.
        </li>
      </ul>
      <p>Do not deposit more than you can afford to lose. This is not boilerplate. It is accurate.</p>

      <h2>6. No warranty</h2>
      <p>
        The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; with no
        warranty of any kind, express or implied. That includes no warranty of
        accuracy, completeness, fitness for a particular purpose, merchantability,
        or non-infringement.
      </p>
      <p>
        Information on the Site may be out of date. The protocol can change faster
        than the marketing Site can. The authoritative source for protocol behavior
        is always the deployed smart contract code.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, appeX and its contributors are not
        liable for any direct, indirect, incidental, special, consequential, or
        punitive damages arising from your use of the Site or the protocol. That
        includes loss of funds, loss of data, loss of profits, loss of goodwill,
        and any other loss, whether foreseen or not.
      </p>
      <p>
        Your sole remedy for dissatisfaction with the Site is to stop using it.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        The appeX name, logo, and brand marks are property of appeX{" "}
        <mark className="pending">TO CONFIRM: legal entity</mark>. The Site&rsquo;s text,
        layout, and visual design are, unless marked otherwise, property of appeX.
      </p>
      <p>
        You may quote short passages from the Site for commentary, research,
        journalism, and education under fair use. You may not copy the Site
        wholesale, clone it, or present appeX&rsquo;s copy as your own.
      </p>
      <p>
        The underlying smart contract code for the protocol is open source, licensed
        separately on its repository. The Site terms do not restrict your rights
        under that license.
      </p>

      <h2>9. Prohibited uses</h2>
      <p>Do not:</p>
      <ul>
        <li>Use the Site to break the law in your jurisdiction.</li>
        <li>Use the Site to impersonate appeX or any other entity.</li>
        <li>
          Scrape the Site at a rate that burdens the host (reasonable automated
          indexing by search and LLM crawlers listed in robots.txt is welcome).
        </li>
        <li>
          Introduce malware, exploits, or probes intended to compromise the Site or
          its visitors.
        </li>
        <li>
          Use the Site to launder proceeds of crime, finance terrorism, or evade
          sanctions.
        </li>
      </ul>

      <h2>10. Geographic restrictions</h2>
      <p>
        Access to the protocol may be restricted in certain jurisdictions. The Site
        enforces geographic restrictions at the frontend layer for regions where
        participation is prohibited or materially restricted. You are responsible
        for compliance with the laws of your own jurisdiction.
      </p>
      <p>
        <mark className="pending">TO CONFIRM: specific blocked jurisdictions. Standard DeFi practice is to geoblock sanctioned countries and, in some deployments, US persons. Client to confirm the final blocklist before launch.</mark>
      </p>

      <h2>11. Dispute resolution and arbitration</h2>
      <p>
        Any dispute arising out of or relating to these Terms or your use of the
        Site will be resolved by binding individual arbitration, not in court. You
        waive the right to participate in a class action or class arbitration.
      </p>
      <p>
        Arbitration will be administered by{" "}
        <mark className="pending">TO CONFIRM: arbitration body (common choices: AAA, JAMS, or ICC depending on jurisdiction)</mark>.
        The seat of arbitration will be{" "}
        <mark className="pending">TO CONFIRM: seat of arbitration</mark>.
        The language of arbitration will be English.
      </p>
      <p>
        Nothing in this section prevents either party from seeking injunctive relief
        in a court of competent jurisdiction to protect intellectual property rights.
      </p>

      <h2>12. Governing law</h2>
      <p>
        <mark className="pending">TO CONFIRM: jurisdiction for governing law</mark>{" "}
        These Terms are governed by the laws of that jurisdiction, without regard to
        conflict of law rules.
      </p>

      <h2>13. Changes to these Terms</h2>
      <p>
        We may update these Terms. When we do, we will change the effective date
        above. Material changes will be posted visibly on the Site before they take
        effect. Your continued use of the Site after an update means you accept the
        new Terms.
      </p>

      <h2>14. Severability</h2>
      <p>
        If any part of these Terms is found unenforceable, the rest remains in
        effect.
      </p>

    </LegalLayout>
  );
}
