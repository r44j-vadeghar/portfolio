"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import siteData from "@/constants/siteData.json";
import {
  Calendar,
  Check,
  Clock,
  Code,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero animation - immediate on load
      gsap.fromTo(
        ".hero-content",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Service cards - batch animation on scroll
      ScrollTrigger.batch(".service-card", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 50, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              overwrite: true,
            }
          );
        },
        start: "top 85%",
        once: true,
      });

      // Process steps - batch animation
      ScrollTrigger.batch(".process-step", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: true,
            }
          );
        },
        start: "top 85%",
        once: true,
      });

      // Skills cards
      ScrollTrigger.batch(".skills-card", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.15,
              ease: "power3.out",
              overwrite: true,
            }
          );
        },
        start: "top 85%",
        once: true,
      });

      // CTA section
      ScrollTrigger.batch(".cta-content", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 20, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power3.out",
              overwrite: true,
            }
          );
        },
        start: "top 85%",
        once: true,
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    },
    { scope: containerRef }
  );

  const processSteps = [
    {
      step: "01",
      title: "Book a Call",
      description: "Schedule a free 15-min intro call to discuss your needs",
    },
    {
      step: "02",
      title: "Define Scope",
      description: "We outline the work, timeline, and deliverables",
    },
    {
      step: "03",
      title: "Get Started",
      description: "I begin working on your project with regular updates",
    },
    {
      step: "04",
      title: "Deliver & Support",
      description: "Receive the final work with documentation and support",
    },
  ];

  return (
    <main ref={containerRef} className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
          <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-5xl">
          <div className="hero-content text-center">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Available for Projects
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Development <span className="text-primary">Services</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              From quick consultations to full-stack development. I help
              developers and businesses build better products.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link
                  href={siteData.personal.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="h-4 w-4" />
                  Book a Free Intro Call
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link
                  href={`mailto:${siteData.social.mail.url.replace("mailto:", "")}`}
                >
                  <MessageSquare className="h-4 w-4" />
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What I Offer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from consultation sessions, code reviews, or full project
              development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {siteData.services.offerings.map((service, index) => (
              <Card
                key={index}
                className={`service-card relative border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 ${
                  service.popular ? "ring-2 ring-primary/20" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">
                        {service.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold">{service.price}</span>
                    <span className="text-muted-foreground text-sm">
                      ({service.priceUsd})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="w-full"
                    variant={service.popular ? "default" : "outline"}
                  >
                    <Link
                      href={siteData.personal.calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple, transparent process from start to finish.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, index) => (
              <div
                key={index}
                className="process-step text-center p-6 rounded-xl border border-border/50 bg-card/30 hover:border-primary/30 transition-colors"
              >
                <div className="text-4xl font-bold text-primary/20 mb-2">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technologies I Work With</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Modern tech stack for building scalable applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="skills-card border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Primary Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {siteData.services.primary.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="skills-card border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Also Experienced In</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {siteData.services.network.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <div className="cta-content text-center p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Book a free 15-minute intro call to discuss your project. No
              commitment, just a conversation to see if we&apos;re a good fit.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link
                  href={siteData.personal.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule a Call
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/about">Learn More About Me</Link>
              </Button>
            </div>
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
