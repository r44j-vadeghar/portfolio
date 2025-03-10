// src/app/(portfolio)/blog/page.tsx
import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";
import SiteData from "@/constants/siteData.json";
import { getAllBlogs, getBlogs } from "@/helpers/server-actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export const metadata: Metadata = {
  title: SiteData.pages.blog.title,
  description: SiteData.pages.blog.description,
  keywords: SiteData.pages.blog.keywords,
};

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page } = await searchParams;
  const currentPage = parseInt(page ?? "1", 10);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const pageSize = 5;
  const blogs = await getBlogs(currentPage, pageSize);

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
    <main className="mx-auto max-w-4xl pt-20 sm:pt-48">
      {blogs.length > 0 ? (
        <div className="flex flex-col gap-10">
          <h1 className="bg-gradient-to-r from-[#ffff80] to-[#ff80bf] to-[60%] bg-clip-text pb-2 text-center text-2xl font-bold text-transparent sm:text-left sm:text-4xl md:text-5xl">
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
