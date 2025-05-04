// ../r44j/backup-portfolio-nextjs-full-codebase/src/lib/videoProcessing.ts
import { spawn } from "child_process";
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { dirname, join } from "path";

interface ProcessVideoOptions {
  inputPath: string;
  outputDir?: string;
  lowResHeight?: number;
  thumbnailTime?: string;
  thumbnailHeight?: number;
}

interface ProcessVideoResult {
  lowResPath: string;
  thumbnailPath: string;
}

/**
 * Processes a video to create a low-resolution version and a thumbnail using FFmpeg CLI
 * This is a fallback if the fluent-ffmpeg library is not available or causes issues
 */
export async function processVideoWithFFmpegCLI({
  inputPath,
  outputDir = tmpdir(),
  lowResHeight = 480,
  thumbnailTime = "00:00:03",
  thumbnailHeight = 480,
}: ProcessVideoOptions): Promise<ProcessVideoResult> {
  // Create unique base filename from the input path
  const baseFileName = `video-${Date.now()}-${Math.floor(
    Math.random() * 10000
  )}`;
  const lowResPath = join(outputDir, `${baseFileName}-lowres.mp4`);
  const thumbnailPath = join(outputDir, `${baseFileName}-thumbnail.jpg`);

  // Make sure the output directory exists
  if (!existsSync(dirname(lowResPath))) {
    await mkdir(dirname(lowResPath), { recursive: true });
  }

  // Generate low-resolution version
  await new Promise<void>((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-i",
      inputPath,
      "-vf",
      `scale=-2:${lowResHeight}`,
      "-c:v",
      "libx264",
      "-crf",
      "28",
      "-preset",
      "medium",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-y", // Overwrite output files without asking
      lowResPath,
    ]);

    let stdErr = "";

    ffmpeg.stderr.on("data", (data) => {
      stdErr += data.toString();
    });

    ffmpeg.on("error", (err) => {
      reject(new Error(`FFmpeg process error: ${err.message}`));
    });

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}. Error: ${stdErr}`));
      }
    });
  });

  // Generate thumbnail
  await new Promise<void>((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-i",
      inputPath,
      "-ss",
      thumbnailTime,
      "-vframes",
      "1",
      "-vf",
      `scale=-2:${thumbnailHeight}`,
      "-y", // Overwrite output files without asking
      thumbnailPath,
    ]);

    let stdErr = "";

    ffmpeg.stderr.on("data", (data) => {
      stdErr += data.toString();
    });

    ffmpeg.on("error", (err) => {
      reject(new Error(`FFmpeg process error: ${err.message}`));
    });

    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}. Error: ${stdErr}`));
      }
    });
  });

  return { lowResPath, thumbnailPath };
}

/**
 * A simplified fallback for environments where FFmpeg is not available
 * Note: This doesn't actually process the video, just creates a placeholder thumbnail
 */
export async function createPlaceholderThumbnail(
  outputDir = tmpdir()
): Promise<{ thumbnailPath: string }> {
  const baseFileName = `video-${Date.now()}-${Math.floor(
    Math.random() * 10000
  )}`;
  const thumbnailPath = join(outputDir, `${baseFileName}-thumbnail.jpg`);

  // Create a simple black 640x360 JPEG as placeholder
  // This is a minimal valid JPEG file for a black image
  const blackJpegBytes = Buffer.from([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
    0x01, 0x01, 0x00, 0x48, 0x00, 0x48, 0x00, 0x00, 0xff, 0xdb, 0x00, 0x43,
    0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08, 0x07, 0x07, 0x07, 0x09,
    0x09, 0x08, 0x0a, 0x0c, 0x14, 0x0d, 0x0c, 0x0b, 0x0b, 0x0c, 0x19, 0x12,
    0x13, 0x0f, 0x14, 0x1d, 0x1a, 0x1f, 0x1e, 0x1d, 0x1a, 0x1c, 0x1c, 0x20,
    0x24, 0x2e, 0x27, 0x20, 0x22, 0x2c, 0x23, 0x1c, 0x1c, 0x28, 0x37, 0x29,
    0x2c, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1f, 0x27, 0x39, 0x3d, 0x38, 0x32,
    0x3c, 0x2e, 0x33, 0x34, 0x32, 0xff, 0xc0, 0x00, 0x0b, 0x08, 0x01, 0x68,
    0x02, 0x80, 0x01, 0x01, 0x11, 0x00, 0xff, 0xc4, 0x00, 0x14, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x09, 0xff, 0xc4, 0x00, 0x14, 0x10, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0xff, 0xda, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3f, 0x00,
    0xd2, 0xcf, 0x20, 0xff, 0xd9,
  ]);

  await writeFile(thumbnailPath, blackJpegBytes);

  return { thumbnailPath };
}
