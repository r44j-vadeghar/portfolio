// src/sanity/lib/order/getMyOrders.ts
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getMyOrders = async (userId: string) => {
  const MY_ORDERS_QUERY = defineQuery(`
    *[
      _type == "orderType"
      && clerkUserId == $userId
    ] | order(orderDate desc) {
      ...,
      products[]{
        ...,
        product->
      }
    }
  `);

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: {
        userId,
      },
    });

    return orders.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
