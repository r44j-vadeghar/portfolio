import {
  getAllBlogCategorySlugs,
  getAllBlogSlugs,
  getAllProductCategorySlugs,
  getAllProductSlugs,
} from "@/sanity/lib/slugs";
import type { MetadataRoute } from "next";

const getBaseUrl = () => {
  return process.env.VERCEL_URL
    ? `${process.env.VERCEL_URL}`
    : "https://r44j.dev";
};

export async function generateSitemaps() {
  return [
    { id: "static" },
    { id: "blog" },
    { id: "products" },
    { id: "blog-categories" },
    { id: "product-categories" },
  ];
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  if (id === "static") {
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/uses`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/store`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/basket`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${baseUrl}/orders`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${baseUrl}/search`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
    ];
  }

  if (id === "blog") {
    const blogSlugs = await getAllBlogSlugs();
    return blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  }

  if (id === "products") {
    const productSlugs = await getAllProductSlugs();
    return productSlugs.map((slug) => ({
      url: `${baseUrl}/product/${slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    }));
  }

  if (id === "blog-categories") {
    const blogCategorySlugs = await getAllBlogCategorySlugs();
    return blogCategorySlugs.map((slug) => ({
      url: `${baseUrl}/blog/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  }

  if (id === "product-categories") {
    const productCategorySlugs = await getAllProductCategorySlugs();
    return productCategorySlugs.map((slug) => ({
      url: `${baseUrl}/categories/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  }

  return [];
}
