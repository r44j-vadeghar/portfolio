// src/components/orders/DownloadSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { useQuery } from "@tanstack/react-query";
import { Download, RefreshCw } from "lucide-react";
import { groq } from "next-sanity";
import { useState } from "react";
import { toast } from "sonner";

type Asset = {
  _id: string;
  assetName: string;
  version: string;
};

export default function DownloadSection({
  orderId,
  userId,
}: {
  orderId: string | undefined;
  userId: string | undefined;
}) {
  const [downloadingAsset, setDownloadingAsset] = useState<string | null>(null);

  const {
    data: assets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order-assets", orderId],
    queryFn: async () => {
      if (!orderId || !userId) return [];

      return client.fetch<Asset[]>(
        groq`*[_type == "productAsset" && product._ref in *[_type == "orderType" && orderId == $orderId && clerkUserId == $userId].products[].product._ref] {
          _id,
          assetName,
          version
        }`,
        { orderId, userId }
      );
    },
    enabled: !!orderId && !!userId,
  });

  const handleDownload = async (assetId: string) => {
    setDownloadingAsset(assetId);
    try {
      const response = await fetch(`/api/download/${assetId}`, {
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
      setDownloadingAsset(null);
    }
  };

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled>
        Loading downloads...
      </Button>
    );
  }

  if (error || !assets) {
    return null;
  }

  if (assets.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {assets.map((asset) => (
        <Button
          key={asset._id}
          variant="outline"
          size="sm"
          onClick={() => handleDownload(asset._id)}
          disabled={downloadingAsset === asset._id}
        >
          {downloadingAsset === asset._id ? (
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
      ))}
    </div>
  );
}
