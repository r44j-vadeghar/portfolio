"use client";

import { gsap } from "gsap";
import {
  Calendar,
  ChevronRight,
  Code,
  Github,
  Linkedin,
  Mail,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import siteData from "@/constants/siteData.json";

interface HeroSectionProps {
  isLoaded: boolean;
  opacity?: number;
}

export default function HeroSection({
  isLoaded,
  opacity = 1,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const avatarContainerRef = useRef<HTMLDivElement>(null);
  const codeIconRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (!isLoaded || !contentRef.current) return;

    gsap.to(contentRef.current, {
      opacity: 1,
      duration: 0.3,
      onComplete: () => setContentVisible(true),
    });

    gsap.to(backgroundRef.current, {
      opacity: opacity,
      duration: 0.5,
    });

    gsap.fromTo(
      avatarContainerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.1 }
    );
  }, [isLoaded, opacity]);

  useEffect(() => {
    if (!contentVisible) return;

    const enhanceTl = gsap.timeline({
      defaults: { duration: 0.4, ease: "power2.out" },
    });

    enhanceTl.fromTo(
      codeIconRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, ease: "back.out(1.7)" },
      0
    );

    const socialIcons = socialIconsRef.current?.querySelectorAll("a");
    if (socialIcons)
      enhanceTl.fromTo(
        socialIcons,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.07,
          ease: "back.out(1.2)",
        },
        0.1
      );

    if (avatarContainerRef.current) {
      avatarContainerRef.current.addEventListener("mouseenter", () => {
        gsap.to(avatarContainerRef.current, {
          scale: 1.03,
          duration: 0.3,
        });
        gsap.to(codeIconRef.current, {
          rotate: 15,
          scale: 1.1,
          duration: 0.3,
        });
      });

      avatarContainerRef.current.addEventListener("mouseleave", () => {
        gsap.to(avatarContainerRef.current, {
          scale: 1,
          duration: 0.3,
        });
        gsap.to(codeIconRef.current, {
          rotate: 0,
          scale: 1,
          duration: 0.3,
        });
      });
    }

    return () => {
      enhanceTl.kill();
    };
  }, [contentVisible]);

  useEffect(() => {
    if (!contentVisible) return;

    const buttons = document.querySelectorAll("a.gap-2");

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", (e) => {
        const target = e.currentTarget as HTMLElement;
        gsap.to(target, {
          scale: 1.03,
          duration: 0.2,
        });

        const icon = target.querySelector("svg");
        if (icon) {
          gsap.to(icon, {
            x: target.classList.contains("rounded-full") ? 0 : 3,
            scale: 1.2,
            duration: 0.2,
          });
        }
      });

      button.addEventListener("mouseleave", (e) => {
        const target = e.currentTarget as HTMLElement;
        gsap.to(target, {
          scale: 1,
          duration: 0.2,
        });

        const icon = target.querySelector("svg");
        if (icon) {
          gsap.to(icon, {
            x: 0,
            scale: 1,
            duration: 0.2,
          });
        }
      });
    });
  }, [contentVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 -z-10 overflow-hidden opacity-0"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <div className="container mx-auto max-w-5xl">
        {isLoaded && (
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div ref={contentRef} className="flex-1 space-y-6 opacity-0">
              <div>
                <Badge className="mb-4 text-sm font-medium rounded-full">
                  {siteData.personal.role}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-primary block">
                  {siteData.default.name}
                </span>
                {siteData.home.hero.title}
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl">
                {siteData.home.hero.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild size="lg" className="gap-2">
                  <Link href={siteData.personal.calendlyUrl}>
                    <Calendar className="h-4 w-4" />
                    Schedule a Call
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="gap-2">
                  <Link href="/about">
                    Learn More
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div ref={socialIconsRef} className="flex gap-4 pt-4">
                <Link
                  href={siteData.social.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href={siteData.social.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href={siteData.social.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Youtube className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href={siteData.social.mail.url} aria-label="Email">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Mail className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div
              ref={avatarContainerRef}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary/20 p-1"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/30">
                <Image
                  src={siteData.personal.avatar || "/placeholder.svg"}
                  alt={siteData.default.name}
                  fill
                  className="object-cover rounded-full pointer-events-none select-none"
                  priority
                />
              </div>
              <div
                ref={codeIconRef}
                className="absolute -bottom-3 -right-3 bg-background rounded-full p-2 shadow-lg opacity-0"
              >
                <div className="bg-primary/10 rounded-full p-2">
                  <Code className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
