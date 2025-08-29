"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import CtaSection from "./sections/cta-section";
import ExperienceSection from "./sections/experience-section";
import FaqSection from "./sections/faq-section";
import HeroSection from "./sections/hero-section";
import SkillsSection from "./sections/skills-section";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPageClient() {
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      });

      gsap.from(".experience-card", {
        scrollTrigger: {
          trigger: experienceRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });

      // Animate FAQ items with fromTo for better control
      gsap.fromTo(".faq-item", 
        {
          y: 20,
          opacity: 0,
          visibility: "hidden",
        },
        {
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%",
            once: true,
          },
          y: 0,
          opacity: 1,
          visibility: "visible",
          duration: 0.6,
          stagger: 0.1,
          immediateRender: true,
        }
      );

      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <HeroSection />
      <SkillsSection ref={skillsRef} />
      <ExperienceSection ref={experienceRef} />
      <FaqSection ref={faqRef} />
      <CtaSection ref={ctaRef} />

      {/* CSS for background pattern */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            );
          background-size: 24px 24px;
        }
      `}</style>
    </main>
  );
}
