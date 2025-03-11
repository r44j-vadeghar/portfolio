// src/app/api/admin/upload-url/route.ts
import { getUploadSignedUrl } from "@/lib/r2";
import { backendClient } from "@/sanity/lib/backendClient";
import { auth } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

// Helper function to check if user is admin
const isAdmin = (userId: string | null) => {
  if (!userId) return false;
  const ADMIN_USER_IDS = process.env.ADMIN_USER_IDS?.split(",") || [];
  return ADMIN_USER_IDS.includes(userId);
};

export async function POST(request: Request) {
  // Check authentication and admin permissions
  const { userId } = await auth();
  if (!userId || !isAdmin(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;
    const productId = formData.get("productId") as string;
    const assetName = formData.get("assetName") as string;
    const version = formData.get("version") as string;

    if (!file.name || !file.type || !productId || !assetName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate a unique file key
    const fileExtension = file.name.split(".").pop();
    const uniqueKey = `${productId}/${nanoid()}.${fileExtension}`;

    // Get signed URL for upload
    const signedUrl = await getUploadSignedUrl(uniqueKey, file.type);

    // Upload file to S3
    await fetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    // Create Sanity record
    const createdAsset = await backendClient.create({
      _type: "productAsset",
      product: { _type: "reference", _ref: productId },
      assetName,
      assetKey: uniqueKey,
      fileSize: file.size,
      fileType: file.type,
      uploadedAt: new Date().toISOString(),
      version,
    });

    return NextResponse.json({ asset: createdAsset }, { status: 200 });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
