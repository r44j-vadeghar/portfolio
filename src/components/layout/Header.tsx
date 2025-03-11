"use client";

import Socials from "@/components/Socials";
import HeaderNavItem from "@/components/layout/HeaderNavItem";
import gsap from "gsap";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const navItems = [
  { href: "/", label: "Localhost" },
  { href: "/about", label: "About" },
  { href: "/uses", label: "Uses" },
  { href: "/store", label: "Store" },
  { href: "/blog", label: "Blog" },
  { href: "/studio", label: "Studio", isAdmin: true },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const headerRef = useRef<HTMLDivElement>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (!headerRef.current) return;

    const mm = gsap.matchMedia();
    const breakPoint = 800;

    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isSmallScreen: `(max-width: 640px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      () => {
        const main = document.querySelector("main");
        const nameElement = document.querySelector("#name");

        if (!nameElement) return;

        const letters = new SplitType("#name", { split: "chars" }).chars;
        const duration = 0.3;

        const mainTl = gsap.timeline();
        const staggerTl = gsap.timeline({
          defaults: {
            duration: duration,
            stagger: duration / 15,
            repeatDelay: 1,
          },
        });
        const settersTl = gsap.timeline();

        mainTl.timeScale(2);

        settersTl
          .set("#profile-divider", {
            height: 0,
            opacity: 0,
          })
          .set("#profile-data", { opacity: 0 })
          .set("#profile-img", {
            opacity: 0,
            scale: 1.2,
          });

        const fromVars = { opacity: 0, scale: 0.7, filter: "blur(40px)" };
        const toVars = { opacity: 1, scale: 1, filter: "none" };

        staggerTl
          .fromTo(letters, fromVars, toVars)
          .fromTo("#socials a", fromVars, toVars, "<+=0.2");

        mainTl
          .to(
            "#profile-img",
            { opacity: 1, scale: 1, ease: "power1.out" },
            "+=0.2"
          )
          .to("#profile-divider", { height: "2.5rem", opacity: 1 })
          .to("#profile-data", { opacity: 1 })
          .add(staggerTl)
          .to(main, { display: "flex", opacity: 1, duration: 1 });
      }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="w-full z-50 mx-auto grid max-w-screen-2xl items-center justify-between gap-5 overflow-x-hidden p-5 grid-cols-2 md:grid-cols-3"
      data-header
    >
      <div
        id="profile"
        className="flex items-center gap-3 justify-self-start scale-75 origin-left sm:scale-100"
      >
        <Link href="/" className="h-12 w-12">
          <Image
            width={100}
            height={100}
            id="profile-img"
            src="/me.png"
            alt="raj"
            className="z-10 h-12 w-12 rounded-full whitespace-nowrap border object-contain"
          />
        </Link>
        <div
          id="profile-divider"
          className="h-10 w-[0.5px] rounded-full bg-foreground/70"
        ></div>
        <div id="profile-data" className="flex flex-col gap-2">
          <Link
            href="/about"
            id="name"
            className="font-medium text-foreground whitespace-nowrap"
          >
            Full Stack Developer
          </Link>
          <Socials className="flex items-center gap-2" />
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center font-medium justify-center">
        {navItems.map((item) => (
          <HeaderNavItem
            key={item.href}
            href={item.href}
            active={pathname === item.href}
            showAdmin={item.isAdmin}
          >
            {item.label}
          </HeaderNavItem>
        ))}
      </nav>

      <div className="flex gap-3 items-center justify-end ml-auto">
        {/* Simple Theme Toggle Button */}
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

        {/* Mobile Menu Sheet */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 px-4">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <HeaderNavItem
                    href={item.href}
                    active={pathname === item.href}
                    showAdmin={item.isAdmin}
                  >
                    {item.label}
                  </HeaderNavItem>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link
                  href="https://calendly.com/r44j/30min"
                  className="w-full rounded-lg bg-primary/10 px-6 py-3 text-center text-sm font-bold text-primary ring-primary/30 ring-offset-2 ring-offset-background transition-all hover:bg-primary/20 hover:ring-2 focus:ring-2 mt-4"
                >
                  Book a free meeting
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop CTA Button */}
        <Link
          href="https://calendly.com/r44j/30min"
          className="hidden md:block w-fit justify-self-end rounded-lg bg-primary/10 px-6 py-2 text-sm font-bold text-primary ring-primary/30 ring-offset-2 ring-offset-background transition-all hover:bg-primary/20 hover:ring-2 focus:ring-2"
        >
          Book a free meeting
        </Link>
      </div>
    </header>
  );
}
