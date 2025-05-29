import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Page",
  description: "Internal test page - not for public access",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
  // Additional meta tags to prevent indexing
  other: {
    "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex, nocache",
  },
};
