// src/app/(admin)/admin/layout.tsx
"use client";
import { AdminNav } from "@/components/admin/admin-nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <AdminNav />
        <main className="flex-1 container py-6 mx-auto">{children}</main>
      </div>
    </QueryClientProvider>
  );
}
