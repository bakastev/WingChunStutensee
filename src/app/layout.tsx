import type { Metadata } from "next";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
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
  keywords: [
    "Wing Chun",
    "WingChun",
    "Selbstverteidigung",
    "Stutensee",
    "Igor Peic",
    "Probetraining",
    "Kampfkunst",
    "Kinder Wing Chun",
  ],
  alternates: { canonical: "/" },
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
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wing Chun Stutensee — Lerne Dich zu verteidigen!",
    description: site.description,
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
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
      <body className="flex min-h-full flex-col overflow-x-clip bg-background font-sans text-foreground">
        <ConvexClientProvider>
          <a
            href="#inhalt"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-5 focus:py-3 focus:font-sans focus:text-[0.75rem] focus:uppercase focus:tracking-[0.16em] focus:text-accent-foreground"
          >
            Zum Inhalt springen
          </a>
          <SiteHeader />
          <main id="inhalt" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
