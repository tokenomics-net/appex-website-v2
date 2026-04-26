/**
 * app/terms/page.tsx
 *
 * Terms and Conditions  --  copy from outputs/appex-asset-harmonization/legal-copy/terms.md
 * Indexed: robots set to index/follow per legal review sign-off.
 *
 * [TO CONFIRM] items remain in the copy (jurisdiction, arbitration body/seat,
 * contact email, entity address) and are highlighted via LegalLayout .pending spans.
 */

import type { Metadata } from "next";
import { BASE_URL } from "@/lib/site-config";
import { OG_IMAGE } from "@/lib/og";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title:       "Terms and Conditions",
  description: "Terms governing use of the appex.finance website and the appeX Protocol interface. Read before accessing the site.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
  openGraph: {
    title:       "Terms and Conditions | appeX Protocol",
    description: "Terms governing use of the appex.finance website and the appeX Protocol interface. Read before accessing the site.",
    type:        "website",
    url:         `${BASE_URL}/terms`,
    images: [OG_IMAGE],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@appexprotocol",
    title:       "Terms and Conditions | appeX Protocol",
    description: "Terms governing use of the appex.finance website and the appeX Protocol interface. Read before accessing the site.",
    images:      [OG_IMAGE.url],
  },
};

export default function TermsPage(): React.JSX.Element {
  return (
    <LegalLayout title="Terms and Conditions">

      <p>
        <strong>Effective date:</strong> April 24, 2026
        <br />
        <strong>Entity:</strong> appeX Protocol
      </p>

      <p>
        These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the website
        located at appex.finance, related subdomains, and any software interfaces published by
        appeX Protocol (collectively, the &ldquo;Site&rdquo;). The Site provides information about, and a
        user interface for, the appeX protocol, a set of smart contracts deployed on public
        blockchain networks (the &ldquo;Protocol&rdquo;).
      </p>
      <p>
        Read these Terms carefully. By accessing the Site or interacting with the Protocol
        through an interface we publish, you agree to be bound by them. If you do not agree,
        do not use the Site.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        Your use of the Site constitutes your agreement to these Terms and to our{" "}
        <a href="/privacy">Privacy Policy</a> and{" "}
        <a href="/disclosures">Disclosures</a>, each incorporated by reference. We may update
        these Terms as described in Section 12. Continued use of the Site after an update
        takes effect means you accept the revised Terms.
      </p>

      <h2>2. Eligibility</h2>
      <p>You may use the Site only if all of the following are true:</p>
      <ul>
        <li>
          You are at least 18 years old and have the legal capacity to enter into a binding
          contract in your jurisdiction.
        </li>
        <li>
          You are not a resident of, located in, or accessing the Site from any jurisdiction
          subject to comprehensive sanctions administered by the United States, the United
          Kingdom, the European Union, or the United Nations, including without limitation
          Cuba, Iran, North Korea, Syria, the Crimea, Donetsk, and Luhansk regions of Ukraine.
        </li>
        <li>
          You are not listed on any sanctions or restricted-party list maintained by the
          U.S. Office of Foreign Assets Control (OFAC), the U.S. Department of Commerce,
          the U.S. Department of State, or any equivalent authority.
        </li>
        <li>
          You are not a U.S. person, or a person accessing the Site from the United States,
          where access from the United States is restricted for the feature you are attempting
          to use. Access restrictions are enforced at the frontend layer and may change as our
          legal posture evolves.
        </li>
        <li>
          You are not prohibited from using the Site or the Protocol under the laws of any
          jurisdiction that applies to you.
        </li>
      </ul>
      <p>If any of the above ceases to be true, you must stop using the Site immediately.</p>

      <h2>3. Description of Services</h2>
      <p>
        The Site is an informational website and a frontend interface. Through the Site, you
        can learn about the Protocol, read documentation, view public data, and connect a
        self-custody wallet to interact with Protocol smart contracts.
      </p>
      <p>
        The Protocol is a set of smart contracts that, among other things, permit holders of
        certain digital assets to deposit those assets into a liquidity vault, and permit
        approved counterparties to draw capital from that vault against verified receivables.
        The Protocol operates autonomously according to the logic encoded in its smart contracts.
      </p>
      <p>appeX Protocol does not:</p>
      <ul>
        <li>Hold, custody, or control your digital assets.</li>
        <li>Execute transactions on your behalf.</li>
        <li>Provide banking, brokerage, investment advisory, or money transmission services.</li>
        <li>Guarantee any outcome, yield, price, or return from interaction with the Protocol.</li>
      </ul>
      <p>
        When you interact with the Protocol, you do so directly with the smart contracts
        through your own wallet and at your own risk. For a detailed description of Protocol
        mechanics, refer to our published documentation.
      </p>

      <h2>4. User Responsibilities</h2>
      <p>You are solely responsible for:</p>
      <ul>
        <li>
          <strong>Your wallet and keys.</strong> You control your private keys, seed phrases,
          and any device on which they are stored. We have no ability to recover, reset, or
          replace lost keys. Loss of your keys may result in permanent loss of access to your
          assets.
        </li>
        <li>
          <strong>Wallet security.</strong> You are responsible for maintaining the security
          of any wallet you use to interact with the Site or the Protocol, including protecting
          it from phishing, malware, and unauthorized access.
        </li>
        <li>
          <strong>Your own diligence.</strong> Before depositing, staking, borrowing, or
          otherwise transacting, you are responsible for evaluating the Protocol&rsquo;s risks,
          reading its documentation and disclosures, and reaching your own conclusions. Nothing
          we publish is investment advice or a recommendation.
        </li>
        <li>
          <strong>Taxes.</strong> You are responsible for determining what taxes apply to
          your transactions and for filing and paying those taxes. We do not provide tax
          advice and do not issue tax forms (such as U.S. Form 1099) to users.
        </li>
        <li>
          <strong>Compliance with law.</strong> You are responsible for using the Site and
          the Protocol in compliance with all laws, regulations, and rules that apply to you,
          including sanctions, tax, and securities laws in your jurisdiction.
        </li>
      </ul>

      <h2>5. Prohibited Uses</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Site or the Protocol in violation of any law, regulation, or sanctions program.</li>
        <li>
          Use the Site or the Protocol for money laundering, terrorist financing, fraud,
          market manipulation, or any other unlawful purpose.
        </li>
        <li>
          Attempt to access the Site from a prohibited jurisdiction, including by using a
          VPN, proxy, or other technical means to circumvent geographic restrictions.
        </li>
        <li>
          Interfere with, disrupt, or attempt to gain unauthorized access to the Site, its
          infrastructure, or any account, wallet, or smart contract.
        </li>
        <li>
          Exploit a bug, vulnerability, or error in the Site or the Protocol for gain. If
          you discover a vulnerability, report it through our bug bounty program if one is
          active, or by contacting us at the address below.
        </li>
        <li>
          Reverse engineer, decompile, or attempt to extract source code from any proprietary
          component of the Site, except to the extent that restriction is not permitted by law.
        </li>
        <li>
          Use any robot, scraper, or automated means to access the Site in a manner that
          degrades service for others.
        </li>
        <li>
          Represent yourself as an agent, employee, or affiliate of appeX Protocol when you
          are not.
        </li>
      </ul>
      <p>
        We may block, suspend, or restrict access to the Site at our discretion, including
        where we have reason to believe a user has violated these Terms.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        The Site, including its text, graphics, logos, trademarks, images, software, and
        design, is owned by appeX Protocol or its licensors and is protected by copyright,
        trademark, and other laws. Except as expressly permitted, you may not copy, modify,
        distribute, sell, or create derivative works from any part of the Site.
      </p>
      <p>
        &ldquo;appeX&rdquo; and the appeX logomark are trademarks of appeX Protocol. You may not use
        these marks without prior written permission, except for fair use in news reporting,
        commentary, or similar purposes.
      </p>
      <p>
        Portions of the Protocol&rsquo;s smart contracts and supporting code may be released under
        open-source licenses. Those components are governed by the terms of the applicable
        license, which are provided in the relevant repository.
      </p>
      <p>
        Your wallet address, on-chain transactions, and any content you submit to the
        Protocol through the Site remain yours.
      </p>

      <h2>7. Third-Party Services</h2>
      <p>
        The Site and the Protocol rely on services, networks, and software operated by third
        parties, including:
      </p>
      <ul>
        <li>Public blockchain networks (such as Ethereum).</li>
        <li>Wallet providers and wallet-connection libraries.</li>
        <li>RPC providers and node operators.</li>
        <li>Indexers, oracles, and data providers.</li>
        <li>Analytics providers (see <a href="/privacy">Privacy Policy</a>).</li>
      </ul>
      <p>
        appeX Protocol does not control these third parties and is not responsible for their
        availability, performance, fees, or conduct. Your use of a third-party service may be
        governed by that third party&rsquo;s own terms and privacy policy, which you should review.
      </p>
      <p>
        Network fees (gas) and service charges from third parties are paid by you directly
        to the relevant network or provider. We do not receive those fees.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        The Site and any information, tools, or interfaces made available through it are
        provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, with all faults and without
        warranties of any kind, whether express or implied, including warranties of
        merchantability, fitness for a particular purpose, title, non-infringement, or
        availability. We do not warrant that the Site will be uninterrupted, error-free, or
        secure, or that defects will be corrected.
      </p>
      <p>
        We are not your broker, dealer, adviser, fiduciary, or agent. Nothing on the Site is
        financial, investment, legal, tax, or accounting advice. No fiduciary duty arises
        between you and appeX Protocol by reason of your use of the Site or the Protocol.
      </p>
      <p>
        The Protocol is experimental software. Smart contracts may contain bugs, and audits
        do not guarantee their absence. Market conditions, oracle data, borrower behavior,
        and network events may produce outcomes that differ from expected behavior. You should
        not deposit, stake, or borrow more than you can afford to lose. Read our{" "}
        <a href="/disclosures">Disclosures</a> before interacting with the Protocol.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, appeX Protocol, its affiliates, contributors,
        and its and their respective officers, directors, employees, and agents will not be
        liable to you for any indirect, incidental, special, consequential, exemplary, or
        punitive damages, or for any loss of profits, revenue, data, goodwill, or digital
        assets, arising out of or in connection with your use of the Site or the Protocol,
        even if we have been advised of the possibility of such damages.
      </p>
      <p>
        To the fullest extent permitted by law, our aggregate liability for any claim arising
        out of or related to these Terms, the Site, or the Protocol will not exceed the
        greater of (a) one hundred U.S. dollars (USD 100) or (b) the total fees, if any,
        paid by you to appeX Protocol in the twelve months preceding the event giving rise
        to the claim.
      </p>
      <p>
        Some jurisdictions do not allow the exclusion of certain warranties or the limitation
        of liability for certain damages. In those jurisdictions, the exclusions and
        limitations above apply only to the extent permitted.
      </p>
      <p>
        Nothing in these Terms excludes or limits liability that cannot be excluded or
        limited under applicable law, including liability for fraud, death, or personal
        injury caused by negligence.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless appeX Protocol and its affiliates,
        contributors, officers, directors, employees, and agents from and against any claims,
        damages, losses, liabilities, costs, and expenses (including reasonable attorneys&rsquo;
        fees) arising out of or related to:
      </p>
      <ul>
        <li>Your access to or use of the Site or the Protocol.</li>
        <li>Your violation of these Terms.</li>
        <li>Your violation of any law or the rights of any third party.</li>
        <li>Any content or information you submit through the Site.</li>
      </ul>
      <p>
        We may assume the exclusive defense and control of any matter otherwise subject to
        indemnification by you, in which case you agree to cooperate with us at your expense.
      </p>

      <h2>11. Governing Law and Dispute Resolution</h2>
      <p>
        These Terms and any dispute arising out of or related to them, the Site, or the
        Protocol are governed by the laws of{" "}
        {/* TODO: replace with finalized copy from legal counsel. Original placeholder: "[JURISDICTION]" */}
        <mark className="pending">the applicable jurisdiction, to be confirmed upon entity formation</mark>, without regard to conflict of laws
        principles.
      </p>
      <p>
        {/* TODO: replace with finalized copy from legal counsel. Original placeholder: "[binding arbitration / the courts of JURISDICTION]" */}
        Any dispute that cannot be resolved informally will be resolved through{" "}
        <mark className="pending">a formal dispute resolution process to be specified upon entity formation</mark>,
        and you and appeX Protocol each waive the right to a jury trial and to participate
        in any class action or class-wide arbitration, to the extent permitted by applicable
        law.
      </p>
      <p>
        Before initiating a formal proceeding, you agree to contact us at{" "}
        <a href="mailto:support@appex.finance">support@appex.finance</a> and attempt in good faith to resolve
        the dispute for at least thirty (30) days.
      </p>
      <p>
        {/* TODO: replace with finalized copy from legal counsel. Original placeholder: "The team will finalize the arbitration provider, seat, language, and class-action waiver language based on the chosen jurisdiction." */}
        <mark className="pending">
          Additional dispute resolution details, including applicable rules, seat, and language,
          are pending finalization with legal counsel.
        </mark>
      </p>

      <h2>12. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. When we do, we will post the revised
        Terms on the Site and update the &ldquo;Effective date&rdquo; above. For material changes, we
        will provide additional notice through a banner on the Site or other reasonable means.
      </p>
      <p>
        Your continued use of the Site after the revised Terms take effect constitutes your
        acceptance of the changes. If you do not agree to the revised Terms, stop using the
        Site.
      </p>

      <h2>13. Miscellaneous</h2>
      <ul>
        <li>
          <strong>Severability.</strong> If any provision of these Terms is held to be
          unenforceable, the remaining provisions will remain in full force and effect.
        </li>
        <li>
          <strong>No waiver.</strong> Our failure to enforce any right or provision of these
          Terms is not a waiver of that right or provision.
        </li>
        <li>
          <strong>Assignment.</strong> You may not assign or transfer these Terms without our
          prior written consent. We may assign these Terms without notice.
        </li>
        <li>
          <strong>Entire agreement.</strong> These Terms, together with the Privacy Policy
          and Disclosures, are the entire agreement between you and appeX Protocol regarding
          the Site and supersede any prior agreements on that subject.
        </li>
        <li>
          <strong>No partnership.</strong> Nothing in these Terms creates a partnership,
          joint venture, employment, or agency relationship.
        </li>
        <li>
          <strong>Headings.</strong> Headings are for convenience only and do not affect
          interpretation.
        </li>
      </ul>

      <h2>Contact</h2>
      <p>Questions about these Terms can be directed to:</p>
      <p>
        {/* TODO: replace with finalized copy from legal counsel. Original placeholder: "[ENTITY ADDRESS IF PUBLIC]" */}
        appeX Protocol<br />
        <a href="mailto:support@appex.finance">support@appex.finance</a>
      </p>

    </LegalLayout>
  );
}
