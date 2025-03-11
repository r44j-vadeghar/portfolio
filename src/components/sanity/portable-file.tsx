import { Button } from "@/components/ui/button";
import { imageUrl } from "@/lib/imageUrl";
import { FileIcon } from "lucide-react";
import { internalGroqTypeReferenceTo } from "../../../sanity.types";

export default function PortableFile({
  value,
}: {
  value: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
    };
    description?: string;
    _type: "file";
    _key: string;
  };
}) {
  const { asset, description } = value;

  if (!asset?._ref) {
    return null;
  }

  const fileUrl = imageUrl(asset).url();

  return (
    <div className="my-6">
      <Button variant="outline" asChild>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
        >
          <FileIcon className="h-4 w-4" />
          {description || "Download file"}
        </a>
      </Button>
    </div>
  );
}
