"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions and handle resize
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Create fluid gradients with enhanced visibility
    class FluidGradient {
      x: number;
      y: number;
      radius: number;
      baseRadius: number;
      targetX: number;
      targetY: number;
      speedFactor: number;
      hue: number;
      saturation: number;
      lightness: number;
      opacity: number;
      phase: number;

      constructor() {
        // Position
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseRadius =
          Math.min(canvas!.width, canvas!.height) * (0.3 + Math.random() * 0.3); // 30-60% of screen size
        this.radius = this.baseRadius;

        // Movement
        this.targetX = Math.random() * canvas!.width;
        this.targetY = Math.random() * canvas!.height;
        this.speedFactor = 0.0008 + Math.random() * 0.0012;

        // Color - theme appropriate but more visible
        if (isDark) {
          this.hue = Math.random() * 60 + 210; // Blues to purples
          this.saturation = 30 + Math.random() * 40; // More saturation for visibility
          this.lightness = 40 + Math.random() * 20; // Brighter
        } else {
          this.hue = Math.random() * 60 + 180; // Turquoise to blues
          this.saturation = 30 + Math.random() * 40; // More saturation
          this.lightness = 60 + Math.random() * 20; // Brighter
        }

        // Visual settings
        this.opacity = 0.15 + Math.random() * 0.1; // Increased for visibility
        this.phase = Math.random() * Math.PI * 2; // Random starting phase
      }

      update(time: number) {
        // Smooth movement toward target
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Change target if getting close
        if (distance < 100) {
          this.targetX = Math.random() * canvas!.width;
          this.targetY = Math.random() * canvas!.height;
        } else {
          // Move toward target
          this.x += dx * this.speedFactor;
          this.y += dy * this.speedFactor;
        }

        // Gentle radius pulsing
        const pulseSpeed = 0.0005;
        const pulseAmount = 0.15; // 15% variation
        this.radius =
          this.baseRadius *
          (1 + Math.sin(time * pulseSpeed + this.phase) * pulseAmount);
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Create gradient
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );

        // Determine theme-appropriate colors
        const innerColor = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.opacity})`;
        const outerColor = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0)`;

        gradient.addColorStop(0, innerColor);
        gradient.addColorStop(1, outerColor);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize gradients - increased count for more visibility
    const gradients: FluidGradient[] = [];
    const gradientCount = 6;

    for (let i = 0; i < gradientCount; i++) {
      gradients.push(new FluidGradient());
    }

    // Animation loop
    let animationFrameId: number;
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;

      // Clear with slight trailing effect for smoother transitions
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradients
      gradients.forEach((gradient) => {
        gradient.update(timestamp);
        gradient.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [theme, systemTheme, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 w-full h-full dark:hidden"
      style={{
        mixBlendMode: "normal",
        opacity: 1,
      }}
      aria-hidden="true"
    />
  );
}
