import { DocumentTextIcon } from "@sanity/icons";
import { orderRankField } from "@sanity/orderable-document-list";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description:
        "It is recommended to include a title consisting of 5 to 80 characters.",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(80).warning(),
    }),
    defineField({
      name: "slug",
      description:
        "Slug should be short, descriptive, human readable and should include your target keyword. Avoid including numbers or years",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "updatedAt",
      title: "Updated at",
      type: "datetime",
      description: "Set this when you make significant updates to the post",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "seoTitle",
      description:
        "Make it as enticing as possible to convert users in social feeds and Google searches. Ideally between 15 and 70 characters",
      title: "Title for SEO & Social Sharing",
      type: "string",
      validation: (Rule) => Rule.required().min(15).max(70).warning(),
    }),
    defineField({
      name: "seoDescription",
      description:
        "⚡️ Optional but highly encouraged as it'll help you convert more visitors from Google & social. Ideally between 70 and 160 characters.",
      title: "Short paragraph for SEO and Social Sharing (meta description)",
      type: "string",
      validation: (Rule) => Rule.required().min(70).max(160).warning(),
    }),
    defineField({
      name: "seoKeywords",
      description: "Seperate, with, commas",
      title: "SEO Keywords",
      type: "string",
    }),
    defineField({
      name: "sponsor",
      title: "Sponsor",
      type: "object",
      description: "Add sponsor information for this post",
      fields: [
        defineField({
          name: "name",
          title: "Sponsor Name",
          type: "string",
        }),
        defineField({
          name: "logo",
          title: "Sponsor Logo",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "url",
          title: "Sponsor URL",
          type: "url",
        }),
        defineField({
          name: "description",
          title: "Sponsor Description",
          type: "text",
          rows: 2,
        }),
      ],
    }),
    orderRankField({ type: "post" }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
