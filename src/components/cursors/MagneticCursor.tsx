"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function MagneticCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    // Set up magnetic effect for interactive elements
    const setupMagneticElements = () => {
      const magneticElements = document.querySelectorAll("[data-magnetic]");

      magneticElements.forEach((element) => {
        element.addEventListener("mousemove", (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = (element as HTMLElement).getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const distanceX = mouseEvent.clientX - centerX;
          let distanceY = mouseEvent.clientY - centerY;
          // @ts-ignore
          distanceY = e.clientY - centerY;

          setCursorPosition({
            x: mouseEvent.clientX - distanceX * 0.3,
            y: mouseEvent.clientY - distanceY * 0.3,
            // @ts-ignore
            y: e.clientY - distanceY * 0.3,
          });
        });

        element.addEventListener("mouseleave", () => {
          setCursorPosition(mousePosition);
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initial setup and handle DOM changes
    setupMagneticElements();
    const observer = new MutationObserver(setupMagneticElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [mousePosition]);

  // Update cursor position when mouse position changes
  useEffect(() => {
    setCursorPosition(mousePosition);
  }, [mousePosition]);

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
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-primary/40 backdrop-blur-md z-50 pointer-events-none"
        animate={{
          x: cursorPosition.x - 12,
          y: cursorPosition.y - 12,
          opacity: isVisible ? 0.8 : 0,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 600,
          damping: 15,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full border border-primary/20 z-50 pointer-events-none"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{
          type: "spring",
          mass: 0.4,
          stiffness: 200,
          damping: 20,
        }}
      />
    </>
  );
}
