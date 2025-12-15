import ServicesPageClient from "@/components/services/services-client";
import JsonLd from "@/components/JsonLd";
import { SeoManager } from "@/lib/seo/SeoManager";
import { Metadata } from "next";

export const metadata: Metadata = SeoManager.getPageMetadata("services");

export default function ServicesPage() {
  const servicesPageSchema = SeoManager.getWebPageSchema(
    "Services",
    "Professional development services including consultations, code reviews, and custom web development.",
    "/services"
  );

  const breadcrumbSchema = SeoManager.getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  return (
    <>
      <JsonLd data={[servicesPageSchema, breadcrumbSchema]} />
      <ServicesPageClient />
    </>
  );
}
