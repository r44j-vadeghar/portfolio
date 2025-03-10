// src/components/admin/product-assets-table.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDown, Download, Trash2 } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type ProductAsset = {
  _id: string;
  assetName: string;
  assetKey: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  version: string;
  product: {
    _id: string;
    name: string;
  };
};

export function ProductAssetsTable() {
  const [sortField, setSortField] = useState("uploadedAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data: assets, isLoading, error, refetch } = useQuery({
    queryKey: ["product-assets", sortField, sortOrder],
    queryFn: async () => {
      return client.fetch<ProductAsset[]>(
        groq`*[_type == "productAsset"] | order(${sortField} ${sortOrder}) {
          _id,
          assetName,
          assetKey,
          fileSize,
          fileType,
          uploadedAt,
          version,
          product-> {
            _id,
            name
          }
        }`
      );
    },
  });

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDelete = async (assetId: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    
    try {
      // Here you would add logic to delete from R2 as well if needed
      await client.delete(assetId);
      toast.success("Asset deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting asset:", error);
      toast.error("Failed to delete asset");
    }
  };

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  if (error) {
    return <div>Error loading assets: {String(error)}</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">
              <Button
                variant="ghost"
                onClick={() => handleSort("assetName")}
                className="flex items-center"
              >
                Asset Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("product.name")}
                className="flex items-center"
              >
                Product
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">Version</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden md:table-cell">Size</TableHead>
            <TableHead className="hidden lg:table-cell">
              <Button
                variant="ghost"
                onClick={() => handleSort("uploadedAt")}
                className="flex items-center"
              >
                Uploaded
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets && assets.length > 0 ? (
            assets.map((asset) => (
              <TableRow key={asset._id}>
                <TableCell className="font-medium">{asset.assetName}</TableCell>
                <TableCell>{asset.product?.name || "Unknown product"}</TableCell>
                <TableCell className="hidden md:table-cell">{asset.version || "N/A"}</TableCell>
                <TableCell className="hidden md:table-cell">{asset.fileType || "Unknown"}</TableCell>
                <TableCell className="hidden md:table-cell">{formatFileSize(asset.fileSize)}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {asset.uploadedAt
                    ? formatDistanceToNow(new Date(asset.uploadedAt), { addSuffix: true })
                    : "Unknown"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => toast.info("Preview functionality coming soon")}
                      >
                        <Download className="mr-2 h-4 w-4" /> Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(asset._id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No assets found. Add your first downloadable asset.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}