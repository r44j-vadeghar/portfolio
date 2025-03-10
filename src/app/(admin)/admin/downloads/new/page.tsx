// src/app/(admin)/admin/downloads/new/page.tsx
import { UploadDownloadForm } from "@/components/admin/upload-download-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function NewDownloadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Download</h1>
        <p className="text-muted-foreground">
          Upload new downloadable files for your products.
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <UploadDownloadForm />
      </Suspense>
    </div>
  );
}
