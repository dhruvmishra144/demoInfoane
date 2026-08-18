import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/config/site";

/**
 * Site-wide metadata.
 *
 * `metadataBase` is what lets Next resolve every relative canonical, Open Graph
 * and Twitter URL into an absolute one. Without it, crawlers see relative
 * og:url values and quietly ignore them.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    // Inner pages set only their own title; the brand suffix is appended here.
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Allow full-size image previews and unlimited snippet length, which is
      // what makes the page eligible for richer results.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Icons and the social share card come from the file conventions
  // (src/app/icon.svg, src/app/opengraph-image.tsx) — Next injects those link
  // and meta tags automatically, so declaring them here would duplicate them.
  //
  // Populated once you have the Search Console / Bing tokens.
  verification: {
    ...(site.verification.google ? { google: site.verification.google } : {}),
    ...(site.verification.bing ? { other: { "msvalidate.01": site.verification.bing } } : {}),
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d20" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `lang` is required for screen readers to pick the right voice and for
    // search engines to target the right locale.
    // `lang` is required for screen readers to pick the right voice and for
    // search engines to target the right locale.
    <html lang="en">
      {/* Deliberately bare: the public site's header, footer and JSON-LD live in
          the (site) group's layout, and the admin panel has its own chrome in
          (admin). A single root layout carrying the marketing header would either
          leak it into /admin or need runtime branching. */}
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
