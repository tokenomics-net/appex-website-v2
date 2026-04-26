/**
 * app/privacy/page.tsx
 *
 * Privacy Policy  --  copy from outputs/appex-asset-harmonization/legal-copy/privacy.md
 * Indexed: robots set to index/follow per legal review sign-off.
 * Cookie section is inline here (no separate /cookies page -- folded per spec).
 *
 * [TO CONFIRM] items remain for: entity legal name, jurisdiction, GDPR/CCPA blocks.
 */

import type { Metadata } from "next";
import { BASE_URL } from "@/lib/site-config";
import { OG_IMAGE } from "@/lib/og";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title:       "Privacy Policy",
  description: "How appeX Protocol handles information collected through appex.finance. GA4 only -- no wallets, no emails, no advertising pixels.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
  openGraph: {
    title:       "Privacy Policy | appeX Protocol",
    description: "How appeX Protocol handles information collected through appex.finance. GA4 only -- no wallets, no emails, no advertising pixels.",
    type:        "website",
    url:         `${BASE_URL}/privacy`,
    images: [OG_IMAGE],
  },
  twitter: {
    card:        "summary_large_image",
    site:        "@appexprotocol",
    title:       "Privacy Policy | appeX Protocol",
    description: "How appeX Protocol handles information collected through appex.finance. GA4 only -- no wallets, no emails, no advertising pixels.",
    images:      [OG_IMAGE.url],
  },
};

