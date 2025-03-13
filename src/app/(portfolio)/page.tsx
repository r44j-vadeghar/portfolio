"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Code,
  Database,
  Github,
  Linkedin,
  Mail,
  Paintbrush,
  Server,
  Video,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import FeaturedWork from "@/components/home/features/featured-work";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import siteData from "@/constants/siteData.json";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Icon mapping
const iconMap = {
  Code: Code,
  Database: Database,
  Server: Server,
  Paintbrush: Paintbrush,
  Video: Video,
};

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialRef = useRef(null);
  const ctaRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.3]);

  useEffect(() => {
    setIsLoaded(true);

    // GSAP animations
    const ctx = gsap.context(() => {
      // Skills section animation
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

      // Stats animation
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

      // Testimonial animation
      gsap.from(".testimonial", {
        scrollTrigger: {
          trigger: testimonialRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
      });

      // CTA animation
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

  const renderIcon = (iconName: keyof typeof iconMap) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        </motion.div>

        <div className="container mx-auto max-w-5xl">
          <AnimatePresence>
            {isLoaded && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                >
                  <div className="flex-1 space-y-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <Badge className="mb-4 text-sm font-medium rounded-full">
                        {siteData.personal.role}
                      </Badge>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                    >
                      <span className="text-primary">
                        {siteData.default.name}
                      </span>
                      <br />
                      {siteData.home.hero.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-lg text-muted-foreground max-w-xl"
                    >
                      {siteData.home.hero.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="flex flex-wrap gap-4 pt-2"
                    >
                      <Button asChild size="lg" className="gap-2">
                        <Link href={siteData.personal.calendlyUrl}>
                          <Calendar className="h-4 w-4" />
                          Schedule a Call
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        size="lg"
                        className="gap-2"
                      >
                        <Link href="/about">
                          Learn More
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="flex gap-4 pt-4"
                    >
                      <Link
                        href={siteData.social.github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <Github className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Link
                        href={siteData.social.linkedin.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <Linkedin className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Link
                        href={siteData.social.youtube.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <Youtube className="h-5 w-5" />
                        </Button>
                      </Link>
                      <Link href={siteData.social.mail.url} aria-label="Email">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <Mail className="h-5 w-5" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary/20 p-1"
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/30">
                      <Image
                        src={siteData.personal.avatar || "/placeholder.svg"}
                        alt={siteData.default.name}
                        fill
                        className="object-cover rounded-full"
                        priority
                      />
                    </div>
                    <div className="absolute -bottom-3 -right-3 bg-background rounded-full p-2 shadow-lg">
                      <div className="bg-primary/10 rounded-full p-2">
                        <Code className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">My Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized skills honed over 3 years of professional experience
              across startup and enterprise environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.home.skills.map((skill, index) => (
              <Card
                key={index}
                className="skill-card overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${skill.color}-500/10 mb-4`}
                  >
                    {renderIcon(skill.iconName as keyof typeof iconMap)}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{skill.label}</h3>
                  <p className="text-muted-foreground">
                    {
                      siteData.about.skills.find((s) => s.label === skill.label)
                        ?.description
                    }
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {siteData.home.stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedWork />

      {/* Testimonial Section */}
      <section
        ref={testimonialRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Client Testimonial</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What clients say about working with me
            </p>
          </div>

          {siteData.home.testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial max-w-3xl mx-auto">
              <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-shrink-0">
                      <Link
                        href={testimonial.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={
                            testimonial.logoPath ||
                            `/placeholder.svg?height=80&width=80`
                          }
                          alt={testimonial.company}
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                      </Link>
                    </div>
                    <div className="flex-1">
                      <blockquote
                        className="text-lg italic mb-4"
                        dangerouslySetInnerHTML={{
                          __html: testimonial.testimonial,
                        }}
                      />
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src="/placeholder-user.jpg"
                            alt={testimonial.person}
                          />
                          <AvatarFallback>
                            {testimonial.person.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{testimonial.person}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <Card className="cta-content border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Let&apos;s collaborate to bring your vision to life with clean
                code, beautiful interfaces, and scalable architecture.
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link href={siteData.personal.calendlyUrl}>
                  <Calendar className="h-4 w-4" />
                  Schedule a Call
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Services I Offer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Primary Services</h3>
                <ul className="space-y-2">
                  {siteData.services.primary.map((service, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Additional Services
                </h3>
                <ul className="space-y-2">
                  {siteData.services.network.map((service, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
