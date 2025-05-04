import { TESTIMONIALS_ID_QUERYResult } from "../../../../sanity.types";
import { backendClient } from "../backendClient";

export const createTestimonial = async (
  testimonial: Partial<TESTIMONIALS_ID_QUERYResult>
) => {
  try {
    const createdTestimonial = await backendClient.create({
      _type: "testimonial",
      ...testimonial,
      submittedAt: new Date().toISOString(),
      approved: false,
    });

    return createdTestimonial;
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return null;
  }
};
