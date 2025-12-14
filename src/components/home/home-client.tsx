"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import FeaturedWork from "@/components/home/features/featured-work";
import Newsletter from "../news-letter";
import AIProjectsSection from "./sections/ai-projects-section";
import AITimelineSection from "./sections/ai-timeline-section";
import CtaSection from "./sections/cta-section";
import HeroSection from "./sections/hero-section";
import ServicesSection from "./sections/services-section";
import SkillsSection from "./sections/skills-section";
import StatsSection from "./sections/stats-section";
import TestimonialSection from "./sections/testimonials-section";
import WorkflowSection from "./sections/workflow-section";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePageClient() {
  const [isLoaded, setIsLoaded] = useState(false);
  const skillsRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialRef = useRef(null);
  const ctaRef = useRef(null);
  const aiTimelineRef = useRef(null);
  const aiProjectsRef = useRef(null);
  const workflowRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
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
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      });
      gsap.from(".testimonial", {
        scrollTrigger: {
          trigger: testimonialRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
      });
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
    <main className="min-h-screen flex flex-col pb-24">
      {/* Chapter 1: Introduction */}
      <HeroSection isLoaded={isLoaded} />

      {/* Chapter 2: My AI Journey Timeline */}
      <AITimelineSection ref={aiTimelineRef} />

      {/* Chapter 4: AI Projects Showcase */}
      <AIProjectsSection ref={aiProjectsRef} />

      {/* Chapter 5: My Workflow */}
      <WorkflowSection ref={workflowRef} />

      {/* Skills & Stats */}
      <SkillsSection ref={skillsRef} />
      <StatsSection ref={statsRef} />

      {/* Featured Work & Social Proof */}
      <FeaturedWork />
      <TestimonialSection ref={testimonialRef} />

      {/* CTA & Services */}
      <CtaSection ref={ctaRef} />
      <ServicesSection />
      <Newsletter />

      <style jsx global>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(
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
