import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllCategories = async () => {
  const ALL_BLOG_CATEGORIES_QUERY = defineQuery(`
    *[_type == "category"]
  `);

  try {
    const categories = await sanityFetch({
      query: ALL_BLOG_CATEGORIES_QUERY,
    });

    return categories.data || [];
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
};
