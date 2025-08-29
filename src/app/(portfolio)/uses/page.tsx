import JsonLd from "@/components/JsonLd";
import HeroUses from "@/components/uses/hero-uses";
import { SeoManager } from "@/lib/seo/SeoManager";
import { Metadata } from "next";

export const metadata: Metadata = SeoManager.getPageMetadata("uses");

export const dynamic = "force-static";
export const revalidate = 3600;

export default function UsesPage() {
  const usesPageSchema = SeoManager.getWebPageSchema(
    "My Tech Stack: Tools I Use for Work and Life",
    "Explore the tools and technologies that power my daily workflow, from hardware to software.",
    "/uses"
  );

  const breadcrumbSchema = SeoManager.getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Uses", url: "/uses" },
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd data={[usesPageSchema, breadcrumbSchema]} />

      <div className="mx-auto max-w-6xl px-4 py-16 md:pt-44">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-3xl sm:text-4xl font-bold md:text-5xl">
            My Digital Toolkit
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            A curated collection of devices and tools that power my productivity
            and creativity.
          </p>
        </header>

        <HeroUses />
      </div>
    </main>
  );
}
