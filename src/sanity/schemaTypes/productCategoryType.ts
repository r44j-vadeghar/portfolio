// src/sanity/schemaTypes/productCategoryType.ts
import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productCategoryType = defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "description",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
