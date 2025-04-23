"use client";

import { forwardRef } from "react";

import { Card, CardContent } from "@/components/ui/card";
import siteData from "@/constants/siteData.json";
import { renderIcon } from "../iconUtils";

const SkillsSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
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
                  {renderIcon(skill.iconName)}
                </div>
                <h3 className="text-xl font-semibold mb-2">{skill.label}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
