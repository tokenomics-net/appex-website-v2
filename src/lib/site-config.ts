/**
 * site-config.ts
 *
 * Single source of truth for all appeX Protocol site values.
 * Source: outputs/appex-website-build/decisions.md section 11
 * Values are retyped here per the decisions spec  --  no file copying.
 *
 * Every label, href, and business value on the site traces to this file.
 * DO NOT hardcode these values in component files.
 */

// ---- Core identity ----

export const BASE_URL     = "https://appex.finance";
export const BUSINESS_NAME = "appeX Protocol";
export const FULL_NAME    = "appeX Protocol";
export const TAGLINE      = "Settlement as a Service";
export const DESCRIPTION  = "appeX will close the gap between earned revenue and received cash. LPs will earn from borrower fees. Borrowers will draw against verified revenue.";

// ---- Contact ----

export const SUPPORT_EMAIL = "support@appex.finance";

// PHONE, PHONE_HREF, ADDRESS are intentionally empty for appeX (no physical location)
export const PHONE         = "";
export const PHONE_HREF    = "";
export const EMAIL         = SUPPORT_EMAIL;

export const ADDRESS = {
  street:  "",
  city:    "",
  state:   "",
  zip:     "",
  country: "US",
};

// ---- Socials ----
// Discord and Telegram intentionally omitted until Tony confirms (decisions.md §11)

export const SOCIALS = {
  x:        "https://x.com/appexprotocol",
  linkedin: "https://www.linkedin.com/company/appex-protocol/",
  discord:  "",
  telegram: "",
} as const;

// ---- Docs ----

export const DOCS = {
  home:     "https://docs.appex.finance",
  faq:      "https://docs.appex.finance/faq",
  glossary: "https://docs.appex.finance/glossary",
} as const;

// ---- SEO defaults ----

export const DEFAULT_DESCRIPTION =
  "appeX will close the gap between earned revenue and received cash. LPs will earn from borrower fees. Borrowers will draw against verified revenue.";

export const THEME_COLOR = "#0A0F1F";

// ---- Geo (intentionally empty  --  no physical location) ----

export const GEO = { lat: 0, lng: 0 };

// ---- OG image ----

export const OG_IMAGE = `${BASE_URL}/og-default.png`;

// ---- siteConfig convenience object ----

export const siteConfig = {
  name:         BUSINESS_NAME,
  fullName:     FULL_NAME,
  tagline:      TAGLINE,
  description:  DESCRIPTION,
  url:          BASE_URL,
  ogImage:      OG_IMAGE,
  supportEmail: SUPPORT_EMAIL,
  email:        EMAIL,
  phone:        PHONE,
  phoneHref:    PHONE_HREF,
  address:      ADDRESS,
  socials:      SOCIALS,
  docs:         DOCS,
  themeColor:   THEME_COLOR,
  geo:          GEO,
} as const;
