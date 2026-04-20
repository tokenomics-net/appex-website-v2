/**
 * app/privacy/page.tsx
 *
 * Privacy Policy  --  wired from outputs/appex-website-build/copy/pre-launch/privacy-policy.md
 * Stays noindex until client confirms [TO CONFIRM] items (entity legal name,
 * jurisdiction, GDPR/CCPA blocks). Those items render as yellow-highlighted
 * .pending spans via LegalLayout so Tony sees what is pending.
 */

import type { Metadata } from "next";
import { BASE_URL } from "@/lib/site-config";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title:       "Privacy Policy | appeX Protocol",
  description: "How appeX Protocol handles information collected through appex.finance. GA4 only  --  no wallets, no emails, no advertising pixels.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
};

export default function PrivacyPage(): React.JSX.Element {
  return (
    <LegalLayout title="Privacy Policy">

      <h2>Who this policy is from</h2>
      <p>
        This policy describes how appeX Protocol (&ldquo;appeX,&rdquo; &ldquo;we,&rdquo; &ldquo;our&rdquo;) handles
        information collected through the website at appex.finance.
      </p>
      <p>
        appeX is a decentralized protocol. The website is a public, informational
        surface for the protocol. The protocol itself runs onchain. We do not operate
        user accounts, and we do not custody user funds. All wallet activity takes
        place on public blockchains outside of this website.
      </p>
      <p>
        Questions about this policy: <a href="mailto:support@appex.finance">support@appex.finance</a>.
      </p>
      <p>
        <mark className="pending">TO CONFIRM: entity legal name</mark>{" "}
        <mark className="pending">TO CONFIRM: legal jurisdiction</mark>{" "}
        <mark className="pending">TO CONFIRM: whether to add EU/UK GDPR-specific language or US CCPA-specific language</mark>
      </p>

      <h2>What we collect</h2>
      <p>One thing: Google Analytics (GA4).</p>
      <p>
        GA collects the standard set of analytics data on visits to appex.finance.
        That includes:
      </p>
      <ul>
        <li>Pages you view and the order you view them in</li>
        <li>How long you spend on a page</li>
        <li>The link or source that brought you to the site (referrer)</li>
        <li>Approximate geographic region, derived from IP</li>
        <li>Browser and device type (for example, Chrome on iOS, Firefox on Linux)</li>
        <li>A Google-assigned identifier stored in a cookie so GA can tell one session apart from another</li>
      </ul>
      <p>
        Google Analytics operates under its own privacy terms. Google may anonymize
        or truncate IP addresses before processing, depending on configuration. We
        use the default GA4 configuration with IP anonymization where supported.
      </p>

      <h2>What we do not collect</h2>
      <p>
        We want this to be explicit, because the standard DeFi-site reading is often
        &ldquo;what are they quietly taking.&rdquo; The honest answer is: nothing else.
      </p>
      <ul>
        <li>No email addresses (we do not run a newsletter, mailing list, or signup form)</li>
        <li>No names, addresses, or phone numbers</li>
        <li>No wallet addresses (we do not connect wallets on this website)</li>
        <li>No CRM or sales-tracking tools</li>
        <li>No advertising pixels (no Meta Pixel, no TikTok pixel, no LinkedIn Insight Tag)</li>
        <li>No session replay or heatmap tools (no Hotjar, no FullStory)</li>
        <li>No chat widgets that record conversations</li>
        <li>No cross-site tracking beyond the defaults that GA itself carries</li>
      </ul>
      <p>
        If you email us at <a href="mailto:support@appex.finance">support@appex.finance</a>,
        that email is handled through our regular business inbox. We only use it to
        reply to you.
      </p>

      <h2>How we use what GA gives us</h2>
      <p>
        We look at aggregated GA reports to understand which pages people read, what
        they skip, and where the site is slow. That is the only purpose.
      </p>
      <p>
        We do not build profiles of individual visitors. We do not share GA data
        with third parties outside of Google. We do not sell data. We do not use GA
        data for advertising.
      </p>

      <h2>Third parties</h2>
      <p>
        One third party: Google LLC, via Google Analytics 4. GA is a first-party-cookie
        analytics service that sends data to Google for processing.
      </p>
      <p>
        Google&rsquo;s privacy policy:{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          https://policies.google.com/privacy
        </a>.
      </p>
      <p>No other third party receives data from this website.</p>

      <h2>Cookies</h2>
      <p>
        The website sets only Google Analytics cookies. Specifics, with names and
        lifetimes, are in our{" "}
        <a href="/cookies">Cookie Policy</a>.
      </p>

      <h2>How to opt out</h2>
      <p>You can opt out of GA in three ways, any of which works:</p>
      <ol>
        <li>
          Install Google&rsquo;s official GA opt-out browser add-on:{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            https://tools.google.com/dlpage/gaoptout
          </a>.
        </li>
        <li>
          Block third-party cookies in your browser, or use a browser that blocks
          tracking cookies by default (for example, Brave or Safari with cross-site
          tracking prevention on).
        </li>
        <li>
          Use a content blocker or DNS-level blocker that filters{" "}
          <code>google-analytics.com</code> and <code>googletagmanager.com</code>.
        </li>
      </ol>
      <p>
        If GA is blocked, the site still works normally. Nothing on appex.finance
        depends on analytics running.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us what data we hold on you. For a typical visitor, the answer
        is: we hold aggregated GA visit data that cannot be traced back to you as an
        individual. We do not have an account of yours, because there is no account
        system.
      </p>
      <p>
        If you are in a jurisdiction with a general right to request deletion (for
        example, the EU under GDPR, or California under CCPA), you can email{" "}
        <a href="mailto:support@appex.finance">support@appex.finance</a> and we will
        honor the request to the extent the data exists in an identifiable form on
        our side.
      </p>
      <p>
        <mark className="pending">TO CONFIRM: if the client wants an explicit GDPR Data Subject Rights block or a California-specific CCPA block, add one here. The baseline above is the standard DeFi posture.</mark>
      </p>

      <h2>Children&rsquo;s privacy</h2>
      <p>
        This website is not directed at children under 13. We do not knowingly
        collect information from children. If you are under 13, do not use the
        website.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy. When we do, we will change the effective date
        at the top and note the change in the site&rsquo;s commit history (the website
        is open source). Material changes will be posted visibly on the site before
        taking effect.
      </p>

    </LegalLayout>
  );
}
