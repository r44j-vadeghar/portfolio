import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getPagedBlogs = async (page: number = 1, pageSize: number = 5) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const PAGED_BLOGS_QUERY = defineQuery(`
    *[_type == "post"] | order(publishedAt desc, _createdAt desc) [$start...$end] {
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
      query: PAGED_BLOGS_QUERY,
      params: { start, end },
    });

    return blogs.data || [];
  } catch (error) {
    console.error("Error fetching paged blogs:", error);
    return [];
  }
};
