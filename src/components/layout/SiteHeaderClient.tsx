"use client";

/**
 * SiteHeaderClient.tsx
 *
 * Client island  --  manages scroll state and mobile drawer toggle.
 * Justification for "use client": scroll event listener, useState for drawer,
 * and data-scrolled attribute mutation require client-side code.
 *
 * Per navigation-spec.md:
 * - 0 to 80px: transparent background
 * - 80px+: glass + blur, height shrinks 72 to 64px
 * - No hide-on-scroll (institutional sites keep nav visible)
 */

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { MobileNavDrawer } from "./MobileNavDrawer";
import type { NavConfig } from "./nav-config";

interface SiteHeaderClientProps {
  config: NavConfig;
}

export function SiteHeaderClient({ config }: SiteHeaderClientProps) {
  const [scrolled, setScrolled]         = useState(false);
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const headerRef                       = useRef<HTMLDivElement>(null);
  const hamburgerRef                    = useRef<HTMLButtonElement>(null);

  const handleScroll = useCallback(() => {
    const past = window.scrollY > 80;
    setScrolled(past);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // When drawer closes, return focus to hamburger trigger
  const handleClose = useCallback(() => {
    setDrawerOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  return (
    <>
      {/* Header styles live in globals.css  --  extracted from inline <style> so they
          load via the external stylesheet in <head> rather than a body-injected
          <style> tag. Guarantees consistent cascade order across all browsers. */}

      <div
        ref={headerRef}
        className={`site-header${scrolled ? " is-scrolled" : ""}`}
        role="none"
      >
        <div className="site-header__inner">
          <a href="/" className="site-header__logo" aria-label="appeX, go to homepage">
            <img
              src="/brand/appex-mark.svg"
              alt="" aria-hidden="true"
              width={32}
              height={32}
              className="mark"
            />
            <img
              src="/brand/appex-wordmark.svg"
              alt="appeX"
              width={120}
              height={32}
              className="wordmark"
            />
          </a>

          <nav aria-label="Primary" className="site-header__nav">
            {config.primaryLinks.map((link) => (
              <NavLinkItem key={link.href} href={link.href} label={link.label} external={link.external} />
            ))}
          </nav>

          <div className="site-header__ctas" />

          <button
            ref={hamburgerRef}
            className="site-header__hamburger"
            aria-label="Open navigation"
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setDrawerOpen(true)}
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {drawerOpen && (
        <MobileNavDrawer
          config={config}
          isOpen={drawerOpen}
          onClose={handleClose}
        />
      )}
    </>
  );
}

// Internal nav link  --  uses .header-nav-link class defined in globals.css.
// No per-instance <style> tag: that pattern created 7 duplicate style elements.
//
// next/link is used for internal routes so Next.js App Router can prefetch the
// RSC payload on hover/focus, enabling instant client-side navigation and
// allowing the browser to discover + fetch hero images sooner after click.
// External links fall back to a plain <a> (next/link does not handle external hrefs).
function NavLinkItem({ href, label, external }: { href: string; label: string; external?: boolean }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="header-nav-link"
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className="header-nav-link">
      {label}
    </Link>
  );
}
