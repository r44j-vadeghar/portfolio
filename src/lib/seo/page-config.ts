import siteData from "@/constants/siteData.json";
import { PageSeoConfig } from "./types";

export const pageSeoConfig: Record<string, PageSeoConfig> = {
  home: {
    title: siteData.default.openGraph.title.split("|")[0].trim(),
    description: siteData.home.hero.description,
    type: "website",
  },
  about: {
    title: siteData.pages.about.title,
    description: siteData.pages.about.description,
    type: "profile",
  },
  blog: {
    title: siteData.pages.blog.title,
    description: siteData.pages.blog.description,
    keywords: siteData.pages.blog.keywords,
    type: "website",
  },
  uses: {
    title: siteData.pages.uses.title,
    description: siteData.pages.uses.description,
    keywords: siteData.pages.uses.keywords,
    type: "website",
  },
  contact: {
    title: siteData.pages.contact.title,
    description: siteData.default.description,
    type: "website",
  },
};
