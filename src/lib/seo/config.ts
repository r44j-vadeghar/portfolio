import siteData from "@/constants/siteData.json";
import { SeoConfig } from "./types";

export const seoConfig: SeoConfig = {
  fullName: siteData.default.fullName,
  name: siteData.default.name,
  title: siteData.default.title,
  description: siteData.default.description,
  keywords: siteData.default.keywords,
  baseUrl: siteData.default.openGraph.url,
  siteTitle: siteData.default.openGraph.title.split("|")[0].trim(),
  titleTemplate: "%s | " + siteData.default.name,
  defaultImage: siteData.default.openGraph.image,
  twitterHandle: siteData.default.twitter.creator,
  openGraph: {
    title: siteData.default.openGraph.title,
    description: siteData.default.openGraph.description,
    type: siteData.default.openGraph.type,
    url: siteData.default.openGraph.url,
    image: siteData.default.openGraph.image,
  },
  twitter: {
    title: siteData.default.twitter.title,
    description: siteData.default.twitter.description,
    creator: siteData.default.twitter.creator,
  },
};
