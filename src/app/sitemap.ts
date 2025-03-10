import {
  getAllBlogCategorySlugs,
  getAllBlogSlugs,
  getAllProductCategorySlugs,
  getAllProductSlugs,
} from "@/sanity/lib/slugs";
import type { MetadataRoute } from "next";

// Helper function to get base URL
const getBaseUrl = () => {
  return process.env.VERCEL_URL
    ? `${process.env.VERCEL_URL}`
    : "https://r44j.dev";
};

// Generate sitemap segments
export async function generateSitemaps() {
  // Define segments for different content types
  return [
    { id: "static" }, // For static pages
    { id: "blog" }, // For blog posts
    { id: "products" }, // For products
    { id: "blog-categories" }, // For blog categories
    { id: "product-categories" }, // For product categories
  ];
}

// Generate the sitemap content based on the segment
export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  // Static routes
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

  // Blog posts
  if (id === "blog") {
    const blogSlugs = await getAllBlogSlugs();
    return blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  }

  // Products
  if (id === "products") {
    const productSlugs = await getAllProductSlugs();
    return productSlugs.map((slug) => ({
      url: `${baseUrl}/product/${slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    }));
  }

  // Blog categories
  if (id === "blog-categories") {
    const blogCategorySlugs = await getAllBlogCategorySlugs();
    // Blog categories likely don't have their own pages in your structure,
    // but if they do, adjust the URL pattern accordingly
    return blogCategorySlugs.map((slug) => ({
      url: `${baseUrl}/blog/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  }

  // Product categories
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
