import HomePageClient from "@/components/home/home-client";
import { SeoManager } from "@/lib/seo/SeoManager";
import { Metadata } from "next";

export const metadata: Metadata = SeoManager.getPageMetadata("home");

export default function HomePage() {
  return <HomePageClient />;
}
