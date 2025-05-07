"use client";

import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";

interface ScrollSmootherProviderProps {
  children: React.ReactNode;
  smoothness?: number;
  effects?: boolean;
}

export const ScrollSmootherProvider = ({
  children,
  smoothness = 1,
  effects = true,
}: ScrollSmootherProviderProps) => {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [, setIsReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    if (smoothWrapperRef.current && contentRef.current) {
      const smoother = ScrollSmoother.create({
        wrapper: smoothWrapperRef.current,
        content: contentRef.current,
        smooth: smoothness,
        effects: effects,
        normalizeScroll: true,
      });

      setIsReady(true);

      return () => {
        smoother.kill();
      };
    }
  }, [smoothness, effects]);

  return (
    <>
      <div id="smooth-wrapper" ref={smoothWrapperRef} className="h-full w-full">
        <div id="smooth-content" ref={contentRef}>
          {children}
        </div>
      </div>
    </>
  );
};
