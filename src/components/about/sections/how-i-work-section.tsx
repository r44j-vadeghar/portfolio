"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Rocket,
  Settings,
  Zap,
} from "lucide-react";
import { forwardRef } from "react";

const HowIWorkSection = forwardRef<HTMLElement>((_, ref) => {
  const processes = [
    {
      phase: "01",
      icon: MessageCircle,
      title: "Discovery & Planning",
      duration: "1-2 weeks",
      description:
        "Deep dive into your requirements, technical constraints, and business goals. I analyze existing systems, define architecture, and create a detailed project roadmap.",
      keyActions: [
        "Requirements gathering and technical analysis",
        "Architecture design and technology selection",
        "Timeline creation with clear milestones",
        "Risk assessment and mitigation planning",
      ],
    },
    {
      phase: "02",
      icon: Settings,
      title: "Environment Setup",
      duration: "3-5 days",
      description:
        "My optimization obsession shines here. I configure the entire development environment, CI/CD pipelines, and monitoring systems for maximum efficiency throughout the project.",
      keyActions: [
        "Development environment optimization",
        "Automated testing and deployment pipelines",
        "Performance monitoring and error tracking",
        "Code quality tools and AI-assisted workflows",
      ],
    },
    {
      phase: "03",
      icon: Zap,
      title: "AI-Enhanced Development",
      duration: "Variable",
      description:
        "Core development phase leveraging Claude Code, ChatGPT, and MCP servers. This AI-enhanced approach delivers 40% faster development while maintaining exceptional code quality.",
      keyActions: [
        "Feature development with AI-assisted coding",
        "Automated code reviews and documentation",
        "Real-time testing and quality assurance",
        "Weekly progress demos and feedback integration",
      ],
    },
    {
      phase: "04",
      icon: CheckCircle,
      title: "Testing & Optimization",
      duration: "1-2 weeks",
      description:
        "Comprehensive testing across devices, performance optimization, and final quality checks. Every system is stress-tested and optimized before deployment.",
      keyActions: [
        "Cross-browser and device testing",
        "Performance optimization and load testing",
        "Security audit and vulnerability assessment",
        "User acceptance testing and final adjustments",
      ],
    },
    {
      phase: "05",
      icon: Rocket,
      title: "Deployment & Handover",
      duration: "3-5 days",
      description:
        "Smooth deployment with comprehensive documentation, knowledge transfer, and post-launch support. You get everything needed to maintain and scale the solution.",
      keyActions: [
        "Production deployment and monitoring setup",
        "Comprehensive documentation and training",
        "Knowledge transfer and team onboarding",
        "30-day post-launch support included",
      ],
    },
  ];

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            My Process
          </Badge>
          <h2 className="text-3xl font-bold mb-4">How I Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My optimized development process combines thorough planning,
            AI-enhanced development, and meticulous quality assurance to deliver
            exceptional results efficiently.
          </p>
        </div>

        <div className="space-y-8">
          {processes.map((process, index) => (
            <div key={index} className="relative">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
                    <CardHeader className="text-center lg:text-left pb-4">
                      <div className="flex flex-col items-center lg:items-start gap-3">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <process.icon className="h-8 w-8 text-primary" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                            {process.phase}
                          </div>
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-1">
                            {process.title}
                          </CardTitle>
                          <p className="text-sm text-primary font-medium">
                            {process.duration}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </div>

                  <div className="lg:col-span-9">
                    <CardContent className="pt-6 lg:pt-8">
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {process.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {process.keyActions.map((action, actionIndex) => (
                          <div
                            key={actionIndex}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {action}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>

              {index < processes.length - 1 && (
                <div className="flex justify-center my-4">
                  <ArrowRight className="h-6 w-6 text-primary/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full text-sm">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              <strong className="text-primary">40% faster delivery</strong>{" "}
              through AI-enhanced workflows
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

HowIWorkSection.displayName = "HowIWorkSection";

export default HowIWorkSection;
