"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import siteData from "@/constants/siteData.json";

export default function HeroSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
              Beyond coding, I&apos;m passionate about sharing knowledge through
              my YouTube channel, where I create content on development best
              practices, tutorials, and industry insights. This blend of
              technical expertise and communication skills allows me to not only
              build great products but also effectively collaborate with teams
              and clients.
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
  );
}
