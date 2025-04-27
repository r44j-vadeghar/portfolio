import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";
import JsonLd from "@/components/JsonLd";
import { SeoManager } from "@/lib/seo/SeoManager";
import { getAllBlogs } from "@/sanity/lib/blog/getAllBlogs";
import { getPagedBlogs } from "@/sanity/lib/blog/getPagedBlogs";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export const metadata: Metadata = SeoManager.getPageMetadata("blog");

export const revalidate = 3600;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const currentPage = parseInt(page ?? "1", 10);
  const blogPageSchema = SeoManager.getWebPageSchema(
    "R44J Insights: Tech, Development & Content Creation",
    "Practical insights on web development, DevOps, content creation, and more.",
    "/blog"
  );

  const breadcrumbSchema = SeoManager.getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const pageSize = 5;
  const blogs = await getPagedBlogs(currentPage, pageSize);

  const totalPosts = await getAllBlogs();

  const lastPage = Math.ceil(totalPosts.length / pageSize);

  if (currentPage > lastPage && lastPage > 0) {
    notFound();
  }

  const firstUrl = `/blog?page=1`;
  const lastPageUrl = lastPage > 1 ? `/blog?page=${lastPage}` : undefined;
  const prevUrl = currentPage > 1 ? `/blog?page=${currentPage - 1}` : undefined;
  const nextUrl =
    currentPage < lastPage ? `/blog?page=${currentPage + 1}` : undefined;

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:pt-44">
      <JsonLd data={[blogPageSchema, breadcrumbSchema]} />

      {blogs.length > 0 ? (
        <div className="flex flex-col gap-10">
          <h1 className="bg-gradient-to-r from-purple-700 to-pink-600 dark:from-[#ffff80] dark:to-[#ff80bf] to-[60%] bg-clip-text sm:pb-2 text-center text-[1.4rem] font-bold text-transparent sm:text-left sm:text-4xl md:text-5xl">
            Discover: Blog Articles and More
          </h1>
          <div className="flex flex-col gap-10">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            prevUrl={prevUrl}
            nextUrl={nextUrl}
            firstUrl={firstUrl}
            lastUrl={lastPageUrl}
          />
        </div>
      ) : (
        <p className="text-center text-2xl dark:text-white text-black">
          No blogs found
        </p>
      )}
    </main>
  );
}
