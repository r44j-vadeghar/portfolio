"use client";

import SocialLinks from "@/constants/socials";
import { ChevronUp, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative mx-auto flex items-center justify-center p-5 text-foreground shadow-md">
      <nav className="flex items-center">
        <Link
          className="pr-4 text-muted-foreground transition-all hover:underline hover:text-foreground"
          href={SocialLinks.mail.url}
          title={SocialLinks.mail.title}
        >
          Email
        </Link>
        <Link
          className="px-4 text-muted-foreground transition-all hover:underline hover:text-foreground"
          href={SocialLinks.linkedin.url}
          title={SocialLinks.linkedin.title}
        >
          Linkedin
        </Link>
        <Link
          className="px-4 text-muted-foreground transition-all hover:underline hover:text-foreground"
          href={SocialLinks.github.url}
          title={SocialLinks.github.title}
        >
          Github
        </Link>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>

        <button
          onClick={scrollToTop}
          className="mx-4 flex items-center gap-1 rounded-full p-2 text-muted-foreground transition-all hover:bg-accent hover:underline hover:text-foreground"
        >
          <ChevronUp className="h-7 w-7 hover:stroke-2" />
        </button>
      </nav>
    </footer>
  );
}
