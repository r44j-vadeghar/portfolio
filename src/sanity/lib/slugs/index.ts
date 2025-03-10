import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

/**
 * Fetches all blog post slugs from Sanity
 * @returns Array of blog post slugs
 */
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

/**
 * Fetches all product slugs from Sanity
 * @returns Array of product slugs
 */
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

/**
 * Fetches all blog category slugs from Sanity
 * @returns Array of blog category slugs
 */
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

/**
 * Fetches all product category slugs from Sanity
 * @returns Array of product category slugs
 */
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

/**
 * Fetches all blog posts with full data for RSS feed
 * @returns Array of blog posts with complete information
 */
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
