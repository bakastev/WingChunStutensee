import {
  Cormorant_Garamond,
  Inter,
  Playfair_Display,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/**
 * CJK: next/font Noto Serif SC only ships latin subsets.
 * Prefer installed system faces (Songti SC / Noto Serif CJK / Source Han).
 */
export const fontVariables = [
  inter.variable,
  playfair.variable,
  cormorant.variable,
].join(" ");
