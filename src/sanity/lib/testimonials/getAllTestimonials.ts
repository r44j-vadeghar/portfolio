import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllTestimonials = async () => {
  const ALL_TESTIMONIALS_QUERY =
    defineQuery(`*[_type == "testimonial" && approved == true] | order(submittedAt desc) {
      _id,
      name,
      designation,
      company,
      feedback,
      rating,
      isVideo,
      videoUrl,
      thumbnailUrl,
      image {
        asset->{
          url
        }
      }
    }`);

  try {
    const testimonials = await sanityFetch({
      query: ALL_TESTIMONIALS_QUERY,
    });

    return testimonials.data || [];
  } catch (error) {
    console.error("Error fetching all testimonials:", error);
    return [];
  }
};
