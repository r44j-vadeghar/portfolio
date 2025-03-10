// src/components/about/SocialLinks.tsx
import { LucideIcon, Youtube } from "lucide-react";
import Link from "next/link";

interface Social {
  url: string;
  title: string;
  icon: LucideIcon;
}

interface SocialLinksProps {
  socials: Record<string, Social>;
}

export const SocialLinks = ({ socials }: SocialLinksProps) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap gap-3">
        {Object.entries(socials).map(([key, { url, icon: Icon, title }]) => (
          <Link
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/50 transition-all hover:bg-card"
          >
            <Icon className="h-5 w-5" />
          </Link>
        ))}
      </div>
      <Link
        href={socials.youtube.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 transition-all hover:bg-red-500/20 dark:border-red-500/20 dark:bg-red-500/10 dark:hover:bg-red-500/20"
      >
        <Youtube className="h-5 w-5 text-red-500" />
        <span className="text-sm font-medium text-foreground">
          Subscribe to My Channel
        </span>
      </Link>
    </div>
  );
};

export default SocialLinks;
