import type { Config } from "tailwindcss";

/**
 * tailwind.config.ts
 *
 * Tailwind v4 — brand tokens live in globals.css @theme inline block.
 * This file handles content scanning and any utility-class-accessible
 * extensions that cannot be expressed via CSS custom properties alone.
 *
 * DO NOT hardcode hex values here. Reference CSS variables from globals.css.
 */

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tektur: ["var(--font-tektur)", "system-ui", "sans-serif"],
        hubot:  ["var(--font-hubot)",  "system-ui", "sans-serif"],
      },
      colors: {
        "ax-yellow":       "var(--ax-capital-yellow)",
        "ax-purple":       "var(--ax-node-purple)",
        "ax-ink":          "var(--ax-fortress)",
        "ax-mist":         "var(--ax-ether-mist)",
        "ax-card":         "var(--ax-card-bg)",
        "ax-border":       "var(--ax-fortress-border)",
      },
      screens: {
        "xl2": "1440px",
      },
      maxWidth: {
        "site": "1440px",
        "content": "1280px",
      },
      transitionTimingFunction: {
        "enter": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
};

export default config;
