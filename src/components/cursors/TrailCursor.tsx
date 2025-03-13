"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function TrailCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState<
    Array<{ x: number; y: number }>
  >([]);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Number of trail elements
  const trailLength = 10;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      setIsVisible(true);

      // Update trail positions
      setTrailPositions((prev) => {
        const newTrail = [newPosition, ...prev.slice(0, trailLength - 1)];
        return newTrail;
      });
    };

    const handleMouseLeave = () => setIsVisible(false);

    // Initialize trail positions
    setTrailPositions(Array(trailLength).fill({ x: 0, y: 0 }));

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-primary z-50 pointer-events-none"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          opacity: isVisible ? 0.9 : 0,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 800,
          damping: 20,
        }}
      />

      {/* Trail elements */}
      {trailPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 rounded-full z-50 pointer-events-none"
          style={{
            backgroundColor: `var(--color-${
              isDark ? "sidebar-primary" : "primary"
            })`,
            width: `${Math.max(2, 10 - index)}px`,
            height: `${Math.max(2, 10 - index)}px`,
          }}
          animate={{
            x: pos.x - Math.max(1, 5 - index / 2),
            y: pos.y - Math.max(1, 5 - index / 2),
            opacity: isVisible ? Math.max(0.1, 0.8 - index * 0.07) : 0,
          }}
          transition={{
            type: "spring",
            mass: 0.1,
            stiffness: 800 - index * 50,
            damping: 20 + index * 2,
          }}
        />
      ))}
    </>
  );
}
