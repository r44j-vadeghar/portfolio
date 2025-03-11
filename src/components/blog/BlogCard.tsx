// src/components/blog/BlogCard.tsx
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import { PAGED_BLOGS_QUERYResult } from "../../../sanity.types";
interface BlogCardProps {
  blog: PAGED_BLOGS_QUERYResult[0];
  isLoading?: boolean;
}

export default function BlogCard({ blog, isLoading = false }: BlogCardProps) {
  const skeletonClasses = "animate-pulse dark:bg-gray-700 bg-gray-200";

  if (isLoading) {
    return (
      <div className="group relative block animate-pulse">
        <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border dark:border-zinc-800/50 border-zinc-200/50 dark:bg-black bg-white backdrop-blur-sm sm:flex-row">
          <div
            className={`aspect-video w-full sm:w-[45%] ${skeletonClasses}`}
          />
          <div className="flex flex-1 flex-col justify-between space-y-3 p-5 sm:p-6">
            <div className="space-y-2">
              <div className={`h-6 w-3/4 ${skeletonClasses}`} />
              <div className={`h-4 w-full ${skeletonClasses}`} />
              <div className={`h-4 w-5/6 ${skeletonClasses}`} />
            </div>
            <div className="flex gap-2">
              <div className={`h-6 w-20 rounded-full ${skeletonClasses}`} />
              <div className={`h-6 w-20 rounded-full ${skeletonClasses}`} />
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <Link href={`/blog/${blog.slug?.current}`} className="group relative block">
      <div className="animate-tilt absolute -inset-0.5 -z-10 rounded-3xl dark:bg-gradient-to-r from-blue-800 to-purple-800 opacity-60 blur transition duration-1000 group-hover:opacity-100 group-hover:blur-md group-hover:duration-100" />
      <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border dark:border-zinc-800/50 border-zinc-200/50 dark:bg-black bg-white backdrop-blur-sm sm:flex-row">
        <ViewTransition name={`${blog.slug?.current}-blog-image`}>
          {blog.mainImage && blog.mainImage.asset && (
            <Image
              src={imageUrl(blog.mainImage.asset).format("webp").url()}
              alt={blog.title ?? ""}
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:w-[45%]"
              width={400}
              height={250}
            />
          )}
        </ViewTransition>
        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div className="flex flex-col gap-3">
            <ViewTransition name={`${blog.slug?.current}-blog-title`}>
              <h2 className="text-lg font-medium dark:text-white/90 text-black/90 sm:text-xl">
                {blog.title}
              </h2>
            </ViewTransition>
            <ViewTransition name={`${blog.slug?.current}-blog-desc`}>
              <p className="line-clamp-3 text-sm dark:text-zinc-400 text-zinc-600">
                {blog.seoDescription}
              </p>
            </ViewTransition>
            <ViewTransition name={`${blog.slug?.current}-blog-categories`}>
              <div className="mt-2 flex flex-wrap gap-2">
                {blog.categories?.map((category) => (
                  <span
                    key={category._id}
                    className="rounded-full dark:bg-zinc-800/50 bg-zinc-200/50 px-3 py-1 text-xs dark:text-zinc-300 text-zinc-700"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            </ViewTransition>
          </div>
        </div>
      </article>
    </Link>
  );
}
