import CinematicBackground from "@/components/CinematicGrid";
import { ContextAwareCursor } from "@/components/cursors/context-aware-cursor";
import { DisableDraftMode } from "@/components/draft-mode/DisableDraftMode";
import JsonLd from "@/components/JsonLd";
import { PostHogProvider } from "@/components/PostHogProvider";
import siteData from "@/constants/siteData.json";
import { SeoManager } from "@/lib/seo/SeoManager";
import { ThemeProvider } from "@/providers/theme-provider";
import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity";
import { Geist, Geist_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = SeoManager.getWebsiteSchema();
  const personSchema = SeoManager.getPersonSchema();

  return (
    <ClerkProvider dynamic>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased selection:text-purple-100 selection:bg-purple-600`}
        >
          <JsonLd data={[websiteSchema, personSchema]} />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Script
              type="text/javascript"
              src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <CinematicBackground />
            {(await draftMode()).isEnabled && (
              <>
                <DisableDraftMode />
                <VisualEditing />
              </>
            )}
            <ContextAwareCursor />
            <PostHogProvider>{children}</PostHogProvider>
            <SanityLive />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
