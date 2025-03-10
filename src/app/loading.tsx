import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="container py-8 mx-auto">
      {/* Hero section skeleton */}
      <div className="mb-12">
        <Skeleton className="h-12 w-3/4 max-w-xl mb-4" />
        <Skeleton className="h-6 w-1/2 max-w-md mb-8" />
        <div className="flex gap-4 mb-10">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      {/* Featured products skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-60 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="flex flex-col space-y-4 border rounded-xl p-6 shadow-sm"
              >
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between items-center mt-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-9 w-9 rounded-full" />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Testimonials skeleton */}
      <div className="mt-16">
        <Skeleton className="h-8 w-52 mb-6 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="border rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-12 w-12 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Loading;
