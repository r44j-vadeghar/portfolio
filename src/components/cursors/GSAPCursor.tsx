"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export function GSAPCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Set initial positions off-screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(follower, { xPercent: -50, yPercent: -50, opacity: 0 });

    // Create GSAP contexts for smoother animations
    const cursorCtx = gsap.context(() => {});
    const followerCtx = gsap.context(() => {});

    const handleMouseMove = (e: MouseEvent) => {
      // Animate cursor to mouse position
      cursorCtx.add(() => {
        gsap.to(cursor, {
          duration: 0.1,
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          ease: "power2.out",
        });
      });

      // Animate follower with delay
      followerCtx.add(() => {
        gsap.to(follower, {
          duration: 0.5,
          x: e.clientX,
          y: e.clientY,
          opacity: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer")
      ) {
        // Scale up cursor and follower
        gsap.to(cursor, {
          duration: 0.3,
          scale: 0.5,
          opacity: 0.5,
          backgroundColor: "var(--color-accent)",
          ease: "power2.out",
        });

        gsap.to(follower, {
          duration: 0.3,
          scale: 2,
          backgroundColor: "transparent",
          borderColor: "var(--color-primary)",
          ease: "power2.out",
        });
      } else {
        // Reset cursor and follower
        gsap.to(cursor, {
          duration: 0.3,
          scale: 1,
          opacity: 1,
          backgroundColor: "var(--color-primary)",
          ease: "power2.out",
        });

        gsap.to(follower, {
          duration: 0.3,
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "var(--color-primary)",
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], {
        duration: 0.3,
        opacity: 0,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cursorCtx.revert();
      followerCtx.revert();
    };
  }, []);

  // Only show on desktop
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-primary z-50 pointer-events-none mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-20 h-20 rounded-full border border-primary/30 z-50 pointer-events-none"
      />
    </>
  );
}
