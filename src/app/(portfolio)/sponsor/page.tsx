import SponsorPageClient from "@/components/sponsor/sponsor-client";
import JsonLd from "@/components/JsonLd";
import { SeoManager } from "@/lib/seo/SeoManager";
import { Metadata } from "next";

export const metadata: Metadata = SeoManager.getPageMetadata("sponsor");

export default function SponsorPage() {
  const sponsorPageSchema = SeoManager.getWebPageSchema(
    "Sponsor",
    "Partner with R44J to reach developers interested in productivity tools and modern web development.",
    "/sponsor"
  );

  const breadcrumbSchema = SeoManager.getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Sponsor", url: "/sponsor" },
  ]);

  return (
    <>
      <JsonLd data={[sponsorPageSchema, breadcrumbSchema]} />
      <SponsorPageClient />
    </>
  );
}
