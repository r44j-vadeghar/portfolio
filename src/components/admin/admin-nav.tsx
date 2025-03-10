// src/components/admin/admin-nav.tsx
"use client";

import { BarChart, FileDown, Package, ShoppingCart, Tags } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: <Package className="w-5 h-5" />,
    },
    {
      title: "Sales",
      href: "/admin/sales",
      icon: <Tags className="w-5 h-5" />,
    },
    {
      title: "Downloads",
      href: "/admin/downloads",
      icon: <FileDown className="w-5 h-5" />,
    },
  ];

  return (
    <div className="bg-background border-b">
      <div className="container flex h-16 mx-auto items-center">
        <div className="mr-8 flex items-center">
          <Link href="/admin" className="text-xl font-bold">
            Admin Dashboard
          </Link>
        </div>
        <nav className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href="/store"
            className="text-sm font-medium text-muted-foreground"
          >
            Back to Site
          </Link>
        </div>
      </div>
    </div>
  );
}
