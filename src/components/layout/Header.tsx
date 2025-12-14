"use client";

import CommandMenu from "@/components/CommandMenu";
import Socials from "@/components/Socials";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import SplitType from "split-type";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
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
      className="w-full z-50 mx-auto flex max-w-screen-2xl items-center justify-between gap-5 overflow-x-hidden p-5"
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

      <div className="flex gap-3 items-center">
        <CommandMenu />
      </div>
    </header>
  );
}
