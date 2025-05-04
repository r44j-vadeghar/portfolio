import { client } from "../client";

export async function deleteTestimonial(id: string) {
  return client.delete(id);
}
