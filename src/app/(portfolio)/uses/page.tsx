import CinematicGrid from "@/components/CinematicGrid";
import HeroUses from "@/components/uses/hero-uses";
import SiteData from "@/constants/siteData.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: SiteData.pages.uses.title,
  description: SiteData.pages.uses.description,
  keywords: SiteData.pages.uses.keywords,
  alternates: {
    canonical: "https://r44j.dev/uses",
  },
};

export const dynamic = "force-static";
export const revalidate = 3600;

export default function UsesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CinematicGrid />
      <div className="mx-auto max-w-6xl md:px-4 md:py-16">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
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
