"use client";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { client } from "@/sanity/lib/client";
import {
  Briefcase,
  Calendar,
  FileText,
  Heart,
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
    href: "/services",
    label: "Services",
    keywords: "consulting, freelance, hire, development, code review",
    icon: Briefcase,
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
  {
    href: "/sponsor",
    label: "Sponsor",
    keywords: "partnership, sponsorship, advertise, collaborate",
    icon: Heart,
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
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {navItems.map((item) => (
              <CommandItem
                key={item.href}
                value={`${item.label} ${item.keywords}`}
                onSelect={() => {
                  router.push(item.href);
                  setOpen(false);
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          {blogs && blogs.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Recent Posts">
                {blogs.map((blog) => (
                  <CommandItem
                    key={blog._id}
                    value={`${blog.title} ${blog.seoDescription || ""}`}
                    onSelect={() => {
                      router.push(`/blog/${blog.slug?.current}`);
                      setOpen(false);
                    }}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{blog.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(blog.publishedAt || blog._createdAt)}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />
          <CommandGroup heading="Actions">
            {actionItems.map((action) => (
              <CommandItem
                key={action.id}
                value={`${action.label} ${action.keywords}`}
                onSelect={() => handleActionSelect(action.id)}
              >
                {action.id === "theme" && theme === "dark" && action.lightIcon ? (
                  <action.lightIcon className="mr-2 h-4 w-4" />
                ) : (
                  <action.icon className="mr-2 h-4 w-4" />
                )}
                <span>{action.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
