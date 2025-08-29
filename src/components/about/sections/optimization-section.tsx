"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Cog, Zap } from "lucide-react";
import { forwardRef } from "react";

const OptimizationSection = forwardRef<HTMLElement>((props, ref) => {
  const approaches = [
    {
      icon: Cog,
      title: "Environment Optimization",
      description:
        "Meticulously configured development setup with custom tooling, automated workflows, and performance-optimized configurations that eliminate friction and boost productivity.",
      highlights: [
        "VS Code with optimized extensions",
        "Custom terminal setup with Oh My Zsh",
        "Automated deployment pipelines",
        "Performance monitoring tools",
      ],
    },
    {
      icon: Bot,
      title: "AI-Enhanced Development",
      description:
        "Leveraging Claude Code, ChatGPT, and MCP servers to accelerate coding, debugging, and architecture decisions while maintaining code quality and best practices.",
      highlights: [
        "40% faster development cycles",
        "AI-assisted code reviews",
        "Automated documentation",
        "Intelligent debugging workflows",
      ],
    },
    {
      icon: Zap,
      title: "Process Automation",
      description:
        "Building systems that work smarter, not harder. Every repetitive task is automated, every workflow is optimized, and every configuration is fine-tuned for maximum efficiency.",
      highlights: [
        "CI/CD pipeline optimization",
        "Automated testing workflows",
        "Configuration management",
        "Performance optimization scripts",
      ],
    },
  ];

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            My Approach
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            Optimization-Driven Development
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My development philosophy centers on creating systems that maximize
            efficiency, leverage modern tools, and deliver exceptional results
            through careful optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {approaches.map((approach, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <approach.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{approach.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {approach.description}
                </p>
                <div className="space-y-2">
                  {approach.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

OptimizationSection.displayName = "OptimizationSection";

export default OptimizationSection;
