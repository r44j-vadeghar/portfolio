// src/components/share-links.tsx
"use client";

import Facebook from "@/assets/socials-color/facebook.png";
import Linkedin from "@/assets/socials-color/linkedin.png";
import Whatsapp from "@/assets/socials-color/whatsapp.png";
import Twitter from "@/assets/socials-color/x-twitter.png";
import Image from "next/image";

const platforms = {
  facebook: {
    icon: Facebook,
    url: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  twitter: {
    icon: Twitter,
    url: "https://twitter.com/intent/tweet?url=",
  },
  linkedin: {
    icon: Linkedin,
    url: "https://www.linkedin.com/shareArticle?mini=true&url=",
  },
  whatsapp: {
    icon: Whatsapp,
    url: "https://wa.me/?text=",
  },
};

type ShareLinksProps = {
  url: string;
};

export default function ShareLinks({ url }: ShareLinksProps) {
  return (
    <div className="flex items-center gap-3">
      {Object.entries(platforms).map(([key, platform]) => (
        <a
          key={key}
          className="z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-accent p-2 transition-all duration-300 ease-out"
          href={`${platform.url}${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image width={20} height={20} src={platform.icon} alt={key} />
        </a>
      ))}
    </div>
  );
}
