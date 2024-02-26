import { getAllBlogs } from "@/helpers/server-actions";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const blogs = await getAllBlogs();

  return rss({
    // `<title>` field in output xml
    title:
      "R44j Vadeghar Insights: Chrome Extensions, Astro, React, Next.js, TypeScript, and More",
    // `<description>` field in output xml
    description:
      "Web and software development insights: Chrome extensions, Astro, React, Next.js, TypeScript, and more. Stay updated with our RSS feed.",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site ?? "https://r44j.dev",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blogs.map((post) => ({
      title: post.title,
      pubDate: new Date(post.publishedAt),
      description: post.seoDescription,
      link: `/blog/${post.slug.current}/`
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`
  });
}
