import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import siteData from "@/constants/siteData.json";
import "@fontsource/outfit";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Script from "next/script"; // Import Script component
import "../globals.css";

export const metadata: Metadata = {
  title: siteData.default.title,
  description: siteData.default.description,
  keywords: siteData.default.keywords,
  authors: [{ name: "R44J Vadeghar" }],
  robots: "index, follow",
  openGraph: {
    title: siteData.default.openGraph.title,
    description: siteData.default.openGraph.description,
    type: siteData.default.openGraph.type as "website",
    url: siteData.default.openGraph.url,
    images: [{ url: siteData.default.openGraph.image }],
    siteName: siteData.default.openGraph.title,
  },
  twitter: {
    title: siteData.default.twitter.title,
    description: siteData.default.twitter.description,
    creator: siteData.default.twitter.creator,
  },
  icons: {
    icon: "/icon-256x256.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="sitemap" href="/sitemap.xml" />
      </head>
      <body className="relative antialiased">
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T3FDZDQ2');`}
        </Script>

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8750631183642200"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* AMP Ads */}
        <Script
          async
          custom-element="amp-ad"
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
          strategy="afterInteractive"
        />

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            title="google-tag-manager"
            src="https://www.googletagmanager.com/ns.html?id=GTM-T3FDZDQ2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
