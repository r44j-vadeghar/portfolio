import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import SiteData from "@/constants/siteData.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: SiteData.default.title,
  description: SiteData.default.description,
};

export const dynamic = "force-static";
export const revalidate = 3600;

export default function HomePage() {
  return (
    <main className="flex min-h-screen w-full flex-col gap-10 md:gap-14 px-4 py-12 pt-44 sm:px-6 lg:px-8 bg-background text-foreground">
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
    </main>
  );
}
