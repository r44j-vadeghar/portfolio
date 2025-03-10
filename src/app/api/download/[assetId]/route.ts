// src/app/api/download/[assetId]/route.ts
import { getDownloadSignedUrl } from "@/lib/r2";
import { client } from "@/sanity/lib/client";
import { auth } from "@clerk/nextjs/server";
import { groq } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

// Define time before URL expires (15 minutes in seconds)
const URL_EXPIRY_TIME = 15 * 60;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ assetId: string }> }
) {
  // Check authentication
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const assetId = (await params).assetId;

    if (!assetId) {
      return NextResponse.json(
        { error: "Asset ID is required" },
        { status: 400 }
      );
    }

    // First, get the product asset
    const asset = await client.fetch(
      groq`*[_type == "productAsset" && _id == $assetId][0]{
        assetKey,
        product->{_id}
      }`,
      { assetId }
    );

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Check if the user has purchased the product
    const hasAccess = await client.fetch(
      groq`count(*[_type == "orderType" && 
          clerkUserId == $userId && 
          status == "paid" &&
          count(products[product._ref == $productId]) > 0
      ]) > 0`,
      { userId, productId: asset.product._id }
    );

    if (!hasAccess) {
      return NextResponse.json(
        { error: "You don't have access to this asset" },
        { status: 403 }
      );
    }

    // Generate a temporary signed URL for download
    const downloadUrl = await getDownloadSignedUrl(
      asset.assetKey,
      URL_EXPIRY_TIME
    );

    return NextResponse.json({
      url: downloadUrl,
      expires: new Date(Date.now() + URL_EXPIRY_TIME * 1000).toISOString(),
    });
  } catch (error) {
    console.error("Error generating download URL:", error);
    return NextResponse.json(
      { error: "Failed to generate download URL" },
      { status: 500 }
    );
  }
}
