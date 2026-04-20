/**
 * lib/og-fonts.ts
 *
 * Font loader for next/og ImageResponse.
 * Reads TTF files from public/fonts/ at runtime (Node.js environment).
 * Used by all opengraph-image.tsx route handlers.
 *
 * Two weights:
 *   - Tektur Regular (400) for headings in OG cards
 *   - Hubot Sans Regular (400) for body text in OG cards
 *
 * next/og accepts fonts as ArrayBuffer via the `fonts` option.
 */

import { readFileSync } from "fs";
import path from "path";

export interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600 | 700;
  style: "normal";
}

let _fonts: OgFont[] | null = null;

export function getOgFonts(): OgFont[] {
  // Cache after first load  --  font files don't change at runtime
  if (_fonts) return _fonts;

  const fontsDir = path.join(process.cwd(), "public", "fonts");

  const tekturRegular = readFileSync(
    path.join(fontsDir, "tektur", "Tektur-Regular.ttf")
  ).buffer as ArrayBuffer;

  const tekturBold = readFileSync(
    path.join(fontsDir, "tektur", "Tektur-Bold.ttf")
  ).buffer as ArrayBuffer;

  const hubotRegular = readFileSync(
    path.join(fontsDir, "hubot-sans", "HubotSans-Regular.ttf")
  ).buffer as ArrayBuffer;

  _fonts = [
    { name: "Tektur",     data: tekturRegular, weight: 400, style: "normal" },
    { name: "Tektur",     data: tekturBold,    weight: 700, style: "normal" },
    { name: "Hubot Sans", data: hubotRegular,  weight: 400, style: "normal" },
  ];

  return _fonts;
}
