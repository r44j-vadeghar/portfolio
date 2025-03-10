import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getOrderDetailsById = async (orderId: string) => {
  const ORDER_BY_ID_QUERY = defineQuery(`
    *[
      _type == "orderType"
      && orderId == $orderId
    ][0]{
      ...,
      products[]{
        quantity,
        product->{
          name,
          slug,
          image,
          price
        }
      }
    }
  `);

  try {
    const order = await sanityFetch({
      query: ORDER_BY_ID_QUERY,
      params: {
        orderId,
      },
    });

    return order ? order.data : null;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return null;
  }
};
