import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_ID_QUERY = defineQuery(`
    *[
      _type == "productType"
      && slug.current == $slug
    ] | order(name asc)[0]
  `);

  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: {
        slug,
      },
    });

    return products.data || null;
  } catch (error) {
    console.error("Error fetching products by ID:", error);
    return null;
  }
};
