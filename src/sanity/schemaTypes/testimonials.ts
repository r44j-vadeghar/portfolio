import { MessageCircleIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  icon: MessageCircleIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "designation",
      title: "Designation",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "feedback",
      title: "Feedback",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
      options: {
        list: [1, 2, 3, 4, 5],
      },
    }),
    defineField({
      name: "image",
      title: "Client Image",
      type: "image",
      hidden: ({ document }) => Boolean(document?.isVideo),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "isVideo",
      title: "Is Video Testimonial",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "imageUrl",
      title: "Image URL",
      type: "url",
      hidden: ({ document }) => !document?.isVideo,
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      hidden: ({ document }) => !document?.isVideo,
    }),
    defineField({
      name: "thumbnailUrl",
      title: "Thumbnail URL",
      type: "url",
      hidden: ({ document }) => !document?.isVideo,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "company",
      media: "image",
    },
  },
});
