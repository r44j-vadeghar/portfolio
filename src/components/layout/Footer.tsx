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
          className="mx-2"
        >
          {theme === "dark" ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="mx-2"
          title="Scroll to top"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </nav>
    </footer>
  );
}
