/**
 * SiteHeader.tsx
 *
 * Server Component shell  --  renders the skip-to-content link, the persistent
 * nav-gradient scrim (from variant-a reference), and delegates scroll state +
 * mobile drawer to SiteHeaderClient (client island).
 *
 * Server Component is appropriate here: no browser APIs needed at the shell level.
 * The client boundary is drawn at SiteHeaderClient to keep the island minimal.
 *
 * nav-gradient: fixed dark-to-transparent scrim ported from variant-a-liquidity-field/index.html
 *   height 140px, rgba(10,15,31,0.85) -> transparent
 *   z-index 99 (below header at 100, above page content)
 *   Provides atmospheric backdrop behind nav links at all scroll positions.
 *   Ensures nav links are readable before the is-scrolled glass activates.
 *   Coexists with is-scrolled: glass sits above the scrim once scrolled.
 */

import { navConfig } from "./nav-config";
import { SiteHeaderClient } from "./SiteHeaderClient";

export function SiteHeader() {
  return (
    <header role="banner">
      {/* Skip-to-content: first focusable element in DOM per navigation-spec.md */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {/* Persistent top-gradient scrim  --  ported from variant-a reference.
          Provides dark atmospheric falloff at the top of every page so nav
          links are always readable regardless of scroll position or page type.
          CSS lives in globals.css under .nav-gradient. */}
      <div className="nav-gradient" aria-hidden="true" />

      <SiteHeaderClient config={navConfig} />
    </header>
  );
}
