import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLinkIcon } from "lucide-react";
import { Embed } from "../../../sanity.types";
import { Button } from "../ui/button";

export default function PortableEmbed({ value }: { value: Embed }) {
  const { url, caption } = value;

  // Simple URL parsing to determine embed type
  const getEmbedType = (url: string) => {
    if (url.includes("twitter.com")) return "Twitter";
    if (url.includes("instagram.com")) return "Instagram";
    if (url.includes("youtube.com") || url.includes("youtu.be"))
      return "YouTube";
    if (url.includes("tiktok.com")) return "TikTok";
    return "External Content";
  };

  const embedType = getEmbedType(url ?? "");

  return (
    <div className="my-6">
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">
              Embedded content from {embedType}
            </p>
            <Button variant="outline" asChild>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                View original content
              </a>
            </Button>
          </div>
        </CardContent>
        {caption && (
          <CardFooter className="text-sm text-muted-foreground text-center pb-6">
            {caption}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
