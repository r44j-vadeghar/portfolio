import { getAllBlogs } from "@/helpers/server-actions";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import sanitizeHtml from "sanitize-html";
import { toPlainText } from "@portabletext/toolkit";

export async function GET(context: APIContext) {
  const blogs = await getAllBlogs();
  const site = context.site ?? "https://r44j.dev";

  return rss({
    title:
      "R44j Vadeghar Insights: Chrome Extensions, Astro, React, Next.js, TypeScript, and More",
    description:
      "Web and software development insights: Chrome extensions, Astro, React, Next.js, TypeScript, and more. Stay updated with our RSS feed.",
    site,
    items: blogs.map((post) => ({
      title: post.title,
      pubDate: new Date(post.publishedAt),
      description: post.seoDescription,
      content: sanitizeHtml(toPlainText(post.body)),
      link: `/blog/${post.slug.current}/`,
      categories: post.categories.map((cat) => cat.title),
      author: "R44j Vadeghar"
    })),
    stylesheet: "/rss/styles.xsl",
    customData: `
      <language>en-us</language>
      <image>
        <url>${site}/icon-256x256.png</url>
        <title>R44j Vadeghar Blog</title>
        <link>${site}</link>
      </image>
      <copyright>Copyright ${new Date().getFullYear()} R44j Vadeghar</copyright>
    `
  });
}
