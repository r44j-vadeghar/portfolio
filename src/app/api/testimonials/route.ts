import { getUploadSignedUrl, uploadFile } from "@/lib/r2";
import { backendClient } from "@/sanity/lib/backendClient";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const designation = (formData.get("designation") as string) || "";
    const company = (formData.get("company") as string) || "";
    const feedback = formData.get("feedback") as string;
    const rating = parseInt(formData.get("rating") as string);
    const isVideo = formData.get("isVideo") === "true";
    const file = formData.get("file") as File | null;

    if (!name || !feedback || !rating || (isVideo && !file)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    let videoUrl = null;
    let imageUrl = null;
    let thumbnailUrl = null;
    let imageAssetId = null;

    if (file) {
      const fileId = uuidv4();
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const contentType = file.type;

      if (isVideo) {
        const videoKey = `testimonials/videos/${fileId}.${file.name
          .split(".")
          .pop()}`;

        await uploadFile(videoKey, fileBuffer, contentType);
        videoUrl = `https://${process.env.R2_BUCKET_NAME}.r2.dev/${videoKey}`;

        try {
          const thumbnailBuffer = await sharp(fileBuffer, { pages: 1 })
            .resize(320, 180)
            .jpeg({ quality: 80 })
            .toBuffer();

          const thumbnailKey = `testimonials/thumbnails/${fileId}.jpg`;
          await uploadFile(thumbnailKey, thumbnailBuffer, "image/jpeg");
          thumbnailUrl = `https://${process.env.R2_BUCKET_NAME}.r2.dev/${thumbnailKey}`;
        } catch (err) {
          console.error("Error generating thumbnail:", err);
        }
      } else {
        const processedImageBuffer = await sharp(fileBuffer)
          .resize({
            width: 800,
            height: 800,
            fit: sharp.fit.inside,
            withoutEnlargement: true,
          })
          .jpeg({ quality: 80 })
          .toBuffer();
        const imageKey = `testimonials/images/${fileId}.jpg`;
        await uploadFile(imageKey, processedImageBuffer, "image/jpeg");
        imageUrl = `https://${process.env.R2_BUCKET_NAME}.r2.dev/${imageKey}`;
        imageAssetId = `image-${fileId}-jpg`;
      }
    }

    const testimonialData = {
      name,
      designation,
      company,
      feedback,
      rating,
      isVideo,
      videoUrl,
      thumbnailUrl,
      imageUrl,
      image: imageAssetId
        ? { _type: "image", asset: { _type: "reference", _ref: imageAssetId } }
        : undefined,
    };

    const testimonial = await backendClient.create({
      _type: "testimonial",
      ...testimonialData,
      submittedAt: new Date().toISOString(),
      approved: false,
    });

    if (!testimonial) {
      return NextResponse.json(
        { error: "Failed to create testimonial" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, testimonialId: testimonial._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling testimonial submission:", error);
    return NextResponse.json(
      { error: "Failed to process testimonial" },
      { status: 500 }
    );
  }
}
