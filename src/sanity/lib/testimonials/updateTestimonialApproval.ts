import { client } from "../client";

export async function updateTestimonialApproval(id: string, approved: boolean) {
  return client.patch(id).set({ approved }).commit();
}
