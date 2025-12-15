"use client";

import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  FileText,
  Home,
  Laptop,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/uses", label: "Uses", icon: Laptop },
  { href: "/store", label: "Store", icon: ShoppingBag },
  { href: "/blog", label: "Blog", icon: FileText },
];

interface DockNavigationProps {
  onOpenCommandMenu?: () => void;
}

export default function DockNavigation({
  onOpenCommandMenu,
}: DockNavigationProps) {
  const pathname = usePathname();

  const handleOpenCommandMenu = () => {
    // Trigger the command menu by dispatching the keyboard shortcut
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
    onOpenCommandMenu?.();
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <Dock
          iconSize={40}
          iconMagnification={60}
          iconDistance={100}
          className="bg-background/5 border-border/50 shadow-xl mt-0 backdrop-blur-md"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <DockIcon
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-center w-full h-full"
                    >
                      <item.icon className="size-5" />
                    </Link>
                  </DockIcon>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Separator */}
          <div className="h-8 w-px bg-border/50 mx-1" />

          {/* Search */}
          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon
                className="hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                onClick={handleOpenCommandMenu}
              >
                <Search className="size-5" />
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8}>
              <p className="flex items-center gap-1">
                Search{" "}
                <kbd className="bg-muted rounded px-1 py-0.5 text-xs ml-1">
                  ⌘K
                </kbd>
              </p>
            </TooltipContent>
          </Tooltip>

          {/* Theme Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon className="hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer [&>div]:m-auto">
                <AnimatedThemeToggler />
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8}>
              Toggle Theme
            </TooltipContent>
          </Tooltip>
        </Dock>
      </div>
    </TooltipProvider>
  );
}
