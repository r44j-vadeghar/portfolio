import React from "react";
import { Youtube } from "lucide-react";
import Socials from "@/constants/socials";

const SocialButton = ({
  href,
  icon,
  title
}: {
  href: string;
  icon: string;
  title: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:bg-white/10"
  >
    <img src={icon} alt={title} className="h-5 w-5" />
  </a>
);

const YouTubePromo = ({ link }: { link: string }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 transition-all hover:bg-red-500/20"
  >
    <Youtube className="h-5 w-5 text-red-500" />
    <span className="text-sm font-medium text-white/90">
      Subscribe to My Channel
    </span>
  </a>
);

const SocialLinks = ({ socials }: { socials: typeof Socials }) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap gap-3">
        {Object.entries(socials).map(([key, { url, icon, title }]) => (
          <SocialButton key={key} href={url} icon={icon} title={title} />
        ))}
      </div>
      <YouTubePromo link="https://www.youtube.com/@rajvadeghar" />
    </div>
  );
};

export default SocialLinks;
