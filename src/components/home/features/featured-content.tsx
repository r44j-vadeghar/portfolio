"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useFeatureStore } from "./feature-store";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function FeaturedContent({
  children,
  id,
}: React.PropsWithChildren & {
  id: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const setInViewFeature = useFeatureStore((state) => state.setInViewFeature);
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);

  useEffect(() => {
    if (!ref.current) return;
    const scrollTrigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top center-=25%",
      end: "bottom center+=25%",
      onEnter: () => {
        setInViewFeature(id);
        gsap.to(ref.current, { opacity: 1, duration: 0.3 });
      },
      onLeave: () => {
        if (inViewFeature === id) {
          gsap.to(ref.current, { opacity: 0.3, duration: 0.3 });
        }
      },
      onEnterBack: () => {
        setInViewFeature(id);
        gsap.to(ref.current, { opacity: 1, duration: 0.3 });
      },
      onLeaveBack: () => {
        if (inViewFeature === id) {
          gsap.to(ref.current, { opacity: 0.3, duration: 0.3 });
        }
      },
      markers: process.env.NODE_ENV === "development",
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [id, setInViewFeature, inViewFeature]);

  return (
    <div
      ref={ref}
      className={`py-[30vh] transition-opacity ${
        inViewFeature === id ? "" : "opacity-30"
      }`}
      data-featured-content={id}
    >
      {children}
    </div>
  );
}

export default FeaturedContent;
