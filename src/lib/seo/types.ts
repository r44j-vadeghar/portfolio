import {
  Article,
  BlogPosting,
  BreadcrumbList,
  Person,
  Product,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";

export type JsonLdType = WithContext<
  Person | BlogPosting | WebSite | WebPage | Article | BreadcrumbList | Product
>;

export interface SeoConfig {
  fullName: string;
  name: string;
  title: string;
  description: string;
  keywords: string;
  baseUrl: string;
  siteTitle: string;
  titleTemplate: string;
  defaultImage: string;
  twitterHandle: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    url: string;
    image: string;
  };
  twitter: {
    title: string;
    description: string;
    creator: string;
  };
}

export interface PageSeoConfig {
  title: string;
  description?: string;
  keywords?: string;
  type?:
    | "website"
    | "article"
    | "profile"
    | "book"
    | "music.song"
    | "music.album"
    | "music.playlist"
    | "music.radio_station"
    | "video.movie"
    | "video.episode"
    | "video.tv_show"
    | "video.other";
  image?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  category?: string;
  tags?: string[];
}
