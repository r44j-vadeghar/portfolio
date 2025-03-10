// src/components/store/Header.tsx
"use client";
import useBasketStore from "@/store/store";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { Moon, Sun, UserCog } from "lucide-react";
import { useTheme } from "next-themes";
import Form from "next/form";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function Header() {
  const { user } = useUser();
  const { setTheme } = useTheme();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const isAdmin = (userId: string) => {
    const ADMIN_USER_IDS =
      process.env.NEXT_PUBLIC_ADMIN_USER_IDS?.split(",") || [];
    return ADMIN_USER_IDS.includes(userId);
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2 print:hidden">
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          href="/store"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          R44j
        </Link>

        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="bg-input px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
          />
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Button asChild>
            <Link href="/basket" className="relative">
              <TrolleyIcon className="w-6 h-6" />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>

              <span>My Basket</span>
            </Link>
          </Button>

          <ClerkLoaded>
            {user && isAdmin(user.id) && (
              <Button asChild>
                <Link href="/admin">
                  <UserCog className="w-6 h-6" />
                  <span>Admin Panel</span>
                </Link>
              </Button>
            )}

            {user && (
              <Button asChild>
                <Link href="/orders">
                  <PackageIcon className="w-6 h-6" />
                  <span>My Orders</span>
                </Link>
              </Button>
            )}

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />

                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <Button asChild>
                <SignInButton mode="modal" />
              </Button>
            )}
          </ClerkLoaded>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
