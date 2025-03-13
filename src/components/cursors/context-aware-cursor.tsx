"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export function ContextAwareCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -30, y: -30 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleElementType = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for different element types and set appropriate cursor styles
      if (target.tagName === "A" || target.closest("a")) {
        setCursorVariant("link");
      } else if (target.tagName === "BUTTON" || target.closest("button")) {
        setCursorVariant("button");
      } else if (target.classList.contains("project-card")) {
        setCursorVariant("project");
      } else if (target.classList.contains("copy-text")) {
        setCursorVariant("copy");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleElementType);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleElementType);
    };
  }, []);

  const variants: Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "transparent",
      border: "1.5px solid var(--color-primary)",
      mixBlendMode: "normal",
    },
    link: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "var(--color-primary)",
      mixBlendMode: "difference",
    },
    button: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "var(--color-accent)",
      mixBlendMode: "difference",
    },
    project: {
      x: mousePosition.x - 60,
      y: mousePosition.y - 60,
      height: 120,
      width: 120,
      backgroundColor: "var(--color-chart-1)",
      mixBlendMode: "difference",
    },
    copy: {
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      height: 50,
      width: 50,
      backgroundColor: "var(--color-chart-3)",
      mixBlendMode: "difference",
    },
  };

  // Screen size check
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
      <motion.div
        className="fixed top-0 left-0 rounded-full z-50 pointer-events-none flex items-center justify-center text-xs font-medium"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          mass: 0.3,
          stiffness: 800,
          damping: 20,
        }}
      >
        {/* {cursorText && <span className="text-background">{cursorText}</span>} */}
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full z-50 pointer-events-none"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          opacity: cursorVariant === "default" ? 0.8 : 0,
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 1000,
          damping: 30,
        }}
      />
    </>
  );
}
