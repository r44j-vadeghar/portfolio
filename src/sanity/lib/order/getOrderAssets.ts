// src/sanity/lib/order/getOrderAssets.ts
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getOrderAssets = async (orderId: string, userId: string) => {
  const ORDER_ASSETS_QUERY = defineQuery(`
    *[
      _type == "productAsset" 
      && product._ref in *[
        _type == "orderType" 
        && orderId == $orderId 
        && clerkUserId == $userId
      ].products[].product._ref
    ] {
      _id,
      assetName,
      version
    }
  `);

  try {
    const assets = await sanityFetch({
      query: ORDER_ASSETS_QUERY,
      params: { orderId, userId },
    });

    return assets.data || [];
  } catch (error) {
    console.error("Error fetching order assets:", error);
    return [];
  }
};
