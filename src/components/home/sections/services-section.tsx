"use client";

import { ArrowRight, Calendar, Check, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import siteData from "@/constants/siteData.json";

export default function ServicesSection() {
  // Show first 3 offerings on homepage
  const featuredOfferings = siteData.services.offerings.slice(0, 3);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Available for Hire
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Work With Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From quick consultations to full project development. Choose what
            fits your needs.
          </p>
        </div>

        {/* Featured Service Offerings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featuredOfferings.map((service, index) => (
            <MagicCard
              key={index}
              className={`rounded-xl ${service.popular ? "ring-2 ring-primary/20" : ""}`}
              gradientColor="hsl(var(--muted))"
              gradientOpacity={0.5}
            >
              <div className="relative p-6">
                {service.popular && (
                  <div className="absolute -top-3 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold">{service.price}</span>
                    <span className="text-muted-foreground text-xs">
                      ({service.priceUsd})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Clock className="h-3 w-3" />
                    <span>{service.duration}</span>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2 text-xs"
                      >
                        <Check className="h-3 w-3 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </MagicCard>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link
                href={siteData.personal.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="h-4 w-4" />
                Book a Free Call
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/services">
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Tech Stack List */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <MagicCard className="rounded-xl" gradientColor="hsl(var(--muted))" gradientOpacity={0.4}>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Primary Stack</h3>
              <ul className="space-y-2">
                {siteData.services.primary.slice(0, 6).map((service, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </MagicCard>

          <MagicCard className="rounded-xl" gradientColor="hsl(var(--muted))" gradientOpacity={0.4}>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Also Experienced In</h3>
              <ul className="space-y-2">
                {siteData.services.network.map((service, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </MagicCard>
        </div>
      </div>
    </section>
  );
}
