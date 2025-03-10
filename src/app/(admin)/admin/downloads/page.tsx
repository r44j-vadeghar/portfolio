// src/app/(admin)/admin/downloads/page.tsx
import { ProductAssetsTable } from "@/components/admin/product-assets-table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function DownloadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Product Downloads
          </h1>
          <p className="text-muted-foreground">
            Manage downloadable files for your products.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/downloads/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Download
          </Link>
        </Button>
      </div>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ProductAssetsTable />
      </Suspense>
    </div>
  );
}
