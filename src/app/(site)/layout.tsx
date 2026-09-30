import { CookieBanner } from "@/components/legal/cookie-banner";
import { CookieConsentProvider } from "@/components/legal/cookie-consent-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CookieConsentProvider>
      <div className="flex min-h-full flex-1 flex-col bg-background text-foreground">
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
        <CookieBanner />
      </div>
    </CookieConsentProvider>
  );
}
