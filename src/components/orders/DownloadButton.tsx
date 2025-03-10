// src/components/orders/DownloadButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ORDER_ASSETS_QUERYResult } from "../../../sanity.types";

export default function DownloadButton({
  asset,
}: {
  asset: ORDER_ASSETS_QUERYResult[0];
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/download/${asset._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to generate download link");
      }

      const { url } = await response.json();

      // Create a temporary anchor and click it to start the download
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download started");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download file");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={isDownloading}
    >
      {isDownloading ? (
        <>
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          Downloading...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          {asset.assetName} {asset.version && `(${asset.version})`}
        </>
      )}
    </Button>
  );
}
