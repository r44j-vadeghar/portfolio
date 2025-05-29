import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/xerox", "/privacy-policy", "/uniconnect", "/test"],
    },
    sitemap: `${
      process.env.VERCEL_URL ? process.env.VERCEL_URL : "https://r44j.dev"
    }/sitemap-index.xml`,
  };
}
