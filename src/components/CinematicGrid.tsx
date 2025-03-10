"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export default function CinematicGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    const grid = gridRef.current;
    if (!grid) return;

    // Clear any existing cells
    grid.innerHTML = "";

    // Create grid lines
    const gridSize = 20;
    const gridCells: HTMLDivElement[] = [];

    // Set color based on theme
    const baseColor =
      theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

    const highlightColor =
      theme === "dark" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)";

    const animateColor =
      theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.style.left = `${(x / gridSize) * 100}%`;
        cell.style.top = `${(y / gridSize) * 100}%`;
        cell.style.position = "absolute";
        cell.style.backgroundColor = baseColor;
        cell.style.width = "1px";
        cell.style.height = "1px";
        grid.appendChild(cell);
        gridCells.push(cell);
      }
    }

    // Animate grid, excluding the first column
    const cellsToAnimate = gridCells.filter((cell, index) => {
      return index % gridSize !== 0;
    });

    gsap.set(cellsToAnimate, {
      backgroundColor: highlightColor,
      width: "1px",
      height: "1px",
      position: "absolute",
    });

    gsap.to(cellsToAnimate, {
      backgroundColor: animateColor,
      opacity: 0.1,
      stagger: {
        grid: [gridSize, gridSize],
        from: "center",
        amount: 1.5,
      },
      scrollTrigger: {
        trigger: grid,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [theme]); // Add theme as dependency to re-run when theme changes

  return (
    <div
      ref={gridRef}
      className="pointer-events-none fixed inset-0 z-10 ml-18 overflow-hidden"
    />
  );
}
