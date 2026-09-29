import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent next dev from rewriting AGENTS.md every start
  agentRules: false,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      { source: "/wingchun", destination: "/", permanent: true },
      { source: "/wingchun/", destination: "/", permanent: true },
      { source: "/wingchun/wingchun.php", destination: "/wing-chun", permanent: true },
      {
        source: "/wingchun/graduierungssystem.php",
        destination: "/graduierung",
        permanent: true,
      },
      { source: "/wingchun/akademien.php", destination: "/akademien", permanent: true },
      { source: "/wingchun/erwachsene", destination: "/erwachsene", permanent: true },
      { source: "/wingchun/erwachsene/", destination: "/erwachsene", permanent: true },
      { source: "/wingchun/kinder", destination: "/kinder", permanent: true },
      { source: "/wingchun/kinder/", destination: "/kinder", permanent: true },
      {
        source: "/wingchun/kinder/wing-chun",
        destination: "/kinder/wing-chun",
        permanent: true,
      },
      {
        source: "/wingchun/kinder/wing-chun/",
        destination: "/kinder/wing-chun",
        permanent: true,
      },
      {
        source: "/wingchun/kinder/workout",
        destination: "/kinder/workout",
        permanent: true,
      },
      {
        source: "/wingchun/kinder/workout/",
        destination: "/kinder/workout",
        permanent: true,
      },
      { source: "/wingchun/aktuelles.php", destination: "/aktuelles", permanent: true },
      {
        source: "/wingchun/trainingszeiten",
        destination: "/trainingszeiten",
        permanent: true,
      },
      {
        source: "/wingchun/trainingszeiten/",
        destination: "/trainingszeiten",
        permanent: true,
      },
      {
        source: "/wingchun/bildergalerie",
        destination: "/galerie",
        permanent: true,
      },
      {
        source: "/wingchun/bildergalerie/",
        destination: "/galerie",
        permanent: true,
      },
      {
        source: "/wingchun/kontakt/kontakt.php",
        destination: "/kontakt",
        permanent: true,
      },
      { source: "/wingchun/impressum", destination: "/impressum", permanent: true },
      { source: "/wingchun/impressum/", destination: "/impressum", permanent: true },
      { source: "/wingchun/datenschutz", destination: "/datenschutz", permanent: true },
      { source: "/wingchun/datenschutz/", destination: "/datenschutz", permanent: true },
    ];
  },
};

export default nextConfig;
