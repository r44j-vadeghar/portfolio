// src/app/(portfolio)/blog/[slug]/page.tsx
import TableOfContent from "@/components/blog/table-of-content";
import PortableText from "@/components/sanity/portable-text";
import ShareLinks from "@/components/share-links";
import socials from "@/constants/socials";
import { estimateReadingTime } from "@/helpers";
import { parseOutline } from "@/helpers/sanity";
import { imageUrl } from "@/lib/imageUrl";
import { getBlogBySlug } from "@/sanity/lib/blog/getBlogBySlug";
import { toPlainText } from "@portabletext/toolkit";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { unstable_ViewTransition as ViewTransition } from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.seoKeywords,
    openGraph: {
      type: "article",
      url: `https://r44j.dev/blog/${post.slug?.current}`,
      title: post.seoTitle,
      description: post.seoDescription,
      siteName: "R44j Vadeghar Blog",
      images: [
        {
          url: post.mainImage?.asset
            ? imageUrl(post.mainImage.asset).url()
            : "",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      authors: ["Raj Vadeghar"],
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      section: post.categories?.[0]?.title ?? "Technology",
      tags: post.categories?.map((c) => c.title ?? ""),
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const filteredRelated = post.related.filter(
    (related) => related.slug?.current !== post.slug?.current
  );
  const hasRelatedPosts = filteredRelated.length > 0;

  const blocks = parseOutline(post.body ?? []);
  const content = toPlainText(post.body ?? []);
  const readingTime = estimateReadingTime(content);

  // Structure data for SEO (equivalent to blogSchema in Astro)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://r44j.dev/blog/${post.slug?.current}`,
    },
    headline: post.title,
    description: post.seoDescription,
    image: post.mainImage?.asset ? imageUrl(post.mainImage.asset).url() : "",
    keywords: post.seoKeywords,
    author: {
      "@type": "Person",
      name: "Raj Vadeghar",
      url: "https://r44j.dev",
      image: "https://r44j.dev/me.png",
      sameAs: [socials.twitter.url, socials.github.url, socials.linkedin.url],
    },
    publisher: {
      "@type": "Organization",
      name: "R44j Vadeghar",
      logo: {
        "@type": "ImageObject",
        url: "https://r44j.dev/icon-256x256.png",
      },
    },
    datePublished: new Date(post.publishedAt ?? new Date()).toISOString(),
    dateModified: new Date(post._updatedAt).toISOString(),
    wordCount: content.split(/\s+/).length,
    timeRequired: `PT${Math.ceil(readingTime)}M`,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative w-full">
        <div className="mx-auto w-full max-w-screen-xl p-6 px-4 py-12 sm:px-6 lg:px-8">
          <div className="pointer-events-auto -z-50 flex flex-col gap-8 pb-10 md:flex-row md:py-22">
            <ViewTransition name={`${post.slug?.current}-blog-image`}>
              {post.mainImage?.asset && (
                <Image
                  src={imageUrl(post.mainImage.asset).format("webp").url()}
                  alt={post.title ?? ""}
                  className="pointer-events-none z-10 h-fit w-full max-w-6xl rounded-2xl object-cover md:w-1/2"
                  width={400}
                  height={250}
                  priority
                />
              )}
            </ViewTransition>
            <div className="flex flex-col justify-between gap-3">
              <div className="flex flex-col gap-3">
                <ViewTransition name={`${post.slug?.current}-blog-title`}>
                  <h1 className="pb-4 text-xl font-bold text-balance dark:text-white text-black sm:text-5xl">
                    {post.title}
                  </h1>
                </ViewTransition>
                <ViewTransition name={`${post.slug?.current}-blog-desc`}>
                  <h2 className="dark:text-white/70 text-black/70">
                    {post.seoDescription}
                  </h2>
                </ViewTransition>
                <ViewTransition name={`${post.slug?.current}-blog-categories`}>
                  <div className="mt-2 hidden flex-wrap gap-2 md:flex">
                    {post.categories?.map((category) => (
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

              <p className="dark:text-white/70 text-black/70">
                Last updated on:{" "}
                {new Date(post.publishedAt ?? new Date()).toLocaleDateString(
                  "en-us",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                  }
                )}
              </p>
            </div>
          </div>

          <hr className="pb-10 opacity-50 md:mx-36 md:pb-14 dark:border-zinc-700 border-zinc-300" />

          <div className="flex w-full flex-col md:flex-row-reverse md:gap-20">
            <div className="top-14 flex h-fit flex-col gap-28 md:sticky pb-10">
              <div className="flex flex-col gap-5">
                <h5 className="hidden md:block text-2xl dark:text-white/80 text-black/80">
                  Table of contents
                </h5>
                <TableOfContent blocks={blocks} />
                {hasRelatedPosts && (
                  <li className="hidden md:block list-none transition-all dark:hover:text-white/90 hover:text-black/90 dark:text-white/50 text-black/50">
                    <a href="#related-posts">Related posts</a>
                  </li>
                )}
                <ShareLinks
                  url={`https://r44j.dev/blog/${post.slug?.current}`}
                />
              </div>
              {/* Ad component will be added later if needed */}
            </div>

            <div className="mx-auto w-full max-w-3xl">
              <div className="prose lg:prose-lg dark:prose-invert dark:prose-headings:text-white prose-headings:text-black dark:prose-p:text-white/70 prose-p:text-black/70 prose-a:text-blue-600 hover:prose-a:text-blue-500 dark:prose-li:text-white/70 prose-li:text-black/70 dark:prose-blockquote:text-white/50 prose-blockquote:text-black/50 dark:prose-strong:text-white prose-strong:text-black w-full">
                <PortableText portableText={post.body ?? []} />
              </div>

              {hasRelatedPosts && (
                <div
                  id="related-posts"
                  className="mt-28 flex flex-col gap-5 border-t dark:border-gray-800 border-gray-200 pt-28"
                >
                  <h5 className="text-2xl dark:text-white/80 text-black/80">
                    Related posts
                  </h5>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {filteredRelated.slice(0, 4).map((related) => (
                      <a
                        key={related.slug?.current}
                        href={`/blog/${related.slug?.current}`}
                        className="w-fit max-w-sm rounded-3xl bg-gradient-to-b from-blue-800 to-purple-800 p-px"
                      >
                        <div className="flex flex-col gap-3 w-full h-full rounded-[calc(1.5rem-1px)] dark:bg-black bg-white p-2">
                          {related.mainImage?.asset && (
                            <Image
                              src={imageUrl(related.mainImage.asset).url()}
                              alt={related.title ?? ""}
                              className="rounded-[calc(1.5rem-2px)] w-full grow object-cover"
                              width={400}
                              height={250}
                            />
                          )}
                          <p className="p-2 grow dark:text-white text-black">
                            {related.title}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
