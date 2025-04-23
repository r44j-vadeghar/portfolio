"use client";

import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { forwardRef } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import siteData from "@/constants/siteData.json";

const CtaSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
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
  );
});

CtaSection.displayName = "CtaSection";

export default CtaSection;
