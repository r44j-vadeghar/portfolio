"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCursor } from "@/providers/cursor-provider";
import { client } from "@/sanity/lib/client";
import {
  Calendar,
  FileText,
  Home,
  Laptop,
  Mail,
  Moon,
  MousePointer,
  MousePointerClick,
  Search,
  ShoppingBag,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PAGED_BLOGS_QUERYResult } from "../../sanity.types";

type NavItem = {
  href: string;
  label: string;
  keywords: string;
  icon: React.ElementType;
};

type ActionItem = {
  id: string;
  label: string;
  keywords: string;
  shortcut: string;
  icon: React.ElementType;
  lightIcon?: React.ElementType;
  defaultIcon?: React.ElementType;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", keywords: "homepage, main, landing", icon: Home },
  {
    href: "/about",
    label: "About",
    keywords: "about me, profile, bio, information",
    icon: User,
  },
  {
    href: "/uses",
    label: "Uses",
    keywords: "tools, stack, software, hardware, equipment",
    icon: Laptop,
  },
  {
    href: "/store",
    label: "Store",
    keywords: "shop, purchase, buy, products",
    icon: ShoppingBag,
  },
  {
    href: "/blog",
    label: "Blog",
    keywords: "articles, posts, writing, content",
    icon: FileText,
  },
];

const actionItems: ActionItem[] = [
  {
    id: "theme",
    label: "Toggle Theme",
    keywords: "dark mode, light mode, appearance, color scheme",
    shortcut: "T",
    icon: Moon,
    lightIcon: Sun,
  },
  {
    id: "cursor",
    label: "Toggle Default Cursor",
    keywords: "cursor, pointer, mouse, default",
    shortcut: "X",
    icon: MousePointer,
    defaultIcon: MousePointerClick,
  },
  {
    id: "meeting",
    label: "Book a Meeting",
    keywords: "schedule, call, consultation, calendly, appointment",
    shortcut: "B",
    icon: Calendar,
  },
  {
    id: "contact",
    label: "Contact Me",
    keywords: "email, message, reach out, get in touch",
    shortcut: "C",
    icon: Mail,
  },
];

export default function CommandMenu() {
  const [blogs, setBlogs] = useState<PAGED_BLOGS_QUERYResult>([]);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { showNormalCursor, toggleCursor } = useCursor();

  const router = useRouter();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const query = `
          *[_type == "post"] | order(publishedAt desc, _createdAt desc) [0...5] {
            _id,
            title,
            slug,
            publishedAt,
            _createdAt,
            categories[]->,
            "excerpt": pt::text(body[0...200]),
            "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
          }
        `;
        const blogs = await client.fetch(query);
        setBlogs(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }

    if (open) {
      fetchBlogs();
    }
  }, [open]);

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setOpen(false);
  };

  const handleBookMeeting = () => {
    window.open("https://calendly.com/r44j/30min", "_blank");
    setOpen(false);
  };

  const handleContact = () => {
    window.location.href = "mailto:your-email@example.com";
    setOpen(false);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Format date for blog posts
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Handle action selection based on ID
  const handleActionSelect = (actionId: string) => {
    switch (actionId) {
      case "theme":
        handleToggleTheme();
        break;
      case "cursor":
        toggleCursor();
        break;
      case "meeting":
        handleBookMeeting();
        break;
      case "contact":
        handleContact();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 transition-all hover:bg-accent/40 bg-accent/20 backdrop-blur-md hover:text-accent-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search...</span>
        <span className="sr-only">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command loop className="rounded-lg border shadow-lg overflow-hidden">
          <CommandInput
            placeholder="Type a command or search..."
            className="h-11 placeholder:text-muted-foreground/70 text-base focus:outline-none"
          />

          <CommandList className="max-h-[300px] overflow-auto py-2">
            <CommandEmpty className="py-6 text-center">
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <Search className="h-10 w-10 mb-2 opacity-20" />
                <p className="mb-1">No results found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            </CommandEmpty>

            <CommandGroup heading="Navigation" className="px-2">
              {navItems.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`${item.label} ${item.keywords}`}
                  onSelect={() => {
                    router.push(item.href);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-accent rounded-md"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-md bg-muted/80 shrink-0">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-medium text-sm">{item.label}</span>
                    {/* <span className="text-xs text-muted-foreground truncate">
                      {item.keywords}
                    </span> */}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>

            {/* Blog Posts Section */}
            {blogs && blogs.length > 0 && (
              <>
                <CommandSeparator className="my-2" />
                <CommandGroup heading="Recent Posts" className="px-2">
                  {blogs.map((blog) => (
                    <CommandItem
                      key={blog._id}
                      value={`${blog.title} ${blog.seoDescription || ""}`}
                      onSelect={() => {
                        router.push(`/blog/${blog.slug?.current}`);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-accent rounded-md"
                    >
                      <div className="flex items-center justify-center w-7 h-7 rounded-md bg-muted/80 shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <span className="font-medium text-sm truncate">
                          {blog.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(blog.publishedAt || blog._createdAt)}
                          {/* {getEsp &&
                            ` • ${blog.estimatedReadingTime} min read`} */}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            <CommandSeparator className="my-2" />
            <CommandGroup heading="Actions" className="px-2">
              {actionItems.map((action) => (
                <CommandItem
                  key={action.id}
                  value={`${action.label} ${action.keywords}`}
                  onSelect={() => handleActionSelect(action.id)}
                  className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-accent rounded-md"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-md bg-muted/80 shrink-0">
                    {action.id === "theme" &&
                    theme === "dark" &&
                    action.lightIcon ? (
                      <action.lightIcon className="h-4 w-4" />
                    ) : action.id === "cursor" &&
                      showNormalCursor &&
                      action.defaultIcon ? (
                      <action.defaultIcon className="h-4 w-4" />
                    ) : (
                      <action.icon className="h-4 w-4" />
                    )}
                  </div>
                  <span className="font-medium text-sm flex-1">
                    {action.label}
                  </span>
                  {/* <CommandShortcut>⌘{action.shortcut}</CommandShortcut> */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <div className="border-t px-3 py-2 text-xs text-muted-foreground flex items-center justify-between">
            <div>
              <kbd className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
                ↑
              </kbd>{" "}
              <kbd className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
                ↓
              </kbd>{" "}
              to navigate
            </div>
            <div>
              <kbd className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
                Enter
              </kbd>{" "}
              to select
            </div>
            <div>
              <kbd className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
                Esc
              </kbd>{" "}
              to close
            </div>
          </div>
        </Command>
      </CommandDialog>
    </>
  );
}
