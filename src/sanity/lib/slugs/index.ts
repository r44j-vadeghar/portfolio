import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllBlogSlugs = async () => {
  const BLOG_SLUGS_QUERY = defineQuery(`
    *[_type == "post"] {
      "slug": slug.current
    }
  `);

  try {
    const response = await sanityFetch({
      query: BLOG_SLUGS_QUERY,
    });

    // Extract just the slug strings from the response
    return (response.data || []).map((post) => post.slug);
  } catch (error) {
    console.error("Error fetching blog slugs:", error);
    return [];
  }
};

export const getAllBlogSlugsWithDates = async () => {
  const BLOG_SLUGS_WITH_DATES_QUERY = defineQuery(`
    *[_type == "post"] {
      "slug": slug.current,
      publishedAt,
      updatedAt
    }
  `);

  try {
    const response = await sanityFetch({
      query: BLOG_SLUGS_WITH_DATES_QUERY,
    });

    return (response.data || []).map(
      (post: { slug: string; updatedAt?: string; publishedAt?: string }) => ({
        slug: post.slug,
        lastModified:
          post.updatedAt || post.publishedAt || new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error("Error fetching blog slugs with dates:", error);
    return [];
  }
};

export const getAllProductSlugs = async () => {
  const PRODUCT_SLUGS_QUERY = defineQuery(`
    *[_type == "productType"] {
      "slug": slug.current
    }
  `);

  try {
    const response = await sanityFetch({
      query: PRODUCT_SLUGS_QUERY,
    });

    // Extract just the slug strings from the response
    return (response.data || []).map((product) => product.slug);
  } catch (error) {
    console.error("Error fetching product slugs:", error);
    return [];
  }
};

export const getAllBlogCategorySlugs = async () => {
  const BLOG_CATEGORY_SLUGS_QUERY = defineQuery(`
    *[_type == "category"] {
      "slug": slug.current
    }
  `);

  try {
    const response = await sanityFetch({
      query: BLOG_CATEGORY_SLUGS_QUERY,
    });

    // Extract just the slug strings from the response
    return (response.data || []).map((category) => category.slug);
  } catch (error) {
    console.error("Error fetching blog category slugs:", error);
    return [];
  }
};

export const getAllProductCategorySlugs = async () => {
  const PRODUCT_CATEGORY_SLUGS_QUERY = defineQuery(`
    *[_type == "productCategory"] {
      "slug": slug.current
    }
  `);

  try {
    const response = await sanityFetch({
      query: PRODUCT_CATEGORY_SLUGS_QUERY,
    });

    // Extract just the slug strings from the response
    return (response.data || []).map((category) => category.slug);
  } catch (error) {
    console.error("Error fetching product category slugs:", error);
    return [];
  }
};

export const getAllBlogPosts = async () => {
  const BLOG_POSTS_QUERY = defineQuery(`
    *[_type == "post"] {
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      "authorName": author->name,
      "categories": categories[]->title,
      "imageUrl": mainImage.asset->url
    }
  `);

  try {
    const response = await sanityFetch({
      query: BLOG_POSTS_QUERY,
    });

    return response.data || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
};
