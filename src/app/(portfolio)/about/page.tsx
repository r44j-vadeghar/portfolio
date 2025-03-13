"use client";

import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import siteData from "@/constants/siteData.json";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Icon mapping
import { Code, Database, Paintbrush, Server, Video, Zap } from "lucide-react";

const iconMap = {
  Code: Code,
  Database: Database,
  Server: Server,
  Paintbrush: Paintbrush,
  Video: Video,
  Zap: Zap,
};

export default function AboutPage() {
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const achievementsRef = useRef(null);
  const experienceRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
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

      // Achievements animation
      gsap.from(".achievement-item", {
        scrollTrigger: {
          trigger: achievementsRef.current,
          start: "top 80%",
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      });

      // Experience animation
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
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95 flex flex-col">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
          <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">{siteData.personal.role}</Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mt-12"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary/20 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/30">
                <Image
                  src={
                    siteData.personal.avatar ||
                    "/placeholder.svg?height=320&width=320"
                  }
                  alt={siteData.default.name}
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
              <p className="text-muted-foreground">
                I&apos;m a Full Stack Developer and DevOps Engineer with 3 years
                of experience across startup and enterprise environments. My
                journey began at Manifold Ventures where I honed my React and
                Next.js skills, followed by a year at TCS where I expanded into
                .NET/C# and DevOps practices. Now back at Manifold Ventures,
                I&apos;m leveraging my diverse skill set to create exceptional
                digital experiences.
              </p>
              <p className="text-muted-foreground">
                Beyond coding, I&apos;m passionate about sharing knowledge
                through my YouTube channel, where I create content on
                development best practices, tutorials, and industry insights.
                This blend of technical expertise and communication skills
                allows me to not only build great products but also effectively
                collaborate with teams and clients.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild size="lg" className="gap-2">
                  <Link href={siteData.personal.calendlyUrl}>
                    <Calendar className="h-4 w-4" />
                    Schedule a Call
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="gap-2">
                  <Link href="/uses">
                    My Tech Stack
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={skillsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">My Skills & Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive set of skills developed over years of professional
              experience and continuous learning
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.about.skills.map((skill, index) => (
              <Card
                key={index}
                className="skill-card overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${skill.color} bg-opacity-10 mb-4`}
                  >
                    {renderIcon(skill.iconName as keyof typeof iconMap)}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{skill.label}</h3>
                  <p className="text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements Section */}
      <section ref={achievementsRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Achievements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Highlights from my professional journey that demonstrate my impact
              and expertise
            </p>
          </div>

          <div className="space-y-4">
            {siteData.about.keyAchievements.map((achievement, index) => (
              <motion.div
                key={index}
                // initial={{ opacity: 0, x: -20 }}
                // whileInView={{ opacity: 1, x: 0 }}
                // transition={{ duration: 0.5, delay: index * 0.1 }}
                // viewport={{ once: true }}
                className="achievement-item flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {index + 1}
                </div>
                <p className="pt-1">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        ref={experienceRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Professional Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My career journey across different companies and roles
            </p>
          </div>

          <div className="space-y-8">
            {siteData.about.experience.map((exp, index) => (
              <Card
                key={index}
                className="experience-card overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-background flex items-center justify-center p-2">
                        <Image
                          src={
                            exp.logoPath ||
                            `/placeholder.svg?height=64&width=64`
                          }
                          alt={exp.title}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold">
                          <Link
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            {exp.title}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{exp.span}</Badge>
                          <Badge variant="secondary">{exp.jobType}</Badge>
                        </div>
                      </div>
                      <p className="text-lg font-medium mb-2">
                        {exp.designation}
                      </p>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <Card className="cta-content border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Let&apos;s Work Together
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Looking for a developer who can bring your vision to life with
                clean code, beautiful interfaces, and scalable architecture?
                Let&apos;s connect and discuss how I can help you achieve your
                goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href={siteData.personal.calendlyUrl}>
                    <Calendar className="h-4 w-4" />
                    Schedule a Call
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="gap-2">
                  <Link href="/contact">
                    Contact Me
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
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
