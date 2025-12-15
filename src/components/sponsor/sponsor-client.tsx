"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import siteData from "@/constants/siteData.json";
import {
  BarChart3,
  Check,
  Eye,
  Heart,
  Mail,
  MessageSquare,
  Newspaper,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function SponsorPageClient() {
  const stats = [
    {
      icon: Eye,
      value: siteData.sponsor.stats.monthlyPageviews,
      label: "Monthly Pageviews",
    },
    {
      icon: Users,
      value: siteData.sponsor.stats.monthlyVisitors,
      label: "Monthly Visitors",
    },
    {
      icon: Newspaper,
      value: siteData.sponsor.stats.newsletterSubscribers,
      label: "Newsletter",
    },
    {
      icon: Target,
      value: "Developers",
      label: "Target Audience",
    },
  ];

  const topContent = [
    "macOS Dev Environment Setup",
    "Terminal & CLI Customization",
    "Astro & Next.js Tutorials",
    "Developer Productivity Tips",
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
          <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              <Heart className="h-3 w-3 mr-1" />
              Partner with R44J
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Reach <span className="text-primary">Developers</span> Who Care
              About Their Craft
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              My audience consists of developers passionate about productivity,
              dev tools, and modern web development. Partner with me to get your
              product in front of the right people.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link
                href={`mailto:${siteData.social.mail.url.replace("mailto:", "")}?subject=Sponsorship Inquiry`}
              >
                <Mail className="h-4 w-4" />
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Audience Overview</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {siteData.sponsor.audience.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <MagicCard
                key={index}
                className="rounded-xl"
                gradientColor="hsl(var(--muted))"
                gradientOpacity={0.5}
              >
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </MagicCard>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <MagicCard className="rounded-xl" gradientColor="hsl(var(--muted))" gradientOpacity={0.4}>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Who Visits</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {siteData.sponsor.audience.demographics.map((demo, index) => (
                    <Badge key={index} variant="secondary">
                      {demo}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </MagicCard>

            <MagicCard className="rounded-xl" gradientColor="hsl(var(--muted))" gradientOpacity={0.4}>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Top Content</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {topContent.map((content, index) => (
                    <Badge key={index} variant="outline">
                      {content}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </MagicCard>
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sponsorship Options</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the sponsorship tier that fits your goals. All sponsorships
              include analytics reports.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {siteData.sponsor.tiers.map((tier, index) => (
              <MagicCard
                key={index}
                className="rounded-xl"
                gradientColor="hsl(var(--muted))"
                gradientOpacity={0.5}
              >
                <div className="p-6">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {tier.description}
                    </p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-3xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground text-sm">
                        ({tier.priceUsd})
                      </span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {tier.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full" variant="outline">
                      <Link
                        href={`mailto:${siteData.social.mail.url.replace("mailto:", "")}?subject=Sponsorship: ${tier.name}`}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Inquire
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sponsor Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Sponsor?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <MagicCard className="rounded-xl" gradientColor="hsl(var(--muted))" gradientOpacity={0.4}>
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Targeted Audience</h3>
                <p className="text-sm text-muted-foreground">
                  My readers are developers actively looking for tools to improve
                  their workflow.
                </p>
              </div>
            </MagicCard>
            <MagicCard className="rounded-xl" gradientColor="hsl(var(--muted))" gradientOpacity={0.4}>
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Authentic Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Sponsorships are woven naturally into content, not intrusive
                  banner ads.
                </p>
              </div>
            </MagicCard>
            <MagicCard className="rounded-xl" gradientColor="hsl(var(--muted))" gradientOpacity={0.4}>
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Transparent Reporting</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed analytics on impressions, clicks, and engagement.
                </p>
              </div>
            </MagicCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-primary/10">
            <h2 className="text-3xl font-bold mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Interested in sponsoring? Reach out and let&apos;s discuss how we
              can create value for both your brand and my audience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link
                  href={`mailto:${siteData.social.mail.url.replace("mailto:", "")}?subject=Sponsorship Inquiry`}
                >
                  <Mail className="h-4 w-4" />
                  Contact Me
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">View My Content</Link>
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
