"use client";

import { AnimatePresence, motion } from "framer-motion";
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import siteData from "@/constants/siteData.json";

interface HeroSectionProps {
  isLoaded: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  opacity: any;
}

export default function HeroSection({ isLoaded, opacity }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
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
  );
}
