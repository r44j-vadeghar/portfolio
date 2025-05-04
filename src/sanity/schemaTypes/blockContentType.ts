// src/sanity/schemaTypes/blockContentType.ts
import {
  DocumentIcon,
  EarthGlobeIcon,
  ImageIcon,
  ThListIcon,
  TrolleyIcon,
} from "@sanity/icons";
import { defineArrayMember, defineType } from "sanity";

export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
        { title: "Callout", value: "callout" },
        { title: "Lead Paragraph", value: "lead" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
        { title: "Check List", value: "checkList" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
          { title: "Highlight", value: "highlight" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) => Rule.required(),
              },
            ],
          },
          {
            title: "Internal Link",
            name: "internalLink",
            type: "object",
            icon: DocumentIcon,
            fields: [
              {
                title: "Reference",
                name: "reference",
                type: "reference",
                to: [{ type: "post" }],
                validation: (Rule) => Rule.required(),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      title: "Product Showcase",
      name: "productReference",
      type: "object",
      icon: TrolleyIcon,
      fields: [
        {
          title: "Product",
          name: "product",
          type: "reference",
          to: [{ type: "productType" }],
          validation: (Rule) => Rule.required(),
        },
        {
          title: "Display Style",
          name: "style",
          type: "string",
          options: {
            list: [
              { title: "Compact", value: "compact" },
              { title: "Full", value: "full" },
              { title: "Featured", value: "featured" },
            ],
          },
          initialValue: "compact",
        },
        {
          title: "Custom Call to Action",
          name: "customCta",
          type: "string",
          description: "Override the default 'View Product' text",
        },
        {
          title: "Show Price",
          name: "showPrice",
          type: "boolean",
          initialValue: true,
        },
      ],
      preview: {
        select: {
          title: "product.name",
          media: "product.image",
          price: "product.price",
          style: "style",
        },
        prepare({ title, media, price, style }) {
          return {
            title: title || "Product Showcase",
            subtitle: `Style: ${style || "compact"}${
              price ? ` • ₹${price}` : ""
            }`,
            media: media,
          };
        },
      },
    }),
    defineArrayMember({
      type: "youtube",
    }),
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
        {
          name: "fullWidth",
          type: "boolean",
          title: "Full Width",
          description: "Should this image span the full width of the content?",
          initialValue: false,
        },
      ],
    }),
    defineArrayMember({
      type: "code",
    }),
    defineArrayMember({
      type: "table",
      icon: ThListIcon,
    }),
    // Embeds like Twitter, Instagram, etc.
    defineArrayMember({
      type: "embed",
      icon: EarthGlobeIcon,
    }),
    defineArrayMember({
      type: "file",
      fields: [
        {
          name: "description",
          type: "string",
          title: "Description",
        },
      ],
    }),
    defineArrayMember({
      title: "Call to Action",
      name: "cta",
      type: "object",
      fields: [
        {
          title: "Text",
          name: "text",
          type: "string",
        },
        {
          title: "URL",
          name: "url",
          type: "url",
        },
        {
          title: "Style",
          name: "style",
          type: "string",
          options: {
            list: [
              { title: "Primary", value: "primary" },
              { title: "Secondary", value: "secondary" },
              { title: "Ghost", value: "ghost" },
            ],
          },
          initialValue: "primary",
        },
      ],
      preview: {
        select: {
          title: "text",
          subtitle: "url",
        },
      },
    }),
  ],
});
