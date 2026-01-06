import AboutPageClient from "@/components/about/about-client";
import JsonLd from "@/components/JsonLd";
import { SeoManager } from "@/lib/seo/SeoManager";
import { Metadata } from "next";

export const metadata: Metadata = SeoManager.getPageMetadata("about");

export default function AboutPage() {
  const profilePageSchema = SeoManager.getProfilePageSchema();
  const personSchema = SeoManager.getPersonSchema();

  const breadcrumbSchema = SeoManager.getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About Raj Vadeghar", url: "/about" },
  ]);

  // FAQ schema for rich snippets - helps with name-based searches
  const faqSchema = SeoManager.getFAQSchema([
    {
      question: "Who is Raj Vadeghar?",
      answer:
        "Raj Vadeghar, also known as Raja Narayana Vadeghar or R44J, is a Senior Full Stack Developer with 3+ years of experience building complex web applications, Chrome extensions, and cloud infrastructure. He specializes in React, Next.js, TypeScript, AI integration, and real-time systems.",
    },
    {
      question: "What does R44J mean?",
      answer:
        "R44J is the online alias and brand name used by Raj Vadeghar. It represents his identity as a developer and content creator in the tech community.",
    },
    {
      question: "What services does Raj Vadeghar offer?",
      answer:
        "Raj Vadeghar offers full-stack development services including complex web applications, Chrome extension development, AI integration, real-time systems with WebSockets, WhatsApp Business API solutions, and cloud infrastructure setup with AWS and Terraform.",
    },
    {
      question: "Where is Raj Vadeghar based?",
      answer:
        "Raj Vadeghar is based in India and works with clients globally, currently as a Senior Full Stack Developer at Manifold Ventures.",
    },
  ]);

  return (
    <>
      <JsonLd
        data={[profilePageSchema, personSchema, breadcrumbSchema, faqSchema]}
      />
      <AboutPageClient />
    </>
  );
}
