// src/components/admin/upload-download-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { client } from "@/sanity/lib/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Upload } from "lucide-react";
import { groq } from "next-sanity";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Product = {
  _id: string;
  name: string;
};

const formSchema = z.object({
  productId: z.string().min(1, { message: "Product is required" }),
  assetName: z.string().min(1, { message: "Name is required" }),
  version: z.string().optional(),
});

export function UploadDownloadForm() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return client.fetch<Product[]>(
        groq`*[_type == "productType"] | order(name asc) {
          _id,
          name
        }`
      );
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      assetName: "",
      version: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file && !form.getValues("assetName")) {
      const fileName = file.name.split(".").slice(0, -1).join(".");
      form.setValue("assetName", fileName);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      await axios.post(
        "/api/admin/upload-url",
        {
          file: selectedFile,
          productId: data.productId,
          assetName: data.assetName,
          version: data.version,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setUploadProgress(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              );
            }
          },
        }
      );

      toast.success("File uploaded successfully");
      router.push("/admin/downloads");
      router.refresh();
    } catch (error) {
      console.error("Error in upload process:", error);
      toast.error("Upload process failed");
      setUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <Select
                  disabled={uploading || productsLoading}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products?.map((product) => (
                      <SelectItem key={product._id} value={product._id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  The product this download will be associated with
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assetName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asset Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Project Source Code v1.0"
                    {...field}
                    disabled={uploading}
                  />
                </FormControl>
                <FormDescription>
                  A descriptive name for this downloadable asset
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="version"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Version (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 1.0.0"
                    {...field}
                    disabled={uploading}
                  />
                </FormControl>
                <FormDescription>
                  Version number or identifier if applicable
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div>
              <FormLabel htmlFor="file">Upload File</FormLabel>
              <div className="mt-1">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="cursor-pointer"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Upload ZIP, PDF, or other file formats (max 100MB)
              </p>
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/downloads")}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Upload File
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
