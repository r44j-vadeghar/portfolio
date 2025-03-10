// src/app/(admin)/admin/page.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, FileDown, Package, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your store performance and management.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
          <DashboardCard
            title="Total Orders"
            value="Loading..."
            description="All time orders"
            icon={<ShoppingCart className="h-4 w-4" />}
            link="/admin/orders"
            linkText="View orders"
          />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
          <DashboardCard
            title="Products"
            value="Loading..."
            description="Total active products"
            icon={<Package className="h-4 w-4" />}
            link="/admin/products"
            linkText="Manage products"
          />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
          <DashboardCard
            title="Downloads"
            value="Loading..."
            description="Total downloadable assets"
            icon={<FileDown className="h-4 w-4" />}
            link="/admin/downloads"
            linkText="Manage downloads"
          />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
          <DashboardCard
            title="Revenue"
            value="Loading..."
            description="Total revenue"
            icon={<DollarSign className="h-4 w-4" />}
            link="/admin/orders"
            linkText="View details"
          />
        </Suspense>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Additional dashboard widgets could go here */}
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  description,
  icon,
  link,
  linkText,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  linkText: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href={link}>{linkText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