export default function PrivacyPage(): React.JSX.Element {
  return (
    <LegalLayout title="Privacy Policy">

      <p>
        <strong>Effective date:</strong> April 24, 2026
        <br />
        <strong>Entity:</strong> appeX Protocol
      </p>

      <p>
        This Privacy Policy describes how appeX Protocol (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
        collects and handles information when you visit appex.finance and related subdomains
        (the &ldquo;Site&rdquo;). It also explains what we do not collect, which is much of what you
        might expect.
      </p>
      <p>
        If you have questions about this policy or want to exercise a right described below,
        contact us at <a href="mailto:support@appex.finance">support@appex.finance</a>.
      </p>

      <h2>1. Summary</h2>
      <p>
        We run a website. The only analytics tool we use is Google Analytics 4 (GA4), with
        default settings. We do not use advertising pixels, retargeting tags, or third-party
        trackers beyond Google Analytics. We do not sell personal information. We do not build
        user profiles. If you connect a wallet to interact with the Protocol, your wallet
        address is visible on the public blockchain, but we do not link it to your identity
        on our servers.
      </p>
      <p>This section is a summary. The rest of this policy is the full picture.</p>

      <h2>2. What We Collect</h2>
      <p>
        Through Google Analytics 4, we collect standard web analytics data, including:
      </p>
      <ul>
        <li>Pages you view on the Site and the order you view them in.</li>
        <li>
          Approximate geographic location, derived from IP address and truncated by Google
          before it reaches us.
        </li>
        <li>
          Device and browser metadata, such as browser type, operating system, screen size,
          and device category.
        </li>
        <li>
          Referral source, such as the site that linked you to us or the search engine you
          came from.
        </li>
        <li>Session duration and basic interaction events, such as clicks on outbound links.</li>
      </ul>
      <p>
        We do not receive your full IP address. Google Analytics anonymizes IP addresses by
        default in GA4 and processes them only to derive coarse location signals.
      </p>
      <p>
        If you choose to submit information to us (for example, by emailing{" "}
        <a href="mailto:support@appex.finance">support@appex.finance</a> or filling out a form we publish
        later), we receive whatever you send. We use that information only to respond to you
        or to handle the request you made.
      </p>
      <p>
        If you connect a wallet on the Site, your wallet address is used by the frontend to
        route transactions to the appropriate smart contract. Wallet addresses and on-chain
        transactions are public by design on the blockchain.
      </p>

      <h2>3. What We Do Not Collect</h2>
      <p>
        We want to be specific about this, because many privacy policies overclaim.
      </p>
      <ul>
        <li>
          We do not collect your name, email, phone number, mailing address, or government
          ID, unless you send us that information yourself.
        </li>
        <li>
          We do not set advertising cookies, conversion pixels, retargeting tags, or similar
          trackers.
        </li>
        <li>
          We do not use Meta Pixel, TikTok Pixel, LinkedIn Insight Tag, X Pixel, Google Ads
          tags, or any other ad-network tracking.
        </li>
        <li>We do not sell, rent, or trade personal information.</li>
        <li>We do not build cross-site behavioral profiles of visitors.</li>
        <li>
          We do not link your wallet address to any off-chain identifier on our servers.
        </li>
        <li>
          We do not capture passwords, seed phrases, or private keys. If a page ever asks
          you for a seed phrase, you are not on a real appeX Protocol site.
        </li>
      </ul>
      <p>
        If we ever add new categories of collection (for example, a newsletter signup), we
        will update this policy and note the change.
      </p>

      <h2 id="cookies">4. Cookies and Similar Technologies</h2>
      <p>
        We do not have a separate cookie policy because there is not enough to say for one.
        Here is the full list.
      </p>
      <p>
        Google Analytics 4 sets a small number of first-party cookies (typically named{" "}
        <code>_ga</code> and <code>_ga_&lt;ID&gt;</code>) to distinguish unique sessions and
        users. No third party drops cookies through our Site.
      </p>
      <p>You can control Google Analytics in several ways:</p>
      <ul>
        <li>
          Use your browser&rsquo;s cookie settings to block, limit, or delete cookies for
          appex.finance.
        </li>
        <li>
          Install the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics Opt-Out Browser Add-on
          </a>
          , which prevents GA from receiving data on any site.
        </li>
        <li>
          Use a browser that blocks third-party analytics by default (such as Brave or
          Firefox with strict tracking protection).
        </li>
        <li>
          Decline analytics consent on our cookie banner, where a banner is shown. In
          jurisdictions that require consent for analytics cookies (for example, the
          European Economic Area and the United Kingdom), we do not load Google Analytics
          until you consent.
        </li>
      </ul>
      <p>
        The Site uses a small number of strictly necessary cookies to remember your consent
        choices and preferences. These cannot be turned off without breaking basic Site
        functionality.
      </p>

      <h2>5. Legal Basis for Processing</h2>
      <p>
        For visitors in the European Economic Area, the United Kingdom, or Switzerland, the
        legal bases we rely on are:
      </p>
      <ul>
        <li>
          <strong>Legitimate interest</strong> for aggregate analytics, Site security, and
          fraud prevention, where those interests are not overridden by your rights.
        </li>
        <li>
          <strong>Consent</strong> for any analytics cookies or similar technologies that
          require consent under applicable law. You can withdraw consent at any time through
          the cookie banner or your browser settings.
        </li>
        <li>
          <strong>Contract and pre-contract</strong> when you send us a message or request
          that requires a response.
        </li>
        <li>
          <strong>Legal obligation</strong> when we are required by law to retain or disclose
          information.
        </li>
      </ul>

      <h2>6. Your Rights</h2>
      <p>
        Depending on where you live, you may have rights regarding your personal information,
        including:
      </p>
      <ul>
        <li>
          <strong>Access.</strong> Request a copy of the personal information we hold about
          you.
        </li>
        <li>
          <strong>Correction.</strong> Request correction of inaccurate personal information.
        </li>
        <li>
          <strong>Deletion.</strong> Request deletion of personal information we hold about
          you.
        </li>
        <li>
          <strong>Objection and restriction.</strong> Object to or ask us to restrict certain
          processing.
        </li>
        <li>
          <strong>Portability.</strong> Request a machine-readable copy of information you
          provided to us.
        </li>
        <li>
          <strong>Opt out of sale or sharing.</strong> We do not sell or share personal
          information for cross-context behavioral advertising, so there is nothing to opt
          out of, but you have the right to ask.
        </li>
        <li>
          <strong>Non-discrimination.</strong> We will not discriminate against you for
          exercising a right.
        </li>
      </ul>
      <p>
        To exercise a right, email <a href="mailto:support@appex.finance">support@appex.finance</a>. We will
        verify your request using the information you provide and respond within the time
        required by applicable law, typically 30 to 45 days. We may need to ask for
        additional information to confirm your identity.
      </p>
      <p>
        If you are in the European Economic Area or the United Kingdom, you also have the
        right to lodge a complaint with your local supervisory authority.
      </p>

      <h2>7. Data Retention</h2>
      <p>
        Google Analytics retains event-level data according to the retention setting
        configured in our GA4 property. We use the default retention period set by Google.
        Aggregate and anonymized reports may be kept for longer. Correspondence you send to{" "}
        <a href="mailto:support@appex.finance">support@appex.finance</a> is kept for as long as needed to
        resolve your request and for a reasonable period afterward for record-keeping.
      </p>
      <p>If we change our retention settings, we will note the change here.</p>

      <h2>8. Third-Party Sharing</h2>
      <p>We share information only in limited ways:</p>
      <ul>
        <li>
          <strong>Google Analytics.</strong> Analytics events are processed by Google LLC as
          our data processor. Google&rsquo;s handling of that data is governed by the{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Privacy Policy
          </a>{" "}
          and the{" "}
          <a
            href="https://marketingplatform.google.com/about/analytics/terms/us/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics Terms
          </a>
          .
        </li>
        <li>
          <strong>Infrastructure providers.</strong> Our hosting, DNS, and CDN providers
          process traffic to deliver the Site. They see request metadata as part of normal
          Site delivery.
        </li>
        <li>
          <strong>Legal and safety.</strong> We may disclose information if required by a
          valid legal process or where we believe disclosure is necessary to investigate fraud,
          prevent harm, or enforce our{" "}
          <a href="/terms">Terms and Conditions</a>.
        </li>
      </ul>
      <p>
        We do not share information with advertising networks, data brokers, or analytics
        providers beyond Google Analytics.
      </p>

      <h2>9. Children&rsquo;s Privacy</h2>
      <p>
        The Site is not directed to children under 18. We do not knowingly collect
        information from anyone under 18. If you believe a child has submitted information
        to us, contact <a href="mailto:support@appex.finance">support@appex.finance</a> and we will delete it.
      </p>

      <h2>10. International Transfers</h2>
      <p>
        Google Analytics processes data on servers located in the United States and other
        jurisdictions. If you access the Site from outside the United States, analytics data
        about your visit is transferred to and processed in jurisdictions whose data protection
        laws may differ from your own.
      </p>
      <p>
        Where required by law, transfers out of the European Economic Area or the United
        Kingdom rely on Standard Contractual Clauses adopted by the European Commission,
        supplementary measures as needed, and the relevant vendor&rsquo;s own transfer framework
        (for Google, this includes its certification under applicable frameworks).
      </p>

      <h2>11. Security</h2>
      <p>
        We take reasonable measures to protect information collected through the Site from
        loss, misuse, and unauthorized access. No system is perfectly secure. You are
        responsible for keeping your wallet, keys, and devices secure. We will never ask you
        for your seed phrase or private keys.
      </p>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will post the
        revised policy on the Site and update the &ldquo;Effective date&rdquo; above. For material
        changes, we will provide additional notice through a banner on the Site or other
        reasonable means.
      </p>

      <h2>Contact</h2>
      <p>To exercise a right, ask a question, or report a concern:</p>
      <p><a href="mailto:support@appex.finance">support@appex.finance</a></p>

    </LegalLayout>
  );
}
