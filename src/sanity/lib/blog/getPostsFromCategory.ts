import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getPostsFromCategory = async (id: string) => {
  if (!id) return [];

  const POSTS_FROM_CATEGORY_QUERY = defineQuery(`
    *[_type == "post" && references($id)]
  `);

  try {
    const posts = await sanityFetch({
      query: POSTS_FROM_CATEGORY_QUERY,
      params: { id },
    });

    return posts.data || [];
  } catch (error) {
    console.error("Error fetching posts from category:", error);
    return [];
  }
};