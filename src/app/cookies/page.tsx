/**
 * app/cookies/page.tsx
 *
 * Cookie Policy  --  wired from outputs/appex-website-build/copy/pre-launch/cookie-policy.md
 * Stays noindex  --  no [TO CONFIRM] items in cookie policy, but keeping consistent
 * with other legal pages until client signs off on all three simultaneously.
 */

import type { Metadata } from "next";
import { BASE_URL } from "@/lib/site-config";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title:       "Cookie Policy | appeX Protocol",
  description: "appex.finance uses Google Analytics 4 only. No advertising cookies, no tracking pixels, no session replay.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: `${BASE_URL}/cookies`,
  },
};

export default function CookiesPage(): React.JSX.Element {
  return (
    <LegalLayout title="Cookie Policy">

      <h2>What cookies are</h2>
      <p>
        A cookie is a small text file a website stores on your device so it can
        recognize return visits and measure activity. Cookies can be first-party
        (set by the site you are on) or third-party (set by another service the
        site loads). They can be session-only (deleted when you close the browser)
        or persistent (kept for a set lifetime).
      </p>

      <h2>Cookies this site uses</h2>
      <p>
        One category: Google Analytics 4. That is it. We do not use advertising
        cookies, marketing cookies, cross-site tracking cookies, or third-party
        cookies beyond what GA itself sets.
      </p>

      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Set by</th>
            <th>Purpose</th>
            <th>Type</th>
            <th>Lifetime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>_ga</code></td>
            <td>Google Analytics</td>
            <td>Distinguishes one visitor from another so pageview counts are not inflated</td>
            <td>First-party</td>
            <td>2 years</td>
          </tr>
          <tr>
            <td><code>_ga_&lt;container-id&gt;</code></td>
            <td>Google Analytics</td>
            <td>Maintains session state for GA4 property reporting (the container ID is specific to our GA4 property)</td>
            <td>First-party</td>
            <td>2 years</td>
          </tr>
          <tr>
            <td><code>_gid</code></td>
            <td>Google Analytics</td>
            <td>Distinguishes one visitor from another (daily resolution)</td>
            <td>First-party</td>
            <td>24 hours</td>
          </tr>
          <tr>
            <td><code>_gat_gtag_&lt;id&gt;</code></td>
            <td>Google Tag Manager / GA</td>
            <td>Throttles request rate to Google Analytics so the site does not overwhelm the service</td>
            <td>First-party</td>
            <td>1 minute</td>
          </tr>
        </tbody>
      </table>

      <p>
        Exact cookie names and lifetimes are set by Google and may change. The
        authoritative reference is Google&rsquo;s documentation:{" "}
        <a
          href="https://developers.google.com/analytics/devguides/collection/ga4/cookies-user-id"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://developers.google.com/analytics/devguides/collection/ga4/cookies-user-id
        </a>.
      </p>

      <h2>Cookies we do not use</h2>
      <ul>
        <li>No advertising cookies (Google Ads, Meta, LinkedIn Ads, TikTok Ads, Reddit Ads, none of them)</li>
        <li>No remarketing or retargeting pixels</li>
        <li>No session replay or heatmap cookies (Hotjar, FullStory, Microsoft Clarity, none of them)</li>
        <li>No chat widget cookies</li>
        <li>No consent-management platform cookies (we do not need one, because we only run GA)</li>
        <li>No affiliate tracking cookies</li>
        <li>No social share widgets that set tracking cookies</li>
      </ul>

      <h2>How to opt out</h2>
      <p>Any of these methods works. You do not need to do more than one.</p>
      <ol>
        <li>
          Install Google&rsquo;s official GA opt-out add-on for Chrome, Firefox, Safari,
          Edge, and Opera:{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            https://tools.google.com/dlpage/gaoptout
          </a>.
        </li>
        <li>
          Block third-party cookies in your browser settings. Most modern browsers
          (Safari, Firefox, Brave) block tracking cookies by default.
        </li>
        <li>
          Use a content blocker or DNS blocker that filters{" "}
          <code>google-analytics.com</code> and <code>googletagmanager.com</code>.
          uBlock Origin and NextDNS both do this out of the box.
        </li>
        <li>
          Clear cookies for appex.finance at any time through your browser&rsquo;s
          privacy settings.
        </li>
      </ol>
      <p>
        If you block our GA cookies, the site works normally. None of the
        Site&rsquo;s functionality depends on analytics.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy. The effective date above reflects the most
        recent version. The Site is open source; historical versions are in the
        repository commit history.
      </p>

    </LegalLayout>
  );
}
