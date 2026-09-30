import type { Metadata } from "next";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Wing Chun Stutensee — Lerne Dich zu verteidigen!",
    template: `%s · ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.sifu, url: site.url }],
  creator: site.legal.name,
  publisher: site.name,
  category: "sports",
  keywords: [
    "Wing Chun",
    "WingChun",
    "Selbstverteidigung",
    "Stutensee",
    "Igor Peic",
    "Probetraining",
    "Kampfkunst",
    "Kinder Wing Chun",
    "Akademie Stutensee",
  ],
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [{ url: "/llms.txt", title: "llms.txt" }],
      "application/json": [{ url: "/llms.json", title: "llms.json" }],
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title: "Wing Chun Stutensee — Lerne Dich zu verteidigen!",
    description: site.description,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1925,
        height: 1130,
        alt: "Wing Chun Stutensee Training",
      },
      {
        url: "/images/logo/logo-gold.png",
        width: 634,
        height: 626,
        alt: "Wing Chun Stutensee Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wing Chun Stutensee — Lerne Dich zu verteidigen!",
    description: site.description,
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "ai-content": "human-authored",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d0d0d" },
    { media: "(prefers-color-scheme: dark)", color: "#070707" },
  ],
  colorScheme: "dark" as const,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${fontVariables} h-full overflow-x-clip antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip font-sans antialiased">
        <SiteJsonLd />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
