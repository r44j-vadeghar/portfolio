// src/components/sanity/portable-text-image.tsx
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";

type PortableTextImageProps = {
  value: {
    asset: {
      _ref: string;
    };
    alt?: string;
    _type: "image";
  };
};

export default function PortableTextImage({ value }: PortableTextImageProps) {
  const { asset, alt = "" } = value;

  const url = imageUrl(asset).url();
  const webpUrl = imageUrl(asset).format("webp").url();
  const isGif = webpUrl.includes(".gif");

  return (
    <figure className="w-full my-8">
      <Image
        src={isGif ? url : webpUrl}
        alt={alt}
        width={850}
        height={1024}
        className="w-full h-fit rounded-lg"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      {alt && (
        <figcaption className="text-center text-sm text-white/50 mt-2">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
