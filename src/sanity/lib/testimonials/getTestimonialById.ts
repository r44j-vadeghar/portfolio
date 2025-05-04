import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getTestimonialsById = async (id: string) => {
  const TESTIMONIALS_ID_QUERY = defineQuery(`
    *[
      _type == "testimonial"
      && _id == $id
    ][0]
  `);

  try {
    const testimonial = await sanityFetch({
      query: TESTIMONIALS_ID_QUERY,
      params: {
        id,
      },
    });

    return testimonial ? testimonial.data : null;
  } catch (error) {
    console.error("Error fetching testimonial by ID:", error);
    return null;
  }
};
