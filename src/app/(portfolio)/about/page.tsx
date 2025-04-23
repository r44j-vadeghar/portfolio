import AboutPageClient from "@/components/about/about-client";
import JsonLd from "@/components/JsonLd";
import { SeoManager } from "@/lib/seo/SeoManager";
import { Metadata } from "next";

export const metadata: Metadata = SeoManager.getPageMetadata("about");

export default function AboutPage() {
  const aboutPageSchema = SeoManager.getWebPageSchema(
    "About Me",
    "Full Stack Developer with 3 years of experience across startups and enterprise environments.",
    "/about"
  );

  const breadcrumbSchema = SeoManager.getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <>
      <JsonLd data={[aboutPageSchema, breadcrumbSchema]} />
      <AboutPageClient />;
    </>
  );
}
