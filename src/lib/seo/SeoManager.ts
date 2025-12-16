import { Metadata } from "next";
import { seoConfig } from "./config";
import { pageSeoConfig } from "./page-config";
import { JsonLdType, PageSeoConfig } from "./types";

export class SeoManager {
  static getPageMetadata(
    pageName: string,
    customProps?: Partial<PageSeoConfig>
  ): Metadata {
    const pageConfig = pageSeoConfig[pageName] || ({} as PageSeoConfig);
    const config = { ...pageConfig, ...customProps };
    return this.generateMetadata(config);
  }

  static generateMetadata({
    title,
    description,
    keywords,
    image,
    type = "website",
    noIndex = false,
    publishedTime,
    modifiedTime,
    authors = [seoConfig.fullName],
    category,
    tags,
  }: PageSeoConfig): Metadata {
    const pageTitle = title
      ? title + (title.includes(seoConfig.name) ? "" : ` | ${seoConfig.name}`)
      : seoConfig.siteTitle;

    const pageDescription = description || seoConfig.description;
    const pageKeywords = keywords || seoConfig.keywords;
    const pageImage = image || seoConfig.defaultImage;

    const imageUrl = pageImage.startsWith("http")
      ? pageImage
      : `${seoConfig.baseUrl}${pageImage}`;

    const canonical = `${seoConfig.baseUrl}${
      title === seoConfig.siteTitle
        ? ""
        : `/${title.toLowerCase().replace(/\s+/g, "-")}`
    }`;

    const metadata: Metadata = {
      title: pageTitle,
      description: pageDescription,
      keywords: pageKeywords,
      metadataBase: new URL(seoConfig.baseUrl),
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: canonical,
        siteName: seoConfig.siteTitle,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: pageTitle,
          },
        ],
        locale: "en_US",
        type,
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDescription,
        creator: seoConfig.twitterHandle,
        images: [imageUrl],
      },
      robots: {
        index: !noIndex,
        follow: !noIndex,
        googleBot: {
          index: !noIndex,
          follow: !noIndex,
        },
      },
      alternates: {
        canonical,
      },
    };

    if (type === "article" && metadata.openGraph) {
      metadata.openGraph = {
        publishedTime: publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: authors,
        section: category,
        tags: tags,
        type,
      };
    }

    return metadata;
  }

  static getWebsiteSchema(): JsonLdType {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: seoConfig.siteTitle,
      url: seoConfig.baseUrl,
      description: seoConfig.description,
      author: {
        "@type": "Person",
        name: seoConfig.fullName,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${seoConfig.baseUrl}/blog?page={search_term_string}`,
        query: "required name=search_term_string",
      },
    };
  }

  static getPersonSchema(): JsonLdType {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: seoConfig.fullName,
      alternateName: seoConfig.name,
      url: seoConfig.baseUrl,
      image: `${seoConfig.baseUrl}/raj.png`,
      jobTitle: seoConfig.title,
      description: seoConfig.description,
      sameAs: [
        "https://github.com/r44j-vadeghar",
        "https://linkedin.com/in/r44j",
        "https://youtube.com/@rajvadeghar",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "DevOps",
        "Full Stack Development",
        ".NET",
        "C#",
      ],
    };
  }

  static getWebPageSchema(
    title: string,
    description: string,
    path: string = ""
  ): JsonLdType {
    const url = `${seoConfig.baseUrl}${path}`;

    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description: description,
      url: url,
      isPartOf: {
        "@type": "WebSite",
        name: seoConfig.siteTitle,
        url: seoConfig.baseUrl,
      },
      about: {
        "@type": "Person",
        name: seoConfig.fullName,
        url: seoConfig.baseUrl,
      },
      mainEntity: {
        "@type": "Person",
        name: seoConfig.fullName,
        url: seoConfig.baseUrl,
      },
    };
  }

  static getBlogPostSchema({
    title,
    description,
    image,
    slug,
    publishedTime,
    modifiedTime,
    category,
    tags = [],
    wordCount,
    readingTimeMinutes,
  }: {
    title: string;
    description: string;
    image?: string;
    slug: string;
    publishedTime: string;
    modifiedTime?: string;
    category?: string;
    tags?: string[];
    wordCount?: number;
    readingTimeMinutes?: number;
  }): JsonLdType {
    const postUrl = `${seoConfig.baseUrl}/blog/${slug}`;
    const imageUrl = image
      ? image.startsWith("http")
        ? image
        : `${seoConfig.baseUrl}${image}`
      : seoConfig.defaultImage;

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: description,
      image: imageUrl,
      url: postUrl,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      inLanguage: "en-US",
      author: {
        "@type": "Person",
        name: seoConfig.fullName,
        url: seoConfig.baseUrl,
      },
      publisher: {
        "@type": "Person",
        name: seoConfig.fullName,
        url: seoConfig.baseUrl,
        image: {
          "@type": "ImageObject",
          url: `${seoConfig.baseUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl,
      },
      keywords: tags.join(", "),
      ...(category && { articleSection: category }),
      ...(wordCount && { wordCount }),
      ...(readingTimeMinutes && { timeRequired: `PT${readingTimeMinutes}M` }),
    };
  }

  static getFAQSchema(
    faqs: { question: string; answer: string }[]
  ): JsonLdType {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  }

  static getBreadcrumbSchema(
    items: { name: string; url: string }[]
  ): JsonLdType {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url.startsWith("http")
          ? item.url
          : `${seoConfig.baseUrl}${item.url}`,
      })),
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getProductSchema(product: any): JsonLdType {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: product.image?.startsWith("http")
        ? product.image
        : `${seoConfig.baseUrl}${product.image}`,
      description:
        product.description || `Recommended by ${seoConfig.fullName}`,
      review: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: product.rating,
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: seoConfig.fullName,
        },
        datePublished: product.ratedOn || new Date().toISOString(),
      },
      offers: product.affiliateLink
        ? {
            "@type": "Offer",
            url: product.affiliateLink,
            availability: "https://schema.org/InStock",
          }
        : undefined,
    };
  }
}
