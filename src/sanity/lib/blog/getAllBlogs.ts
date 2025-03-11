import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllBlogs = async () => {
  const ALL_BLOGS_QUERY = defineQuery(`
    * [
    _type == "post"
    ] | order(publishedAt desc, _createdAt desc) {
      ...,
      categories[]->,
      "related": *[_type == "post" && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0..5] {
        title,
        slug,
        mainImage
      }
    }
    `);

  try {
    const blogs = await sanityFetch({
      query: ALL_BLOGS_QUERY,
    });

    return blogs.data || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};
