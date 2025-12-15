import { imageUrl } from "@/lib/imageUrl";
import { ExternalLink, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SponsorBannerProps {
  sponsor: {
    name?: string;
    logo?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      asset?: any;
    };
    url?: string;
    description?: string;
  };
}

export default function SponsorBanner({ sponsor }: SponsorBannerProps) {
  if (!sponsor?.name) return null;

  return (
    <div className="my-8 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 p-4 sm:p-6">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <Heart className="h-3 w-3" />
        <span>This post is sponsored by</span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {sponsor.logo?.asset && (
          <div className="flex-shrink-0">
            <Image
              src={imageUrl(sponsor.logo.asset).width(120).height(40).url()}
              alt={sponsor.name}
              width={120}
              height={40}
              className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
            />
          </div>
        )}

        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">{sponsor.name}</h4>
          {sponsor.description && (
            <p className="text-sm text-muted-foreground">{sponsor.description}</p>
          )}
        </div>

        {sponsor.url && (
          <Link
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Learn More
            <ExternalLink className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
