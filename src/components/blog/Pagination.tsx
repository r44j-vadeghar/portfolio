// src/components/blog/Pagination.tsx
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  prevUrl?: string;
  nextUrl?: string;
  firstUrl?: string;
  lastUrl?: string;
}

export default function Pagination({
  currentPage,
  lastPage,
  prevUrl,
  nextUrl,
  firstUrl = "/blog?page=1",
  lastUrl,
}: PaginationProps) {
  const getPageNumbers = (current: number, last: number) => {
    if (last < 1) return [];

    const range: number[] = [];
    const start = Math.max(1, current - 2);
    const end = Math.min(last, current + 2);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const pageNumbers = getPageNumbers(currentPage, lastPage);

  return (
    <div className="mt-8 flex items-center justify-center space-x-2">
      {currentPage > 1 && (
        <>
          <Button variant="outline" size="sm" asChild>
            <Link href={firstUrl}>First</Link>
          </Button>

          {prevUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex gap-2 items-center"
              asChild
            >
              <Link href={prevUrl}>
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Link>
            </Button>
          )}
        </>
      )}

      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          className="w-10 h-10 rounded-full"
          asChild
        >
          <Link href={page === 1 ? firstUrl : `/blog?page=${page}`}>
            {page}
          </Link>
        </Button>
      ))}

      {currentPage < lastPage && nextUrl && (
        <>
          <Button
            variant="outline"
            size="sm"
            className="flex gap-2 items-center"
            asChild
          >
            <Link href={nextUrl}>
              Next
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          {lastUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link href={lastUrl}>Last</Link>
            </Button>
          )}
        </>
      )}
    </div>
  );
}
