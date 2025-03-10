// src/components/sanity/portable-yt-embed.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Youtube } from "lucide-react";

type PortableYtEmbedProps = {
  value: {
    url: string;
  };
};

export default function PortableYtEmbed({ value }: PortableYtEmbedProps) {
  const { url } = value;
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  function getYouTubeDetails(videoUrl: string) {
    try {
      const urlObj = new URL(videoUrl);
      let videoId = urlObj.searchParams.get("v");

      if (!videoId && urlObj.pathname.startsWith("/shorts/")) {
        videoId = urlObj.pathname.split("/")[2];
      }

      const thumbnailSizes = videoId
        ? [
            `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/default.jpg`,
          ]
        : [];

      return {
        embedUrl: videoId
          ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
          : "",
        thumbnailUrl: thumbnailSizes,
        videoId,
      };
    } catch (error) {
      console.error("Invalid YouTube URL", error);
      return {
        embedUrl: "",
        thumbnailUrl: [],
        videoId: null,
      };
    }
  }

  const { embedUrl, thumbnailUrl, videoId } = getYouTubeDetails(url);

  function generateVideoPlaceholder(id: string | null) {
    if (!id)
      return "linear-gradient(135deg, hsl(210, 70%, 60%), hsl(210, 70%, 40%))";

    const hashCode = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return hash;
    };

    const hue = Math.abs(hashCode(id)) % 360;
    return `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue}, 70%, 40%))`;
  }

  const handlePlay = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div
      className="youtube-lazy-load group relative aspect-video h-fit w-full cursor-pointer overflow-hidden rounded-2xl my-8"
      style={{
        background:
          thumbnailUrl.length === 0
            ? generateVideoPlaceholder(videoId)
            : undefined,
      }}
    >
      {isVideoLoaded ? (
        <iframe
          width="560"
          height="315"
          src={embedUrl}
          title="YouTube video player"
          className="aspect-video w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <>
          {thumbnailUrl.length > 0 ? (
            <Image
              src={thumbnailUrl[0]}
              alt="YouTube Video Thumbnail"
              width={1280}
              height={720}
              className="w-full transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Try fallback images
                const target = e.target as HTMLImageElement;
                const currentIndex = thumbnailUrl.indexOf(target.src);
                if (currentIndex < thumbnailUrl.length - 1) {
                  target.src = thumbnailUrl[currentIndex + 1];
                }
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="h-16 w-16 text-white/70" />
            </div>
          )}

          <div className="play-button absolute inset-0 z-10 flex items-end justify-end">
            <div className="absolute inset-0 grid place-items-center">
              <button
                onClick={handlePlay}
                className="flex h-16 w-16 transform items-center justify-center rounded-full bg-red-600 text-white opacity-50 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100"
              >
                <Play className="h-6 w-6" />
              </button>
            </div>
            <Link
              href="https://www.youtube.com/@rajvadeghar"
              target="_blank"
              rel="noopener noreferrer"
              className="group m-4 flex w-full items-center gap-3 rounded-lg border border-red-500/90 bg-red-500/70 px-4 py-2 no-underline backdrop-blur-2xl backdrop-filter transition-all hover:bg-red-500/30 [&>svg]:text-red-200 [&>svg]:transition-all hover:[&>svg]:scale-125"
              onClick={(e) => e.stopPropagation()}
            >
              <Youtube className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-white/90">
                Subscribe to My Channel
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
