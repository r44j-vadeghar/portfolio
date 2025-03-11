import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getBlogBySlug = async (slug: string | undefined) => {
  if (!slug) return null;

  const BLOG_POST_QUERY = defineQuery(`
    *[_type == "post" && slug.current == $slug][0] {
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
    const blog = await sanityFetch({
      query: BLOG_POST_QUERY,
      params: { slug },
    });

    return blog.data || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
};
