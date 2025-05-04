import axios from "axios";

export async function uploadTestimonialVideo(
  videoFile: File,
  testimonialData: {
    name: string;
    designation?: string;
    company?: string;
    feedback: string;
    rating: number;
  },
  onProgressUpdate: (progress: number) => void
): Promise<{ success: boolean; testimonialId?: string; error?: string }> {
  try {
    onProgressUpdate(5);
    const presignedUrlResponse = await fetch(
      "/api/testimonials/presigned-url",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: videoFile.name,
          fileType: videoFile.type,
        }),
      }
    );

    if (!presignedUrlResponse.ok) {
      const errorData = await presignedUrlResponse.json();
      throw new Error(errorData.error || "Failed to get upload URL");
    }

    const { uploadUrl, fileId, originalKey } =
      await presignedUrlResponse.json();
    onProgressUpdate(10);

    await axios.put(uploadUrl, videoFile, {
      headers: {
        "Content-Type": videoFile.type,
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = progressEvent.total
          ? Math.round((progressEvent.loaded * 65) / progressEvent.total) + 10
          : 50;
        onProgressUpdate(Math.min(percentCompleted, 75)); // Cap at 75% for upload
      },
    });

    onProgressUpdate(80);

    // Step 3: Submit metadata and trigger processing
    const processResponse = await fetch("/api/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileId,
        originalKey,
        testimonialData,
        isVideo: true,
      }),
    });

    if (!processResponse.ok) {
      const errorData = await processResponse.json();
      throw new Error(errorData.error || "Failed to process video");
    }

    const result = await processResponse.json();
    onProgressUpdate(100);

    return {
      success: true,
      testimonialId: result.testimonialId,
    };
  } catch (error) {
    console.error("Error in video upload:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
