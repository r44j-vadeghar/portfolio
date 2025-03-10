// src/sanity/schemaTypes/productAssetType.ts
import { FolderIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productAssetType = defineType({
  name: "productAsset",
  title: "Product Asset",
  type: "document",
  icon: FolderIcon,
  fields: [
    defineField({
      name: "product",
      title: "Associated Product",
      type: "reference",
      to: [{ type: "productType" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "assetName",
      title: "Asset Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "assetKey",
      title: "Storage Key",
      type: "string",
      description: "The storage key in Cloudflare R2",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fileSize",
      title: "File Size (bytes)",
      type: "number",
    }),
    defineField({
      name: "fileType",
      title: "File Type",
      type: "string",
    }),
    defineField({
      name: "uploadedAt",
      title: "Uploaded At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "version",
      title: "Version",
      type: "string",
      description: "Asset version (optional)",
    }),
  ],
  preview: {
    select: {
      title: "assetName",
      productName: "product.name",
      fileType: "fileType",
      fileSize: "fileSize",
    },
    prepare(selection) {
      const { title, productName, fileType, fileSize } = selection;
      const fileSizeFormatted = fileSize
        ? fileSize < 1024 * 1024
          ? `${Math.round(fileSize / 1024)} KB`
          : `${Math.round(fileSize / (1024 * 1024))} MB`
        : "Unknown size";

      return {
        title: title,
        subtitle: `${productName || "Unknown product"} - ${
          fileType || "Unknown type"
        } - ${fileSizeFormatted}`,
        media: FolderIcon,
      };
    },
  },
});
