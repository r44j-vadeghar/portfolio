"use client";

import SocialLinks from "@/constants/socials";
import { ChevronUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative mx-auto flex items-center justify-center bg-background p-5 text-foreground shadow-md">
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
