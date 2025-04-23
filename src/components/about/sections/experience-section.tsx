"use client";

import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import siteData from "@/constants/siteData.json";

const ExperienceSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
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
                          exp.logoPath || `/placeholder.svg?height=64&width=64`
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
  );
});

ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection;
