import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CinematicGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Create grid lines
    const gridSize = 20;
    const gridCells: HTMLDivElement[] = [];
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.style.left = `${(x / gridSize) * 100}%`;
        cell.style.top = `${(y / gridSize) * 100}%`;
        grid.appendChild(cell);
        gridCells.push(cell);
      }
    }

    // Animate grid, excluding the first column
    const cellsToAnimate = gridCells.filter((cell, index) => {
      // Exclude the first column (index % gridSize === 0)
      return index % gridSize !== 0;
    });

    gsap.set(cellsToAnimate, {
      backgroundColor: "rgba(255,255,255,0.3)",
      width: "1px",
      height: "1px",
      position: "absolute"
    });

    gsap.to(cellsToAnimate, {
      backgroundColor: "rgba(255,255,255,0.5)",
      opacity: 0.1,
      stagger: {
        grid: [gridSize, gridSize],
        from: "center",
        amount: 1.5
      },
      scrollTrigger: {
        trigger: grid,
        start: "top center",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <div
      ref={gridRef}
      className="pointer-events-none fixed inset-0 z-10 ml-18 overflow-hidden"
    />
  );
};

export default CinematicGrid;
