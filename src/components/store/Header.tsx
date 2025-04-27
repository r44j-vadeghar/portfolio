// src/components/store/Header.tsx
"use client";
import { cn } from "@/lib/utils";
import useBasketStore from "@/store/store";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import {
  LayoutDashboard,
  Menu,
  Moon,
  Search,
  Sun,
  UserCog,
} from "lucide-react";
import { useTheme } from "next-themes";
import Form from "next/form";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import CommandMenu from "../CommandMenu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

function Header() {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isAdmin = (userId: string) => {
    const ADMIN_USER_IDS =
      process.env.NEXT_PUBLIC_ADMIN_USER_IDS?.split(",") || [];
    return ADMIN_USER_IDS.includes(userId);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsSheetOpen(false);
    }
  };

  // Navigation links for desktop and mobile
  const navLinks = [
    { href: "/store", label: "Shop", icon: null },
    {
      href: "/basket",
      label: "Basket",
      icon: <TrolleyIcon className="w-4 h-4" />,
      badge: itemCount > 0 ? itemCount : null,
    },
    {
      href: "/orders",
      label: "My Orders",
      icon: <PackageIcon className="w-4 h-4" />,
      authRequired: true,
    },
    {
      href: "/admin",
      label: "Admin",
      icon: <UserCog className="w-4 h-4" />,
      adminRequired: true,
    },
    {
      href: "/studio",
      label: "Studio",
      icon: <LayoutDashboard className="w-4 h-4" />,
      adminRequired: true,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container max-w-7xl px-4 mx-auto">
        <div className="flex items-center h-16 justify-between">
          {/* Logo */}
          <Link
            href="/store"
            className="text-xl font-bold text-blue-500 hover:opacity-80 transition-opacity"
          >
            R44j
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 h-full">
            {navLinks.map((link) => {
              // Skip items that require authentication if user is not logged in
              if (link.authRequired && !user) return null;

              // Skip admin items if user is not admin
              if (link.adminRequired && (!user || !isAdmin(user.id)))
                return null;

              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 h-full relative px-1 font-medium text-sm hover:text-foreground transition-colors",
                    isActive
                      ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500"
                      : "text-muted-foreground"
                  )}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="flex items-center justify-center w-5 h-5 text-xs rounded-full bg-blue-500 text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search, theme, user actions */}
          <div className="flex items-center gap-2">
            {/* Desktop Search */}
            {/* <Form
              action="/search"
              className="hidden md:flex items-center relative w-64 lg:w-80"
              onSubmit={handleSearch}
            >
              <Input
                type="text"
                name="query"
                placeholder="Search for products"
                className="pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 text-muted-foreground hover:text-foreground p-1"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </Form> */}

            <CommandMenu />

            {/* User Section */}
            <ClerkLoaded>
              <div className="flex items-center">
                {user ? (
                  <UserButton afterSignOutUrl="/store" />
                ) : (
                  <Button asChild size="sm" variant="outline">
                    <SignInButton mode="modal">Sign In</SignInButton>
                  </Button>
                )}
              </div>
            </ClerkLoaded>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => router.push("/search")}
            >
              <Search size={18} />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Menu size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent className="px-4" side="right">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                {/* Mobile Search */}
                <Form action="/search" className="mb-6" onSubmit={handleSearch}>
                  <div className="relative">
                    <Input
                      type="text"
                      name="query"
                      placeholder="Search for products"
                      className="pr-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                      aria-label="Search"
                    >
                      <Search size={16} />
                    </button>
                  </div>
                </Form>

                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => {
                    if (link.authRequired && !user) return null;
                    if (link.adminRequired && (!user || !isAdmin(user.id)))
                      return null;

                    const isActive = pathname === link.href;

                    return (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center justify-between py-3 px-2 rounded-md transition-colors",
                            isActive
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                              : "hover:bg-muted"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {link.icon}
                            <span>{link.label}</span>
                          </div>
                          {link.badge && (
                            <span className="flex items-center justify-center w-5 h-5 text-xs rounded-full bg-blue-500 text-white">
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                <div className="mt-6 pt-6 border-t">
                  <ClerkLoaded>
                    {user ? (
                      <div className="flex items-center gap-3">
                        <UserButton />
                        <div className="text-sm">
                          <p className="text-muted-foreground">Logged in as</p>
                          <p className="font-medium">
                            {user.fullName ||
                              user.emailAddresses[0]?.emailAddress}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <Button asChild className="w-full">
                        <SignInButton mode="modal">Sign In</SignInButton>
                      </Button>
                    )}
                  </ClerkLoaded>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
